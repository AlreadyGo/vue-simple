<template>
    <div id="fundsStatisticsPart">
        <v-header :title="title"></v-header>
        <div>
            <div class="row">
                <div class="col-lg-12">
                    <div class="panel panel-default">
                        <div class="panel-body">
                            <div id="toolbar">
                                <button id="dispatcher" class="btn btn-primary"   @click="doUpdate" v-if="fundsSum.fundsStatistics.save">
                                    <i class="glyphicon  glyphicon-edit"></i> 编辑
                                </button>
                                <select class="btn" style="bfundsStatistics: 1px solid #30a5ff;" v-model.number="searchKeys.dateRange" @change="changeByDateRange">
                                    <option value="1">最近一个月</option>
                                    <option value="3">最近三个月</option>
                                    <option value="6">最近半年</option>
                                    <option value="12">最近一年</option>
                                </select>
                            </div>
                            <table id="table"    data-show-refresh="true"  data-show-columns="true" data-search="true" data-select-item-name="toolbar1" data-pagination="true" data-sort-name="create_date" data-sort-fundsStatistics="desc"
                                   data-page-size="5" data-page-list="[5,10,20,50]"  data-toolbar="#toolbar" data-advanced-search="true" data-id-table="advancedTable"
                                   data-side-pagination="client" data-striped="true"
                            >
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <v-modal vmodal-id="fundsStatisticsModal" vmodal-labelledby="myModalLabel" :vmodal-title="fundsStatistics.title" :vmodal-submit="doCreateOrUpdate">
            <div class="fixed-height">
                <div class="form-group margin0" >
                    <label class="col-md-3 control-label" for="fundsStatistics-orderNum">订单号:</label>
                    <div class="col-md-9">
                        <input class="form-control" placeholder="订单号" id="fundsStatistics-orderNum" type="text"  v-model="fundsStatistics.orderNum" >
                    </div>
                </div>
                <div class="form-group margin0" >
                    <label class="col-md-3 control-label" for="fundsStatistics-paymentDate">付款日期:</label>
                    <div class="col-md-9">
                        <input class="form-control" placeholder="付款日期" id="fundsStatistics-paymentDate" type="text"  v-model="fundsStatistics.paymentDate" >
                    </div>
                </div>
                <div class="form-group margin0" >
                    <label class="col-md-3 control-label" for="fundsStatistics-discountNetting">回扣冲低:</label>
                    <div class="col-md-9">
                        <input class="form-control" placeholder="回扣冲低" id="fundsStatistics-discountNetting" type="text"  v-model="fundsStatistics.discountNetting" >
                    </div>
                </div>
                <div class="form-group margin0" >
                    <label class="col-md-3 control-label" for="fundsStatistics-paidTrunk">已付款:</label>
                    <div class="col-md-9">
                        <input class="form-control" placeholder="已付款" id="fundsStatistics-paidTrunk" type="text"  v-model="fundsStatistics.paidTrunk" >
                    </div>
                </div>
                <div class="form-group margin0" >
                    <label class="col-md-3 control-label" for="fundsStatistics-balancesTrunk">余额款:</label>
                    <div class="col-md-9">
                        <input class="form-control" placeholder="余额款" id="fundsStatistics-balancesTrunk" type="text"  v-model="fundsStatistics.balancesTrunk" >
                    </div>
                </div>
                <div class="form-group margin0" >
                    <label class="col-md-3 control-label" for="fundsStatistics-clearingForm">结算方式:</label>
                    <div class="col-md-9">
                        <input class="form-control" placeholder="结算方式" id="fundsStatistics-clearingForm" type="text"  v-model="fundsStatistics.clearingForm" >
                    </div>
                </div>
                <div class="form-group margin0" >
                    <label class="col-md-3 control-label" for="fundsStatistics-paidShort">已付款:</label>
                    <div class="col-md-9">
                        <input class="form-control" placeholder="已付款" id="fundsStatistics-paidShort" type="text"  v-model="fundsStatistics.paidShort" >
                    </div>
                </div>
                <div class="form-group margin0" >
                    <label class="col-md-3 control-label" for="fundsStatistics-balancesShort">余额款:</label>
                    <div class="col-md-9">
                        <input class="form-control" placeholder="余额款" id="fundsStatistics-balancesShort" type="text"  v-model="fundsStatistics.balancesShort" >
                    </div>
                </div>
                <div class="form-group margin0" >
                    <label class="col-md-3 control-label" for="fundsStatistics-rebateAmount">回扣金额:</label>
                    <div class="col-md-9">
                        <input class="form-control" placeholder="回扣金额" id="fundsStatistics-rebateAmount" type="text"  v-model="fundsStatistics.rebateAmount" >
                    </div>
                </div>
                <div class="form-group margin0" >
                    <label class="col-md-3 control-label" for="fundsStatistics-chargeSituation">收款情况:</label>
                    <div class="col-md-9">
                        <input class="form-control" placeholder="收款情况" id="fundsStatistics-chargeSituation" type="text"  v-model="fundsStatistics.chargeSituation" >
                    </div>
                </div>

            </div>
        </v-modal>
    </div>
</template>
<style>
</style>
<script>
    let $table,$modal,$uploadResultTable,$uploadResultModal,searchKeys={dateRange:3},
            commonColumns=[
                {
                    field: 'orderNum',
                    title: '订单号',
                    sortable: true,
                    align: 'center'
                },
                {
                    field: 'paymentDate',
                    title: '付款日期',
                    sortable: true,
                    align: 'center'
                },
                {
                    field: 'discountNetting',
                    title: '回扣冲低',
                    align: 'center'
                },
                {
                    field: 'paidTrunk',
                    title: '已付款',
                    align: 'center',
                },
                {
                    field: 'balancesTrunk',
                    title: '余额款',
                    align: 'center',
                },
                {
                    field: 'clearingForm',
                    title: '结算方式',
                    align: 'center',
                },
                {
                    field: 'paidShort',
                    title: '已付款',
                    align: 'center',
                },
                {
                    field: 'balancesShort',
                    title: '余额款',
                    align: 'center',
                },
                {
                    field: 'rebateAmount',
                    title: '回扣金额',
                    align: 'center',
                },
                {
                    field: 'chargeSituation',
                    title: '收款情况',
                    align: 'center',
                },

            ],columnObject={};commonColumns.forEach(c=>{columnObject[c.field]=''});
    let timeFormatter=(row, index )=>{
                return (new Date(row)).format();
            },
            refreshTable=()=>{
                $table.bootstrapTable('refresh');
            },
            statusStyle= (value, row, index, field)=> {
                return {
                    classes: '',
                    css: {"color": value=="失败"?"red":""}
                };
            }
    function ajaxRequest(params) {
        formPost("/backend/fundsStatistics/all",Object.assign(params.data,searchKeys)).then(v=>{
            params.success(v)
        }).catch(e=>{
            alertify.error(e.message)
        })
    }
    function ajaxUploadResultRequest(params) {
        formPost("/backend/uploadResult/view/ORDER",Object.assign(params.data,searchKeys)).then(v=>{
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
                    {
                        field: 'createDate',
                        title: '创建时间',
                        sortable: true,
                        align: 'center',
                        formatter: timeFormatter,
                    },
                    ...commonColumns,
                ]
            ],
            onLoadSuccess: function(){

            },
            onLoadError: function(){

            }
        });
    };
    let initUploadResultTable=()=>{
        $uploadResultTable=$("#uploadResultTable")
        $uploadResultTable.bootstrapTable({
            ajax: ajaxUploadResultRequest,
            columns: [
                [{
                    field: 'status',
                    title: '状态',
                    align: 'center',
                    sortable: true,
                    cellStyle:statusStyle
                },
                    {
                        field: 'createDate',
                        title: '导入时间',
                        align: 'center',
                        formatter: timeFormatter,
                        sortable: true,
                    },
                    ...commonColumns
                ]
            ],
        });
    };
    export default{
        data(){
            return{
                searchKeys: searchKeys,
                title:'资金统计信息',
                fundsStatistics:{
                    title:"添加订单信息",
                    id:"",
                    ...columnObject
                },
                fundsSum:{
                    fundsStatistics:{
                        'all':false,
                        'save':false,
                        'delete':false,
                    }
                }
            }
        },
        methods:{
            changeByDateRange(){
                refreshTable()
            },
            doCreateOrUpdate(){
                post("/backend/fundsStatistics/save",this.fundsStatistics).then(v=>{
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
            doUpdate(){
                try{
                    let arr=getSelections($table);
                    let el={...arr[0],title:'修改订单信息'};
                    Object.assign(this.fundsStatistics,el);
                    $modal.modal("show");
                }catch(e){
                    alertify.error(e.message)
                }
            },
        },
        mounted(){
            let namespace=this.$store.state.permissions;
            $modal=$("#fundsStatisticsModal");
            $uploadResultModal=$("#uploadResultModal");
            initTable();
            initUploadResultTable();
            Object.assign(this.fundsSum.fundsStatistics,namespace.fundsSum.fundsStatistics || {})
        }
    }
</script>
