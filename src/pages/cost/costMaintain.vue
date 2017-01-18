<template>
    <div id="costMaintainPart">
        <v-header :title="title"></v-header>
        <div>
            <div class="row">
                <div class="col-lg-12">
                    <div class="panel panel-default">
                        <div class="panel-body">
                            <div id="toolbar">
                                <button id="dispatcher" class="btn btn-primary"   @click="doUpdate">
                                    <i class="glyphicon  glyphicon-edit"></i> 编辑
                                </button>
                                <button  class="btn btn-info"  @click="doViewAll">
                                    <i class="glyphicon  glyphicon-eye-open"></i> 全部信息
                                </button>

                                <button  class="btn btn-danger" @click="doDelete">
                                    <i class="glyphicon  glyphicon-remove"></i> 删除
                                </button>
                                <select class="btn" style="bcostMaintainInfo: 1px solid #30a5ff;" v-model.number="searchKeys.dateRange" @change="changeByDateRange">
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
        <v-modal vmodal-id="costMaintainModal" vmodal-labelledby="myModalLabel" :vmodal-title="costMaintainInfo.title" :vmodal-submit="doCreateOrUpdate">
            <div class="fixed-height">
                <div class="form-group margin0" >
                    <label class="col-md-3 control-label">订单号:</label>
                    <div class="col-md-9">
                        <label class="form-control">{{costMaintainInfo.orderNum}}</label>
                    </div>
                </div>
                <div class="form-group margin0" >
                    <label class="col-md-3 control-label" for="costMaintainInfo-transportWay">运输方式:</label>
                    <div class="col-md-9">
                        <input class="form-control" placeholder="运输方式" id="costMaintainInfo-transportWay" type="text"  v-model="costMaintainInfo.transportWay" >
                    </div>
                </div>
                <div class="form-group margin0" >
                    <label class="col-md-3 control-label" for="costMaintainInfo-receivingWay">提货方式:</label>
                    <div class="col-md-9">
                        <input class="form-control" placeholder="提货方式" id="costMaintainInfo-receivingWay" type="text"  v-model="costMaintainInfo.receivingWay" >
                    </div>
                </div>
                <div class="form-group margin0" >
                    <label class="col-md-3 control-label" for="costMaintainInfo-driverName">承运司机:</label>
                    <div class="col-md-9">
                        <input class="form-control" placeholder="承运司机" id="costMaintainInfo-driverName" type="text"  v-model="costMaintainInfo.driverName" >
                    </div>
                </div>
                <div class="form-group margin0" >
                    <label class="col-md-3 control-label" for="costMaintainInfo-carType">车型:</label>
                    <div class="col-md-9">
                        <input class="form-control" placeholder="车型" id="costMaintainInfo-carType" type="text"  v-model="costMaintainInfo.carType" >
                    </div>
                </div>
                <div class="form-group margin0" >
                    <label class="col-md-3 control-label" for="costMaintainInfo-carRental">租车费用:</label>
                    <div class="col-md-9">
                        <input class="form-control" placeholder="租车费用" id="costMaintainInfo-carRental" type="text"  v-model.number="costMaintainInfo.carRental" >
                    </div>
                </div>
                <div class="form-group margin0" >
                    <label class="col-md-3 control-label" for="costMaintainInfo-deliveryManName">承运商:</label>
                    <div class="col-md-9">
                        <input class="form-control" placeholder="承运商" id="costMaintainInfo-deliveryManName" type="text"  v-model="costMaintainInfo.deliveryManName" >
                    </div>
                </div>
                <div class="form-group margin0" >
                    <label class="col-md-3 control-label" for="costMaintainInfo-expressNumber">物流单号:</label>
                    <div class="col-md-9">
                        <input class="form-control" placeholder="物流单号" id="costMaintainInfo-expressNumber" type="text"  v-model="costMaintainInfo.expressNumber" >
                    </div>
                </div>
                <div class="form-group margin0" >
                    <label class="col-md-3 control-label" for="costMaintainInfo-telephoneNum">联系电话:</label>
                    <div class="col-md-9">
                        <input class="form-control" placeholder="联系电话" id="costMaintainInfo-telephoneNum" type="text"  v-model="costMaintainInfo.telephoneNum" >
                    </div>
                </div>
                <div class="form-group margin0" >
                    <label class="col-md-3 control-label" for="costMaintainInfo-shippingCost">运费单价:</label>
                    <div class="col-md-9">
                        <input class="form-control" placeholder="运费单价" id="costMaintainInfo-shippingCost" type="text"  v-model.number="costMaintainInfo.shippingCost" >
                    </div>
                </div>
                <div class="form-group margin0" >
                    <label class="col-md-3 control-label" for="costMaintainInfo-receivingCost">提货成本:</label>
                    <div class="col-md-9">
                        <input class="form-control" placeholder="提货成本" id="costMaintainInfo-receivingCost" type="text"  v-model.number="costMaintainInfo.receivingCost" >
                    </div>
                </div>
                <div class="form-group margin0" >
                    <label class="col-md-3 control-label" for="costMaintainInfo-transportCost">运输成本:</label>
                    <div class="col-md-9">
                        <input class="form-control" placeholder="运输成本" id="costMaintainInfo-transportCost" type="text"  v-model.number="costMaintainInfo.transportCost" >
                    </div>
                </div>
                <div class="form-group margin0" >
                    <label class="col-md-3 control-label" for="costMaintainInfo-deliveryCost">送货费:</label>
                    <div class="col-md-9">
                        <input class="form-control" placeholder="送货费" id="costMaintainInfo-deliveryCost" type="text"  v-model.number="costMaintainInfo.deliveryCost" >
                    </div>
                </div>
                <div class="form-group margin0" >
                    <label class="col-md-3 control-label" for="costMaintainInfo-otherCost">其他费用:</label>
                    <div class="col-md-9">
                        <input class="form-control" placeholder="其他费用" id="costMaintainInfo-otherCost" type="text"  v-model.number="costMaintainInfo.otherCost" >
                    </div>
                </div>
                <div class="form-group margin0" >
                    <label class="col-md-3 control-label" for="costMaintainInfo-totalCost">总成本:</label>
                    <div class="col-md-9">
                        <label class="form-control"  id="costMaintainInfo-totalCost" >{{totalCost}}</label>
                    </div>
                </div>

            </div>
        </v-modal>
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

            ],columnObject={};commonColumns.forEach(c=>{columnObject[c.field]=''});
    let timeFormatter=(row, index )=>{
                return (new Date(row)).format("yyyy-MM-dd hh:mm:ss");
            },
            refreshTable=()=>{
                $table.bootstrapTable('refresh');
            },
            getSelections=()=>{
                let selections=$table.bootstrapTable('getSelections');
                if(selections.length===0) throw new Error("个数不能为0")
                return selections;
            },
            statusStyle= (value, row, index, field)=> {
                return {
                    classes: '',
                    css: {"color": value=="失败"?"red":""}
                };
            }


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
                        alertify.confirm("提示信息","该订单尚未创建成本,是否立即创建",
                                function(){
                                    timeout(500).then(()=>{
                                        vuer.doCreate();
                                        vuer.costMaintainInfo.orderNum=orderNum;
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
            }
        },
        methods:{
            doViewAll(){
                this.$router.replace({path:'/main/cost/costMaintain'});
                refreshTable()
            },
            changeByDateRange(){
                refreshTable()
            },
            doCheck(){
                let arr=getSelections();
                if(arr.length>1){
                    throw new Error("操作错误");
                }else if(arr.length===0){
                    throw new Error("只能选择一条信息");
                }
                return arr;
            },
            doCreateOrUpdate(){
                post("/backend/costMaintainInfo/save",this.costMaintainInfo).then(v=>{
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
                $.each(Object.keys(this.costMaintainInfo),(index,v)=>{this.costMaintainInfo[v]=''})
                this.costMaintainInfo.title="添加成本信息";
                $modal.modal("show");
            },
            doUpdate(){
                try{
                    let arr=this.doCheck();
                    let el={...arr[0],title:'修改成本信息'};
                    Object.assign(this.costMaintainInfo,el);
                    $modal.modal("show");
                }catch(e){
                    alertify.error(e.message)
                }
            },
            doDelete(){
                try{
                    let arr=this.doCheck();if(!arr) return;
                    post("/backend/costMaintainInfo/delete/"+(arr[0].id)).
                    then(body=>{
                        if(body && body.status==0){
                            alertify.success(body.message);
                            $table.bootstrapTable('refresh');
                        }else{
                            throw new Error(body.message);
                        }
                    }).catch(()=>{
                        alertify.success("删除失败");
                    })
                }catch(e){
                    alertify.error(e.message)
                }
            }
        },
        computed:{
            totalCost(){
                let cost=this.costMaintainInfo;
                cost.totalCost= (parseFloat(cost.carRental) || 0)+(parseFloat(cost.receivingCost) || 0)+(parseFloat(cost.transportCost) || 0)+(parseFloat(cost.deliveryCost) || 0)+(parseFloat(cost.otherCost) || 0)+(parseFloat(cost.shippingCost) || 0);
                return cost.totalCost;
            },
            costSearchKeys(){
                return this.orderNum?Object.assign({},searchKeys,{orderNum:this.orderNum}):searchKeys;
            },
            orderNum(){
                orderNum=this.$route.params.orderNum;
                return orderNum;
            }
        },
        mounted(){
            $modal=$("#costMaintainModal");
            router=this.$router;
            vuer=this;
            initTable();
        }
    }
</script>
