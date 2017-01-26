<template>
    <div id="accountPart">
        <v-header :title="title"></v-header>
        <div>
            <div class="row">
                <div class="col-lg-12">
                    <div class="panel panel-default">
                        <div class="panel-body ">
                            <div id="toolbar">
                                <button  class="btn btn-danger" @click="doReject" v-if="accounts.account.reject">
                                    <i class="glyphicon  glyphicon-remove"></i> 拒绝
                                </button>
                                <select class="btn" style="border: 1px solid #30a5ff;" v-model.number="searchKeys.dateRange" @change="changeByDateRange">
                                    <option value="1">最近一个月</option>
                                    <option value="3">最近三个月</option>
                                    <option value="6">最近半年</option>
                                    <option value="12">最近一年</option>
                                </select>
                            </div>
                            <table id="table"    data-show-refresh="true"  data-show-columns="true" data-search="true" data-select-item-name="toolbar1" data-pagination="true" data-sort-name="create_date" data-sort-order="desc"
                                   data-page-size="5" data-page-list="[5,10,20,50]"  data-toolbar="#toolbar" data-advanced-search="true" data-id-table="advancedTable"
                                   data-side-pagination="client" data-striped="true"
                            >
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<style>
</style>
<script>
    let $table,$modal,searchKeys={dateRange:3},router,orderNum,vuer,
    timeFormatter=(row, index )=>{
        return (new Date(row)).format();
    },
     orderNumFormatter=(row, index )=>{
        return `<a class='btn btn-link orderNumLink' >${row}</a>`;
    },
    orderNumEvents={
         'click .orderNumLink': function (e, value, row, index) {
            router.replace({path:`/main/orders/${value}`});
        }
    },
    refreshTable=()=>{
        $table.bootstrapTable('refresh');
    },
    statusStyle= (value, row, index, field)=> {
      return {
        classes: '',
        css: {"color": value=="失败"?"red":""}
      };
    },
    commonColumns=[
    {
        field: 'orderNum',
        title: '订单号',
        sortable: true,
        align: 'center',
        formatter:orderNumFormatter,
        events:orderNumEvents
    },
    {
        field: 'measure',
        title: '结算标准量',
        sortable: true,
        align: 'center'
    },
    {
        field: 'price',
        title: '收入单价',
        sortable: true,
        align: 'center'
    },
    {
        field: 'freight',
        title: '运费收入',
        sortable: true,
        align: 'center'
    },
    {
        field: 'ladingCost',
        title: '提货费',
        sortable: true,
        align: 'center'
    },
    {
        field: 'deliveryCost',
        title: '送货费',
        sortable: true,
        align: 'center'
    },
    {
        field: 'otherCost',
        title: '其他费用',
        sortable: true,
        align: 'center'
    },
    {
        field: 'accountSum',
        title: '合计收入',
        sortable: true,
        align: 'center'
    },
    ],columnObject={};commonColumns.forEach(c=>{columnObject[c.field]=''});

    function ajaxRequest(params) {
        formPost("/backend/account/all",Object.assign(params.data,vuer.searchKeys)).then(v=>{
             params.success(v)
        }).catch(e=>{
            alertify.error(e.message)
        })
    }
    let initTable=()=>{
              $table=$("#table")
              $table.bootstrapTable({
                 ajax: ajaxRequest,
                 responseHandler:function(res){
                    if(res.status===0){
                        return res.content.filter(v=>v.accountStatus!=="可修改");
                    }else{
                       return res.message;
                    }
                 },
                 columns: [
                  [{
                      field: 'state',
                      align: 'center',
                      checkbox:true,
                  },
                  {
                      field: 'id',
                      title: 'ID',
                      sortable: true,
                      align: 'center',
                  },
                  {
                      field: 'updateDate',
                      title: '修改时间',
                      sortable: true,
                      align: 'center',
                      formatter: timeFormatter,
                  },
                  ...commonColumns,
                  {
                      field: 'createDate',
                      title: '创建时间',
                      sortable: true,
                      align: 'center',
                      formatter: timeFormatter,
                  },
                  ]
          ],
          onLoadSuccess: function(data){

          }
      });
    };
    export default {
        data(){
            return{
                title:'结算信息',
                account:{
                    title:"添加结算信息",
                    id:"",
                    ...columnObject
                },
            accounts:{
                account:{
                }
            }
            }
        },
        methods:{
            doReject(){
                try{
                    let selected=getSelections($table)[0];
                    post("backend/account/rejectAccountStatus",{id:selected.id,accountStatus:"可修改"}).then(v=>{
                        if(v && v.status===0){
                            alertify.success(v.message);
                            refreshTable();
                        }else{
                            alertify.error(v.message)
                        }
                    })
                }catch(error){
                    alertify.error(error.message)
                }
            },
            changeByDateRange(){
               refreshTable()
            },
        },
        computed:{
            freight(){
                let account=this.account;
                account.freight=(parseInt(account.measure) || 0)*account.price;
                return account.freight
            },
            accountSum(){
                let account=this.account;
                account.accountSum= (parseFloat(account.freight) || 0)+(parseFloat(account.ladingCost) || 0)+(parseFloat(account.deliveryCost) || 0)+(parseFloat(account.otherCost) || 0);
                return account.accountSum;
            },
            searchKeys(){
               return this.orderNum?Object.assign({},searchKeys,{orderNum:this.orderNum}):searchKeys;
            },
            orderNum(){
                orderNum=this.$route.params.orderNum;
                return orderNum;
            }
        },
        mounted(){
            let namespace=this.$store.state.permissions;
            router=this.$router;
            this.$parent.current.item="accounts.account";
            vuer=this;
            initTable();
            this.accounts.account=Object.assign({},this.accounts.account,namespace.accounts.account || {})
        }
    }
</script>
