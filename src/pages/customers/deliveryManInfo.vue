<template>
    <div id="deliveryManInfoPart">
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
                                    上传 <input type="file" style="display: none;" id="deliveryManInfo-upload" accept=".xls?" multiple>
                                </label>
                                <button  class="btn btn-info"  @click="ViewUploadResult">
                                    <i class="glyphicon glyphicon-eye-open"></i> 上传一览
                                </button>
                                <button  class="btn btn-danger" @click="doDelete">
                                    <i class="glyphicon  glyphicon-remove"></i> 删除
                                </button>
                            </div>
                            <table id="table"    data-show-refresh="true" data-show-toggle="true" data-show-columns="true" data-search="true" data-select-item-name="toolbar1" data-pagination="true"  data-sort-name="update_date" data-sort-order="desc"
                                   data-page-size="5" data-page-list="[5,10,20,50]"  data-toolbar="#toolbar" data-advanced-search="true" data-id-table="advancedTable"
                                   data-side-pagination="client" data-striped="true" data-single-select="true"
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
                               data-side-pagination="client" data-striped="true"
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
                        <input class="form-control" placeholder="承运商代码" id="deliveryManInfo-code" type="text"  v-model.trim="deliveryManInfo.code" >
                    </div>
                </div>
                <div class="form-group margin0">
                    <label class="col-md-3 control-label" for="deliveryManInfo-name">承运商名称:</label>
                    <div class="col-md-9">
                        <input class="form-control" placeholder="承运商名称" id="deliveryManInfo-name" type="text"  v-model.trim="deliveryManInfo.name" >
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
    let $table,$modal,$uploadResultTable,$uploadResultModal,
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
    $(document).on('change', '#deliveryManInfo-upload', function() {
            let $this=$(this),files=$this.get(0).files;
            let body = new FormData();
            $.each(files,(i,file)=>{
               body.append('file[]', file);
            })
            upload('/backend/deliveryManInfo/upload',body).then(v=>{
                if(v && v.status===0){
                    alertify.success(v.message);
                    refreshTable();
                }
                $this.val("");
            }).catch(error=>{
                alertify.error("上传失败:"+error.message);
            });
    });
    let initTable=()=>{
              $table=$("#table")
              $table.bootstrapTable({
                 url:'/backend/deliveryManInfo/all',
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
                  ...commonColumns,
                  {
                      field: 'createDate',
                      title: '创建时间',
                      sortable: true,
                      align: 'center',
                      formatter: timeFormatter,
                  },
                  {
                      field: 'updateDate',
                      title: '修改时间',
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
                 url:'/backend/uploadResult/view/DELIVERYMANINFO',
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
                }
            }
        },
        methods:{
            doCheck(){
                let arr=getSelections();
                if(arr.length>1){
                    throw new Error("操作错误");
                }else if(arr.length===0){
                    throw new Error("只能选择一个承运商信息");
                }
                return arr;
            },
            doCreateOrUpdate(){
                post("/backend/deliveryManInfo/save",this.deliveryManInfo).then(v=>{
                    if(v.status==0){
                        alertify.success(v.message);
                        $modal.modal("hide");
                        refreshTable();
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
                $.each(Object.keys(this.deliveryManInfo),(index,v)=>{this.deliveryManInfo[v]=''})
                this.deliveryManInfo.title="添加承运商信息";
                $modal.modal("show");
            },
            doUpdate(){
                try{
                    let arr=this.doCheck();
                    let el={...arr[0],title:'承运商信息'};
                    Object.assign(this.deliveryManInfo,el);
                    $modal.modal("show");
                }catch(e){
                    alertify.error(e.message)
                }
            },
            doDelete(){
                try{
                    let arr=this.doCheck();if(!arr) return;
                     post("/backend/deliveryManInfo/delete/"+(arr[0].id)).
                     then(body=>{
                        if(body && body.status==0) alertify.success(body.message);
                        $table.bootstrapTable('refresh');
                     }).catch(()=>{
                         alertify.success("删除失败");
                     })
                }catch(e){
                    alertify.error(e.message)
                }
            }
        },
        mounted(){
            $modal=$("#deliveryManInfoModal");
            $uploadResultModal=$("#uploadResultModal");
            initTable();
            initUploadResultTable();
        }
    }
</script>
