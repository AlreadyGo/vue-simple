<template>
    <div id="accountPart">
        <v-header :title="title"></v-header>
        <div>
            <div class="row">
                <div class="col-lg-12">
                    <div class="panel panel-default">
                        <div class="panel-body ">
                            <div id="toolbar">
                                <button id="dispatcher" class="btn btn-primary"   @click="doUpdate" v-if="accounts.account.save">
                                    <i class="glyphicon  glyphicon-edit"></i> 编辑
                                </button>
                                <button  class="btn btn-info"  @click="doViewAll"  v-if="accounts.account.all">
                                    <i class="glyphicon  glyphicon-eye-open"></i> 全部结算
                                </button>
                                <button  class="btn btn-danger" @click="doDelete"  v-if="accounts.account.delete">
                                    <i class="glyphicon  glyphicon-remove"></i> 删除
                                </button>
                                <select class="btn" style="borderInfo: 1px solid #30a5ff;" v-model.number="searchKeys.dateRange" @change="changeByDateRange">
                                    <option value="1">最近一个月</option>
                                    <option value="3">最近三个月</option>
                                    <option value="6">最近半年</option>
                                    <option value="12">最近一年</option>
                                </select>
                            </div>
                            <table id="table"    data-show-refresh="true"  data-show-columns="true" data-search="true" data-select-item-name="toolbar1" data-pagination="true" data-sort-name="create_date" data-sort-order="desc"
                                   data-page-size="5" data-page-list="[5,10,20,50]"  data-toolbar="#toolbar" data-advanced-search="true" data-id-table="advancedTable"
                                   data-side-pagination="client" data-striped="true" data-single-select="true"
                            >
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <v-modal vmodal-id="accountModal" vmodal-labelledby="myModalLabel" :vmodal-title="account.title" :vmodal-submit="doCreateOrUpdate">
            <div class="fixed-height">
                <div class="form-group margin0">
                    <label class="col-md-3 control-label" >订单号:</label>
                    <div class="col-md-9">
                        <label class="form-control">{{account.orderNum}}</label>
                    </div>
                </div>
                <div class="form-group margin0">
                    <label class="col-md-3 control-label" for="account-measure">结算标准量:</label>
                    <div class="col-md-9">
                        <input class="form-control" placeholder="结算标准量" id="account-measure" type="text"  v-model.trim="account.measure" >
                    </div>
                </div>
                <div class="form-group margin0">
                    <label class="col-md-3 control-label" for="account-price">收入单价:</label>
                    <div class="col-md-9">
                        <input class="form-control" placeholder="收入单价" id="account-price" type="text"  v-model.trim.number="account.price" >
                    </div>
                </div>
                <div class="form-group margin0">
                    <label class="col-md-3 control-label" for="account-freight">运费收入:</label>
                    <div class="col-md-9">
                        <input class="form-control" placeholder="运费收入" id="account-freight" type="text"  v-model.trim.number="account.freight" >
                    </div>
                </div>
                <div class="form-group margin0">
                    <label class="col-md-3 control-label" for="account-ladingCost">提货费:</label>
                    <div class="col-md-9">
                        <input class="form-control" placeholder="提货费" id="account-ladingCost" type="text"  v-model.trim.number="account.ladingCost" >
                    </div>
                </div>
                <div class="form-group margin0">
                    <label class="col-md-3 control-label" for="account-deliveryCost">送货费:</label>
                    <div class="col-md-9">
                        <input class="form-control" placeholder="送货费" id="account-deliveryCost" type="text"  v-model.trim.number="account.deliveryCost" >
                    </div>
                </div>
                <div class="form-group margin0">
                    <label class="col-md-3 control-label" for="account-otherCost">其他费用:</label>
                    <div class="col-md-9">
                        <input class="form-control" placeholder="其他费用" id="account-otherCost" type="text"  v-model.trim.number="account.otherCost" >
                    </div>
                </div>
                <div class="form-group margin0">
                    <label class="col-md-3 control-label" for="account-accountSum">合计收入:</label>
                    <div class="col-md-9">
                        <label class="form-control"  id="account-accountSum"  >{{accountSum}}</label>

                    </div>
                </div>
            </div>
        </v-modal>
    </div>
</template>
<style>
</style>
<script>
    let $table,$modal,searchKeys={dateRange:3},router,orderNum,vuer,
    timeFormatter=(row, index )=>{
        return (new Date(row)).format("yyyy-MM-dd hh:mm:ss");
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
                        return res.content;
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
            if(orderNum){
              if(data && Array.isArray(data) && data.length==0){
                alertify.confirm("提示信息","该订单尚未创建结算,是否立即创建",
                  function(){
                    timeout(500).then(()=>{
                        vuer.doCreate();
                        vuer.account.orderNum=orderNum;
                    })
                  },
                  function(){
                  });
              }else if(data && !Array.isArray(data)){
               alertify.error('错误操作,该订单不存在');
              }
            }

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
                            'all':false,
                            'save':false,
                            'delete':false,


                }
            }
            }
        },
        methods:{
            doViewAll(){
                this.$router.replace({path:'/main/accounts'});
                refreshTable()
            },
            changeByDateRange(){
               refreshTable()
            },
            doCreateOrUpdate(){
                post("/backend/account/save",this.account).then(v=>{
                    if(v.status==0){
                        alertify.success(v.message);
                        $modal.modal("hide");
                        refreshTable();
                    }else{
                        throw new Error(v.message)
                    }
                }).catch(e=>{
                    alertify.error("操作失败")
                })
            },
            doCreate(){
                $.each(Object.keys(this.account),(index,v)=>{this.account[v]=''})
                this.account.title="添加结算信息";
                $modal.modal("show");
            },
            doUpdate(){
                try{
                    let arr=getSelections($table);
                    let el={...arr[0],title:'修改结算信息'};
                    Object.assign(this.account,el);
                    $modal.modal("show");
                }catch(e){
                    alertify.error(e.message)
                }
            },
            doDelete(){
                try{
                    let arr=getSelections($table);
                     post("/backend/account/delete/"+(arr[0].id)).
                     then(body=>{
                        if(body && body.status==0){
                            alertify.success(body.message);
                            $table.bootstrapTable('refresh');
                        }else{
                            throw new Error(body.message);
                        }
                     })
                }catch(e){
                    alertify.error(e.message)
                }
            }
        },
        computed:{
            accountSum(){
                let account=this.account;
                account.accountSum= (parseFloat(account.price) || 0)+(parseFloat(account.freight) || 0)+(parseFloat(account.ladingCost) || 0)+(parseFloat(account.deliveryCost) || 0)+(parseFloat(account.otherCost) || 0);
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
            $modal=$("#accountModal");
            router=this.$router;
            this.$parent.current.item="accounts.account";
            vuer=this;
            initTable();
            Object.assign(this.accounts.account,namespace.accounts.account || {})
        }
    }
</script>
