<template>
    <div id="orderInfoPart">
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
                                <button  class="btn btn-info"  @click="doCreate">
                                    <i class="glyphicon  glyphicon-plus"></i> 添加
                                </button>
                                <label class="btn btn-primary">
                                    上传 <input type="file" style="display: none;" id="orderInfo-upload" accept=".xls?" multiple>
                                </label>
                                <button  class="btn btn-info"  @click="doViewAll">
                                    <i class="glyphicon  glyphicon-eye-open"></i>全部
                                </button>
                                <button  class="btn btn-danger" @click="doDelete">
                                    <i class="glyphicon  glyphicon-remove"></i> 删除
                                </button>
                                <button  class="btn btn-info"  @click="ViewUploadResult">
                                    <i class="glyphicon glyphicon-eye-open"></i> 上传一览
                                </button>
                                <select class="btn" style="borderInfo: 1px solid #30a5ff;" v-model.number="searchKeys.dateRange" @change="changeByDateRange">
                                    <option value="1">最近一个月</option>
                                    <option value="3">最近三个月</option>
                                    <option value="6">最近半年</option>
                                    <option value="12">最近一年</option>
                                </select>
                            </div>
                            <table id="table"    data-show-refresh="true" data-show-columns="true" data-search="true" data-select-item-name="toolbar1" data-pagination="true" data-sort-name="create_date" data-sort-orderInfo="desc"
                                   data-page-size="5" data-page-list="[5,10,20,50]"  data-toolbar="#toolbar" data-advanced-search="true" data-id-table="advancedTable"
                                   data-side-pagination="client" data-striped="true" data-single-select="true"
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
                    <label class="col-md-3 control-label" for="orderInfo-orderInfoNum">订单号:</label>
                    <div class="col-md-9">
                        <input class="form-control" placeholder="订单号" id="orderInfo-orderInfoNum" type="text"  v-model="orderInfo.orderInfoNum" >
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
                        <input class="form-control" placeholder="数量" id="orderInfo-count" type="text"  v-model="orderInfo.count" >
                    </div>
                </div>
                <div class="form-group margin0" >
                    <label class="col-md-3 control-label" for="orderInfo-weight">重量:</label>
                    <div class="col-md-9">
                        <input class="form-control" placeholder="重量" id="orderInfo-weight" type="text"  v-model="orderInfo.weight" >
                    </div>
                </div>
                <div class="form-group margin0" >
                    <label class="col-md-3 control-label" for="orderInfo-volume">体积:</label>
                    <div class="col-md-9">
                        <input class="form-control" placeholder="体积" id="orderInfo-volume" type="text"  v-model="orderInfo.volume" >
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
                        <input class="form-control" placeholder="金额" id="orderInfo-amount" type="text"  v-model="orderInfo.amount" >
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
    </div>
</template>
<style>
</style>
<script>
    let $table,$modal,$uploadResultTable,$uploadResultModal,searchKeys={dateRange:3},router,vuer,orderNum,
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
    let operateEvents = {
        'click .accounts': function (e, value, row, index) {
            router.push({ path: `/main/accounts/${row.orderNum}` })
        },
        'click .cost': function (e, value, row, index) {
            router.push({ path: `/main/cost/costMaintain/${row.orderNum}` })
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
    $(document).on('change', '#orderInfo-upload', function() {
            let $this=$(this),files=$this.get(0).files;
            let body = new FormData();
            $.each(files,(i,file)=>{
               body.append('file[]', file);
            })
            upload('/backend/orderInfo/upload',body).then(v=>{
                $this.val("");
                refreshTable();
                if(v && v.status===0){
                    alertify.success(v.message);
                }else{
                    throw new Error(v.message)
                }

            }).catch(error=>{
                alertify.error(error.message);
            });
    });
    function ajaxRequest(params) {
        formPost("/backend/orderInfo/all",Object.assign(params.data,vuer.searchKeys)).then(v=>{
             params.success(v)
        }).catch(e=>{
            console.error(e.message)
        })
    }
    function ajaxUploadResultRequest(params) {
        formPost("/backend/uploadResult/view/ORDER",Object.assign(params.data,vuer.searchKeys)).then(v=>{
             params.success(v)
        }).catch(e=>{
            console.error(e.message)
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
                  ...commonColumns
                  ]
          ],
      });
    };
    export default{
        data(){
            return{
                title:'订单信息',
                orderInfo:{
                    title:"添加订单信息",
                    id:"",
                    ...columnObject
                },
                orders:{
                    order:{
                        all:false
                    }
                }
            }
        },
        methods:{
            doViewAll(){
                this.$router.replace({path:'/main/orders'});
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
                    throw new Error("只能选择一个订单信息");
                }
                return arr;
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
                    alertify.error("操作失败")
                })
            },
            ViewUploadResult(){
                $uploadResultTable.bootstrapTable('refresh');
                $uploadResultModal.modal("show")
            },
            doCreate(){
                $.each(Object.keys(this.orderInfo),(index,v)=>{this.orderInfo[v]=''})
                this.orderInfo.title="添加订单信息";
                $modal.modal("show");
            },
            doUpdate(){
                try{
                    let arr=this.doCheck();
                    let el={...arr[0],title:'修改订单信息'};
                    Object.assign(this.orderInfo,el);
                    $modal.modal("show");
                }catch(e){
                    alertify.error(e.message)
                }
            },
            doDelete(){
                try{
                    let arr=this.doCheck();if(!arr) return;
                     post("/backend/orderInfo/delete/"+(arr[0].id)).
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
