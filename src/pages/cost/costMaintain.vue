<template>
    <div id="costMaintainPart">
        <v-header :title="title"></v-header>
        <div>
            <div class="row">
                <div class="col-lg-12">
                    <div class="panel panel-default">
                        <div class="panel-body">
                            <div id="toolbar">
                                <button  class="btn btn-danger" @click="doReject" v-if="cost.costMaintain.reject">
                                    <i class="glyphicon  glyphicon-remove"></i> 拒绝
                                </button>
                                <button  class="btn btn-success" @click="doSubmit" v-if="cost.costMaintain.submitCostStatus">
                                    <i class="glyphicon  glyphicon-ok"></i> 提交成本
                                </button>
                                <select class="btn" style="border:  1px solid #30a5ff;" v-model.number="searchKeys.dateRange" @change="changeByDateRange">
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
    let $table,$modal,searchKeys={dateRange:3},vuer,router,orderNum,
            orderNumFormatter=(row, index )=>{
                return `<a class='btn btn-link orderNumLink' >${row}</a>`;
            },
            orderNumEvents={
                'click .orderNumLink': function (e, value, row, index) {
                    router.replace({path:`/main/orders/${value}`});
                }
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
                    field: 'costStatus',
                    title: '成本状态',
                    sortable: true,
                    align: 'center',
                    cellStyle:(value, row, index, field)=> {
                                    return {
                                        classes: '',
                                        css: {"color": value=="待提交"?"red":"green"}
                                    };
                                }
                },
                {
                    field: 'transportWay',
                    title: '运输方式',
                    align: 'center'
                },
                {
                    field: 'receivingWay',
                    title: '提货方式',
                    align: 'center',
                },
                {
                    field: 'driverName',
                    title: '承运司机',
                    align: 'center',
                },
                {
                    field: 'carType',
                    title: '车型',
                    align: 'center',
                },
                {
                    field: 'carRental',
                    title: '租车费用',
                    align: 'center',
                },
                {
                    field: 'deliveryManName',
                    title: '承运商',
                    align: 'center',
                },
                {
                    field: 'expressNumber',
                    title: '物流单号',
                    align: 'center',
                },
                {
                    field: 'telephoneNum',
                    title: '联系电话',
                    align: 'center',
                },
                {
                    field: 'shippingCost',
                    title: '运费单价',
                    align: 'center',
                },
                {
                    field: 'receivingCost',
                    title: '提货成本',
                    align: 'center',
                },
                {
                    field: 'transportCost',
                    title: '运输成本',
                    align: 'center',
                },
                {
                    field: 'deliveryCost',
                    title: '送货费',
                    align: 'center',
                },
                {
                    field: 'otherCost',
                    title: '其他费用',
                    align: 'center',
                },
                {
                    field: 'totalCost',
                    title: '总成本',
                    align: 'center',
                },

            ],columnObject={};commonColumns.forEach(c=>{if(c.field!='costStatus') columnObject[c.field]=''});
            let timeFormatter=(row, index )=>{
                return (new Date(row)).format();
            },
            refreshTable=()=>{
                $table.bootstrapTable('refresh');
            };


    function ajaxRequest(params) {
        formPost("/backend/costMaintainInfo/all",Object.assign(params.data,vuer.costSearchKeys)).then(v=>{
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
                    return res.content.filter(v=>v.costStatus!="可修改");
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
    export default{
        data(){
            return{
                searchKeys: searchKeys,
                title:'成本信息',
                costMaintainInfo:{
                    title:"添加成本信息",
                    id:"",
                    ...columnObject
                },
                cost:{
                    costMaintain:{
                    }
                }
            }
        },
        methods:{
            changeByDateRange(){
                refreshTable()
            },
            doReject(){
                try{
                    let selected=getSelections($table)[0];
                    post("backend/fundsApp/rejectCostStatus",{id:selected.id,costStatus:"可修改"}).then(v=>{
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
            doSubmit(){
                try{
                    let selected=getSelections($table)[0];
                    post("backend/fundsApp/submitCostStatus",{id:selected.id,costStatus:"已提交"}).then(v=>{
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
            }
        },
        computed:{
            costSearchKeys(){
                return this.orderNum?Object.assign({},searchKeys,{orderNum:this.orderNum}):searchKeys;
            },
            orderNum(){
                orderNum=this.$route.params.orderNum;
                return orderNum;
            }
        },
        mounted(){
            let namespace=this.$store.state.permissions;

            $modal=$("#costMaintainModal");
            router=this.$router;
            this.$parent.current.item="cost.costMaintain";
            vuer=this;
            initTable();
            this.cost.costMaintain=Object.assign({},this.cost.costMaintain,namespace.cost.costMaintain || {})

        }
    }
</script>
