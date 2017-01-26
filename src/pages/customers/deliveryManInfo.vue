<template>
    <div id="deliveryManInfoPart">
        <v-header :title="title"></v-header>
        <div>
            <div class="row">
                <div class="col-lg-12">
                    <div class="panel panel-default">
                        <div class="panel-body">
                            <div id="toolbar">
                                <button id="dispatcher" class="btn btn-primary"   @click="doUpdate" v-if="customers.deliveryManInfo.save">
                                    <i class="glyphicon  glyphicon-edit"></i> 编辑
                                </button>
                                <button  class="btn btn-info"  @click="doCreate" v-if="customers.deliveryManInfo.save">
                                    <i class="glyphicon  glyphicon-plus"></i> 添加
                                </button>
                                <label class="btn btn-primary">
                                    上传 <input type="file" style="display: none;" id="deliveryManInfo-upload" accept=".xls?" multiple>
                                </label>
                                <button  class="btn btn-danger" @click="doDelete" v-if="customers.deliveryManInfo.delete">
                                    <i class="glyphicon  glyphicon-remove"></i> 删除
                                </button>
                                <button  class="btn btn-info"  @click="viewUploadResult" v-if="customers.deliveryManInfo.upload">
                                    <i class="glyphicon glyphicon-eye-open"></i> 上传一览
                                </button>
                                <select class="btn" style="border: 1px solid #30a5ff;" v-model.number="searchKeys.dateRange" @change="changeByDateRange">
                                    <option value="1">最近一个月</option>
                                    <option value="3">最近三个月</option>
                                    <option value="6">最近半年</option>
                                    <option value="12">最近一年</option>
                                </select>
                            </div>
                            <table id="table"    data-show-refresh="true"  data-show-columns="true" data-search="true" data-select-item-name="toolbar1" data-pagination="true"  data-sort-name="create_date" data-sort-order="desc"
                                   data-page-size="5" data-page-list="[5,10,20,50]"  data-toolbar="#toolbar" data-advanced-search="true" data-id-table="advancedTable"
                                   data-side-pagination="client" data-striped="true"
                            >
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="modal fade" id="uploadResultModal" tabindex="-1" role="dialog" aria-labelledby="uploadResultModalLabel" aria-hidden="true">
            <div class="modal-dialog modal-lg">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span></button>
                        <h4 class="modal-title">上传一览</h4>
                    </div>
                    <div class="modal-body">
                        <table id="uploadResultTable"  data-pagination="true"  data-sort-order="desc"
                               data-page-size="10"
                               data-side-pagination="client" data-striped="true" data-sort-name="create_date"
                               data-height="400"
                        >
                        </table>
                    </div>
                </div><!-- /.modal-content -->
            </div><!-- /.modal-dialog -->
        </div><!-- /.modal -->

        <v-modal vmodal-id="deliveryManInfoModal" vmodal-labelledby="myModalLabel" :vmodal-title="deliveryManInfo.title" :vmodal-submit="doCreateOrUpdate">
            <div class="fixed-height">
                <div class="form-group margin0">
                    <label class="col-md-3 control-label" for="deliveryManInfo-code">承运商代码:</label>
                    <div class="col-md-9">
                        <input class="form-control" required placeholder="承运商代码" id="deliveryManInfo-code" type="text"  v-model.trim="deliveryManInfo.code" :disabled="!!deliveryManInfo.id">
                    </div>
                </div>
                <div class="form-group margin0">
                    <label class="col-md-3 control-label" for="deliveryManInfo-name">承运商名称:</label>
                    <div class="col-md-9">
                        <input class="form-control" required placeholder="承运商名称" id="deliveryManInfo-name" type="text"  v-model.trim="deliveryManInfo.name" :disabled="!!deliveryManInfo.id" >
                    </div>
                </div>
                <div class="form-group margin0">
                    <label class="col-md-3 control-label" for="deliveryManInfo-address">承运商地址:</label>
                    <div class="col-md-9">
                        <input class="form-control" placeholder="承运商地址" id="deliveryManInfo-address" type="text"  v-model.trim="deliveryManInfo.address" >
                    </div>
                </div>
                <div class="form-group margin0">
                    <label class="col-md-3 control-label" for="deliveryManInfo-serviceScope">服务范围:</label>
                    <div class="col-md-9">
                        <input class="form-control" placeholder="服务范围" id="deliveryManInfo-serviceScope" type="text"  v-model.trim="deliveryManInfo.serviceScope" >
                    </div>
                </div>
                <div class="form-group margin0">
                    <label class="col-md-3 control-label" for="deliveryManInfo-routeProvince">承运路线省份:</label>
                    <div class="col-md-9">
                        <input class="form-control" placeholder="承运路线省份" id="deliveryManInfo-routeProvince" type="text"  v-model.trim="deliveryManInfo.routeProvince" >
                    </div>
                </div>
                <div class="form-group margin0">
                    <label class="col-md-3 control-label" for="deliveryManInfo-routeCity">承运路线城市:</label>
                    <div class="col-md-9">
                        <input class="form-control" placeholder="承运路线城市" id="deliveryManInfo-routeCity" type="text"  v-model.trim="deliveryManInfo.routeCity" >
                    </div>
                </div>
                <div class="form-group margin0">
                    <label class="col-md-3 control-label" for="deliveryManInfo-originLinkWay">始发地上海联系方式:</label>
                    <div class="col-md-9">
                        <input class="form-control" placeholder="始发地上海联系方式" id="deliveryManInfo-originLinkWay" type="text"  v-model.trim="deliveryManInfo.originLinkWay" >
                    </div>
                </div>
                <div class="form-group margin0">
                    <label class="col-md-3 control-label" for="deliveryManInfo-agencyLinkWay">办事处联系方式:</label>
                    <div class="col-md-9">
                        <input class="form-control" placeholder="办事处联系方式" id="deliveryManInfo-agencyLinkWay" type="text"  v-model.trim="deliveryManInfo.agencyLinkWay" >
                    </div>
                </div>
                <div class="form-group margin0">
                    <label class="col-md-3 control-label" for="deliveryManInfo-mainLink">主要联系人:</label>
                    <div class="col-md-9">
                        <input class="form-control" placeholder="主要联系人" id="deliveryManInfo-mainLink" type="text"  v-model.trim="deliveryManInfo.mainLink" >
                    </div>
                </div>
                <div class="form-group margin0">
                    <label class="col-md-3 control-label" for="deliveryManInfo-contract">合同签订:</label>
                    <div class="col-md-9">
                        <input class="form-control" placeholder="合同签订" id="deliveryManInfo-contract" type="text"  v-model.trim="deliveryManInfo.contract" >
                    </div>
                </div>
                <div class="form-group margin0">
                    <label class="col-md-3 control-label" for="deliveryManInfo-description">其他说明:</label>
                    <div class="col-md-9">
                        <input class="form-control" placeholder="其他说明" id="deliveryManInfo-description" type="text"  v-model.trim="deliveryManInfo.description" >
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
        field: 'code',
        title: '承运商代码',
        sortable: true,
        align: 'center'
    },
    {
        field: 'name',
        title: '承运商名称',
        align: 'center'
    },
    {
        field: 'address',
        title: '承运商地址',
        align: 'center',
    },
    {
        field: 'serviceScope',
        title: '服务范围',
        align: 'center',
    },
    {
        field: 'routeProvince',
        title: '承运路线省份',
        align: 'center',
    },
    {
        field: 'routeCity',
        title: '承运路线城市',
        align: 'center',
    },
    {
        field: 'originLinkWay',
        title: '始发地上海联系方式',
        align: 'center',
    },
    {
        field: 'agencyLinkWay',
        title: '办事处联系方式',
        align: 'center',
    },
    {
        field: 'mainLink',
        title: '主要联系人',
        align: 'center',
    },
    {
        field: 'contract',
        title: '合同签订',
        align: 'center',
    },
    {
        field: 'description',
        title: '其他说明',
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
    $(document).on('change', '#deliveryManInfo-upload', function() {
            let $this=$(this),files=$this.get(0).files;
            let body = new FormData();

            try {
                $.each(files, (i, file) => {
                    if (!excelReg.test(file.name)) {
                        throw new Error("上传文件格式不正确");
                    }
                    body.append('file[]', file);
                });
                upload('/backend/deliveryManInfo/upload', body).then(v => {
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
        formPost("/backend/deliveryManInfo/all",Object.assign(params.data,searchKeys)).then(v=>{
             params.success(v)
        }).catch(e=>{
            alertify.error(e.message)
        })
    }
    function ajaxUploadResultRequest(params) {
        formPost("/backend/uploadResult/view/DELIVERYMANINFO",Object.assign(params.data,searchKeys)).then(v=>{
             params.success(v)
        }).catch(e=>{
            alertify.error(e.message)
        })
    }
    function responseHandler(res) {
        return res;
    }

    let initTable=()=>{
              $table=$("#table")
              $table.bootstrapTable({
                 ajax: ajaxRequest,
                 responseHandler:responseHandler,
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
                title:'承运商信息',
                deliveryManInfo:{
                    "title":"添加承运商信息",
                    "id":"",
                    "code":"",
                    "name":"",
                    "address":"",
                    "serviceScope":"",
                    "routeProvince":"",
                    "routeCity":"",
                    "originLinkWay":"",
                    "agencyLinkWay":"",
                    "mainLink":"",
                    "contract":"",
                    "description":""
                },
                customers:{
                    deliveryManInfo:{
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
                post("/backend/deliveryManInfo/save",this.deliveryManInfo).then(v=>{
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
            viewUploadResult(){
                $uploadResultTable.bootstrapTable('refresh');
                $uploadResultModal.modal("show")
            },
            doCreate(){
                $.each(Object.keys(this.deliveryManInfo),(index,v)=>{this.deliveryManInfo[v]=''})
                this.deliveryManInfo.title="添加承运商信息";
                $modal.modal("show");
            },
            doUpdate(){
                try{
                    let arr=getSelections($table);
                    let el={...arr[0],title:'承运商信息'};
                    Object.assign(this.deliveryManInfo,el);
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
                                post("/backend/deliveryManInfo/delete/"+(s.id)).
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
                    function(){
                    });
            }
        },
        mounted(){
            let namespace=this.$store.state.permissions;
            $modal=$("#deliveryManInfoModal");
            $uploadResultModal=$("#uploadResultModal");
            this.$parent.current.item="customers.deliveryManInfo";
            initTable();
            initUploadResultTable();
            Object.assign(this.customers.deliveryManInfo,namespace.customers.deliveryManInfo || {})

        }
    }
</script>
