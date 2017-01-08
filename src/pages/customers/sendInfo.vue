<template>
    <div id="sendInfoPart">
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
                                    上传 <input type="file" style="display: none;" id="sendInfo-upload" accept=".xls?" multiple>
                                </label>
                                <button  class="btn btn-info"  @click="ViewUploadResult">
                                    <i class="glyphicon glyphicon-eye-open"></i> 上传一览
                                </button>
                                <button  class="btn btn-danger" @click="doDelete">
                                    <i class="glyphicon  glyphicon-remove"></i> 删除
                                </button>
                            </div>
                            <table id="table"    data-show-refresh="true" data-show-toggle="true" data-show-columns="true" data-search="true" data-select-item-name="toolbar1" data-pagination="true" data-sort-name="name" data-sort-order="desc"
                                   data-page-size="5" data-page-list="[5,10,20,50]"  data-toolbar="#toolbar"
                                   data-side-pagination="client" data-striped="true"
                            >
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="modal" id="sendInfoModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                        <h4 class="modal-title text-center" id="myModalLabel">{{sendInfo.title}}</h4>
                    </div>
                    <div class="modal-body" >
                        <form class="form-horizontal" @submit.prevent="doCreateOrUpdate">
                            <fieldset >
                                <div class="fixed-height">
                                    <div class="form-group margin0">
                                        <label class="col-md-3 control-label" for="sendInfo-code">客户编码:</label>
                                        <div class="col-md-9">
                                            <input class="form-control" placeholder="客户编码" id="sendInfo-code" type="text"  v-model.trim="sendInfo.code" >
                                        </div>
                                    </div>
                                    <div class="form-group margin0">
                                        <label class="col-md-3 control-label" for="sendInfo-name">客户名称:</label>
                                        <div class="col-md-9">
                                            <input class="form-control" placeholder="客户名称" id="sendInfo-name" type="text"  v-model.trim="sendInfo.name" required>
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
                            </fieldset>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>
                                <button type="submit" class="btn btn-primary">确定</button>
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
    let $table;
    $(document).on('change', '#sendInfo-upload', function() {
            let $this=$(this),files=$this.get(0).files;
            console.log("sendInfo upload");
            let body = new FormData();
            $.each(files,(i,file)=>{
               body.append('file[]', file);
            })
            body.append('user', 'admin');
            upload('/backend/sendInfo/upload',body).then(v=>{
                $this.val("");
                $table.bootstrapTable('refresh');
            }).catch(error=>{
                console.log('request failed', error)
            });
    });
    let initTable=()=>{
              $table=$("#table")
              $table.bootstrapTable({
                 url:'/backend/sendInfo/all',
                 columns: [
                  [{
                      field: 'state',
                      align: 'center',
                      checkbox:true
                  },
                  {
                      field: 'id',
                      title: 'ID',
                      sortable: true,
                      align: 'center',
                  },
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
                  ]
          ],
          onLoadSuccess: function(){

          },
          onLoadError: function(){

          }
      });
    };
    export default{
        data(){
            return{
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
                }
            }
        },
        methods:{
            doCheck(){
                let arr=getSelections();
                if(arr.length>1){
                    alertify.error("操作错误");
                    return null;
                }else if(arr.length===0){
                    alertify.error("请选择一个客户信息");
                    return null;
                }
                return arr;
            },
            doCreateOrUpdate(){
            },
            ViewUploadResult(){
            },
            doCreate(){
                $.each(Object.keys(this.sendInfo),(index,v)=>{this.sendInfo[v]=''})
                this.sendInfo.title="添加发货方信息";
                $("#sendInfoModal").modal("show");
            },
            doUpdate(){
            },
            doDelete(){
            }
        },
        mounted(){
            initTable()
        }
    }
</script>
