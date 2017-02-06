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
                                <button  class="btn btn-info"  @click="viewUploadResult" v-if="orders.order.view">
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
                <div class="form-group margin0" v-for="o in orderModalArray">
                    <label class="col-md-3 control-label" :for="'orderInfo-'+o.field">{{o.title}}:</label>
                    <div class="col-md-9">
                        <input class="form-control" v-if="o.mType==='text'"  :placeholder="o.title" :id="'orderInfo-'+o.field" type="text"  v-model="orderInfo[o.field]" >
                        <input class="form-control" v-else  :placeholder="o.title" :id="'orderInfo-'+o.field" type="number"  v-model="orderInfo[o.field]" >
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
                                    <div class="form-group margin0" v-for="c in accountModalArray">
                                        <label class="col-md-3 control-label" :for="'account-'+c.field">{{c.title}}:</label>
                                        <div class="col-md-9">
                                            <input class="form-control" v-if="c.mType==='number'" :placeholder="c.title" :id="'account-'+c.field" type="number"  v-model.number="account[c.field]" :disabled="!isAccountModified">
                                            <input class="form-control" v-else :placeholder="c.title" :id="'account-'+c.field" type="text"  v-model.number="account[c.field]" :disabled="!isAccountModified">
                                        </div>
                                    </div>
                                    <div class="form-group margin0">
                                        <label class="col-md-3 control-label" for="account-freight">运费收入(结算标准量*收入单价):</label>
                                        <div class="col-md-9">
                                            <label class="form-control"  id="account-freight"  >{{accountFreight}}</label>
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
                                    <div class="form-group margin0" v-for="c in costModalArray">
                                        <label class="col-md-3 control-label" :for="'costMaintainInfo-'+c.field">{{c.title}}:</label>
                                        <div class="col-md-9">
                                            <input class="form-control" v-if="c.mType==='number'" :placeholder="c.title" :id="'costMaintainInfo-'+c.field" type="number"  v-model.number="costMaintainInfo[c.field]" :disabled="!isCostModified">
                                            <input class="form-control" v-else :placeholder="c.title" :id="'costMaintainInfo-'+c.field" type="text"  v-model.number="costMaintainInfo[c.field]" :disabled="!isCostModified">
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
        align: 'center',
        mType:'text'
    },
    {
        field: 'customerCode',
        title: '客户编号',
        align: 'center',
        mType:'text'
    },
    {
        field: 'sender',
        title: '发货单位',
        align: 'center',
        mType:'text'
    },
    {
        field: 'orderNum',
        title: '客户订单号',
        align: 'center',
        mType:'text'
    },
    {
        field: 'originAddress',
        title: '提货地址',
        align: 'center',
        mType:'text'
    },
    {
        field: 'destinationCity',
        title: '送货城市',
        align: 'center',
        mType:'text'
    },
    {
        field: 'receiverCom',
        title: '收货客户',
        align: 'center',
        mType:'text'
    },
    {
        field: 'receiverPerson',
        title: '收货人',
        align: 'center',
        mType:'text'
    },
    {
        field: 'telephoneNum',
        title: '联系电话',
        align: 'center',
        mType:'text'
    },
    {
        field: 'destinationAddress',
        title: '送货地址',
        align: 'center',
        mType:'text'
    },
    {
        field: 'productName',
        title: '产品名称',
        align: 'center',
        mType:'text'
    },
    {
        field: 'wrap',
        title: '包装',
        align: 'center',
        mType:'text'
    },
    {
        field: 'count',
        title: '数量',
        align: 'center',
        mType:'number'
    },
    {
        field: 'weight',
        title: '重量',
        align: 'center',
        mType:'number'
    },
    {
        field: 'volume',
        title: '体积',
        align: 'center',
        mType:'number'
    },
    {
        field: 'receiveDate',
        title: '到货日期',
        align: 'center',
        mType:'text'
    },
    {
        field: 'settleWay',
        title: '结算方式',
        align: 'center',
        mType:'text'
    },
    {
        field: 'amount',
        title: '金额',
        align: 'center',
        mType:'number'
    },
    ],columnObject={};commonColumns.forEach(c=>{columnObject[c.field]=''});
    let accountsCommonColumns=[
        {
            field: 'orderNum',
            title: '订单号',
            sortable: true,
            align: 'center',
            mType:'text',
        },
        {
            field: 'measure',
            title: '结算标准量',
            sortable: true,
            align: 'center',
            mType:'number',
        },
        {
            field: 'price',
            title: '收入单价',
            sortable: true,
            align: 'center',
            mType:'number',
        },
        {
            field: 'freight',
            title: '运费收入',
            sortable: true,
            align: 'center',
            mType:'number',
        },
        {
            field: 'ladingCost',
            title: '提货费',
            sortable: true,
            align: 'center',
            mType:'number',
        },
        {
            field: 'deliveryCost',
            title: '送货费',
            sortable: true,
            align: 'center',
            mType:'number',
        },
        {
            field: 'otherCost',
            title: '其他费用',
            sortable: true,
            align: 'center',
            mType:'number',
        },
        {
            field: 'sum',
            title: '合计收入',
            sortable: true,
            align: 'center',
            mType:'number',
        },
    ],accountsColumnObject={};accountsCommonColumns.forEach(c=>{accountsColumnObject[c.field]=''});
   let costCommonColumns=[
        {
            field: 'orderNum',
            title: '订单号',
            sortable: true,
            align: 'center',
            mType:'text'
//            formatter:orderNumFormatter,
//            events:orderNumEvents
        },
        {
            field: 'costStatus',
            title: '成本状态',
            sortable: true,
            align: 'center',
            mType:'text',
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
            align: 'center',
            mType:'text'
        },
        {
            field: 'receivingWay',
            title: '提货方式',
            align: 'center',
            mType:'text'
        },
        {
            field: 'driverName',
            title: '承运司机',
            align: 'center',
            mType:'text'
        },
        {
            field: 'carType',
            title: '车型',
            align: 'center',
            mType:'text'
        },
        {
            field: 'carRental',
            title: '租车费用',
            align: 'center',
            mType:'text'
        },
        {
            field: 'deliveryManName',
            title: '承运商',
            align: 'center',
            mType:'text'
        },
        {
            field: 'expressNumber',
            title: '物流单号',
            align: 'center',
            mType:'text'
        },
        {
            field: 'telephoneNum',
            title: '联系电话',
            align: 'center',
            mType:'text'
        },
        {
            field: 'shippingCost',
            title: '运费单价',
            align: 'center',
            mType:'number'
        },
        {
            field: 'receivingCost',
            title: '提货成本',
            align: 'center',
            mType:'number'
        },
        {
            field: 'transportCost',
            title: '运输成本',
            align: 'center',
            mType:'number'
        },
        {
            field: 'deliveryCost',
            title: '送货费',
            align: 'center',
            mType:'number'
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
                orderModalArray:[],
                costModalArray:[],
                accountModalArray:[],
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
                    }
                }
            }
        },
        methods:{
            viewUploadResult(){
                $uploadResultTable.bootstrapTable('refresh');
                $uploadResultModal.modal("show")
            },
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
                account.sum= (parseFloat(account.freight) || 0)+(parseFloat(account.ladingCost) || 0)+(parseFloat(account.deliveryCost) || 0)+(parseFloat(account.otherCost) || 0);
                return account.sum;
            },
            accountFreight(){
                let account=this.account;
                account.freight=(parseFloat(account.measure) || 0)*(parseFloat(account.price) || 0);
                return account.freight;
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
            this.orderModalArray=commonColumns;
            this.costModalArray=costCommonColumns.filter(({field})=>field!=='orderNum' && field!=='costStatus'&& field!=='totalCost');
            this.accountModalArray=accountsCommonColumns.filter(({field})=>field!=='orderNum' && field!=='sum' && field!=='freight');
            $modal=$("#orderInfoModal");
            $uploadResultModal=$("#uploadResultModal");
            $accountModal=$("#accountModal");
            $costModal=$("#costMaintainModal");
            router=this.$router;
            this.$parent.current.item="orders.order";
            vuer=this;
            let namespace=this.$store.state.permissions;
            this.orders.order=Object.assign({},this.orders.order,namespace.orders.order || {})
            initTable();
            initUploadResultTable();
        }
    }
</script>
