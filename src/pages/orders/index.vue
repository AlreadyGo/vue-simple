<template>
    <div id="orderInfoPart">
        <v-header :title="title"></v-header>
        <div>
            <div class="row">
                <div class="col-lg-12">
                    <div class="panel panel-default">
                        <div class="panel-body">
                            <div id="toolbar">
                                <button id="dispatcher" class="btn btn-primary"   @click="doUpdate" v-if="orders.order.save">
                                    <i class="glyphicon  glyphicon-edit"></i> 编辑
                                </button>
                                <button  class="btn btn-info"  @click="doCreate" v-if="orders.order.save">
                                    <i class="glyphicon  glyphicon-plus"></i> 添加
                                </button>
                                <label class="btn btn-primary" v-if="orders.order.upload">
                                    上传 <input type="file" style="display: none;" id="orderInfo-upload" accept=".xls?" multiple>
                                </label>
                                <button  class="btn btn-danger" @click="doDelete" v-if="orders.order.delete">
                                    <i class="glyphicon  glyphicon-remove"></i> 删除
                                </button>
                                <button  class="btn btn-info"  @click="ViewUploadResult" v-if="orders.order.view">
                                    <i class="glyphicon glyphicon-eye-open"></i> 上传一览
                                </button>
                                <select class="btn" style="border: 1px solid #30a5ff;" v-model.number="searchKeys.dateRange" @change="changeByDateRange">
                                    <option value="1">最近一个月</option>
                                    <option value="3">最近三个月</option>
                                    <option value="6">最近半年</option>
                                    <option value="12">最近一年</option>
                                </select>
                            </div>
                            <table id="table"    data-show-refresh="true" data-show-columns="true" data-search="true" data-select-item-name="toolbar1" data-pagination="true" data-sort-name="create_date" data-sort-orderInfo="desc"
                                   data-page-size="5" data-page-list="[5,10,20,50]"  data-toolbar="#toolbar" data-advanced-search="true" data-id-table="advancedTable"
                                   data-side-pagination="client" data-striped="true"
                            >
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <v-modal vmodal-id="orderInfoModal" vmodal-labelledby="myModalLabel" :vmodal-title="orderInfo.title" :vmodal-submit="doCreateOrUpdate">
            <div class="fixed-height">
                <div class="form-group margin0" >
                    <label class="col-md-3 control-label" for="orderInfo-sendDate">发货日期:</label>
                    <div class="col-md-9">
                        <input class="form-control" placeholder="发货日期" id="orderInfo-sendDate" type="text"  v-model="orderInfo.sendDate" >
                    </div>
                </div>
                <div class="form-group margin0" >
                    <label class="col-md-3 control-label" for="orderInfo-customerCode">客户编号:</label>
                    <div class="col-md-9">
                        <input class="form-control" placeholder="客户编号" id="orderInfo-customerCode" type="text"  v-model="orderInfo.customerCode" >
                    </div>
                </div>
                <div class="form-group margin0" >
                    <label class="col-md-3 control-label" for="orderInfo-sender">发货单位:</label>
                    <div class="col-md-9">
                        <input class="form-control" placeholder="发货单位" id="orderInfo-sender" type="text"  v-model="orderInfo.sender" >
                    </div>
                </div>
                <div class="form-group margin0" >
                    <label class="col-md-3 control-label" for="orderInfo-orderNum">订单号:</label>
                    <div class="col-md-9">
                        <input class="form-control" placeholder="订单号" id="orderInfo-orderNum" type="text"  v-model="orderInfo.orderNum" :disabled="!!orderInfo.id">
                    </div>
                </div>
                <div class="form-group margin0" >
                    <label class="col-md-3 control-label" for="orderInfo-originAddress">提货地址:</label>
                    <div class="col-md-9">
                        <input class="form-control" placeholder="提货地址" id="orderInfo-originAddress" type="text"  v-model="orderInfo.originAddress" >
                    </div>
                </div>
                <div class="form-group margin0" >
                    <label class="col-md-3 control-label" for="orderInfo-destinationCity">送货城市:</label>
                    <div class="col-md-9">
                        <input class="form-control" placeholder="送货城市" id="orderInfo-destinationCity" type="text"  v-model="orderInfo.destinationCity" >
                    </div>
                </div>
                <div class="form-group margin0" >
                    <label class="col-md-3 control-label" for="orderInfo-receiverCom">收货客户:</label>
                    <div class="col-md-9">
                        <input class="form-control" placeholder="收货客户" id="orderInfo-receiverCom" type="text"  v-model="orderInfo.receiverCom" >
                    </div>
                </div>
                <div class="form-group margin0" >
                    <label class="col-md-3 control-label" for="orderInfo-receiverPerson">收货人:</label>
                    <div class="col-md-9">
                        <input class="form-control" placeholder="收货人" id="orderInfo-receiverPerson" type="text"  v-model="orderInfo.receiverPerson" >
                    </div>
                </div>
                <div class="form-group margin0" >
                    <label class="col-md-3 control-label" for="orderInfo-telephoneNum">联系电话:</label>
                    <div class="col-md-9">
                        <input class="form-control" placeholder="联系电话" id="orderInfo-telephoneNum" type="text"  v-model="orderInfo.telephoneNum" >
                    </div>
                </div>
                <div class="form-group margin0" >
                    <label class="col-md-3 control-label" for="orderInfo-destinationAddress">送货地址:</label>
                    <div class="col-md-9">
                        <input class="form-control" placeholder="送货地址" id="orderInfo-destinationAddress" type="text"  v-model="orderInfo.destinationAddress" >
                    </div>
                </div>
                <div class="form-group margin0" >
                    <label class="col-md-3 control-label" for="orderInfo-productName">产品名称:</label>
                    <div class="col-md-9">
                        <input class="form-control" placeholder="产品名称" id="orderInfo-productName" type="text"  v-model="orderInfo.productName" >
                    </div>
                </div>
                <div class="form-group margin0" >
                    <label class="col-md-3 control-label" for="orderInfo-wrap">包装:</label>
                    <div class="col-md-9">
                        <input class="form-control" placeholder="包装" id="orderInfo-wrap" type="text"  v-model="orderInfo.wrap" >
                    </div>
                </div>
                <div class="form-group margin0" >
                    <label class="col-md-3 control-label" for="orderInfo-count">数量:</label>
                    <div class="col-md-9">
                        <input class="form-control" placeholder="数量" id="orderInfo-count" type="number"  v-model="orderInfo.count" >
                    </div>
                </div>
                <div class="form-group margin0" >
                    <label class="col-md-3 control-label" for="orderInfo-weight">重量:</label>
                    <div class="col-md-9">
                        <input class="form-control" placeholder="重量" id="orderInfo-weight" type="number"  v-model="orderInfo.weight" >
                    </div>
                </div>
                <div class="form-group margin0" >
                    <label class="col-md-3 control-label" for="orderInfo-volume">体积:</label>
                    <div class="col-md-9">
                        <input class="form-control" placeholder="体积" id="orderInfo-volume" type="number"  v-model="orderInfo.volume" >
                    </div>
                </div>
                <div class="form-group margin0" >
                    <label class="col-md-3 control-label" for="orderInfo-receiveDate">到货日期:</label>
                    <div class="col-md-9">
                        <input class="form-control" placeholder="到货日期" id="orderInfo-receiveDate" type="text"  v-model="orderInfo.receiveDate" >
                    </div>
                </div>
                <div class="form-group margin0" >
                    <label class="col-md-3 control-label" for="orderInfo-settleWay">结算方式:</label>
                    <div class="col-md-9">
                        <input class="form-control" placeholder="结算方式" id="orderInfo-settleWay" type="text"  v-model="orderInfo.settleWay" >
                    </div>
                </div>
                <div class="form-group margin0" >
                    <label class="col-md-3 control-label" for="orderInfo-amount">金额:</label>
                    <div class="col-md-9">
                        <input class="form-control" placeholder="金额" id="orderInfo-amount" type="number"  v-model="orderInfo.amount" >
                    </div>
                </div>
            </div>
        </v-modal>
        <div class="modal fade" id="uploadResultModal" tabindex="-1" role="dialog" aria-labelledby="uploadResultModalLabel" aria-hidden="true">
            <div class="modal-dialog modal-lg">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span></button>
                        <h4 class="modal-title">上传一览</h4>
                    </div>
                    <div class="modal-body">
                        <table id="uploadResultTable"  data-pagination="true"  data-sort-orderInfo="desc" data-sort-name="create_date"
                               data-page-size="10"
                               data-side-pagination="client" data-striped="true"
                               data-height="400"
                        >
                        </table>
                    </div>
                </div><!-- /.modal-content -->
            </div><!-- /.modal-dialog -->
        </div><!-- /.modal -->

        <div class="modal" id="accountModal" tabindex="-1" role="dialog" aria-labelledby="accountModalLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                        <h4 class="modal-title text-center" id="accountModalLabel">{{account.title}}</h4>
                    </div>
                    <div class="modal-body">
                        <form class="form-horizontal" @submit.prevent="doAccountCreateOrUpdate">
                            <fieldset>
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
                                            <input class="form-control" placeholder="结算标准量" id="account-measure" type="number"  v-model.trim="account.measure" :disabled='!isAccountModified'>
                                        </div>
                                    </div>
                                    <div class="form-group margin0">
                                        <label class="col-md-3 control-label" for="account-price">收入单价:</label>
                                        <div class="col-md-9">
                                            <input class="form-control" placeholder="收入单价" id="account-price" type="number"  v-model.trim.number="account.price" :disabled='!isAccountModified'>
                                        </div>
                                    </div>
                                    <div class="form-group margin0">
                                        <label class="col-md-3 control-label" for="account-freight">运费收入:</label>
                                        <div class="col-md-9">
                                            <input class="form-control" placeholder="运费收入" id="account-freight" type="number"  v-model.trim.number="account.freight" :disabled='!isAccountModified'>
                                        </div>
                                    </div>
                                    <div class="form-group margin0">
                                        <label class="col-md-3 control-label" for="account-ladingCost">提货费:</label>
                                        <div class="col-md-9">
                                            <input class="form-control" placeholder="提货费" id="account-ladingCost" type="number"  v-model.trim.number="account.ladingCost" :disabled='!isAccountModified'>
                                        </div>
                                    </div>
                                    <div class="form-group margin0">
                                        <label class="col-md-3 control-label" for="account-deliveryCost">送货费:</label>
                                        <div class="col-md-9">
                                            <input class="form-control" placeholder="送货费" id="account-deliveryCost" type="number"  v-model.trim.number="account.deliveryCost" :disabled='!isAccountModified'>
                                        </div>
                                    </div>
                                    <div class="form-group margin0">
                                        <label class="col-md-3 control-label" for="account-otherCost">其他费用:</label>
                                        <div class="col-md-9">
                                            <input class="form-control" placeholder="其他费用" id="account-otherCost" type="number"  v-model.trim.number="account.otherCost" :disabled='!isAccountModified'>
                                        </div>
                                    </div>
                                    <div class="form-group margin0">
                                        <label class="col-md-3 control-label" for="account-sum">合计收入:</label>
                                        <div class="col-md-9">
                                            <label class="form-control"  id="account-sum"  >{{accountSum}}</label>
                                        </div>
                                    </div>
                                </div>
                            </fieldset>
                            <div class="modal-footer">
                                <button type="submit" class="btn btn-success" @click="isAccountSubmit=false" v-show="isAccountModified">保存</button>
                                <button type="submit" class="btn btn-primary" @click="isAccountSubmit=true" v-show="isAccountModified">提交</button>
                            </div>
                        </form>
                    </div>
                </div><!-- /.modal-content -->
            </div><!-- /.modal -->
        </div>

        <div class="modal" id="costMaintainModal" tabindex="-1" role="dialog" aria-labelledby="costLabelledby" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                        <h4 class="modal-title text-center" id="costLabelledby">{{costMaintainInfo.title}}</h4>
                    </div>
                    <div class="modal-body">
                        <form class="form-horizontal" @submit.prevent="doCostCreateOrUpdate">
                            <fieldset>
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
                                            <input class="form-control" placeholder="运输方式" id="costMaintainInfo-transportWay" type="text"  v-model="costMaintainInfo.transportWay" :disabled="!isCostModified">
                                        </div>
                                    </div>
                                    <div class="form-group margin0" >
                                        <label class="col-md-3 control-label" for="costMaintainInfo-receivingWay">提货方式:</label>
                                        <div class="col-md-9">
                                            <input class="form-control" placeholder="提货方式" id="costMaintainInfo-receivingWay" type="text"  v-model="costMaintainInfo.receivingWay" :disabled="!isCostModified">
                                        </div>
                                    </div>
                                    <div class="form-group margin0" >
                                        <label class="col-md-3 control-label" for="costMaintainInfo-driverName">承运司机:</label>
                                        <div class="col-md-9">
                                            <input class="form-control" placeholder="承运司机" id="costMaintainInfo-driverName" type="text"  v-model="costMaintainInfo.driverName" :disabled="!isCostModified">
                                        </div>
                                    </div>
                                    <div class="form-group margin0" >
                                        <label class="col-md-3 control-label" for="costMaintainInfo-carType">车型:</label>
                                        <div class="col-md-9">
                                            <input class="form-control" placeholder="车型" id="costMaintainInfo-carType" type="text"  v-model="costMaintainInfo.carType" :disabled="!isCostModified">
                                        </div>
                                    </div>
                                    <div class="form-group margin0" >
                                        <label class="col-md-3 control-label" for="costMaintainInfo-carRental">租车费用:</label>
                                        <div class="col-md-9">
                                            <input class="form-control" placeholder="租车费用" id="costMaintainInfo-carRental" type="number"  v-model.number="costMaintainInfo.carRental" :disabled="!isCostModified">
                                        </div>
                                    </div>
                                    <div class="form-group margin0" >
                                        <label class="col-md-3 control-label" for="costMaintainInfo-deliveryManName">承运商:</label>
                                        <div class="col-md-9">
                                            <input class="form-control" placeholder="承运商" id="costMaintainInfo-deliveryManName" type="text"  v-model="costMaintainInfo.deliveryManName" :disabled="!isCostModified">
                                        </div>
                                    </div>
                                    <div class="form-group margin0" >
                                        <label class="col-md-3 control-label" for="costMaintainInfo-expressNumber">物流单号:</label>
                                        <div class="col-md-9">
                                            <input class="form-control" placeholder="物流单号" id="costMaintainInfo-expressNumber" type="text"  v-model="costMaintainInfo.expressNumber" :disabled="!isCostModified">
                                        </div>
                                    </div>
                                    <div class="form-group margin0" >
                                        <label class="col-md-3 control-label" for="costMaintainInfo-telephoneNum">联系电话:</label>
                                        <div class="col-md-9">
                                            <input class="form-control" placeholder="联系电话" id="costMaintainInfo-telephoneNum" type="text"  v-model="costMaintainInfo.telephoneNum" :disabled="!isCostModified">
                                        </div>
                                    </div>
                                    <div class="form-group margin0" >
                                        <label class="col-md-3 control-label" for="costMaintainInfo-shippingCost">运费单价:</label>
                                        <div class="col-md-9">
                                            <input class="form-control" placeholder="运费单价" id="costMaintainInfo-shippingCost" type="number"  v-model.number="costMaintainInfo.shippingCost" :disabled="!isCostModified">
                                        </div>
                                    </div>
                                    <div class="form-group margin0" >
                                        <label class="col-md-3 control-label" for="costMaintainInfo-receivingCost">提货成本:</label>
                                        <div class="col-md-9">
                                            <input class="form-control" placeholder="提货成本" id="costMaintainInfo-receivingCost" type="number"  v-model.number="costMaintainInfo.receivingCost" :disabled="!isCostModified">
                                        </div>
                                    </div>
                                    <div class="form-group margin0" >
                                        <label class="col-md-3 control-label" for="costMaintainInfo-transportCost">运输成本:</label>
                                        <div class="col-md-9">
                                            <input class="form-control" placeholder="运输成本" id="costMaintainInfo-transportCost" type="number"  v-model.number="costMaintainInfo.transportCost" :disabled="!isCostModified">
                                        </div>
                                    </div>
                                    <div class="form-group margin0" >
                                        <label class="col-md-3 control-label" for="costMaintainInfo-deliveryCost">送货费:</label>
                                        <div class="col-md-9">
                                            <input class="form-control" placeholder="送货费" id="costMaintainInfo-deliveryCost" type="number"  v-model.number="costMaintainInfo.deliveryCost" :disabled="!isCostModified">
                                        </div>
                                    </div>
                                    <div class="form-group margin0" >
                                        <label class="col-md-3 control-label" for="costMaintainInfo-otherCost">其他费用:</label>
                                        <div class="col-md-9">
                                            <input class="form-control" placeholder="其他费用" id="costMaintainInfo-otherCost" type="number"  v-model.number="costMaintainInfo.otherCost" :disabled="!isCostModified">
                                        </div>
                                    </div>
                                    <div class="form-group margin0" >
                                        <label class="col-md-3 control-label" for="costMaintainInfo-totalCost">总成本:</label>
                                        <div class="col-md-9">
                                            <label class="form-control"  id="costMaintainInfo-totalCost" >{{totalCost}}</label>
                                        </div>
                                    </div>

                                </div>
                            </fieldset>
                            <div class="modal-footer">
                                <button type="submit" class="btn btn-success" @click="isCostSubmit=false" v-show="isCostModified">保存</button>
                                <button type="submit" class="btn btn-primary" @click="isCostSubmit=true" v-show="isCostModified">提交</button>
                            </div>
                        </form>
                    </div>
                </div><!-- /.modal-content -->
            </div><!-- /.modal -->
        </div>
    </div>
</template>
<style>
</style>
<script>
    let $table,$accountModal,$costModal,$modal,$uploadResultTable,$uploadResultModal,searchKeys={dateRange:3},router,vuer,orderNum,
    commonColumns=[
    {
        field: 'sendDate',
        title: '发货日期',
        sortable: true,
        align: 'center'
    },
    {
        field: 'customerCode',
        title: '客户编号',
        align: 'center'
    },
    {
        field: 'sender',
        title: '发货单位',
        align: 'center',
    },
    {
        field: 'orderNum',
        title: '客户订单号',
        align: 'center',
    },
    {
        field: 'originAddress',
        title: '提货地址',
        align: 'center',
    },
    {
        field: 'destinationCity',
        title: '送货城市',
        align: 'center',
    },
    {
        field: 'receiverCom',
        title: '收货客户',
        align: 'center',
    },
    {
        field: 'receiverPerson',
        title: '收货人',
        align: 'center',
    },
    {
        field: 'telephoneNum',
        title: '联系电话',
        align: 'center',
    },
    {
        field: 'destinationAddress',
        title: '送货地址',
        align: 'center',
    },
    {
        field: 'productName',
        title: '产品名称',
        align: 'center',
    },
    {
        field: 'wrap',
        title: '包装',
        align: 'center',
    },
    {
        field: 'count',
        title: '数量',
        align: 'center',
    },
    {
        field: 'weight',
        title: '重量',
        align: 'center',
    },
    {
        field: 'volume',
        title: '体积',
        align: 'center',
    },
    {
        field: 'receiveDate',
        title: '到货日期',
        align: 'center',
    },
    {
        field: 'settleWay',
        title: '结算方式',
        align: 'center',
    },
    {
        field: 'amount',
        title: '金额',
        align: 'center',
    },
    ],columnObject={};commonColumns.forEach(c=>{columnObject[c.field]=''});
    let accountsCommonColumns=[
        {
            field: 'orderNum',
            title: '订单号',
            sortable: true,
            align: 'center',
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
            field: 'sum',
            title: '合计收入',
            sortable: true,
            align: 'center'
        },
    ],accountsColumnObject={};accountsCommonColumns.forEach(c=>{accountsColumnObject[c.field]=''});
   let costCommonColumns=[
        {
            field: 'orderNum',
            title: '订单号',
            sortable: true,
            align: 'center',
//            formatter:orderNumFormatter,
//            events:orderNumEvents
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

    ],costColumnObject={};costCommonColumns.forEach(c=>{if(c.field!='costStatus') costColumnObject[c.field]=''});
    let operateEvents = {
        'click .accounts': function (e, value, row, index) {
//            router.push({ path: `/main/accounts/${row.orderNum}` })
            let orderNum=row.orderNum;
            formPost('/backend/account/all',{orderNum:orderNum}).then(({content,status,message})=>{
                if(status===0){
                    vuer.doAccountCreate();
                    if(content && content.length==1){
                        let o=content[0];
                        Object.assign(vuer.account,o);
                        vuer.isAccountModified=o.accountStatus==="可修改"?true:false;
                    }else if(content.length>0){
                        throw new Error(message);
                    }
                    vuer.account.orderNum=orderNum;
                }else{
                    throw new Error(message);
                }
            }).catch(e=>{
                alertify.error(e.message)
            })


        },
        'click .cost': function (e, value, row, index) {
//            router.push({ path: `/main/cost/costMaintain/${row.orderNum}` })      costMaintainInfo
            let orderNum=row.orderNum;
            formPost('/backend/costMaintainInfo/all',{orderNum:orderNum}).then(({content,status,message})=>{
                if(status===0){
                    vuer.doCostCreate();
                    if(content && content.length==1){
                        let o=content[0];
                        Object.assign(vuer.costMaintainInfo,o);
                        vuer.isCostModified=o.costStatus==="可修改"?true:false;
                    }else if(content.length>0){
                        throw new Error(message);
                    }
                    vuer.costMaintainInfo.orderNum=orderNum;
                }else{
                    throw new Error(message);
                }
               }
            ).catch(e=>{
                alertify.error(e.message)
            })

        }
    },
    operateFormatter=(value, row, index)=>{
        return [
            `<a class="accounts" href="javascript:void(0)" title="结算">
                <i class="glyphicon glyphicon-saved"></i>
             </a>`,
            `<a class="cost" href="javascript:void(0)" title="成本">
               <i class="glyphicon glyphicon-usd"></i>
             </a>`
        ].join('');
    }

    let timeFormatter=(row, index )=>{
        return (new Date(row)).format("yyyy-MM-dd hh:mm:ss");
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
    $(document).on('change', '#orderInfo-upload', function() {
            let $this=$(this),files=$this.get(0).files;
            let body = new FormData();
            try{
                $.each(files,(i,file)=>{
                    if(!excelReg.test(file.name)){
                        throw new Error("上传文件格式不正确");
                    }
                    body.append('file[]', file);
                })
                upload('/backend/orderInfo/upload',body).then(v=>{
                    $this.val("");
                    if(v && v.status===0){
                        alertify.success(v.message);
                        refreshTable();
                    }else{
                        throw new Error(v.message)
                    }

                }).catch(error=>{
                    alertify.error(error.message);
                })
            }catch(error){
                alertify.error(error.message);
            }
    });
    function ajaxRequest(params) {
        formPost("/backend/orderInfo/all",Object.assign(params.data,vuer.searchKeys)).then(v=>{
             params.success(v)
        }).catch(e=>{
            alertify.error(e.message)
        })
    }
    function ajaxUploadResultRequest(params) {
        formPost("/backend/uploadResult/view/ORDER",Object.assign(params.data,vuer.searchKeys)).then(v=>{
             params.success(v)
        }).catch(e=>{
            alertify.error(e.message)
        })
    }
    let initTable=()=>{
              $table=$("#table")
              $table.bootstrapTable({
                 ajax: ajaxRequest,
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
                        field: 'operate',
                        title: '订单操作',
                        align: 'center',
                        events: operateEvents,
                        formatter: operateFormatter
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
                  {
                      field: 'errorReason',
                      title: '错误原因',
                      align: 'center',
                  },
                  ...commonColumns
                  ]
          ],
      });
    };
    export default{
        data(){
            return{
                isAccountSubmit:false,
                isCostSubmit:false,
                isAccountModified:true,
                isCostModified:true,
                title:'订单信息',
                orderInfo:{
                    title:"添加订单信息",
                    id:"",
                    ...columnObject
                },
                account:{
                    title:"",
                    id:"",
                    ...accountsColumnObject
                },
                costMaintainInfo:{
                    title:"",
                    id:"",
                    ...costColumnObject
                },
                orders:{
                    order:{
                        'all':false,
                        'save':false,
                        'upload':false,
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
                post("/backend/orderInfo/save",this.orderInfo).then(v=>{
                    if(v.status==0){
                        alertify.success(v.message);
                        $modal.modal("hide");
                        refreshTable();
                    }else{
                        throw new Error(v.message)
                    }
                }).catch(e=>{
                    alertify.error(e.message)
                })
            },
            doAccountCreateOrUpdate(){
                post("/backend/account/save",Object.assign(this.account,{accountStatus:(this.isAccountSubmit?"不可修改":"可修改")})).then(v=>{
                    if(v.status==0){
                        alertify.success(v.message);
                        $accountModal.modal("hide");
                        refreshTable();
                    }else{
                        throw new Error(v.message)
                    }
                }).catch(e=>{
                    alertify.error(e.message)
                })
            },
            doCostCreateOrUpdate(){
                post("/backend/costMaintainInfo/save",Object.assign(this.costMaintainInfo,{costStatus:(this.isCostSubmit?"待提交":"可修改")})).then(v=>{
                    if(v.status==0){
                        alertify.success(v.message);
                        $costModal.modal("hide");
                        refreshTable();
                    }else{
                        throw new Error(v.message)
                    }
                }).catch(e=>{
                    alertify.error(e.message)
                })
            },
            doCreate(){
                $.each(Object.keys(this.orderInfo),(index,v)=>{this.orderInfo[v]=''})
                this.orderInfo.title="添加订单信息";
                $modal.modal("show");
            },
            //结算弹框
            doAccountCreate(){
                $.each(Object.keys(this.account),(index,v)=>{this.account[v]=''})
                this.account.title="结算信息";
                $accountModal.modal("show");
            },
            doUpdate(){
                try{
                    let arr=getSelections($table);
                    let el={...arr[0],title:'修改订单信息'};
                    Object.assign(this.orderInfo,el);
                    $modal.modal("show");
                }catch(e){
                    alertify.error(e.message)
                }
            },
            //成本弹框
            doCostCreate(){
                $.each(Object.keys(this.costMaintainInfo),(index,v)=>{this.costMaintainInfo[v]=''})
                this.costMaintainInfo.title="成本信息";
                $costModal.modal("show");
            },

            doDelete(){
                alertify.confirm("提示信息","确定删除?",
                    function(){
                        try{
                            let arr=getSelections($table,true);
                            arr.forEach(s=>{
                                post(`/backend/orderInfo/delete/${s.id}`).
                                then(body=>{
                                    if(body && body.status==0){
                                    alertify.success(body.message);
                                    $table.bootstrapTable('refresh');
                                    }else{
                                        throw new Error(body.message);
                                    }
                                }).catch(error=>{
                                    alertify.error(error.message)
                                })
                            })
                        }catch(e){
                            alertify.error(e.message)
                        }
                    },
                    function(){}
                );
            }
        },
        computed:{
            accountSum(){
                let account=this.account;
                account.accountSum= (parseFloat(account.price) || 0)+(parseFloat(account.freight) || 0)+(parseFloat(account.ladingCost) || 0)+(parseFloat(account.deliveryCost) || 0)+(parseFloat(account.otherCost) || 0);
                return account.accountSum;
            },
            totalCost(){
                let cost=this.costMaintainInfo;
                cost.totalCost= (parseFloat(cost.carRental) || 0)+(parseFloat(cost.receivingCost) || 0)+(parseFloat(cost.transportCost) || 0)+(parseFloat(cost.deliveryCost) || 0)+(parseFloat(cost.otherCost) || 0)+(parseFloat(cost.shippingCost) || 0);
                return cost.totalCost;
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
            $modal=$("#orderInfoModal");
            $uploadResultModal=$("#uploadResultModal");
            $accountModal=$("#accountModal");
            $costModal=$("#costMaintainModal");
            router=this.$router;
            this.$parent.current.item="orders.order";
            vuer=this;
            let namespace=this.$store.state.permissions;
            Object.assign(this.orders.order,namespace.orders.order || {})
            initTable();
            initUploadResultTable();
        }
    }
</script>
