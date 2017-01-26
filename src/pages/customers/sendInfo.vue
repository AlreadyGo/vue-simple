<template>
    <div id="sendInfoPart">
        <v-header :title="title"></v-header>
        <div>
            <div class="row">
                <div class="col-lg-12">
                    <div class="panel panel-default">
                        <div class="panel-body">
                            <div id="toolbar">
                               <button id="dispatcher" class="btn btn-primary"   @click="doUpdate" v-if="customers.sendInfo.save">
                                   <i class="glyphicon  glyphicon-edit"></i> 编辑
                               </button>
                               <button  class="btn btn-info"  @click="doCreate" v-if="customers.sendInfo.save">
                                   <i class="glyphicon  glyphicon-plus"></i> 添加
                               </button>
                               <label class="btn btn-primary">
                                   上传 <input type="file" style="display: none;" id="sendInfo-upload" accept=".xls?" multiple>
                               </label>
                               <button  class="btn btn-danger" @click="doDelete" v-if="customers.sendInfo.delete">
                                   <i class="glyphicon  glyphicon-remove"></i> 删除
                               </button>
                                <button  class="btn btn-info"  @click="viewUploadResult" v-if="customers.sendInfo.upload">
                                    <i class="glyphicon glyphicon-eye-open"></i> 上传一览
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
        <v-modal vmodal-id="sendInfoModal" vmodal-labelledby="myModalLabel" :vmodal-title="sendInfo.title" :vmodal-submit="doCreateOrUpdate">
            <div class="fixed-height">
                <div class="form-group margin0">
                    <label class="col-md-3 control-label" for="sendInfo-code">客户编码:</label>
                    <div class="col-md-9">
                        <input class="form-control" placeholder="客户编码" id="sendInfo-code" type="text"  v-model.trim="sendInfo.code" :disabled="!!sendInfo.id" required>
                    </div>
                </div>
                <div class="form-group margin0">
                    <label class="col-md-3 control-label" for="sendInfo-name">客户名称:</label>
                    <div class="col-md-9">
                        <input class="form-control" placeholder="客户名称" required id="sendInfo-name" type="text"  v-model.trim="sendInfo.name"  :disabled="!!sendInfo.id">
                    </div>
                </div>
                <div class="form-group margin0">
                    <label class="col-md-3 control-label" for="sendInfo-accountMeasure">结算标准量:</label>
                    <div class="col-md-9">
                        <input class="form-control" placeholder="结算标准量" id="sendInfo-accountMeasure" type="text"  v-model.trim="sendInfo.accountMeasure" required>
                    </div>
                </div>
                <div class="form-group margin0">
                    <label class="col-md-3 control-label" for="sendInfo-productType">产品类型:</label>
                    <div class="col-md-9">
                        <input class="form-control" placeholder="产品类型" id="sendInfo-productType" type="text"  v-model.trim="sendInfo.productType" >
                    </div>
                </div>
                <div class="form-group margin0">
                    <label class="col-md-3 control-label" for="sendInfo-goodsType">货物类型:</label>
                    <div class="col-md-9">
                        <input class="form-control" placeholder="货物类型" id="sendInfo-goodsType" type="text"  v-model.trim="sendInfo.goodsType" >
                    </div>
                </div>
                <div class="form-group margin0">
                    <label class="col-md-3 control-label" for="sendInfo-bizType">业务类型:</label>
                    <div class="col-md-9">
                        <input class="form-control" placeholder="业务类型" id="sendInfo-bizType" type="text"  v-model.trim="sendInfo.bizType" >
                    </div>
                </div>
                <div class="form-group margin0">
                    <label class="col-md-3 control-label" for="sendInfo-swapType">产品包装:</label>
                    <div class="col-md-9">
                        <input class="form-control" placeholder="产品包装" id="sendInfo-swapType" type="text"  v-model.trim="sendInfo.swapType" >
                    </div>
                </div>
                <div class="form-group margin0">
                    <label class="col-md-3 control-label" for="sendInfo-receiverType">收货客户类型:</label>
                    <div class="col-md-9">
                        <input class="form-control" placeholder="收货客户类型" id="sendInfo-receiverType" type="text"  v-model.trim="sendInfo.receiverType" >
                    </div>
                </div>
                <div class="form-group margin0">
                    <label class="col-md-3 control-label" for="sendInfo-bizDesc">主要业务描述:</label>
                    <div class="col-md-9">
                        <input class="form-control" placeholder="主要业务描述" id="sendInfo-bizDesc" type="text"  v-model.trim="sendInfo.bizDesc" >
                    </div>
                </div>
                <div class="form-group margin0">
                    <label class="col-md-3 control-label" for="sendInfo-baseLink">客户联系人:</label>
                    <div class="col-md-9">
                        <input class="form-control" placeholder="客户联系人" id="sendInfo-baseLink" type="text"  v-model.trim="sendInfo.baseLink" >
                    </div>
                </div>
                <div class="form-group margin0">
                    <label class="col-md-3 control-label" for="sendInfo-baseLinkWay">联系方式:</label>
                    <div class="col-md-9">
                        <input class="form-control" placeholder="联系方式" id="sendInfo-baseLinkWay" type="text"  v-model.trim="sendInfo.baseLinkWay" >
                    </div>
                </div>
                <div class="form-group margin0">
                    <label class="col-md-3 control-label" for="sendInfo-baseGoodsAddress">客户提货地址:</label>
                    <div class="col-md-9">
                        <input class="form-control" placeholder="客户提货地址" id="sendInfo-baseGoodsAddress" type="text"  v-model.trim="sendInfo.baseGoodsAddress" >
                    </div>
                </div>
                <div class="form-group margin0">
                    <label class="col-md-3 control-label" for="sendInfo-mainLink">主要客户联系人:</label>
                    <div class="col-md-9">
                        <input class="form-control" placeholder="主要客户联系人" id="sendInfo-mainLink" type="text"  v-model.trim="sendInfo.mainLink" >
                    </div>
                </div>
                <div class="form-group margin0">
                    <label class="col-md-3 control-label" for="sendInfo-mainLinkWay">主要联系方式:</label>
                    <div class="col-md-9">
                        <input class="form-control" placeholder="主要联系方式" id="sendInfo-mainLinkWay" type="text"  v-model.trim="sendInfo.mainLinkWay" >
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
                        <table id="uploadResultTable"  data-pagination="true"  data-sort-order="desc" data-sort-name="create_date"
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
    let $table,$modal,$uploadResultTable,$uploadResultModal,searchKeys={dateRange:3},
    commonColumns=[
    {
        field: 'code',
        title: '客户编码',
        sortable: true,
        align: 'center'
    },
    {
        field: 'name',
        title: '客户名称',
        align: 'center'
    },
    {
        field: 'accountMeasure',
        title: '结算标准量',
        align: 'center',
    },
    {
        field: 'productType',
        title: '产品类型',
        align: 'center',
    },
    {
        field: 'goodsType',
        title: '货物类型',
        align: 'center',
    },
    {
        field: 'bizType',
        title: '业务类型',
        align: 'center',
    },
    {
        field: 'swapType',
        title: '产品包装',
        align: 'center',
    },
    {
        field: 'receiverType',
        title: '收货客户类型',
        align: 'center',
    },
    {
        field: 'bizDesc',
        title: '主要业务描述',
        align: 'center',
    },
    {
        field: 'baseLink',
        title: '客户联系人',
        align: 'center',
    },
    {
        field: 'baseLinkWay',
        title: '联系方式',
        align: 'center',
    },
    {
        field: 'baseGoodsAddress',
        title: '客户提货地址',
        align: 'center',
    },
    {
        field: 'mainLink',
        title: '主要客户联系人',
        align: 'center',
    },
    {
        field: 'mainLinkWay',
        title: '主要联系方式',
        align: 'center',
    },
    ];
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
    $(document).on('change', '#sendInfo-upload', function() {
            let $this=$(this),files=$this.get(0).files;
            let body = new FormData();
            try {
                $.each(files, (i, file) => {
                    if (!excelReg.test(file.name)) {
                        throw new Error("上传文件格式不正确");
                    }
                    body.append('file[]', file);
                });
                upload('/backend/sendInfo/upload', body).then(v => {
                    $this.val("");
                    if (v && v.status === 0) {
                        alertify.success(v.message);
                        refreshTable();
                    } else {
                        throw new Error(v.message)
                    }

                }).catch(error => {
                    alertify.error(error.message);
                });
            }catch(error){
                alertify.error(error.message);
            }
    });
    function ajaxRequest(params) {
        formPost("/backend/sendInfo/all",Object.assign(params.data,searchKeys)).then(v=>{
             params.success(v)
        }).catch(e=>{
            alertify.error(e.message)
        })
    }
    function ajaxUploadResultRequest(params) {
        formPost("/backend/uploadResult/view/SENDINFO",Object.assign(params.data,searchKeys)).then(v=>{
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
                searchKeys: searchKeys,
                title:'发货方信息',
                sendInfo:{
                    title:"添加发货方信息",
                    id:"",
                    code:"",
                    name:"",
                    accountMeasure:"",
                    productType:"",
                    goodsType:"",
                    bizType:"",
                    swapType:"",
                    receiverType:"",
                    bizDesc:"",
                    baseLink:"",
                    baseLinkWay:"",
                    baseGoodsAddress:"",
                    mainLink:"",
                    mainLinkWay:"",
                },
                customers:{
                    sendInfo:{
                        'all':false,
                        'save':false,
                        'upload':false,
                        'view':false,
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
                post("/backend/sendInfo/save",this.sendInfo).then(v=>{
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
            viewUploadResult(){
                $uploadResultTable.bootstrapTable('refresh');
                $uploadResultModal.modal("show")
            },
            doCreate(){
                $.each(Object.keys(this.sendInfo),(index,v)=>{this.sendInfo[v]=''})
                this.sendInfo.title="添加发货方信息";
                $modal.modal("show");
            },
            doUpdate(){
                try{
                    let arr=getSelections($table);
                    let el={...arr[0],title:'修改客户信息'};
                    Object.assign(this.sendInfo,el);
                    $modal.modal("show");
                }catch(e){
                    alertify.error(e.message)
                }
            },
            doDelete(){
                alertify.confirm("提示信息","确定删除?",
                    function(){
                        try{
                            let arr=getSelections($table,true);
                            arr.forEach(s=>{
                                post(`/backend/sendInfo/delete/${s.id}`).
                                then(body=>{
                                    if(body && body.status==0){
                                    alertify.success(body.message);
                                    $table.bootstrapTable('refresh');
                                }else{
                                    alertify.error(body.message)
                                }
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
        mounted(){
            let namespace=this.$store.state.permissions;
            $modal=$("#sendInfoModal");
            $uploadResultModal=$("#uploadResultModal");
            this.$parent.current.item="customers.sendInfo";
            initTable();
            initUploadResultTable();
            Object.assign(this.customers.sendInfo,namespace.customers.sendInfo || {})
        }
    }
</script>
