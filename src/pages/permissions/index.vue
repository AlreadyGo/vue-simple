<template>
    <div>
        <div class="row">
            <ol class="breadcrumb">
                <li><a href="#"><span class="glyphicon glyphicon-home"></span></a></li>
                <li class="active">{{title}}</li>
            </ol>
        </div>
        <div class="row">
            <div class="col-lg-12">
                <h4></h4>
            </div>
        </div>
        <div>
            <div class="row">
                <div class="col-lg-12">
                    <div class="panel panel-default">
                        <!--<div class="panel-heading">{{title}}</div>-->
                        <div class="panel-body">
                            <div id="toolbar">
                                <button id="dispatcher" class="btn btn-primary"  @click="doUpdate">
                                    <i class="glyphicon  glyphicon-edit"></i> 编辑权限
                                </button>
                                <button  class="btn btn-info"  @click="doCreate">
                                    <i class="glyphicon  glyphicon-plus"></i> 添加权限
                                </button>
                                <button  class="btn btn-danger"  @click="doDelete">
                                    <i class="glyphicon  glyphicon-remove"></i> 删除权限
                                </button>
                            </div>
                            <table id="table"    data-show-refresh="true" data-show-toggle="true" data-show-columns="true" data-search="true" data-select-item-name="toolbar1" data-pagination="true" data-sort-name="name" data-sort-order="desc"
                                   data-page-size="5" data-page-list="[5,10,20]" data-single-select="true" data-toolbar="#toolbar"
                                   data-side-pagination="client" data-striped="true"
                            >
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="modal" id="permissionModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                    <h4 class="modal-title text-center" id="myModalLabel">{{permission.title}}</h4>
                </div>
                <div class="modal-body">
                    <form class="form-horizontal" @submit.prevent="doCreateOrUpdate">
                        <fieldset>
                            <div class="form-group">
                                <label class="col-md-3 control-label" for="permission-name">权限名:</label>
                                <div class="col-md-9">
                                    <input class="form-control" placeholder="权限名" id="permission-name" type="text"  v-model.trim="permission.name" required>
                                </div>
                            </div>
                            <div class="form-group">
                                <label class="col-md-3 control-label" for="permission-type">权限类型:</label>
                                <div class="col-md-9">
                                    <select class="form-control" id="permission-type" v-model="permission.permissionType">
                                        <option  value="" disabled>权限类型</option>
                                        <option v-for='(t,k) in typeMap' :value="k" >{{t}}</option>
                                    </select>
                                </div>
                            </div>
                            <div class="form-group">
                                <label class="col-md-3 control-label" for="permission-value">权限值:</label>
                                <div class="col-md-9">
                                    <input class="form-control" placeholder="权限值"  type="text" id="permission-value" v-model.trim="permission.value" required >
                                </div>
                            </div>
                            <div class="form-group">
                                <label class="col-md-3 control-label" for="permission-url"> URL:</label>
                                <div class="col-md-9">
                                    <input class="form-control" placeholder="URL"  type="text"  id="permission-url" v-model.trim="permission.url" required >
                                </div>
                            </div>
                            <div class="form-group">
                                <label class="col-md-3 control-label" for="permission-desc"> 描述:</label>
                                <div class="col-md-9">
                                    <input class="form-control" placeholder="描述"  type="text"  id="permission-desc" v-model.trim="permission.description"  >
                                </div>
                            </div>
                            <div class="form-group">
                                <label class="col-md-3 control-label" for="permission-url"> 样式:</label>
                                <div class="col-md-9">
                                    <input class="form-control" placeholder="样式"  type="text"  id="permission-style" v-model.trim="permission.style"  >
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
<script>
    let getIdSelections=()=>{
        let selections=$table.bootstrapTable('getSelections');
        if(selections.length===0) throw new Error("个数不能为0")
        return selections;
    }
    let typeMap={'BUTTON':'按钮','MENU2ND':'二级菜单','MENU1ST':'一级菜单'}
    let typeFormatter=(row,index)=>{
        return typeMap[row];
    }
    let $table;
    let initTable=()=>{
              $table=$("#table")
              $table.bootstrapTable({
                 url:'/backend/permission/all',
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
                      field: 'name',
                      title: '权限名',
                      align: 'center'
                  },
                  {
                      field: 'value',
                      title: '权限值',
                      align: 'center'
                  },
                  {
                      field: 'permissionType',
                      title: '权限类型',
                      align: 'center',
                      formatter: typeFormatter
                  },
                  {
                      field: 'url',
                      title: 'URL',
                      align: 'center',
                  },
                  {
                      field: 'description',
                      title: '描述',
                      align: 'center',
                  },
                  {
                      field: 'style',
                      title: '样式(二级菜单必须)',
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
    import alertify from 'alertifyjs';
    export default{
        data(){
            return{
                typeMap:'',
                title:'权限管理',
                permission:{
                    title:'创建权限',
                    name:'',
                    permissionType:'',
                    value:'',
                    url:'',
                    id:0,
                    style:'',
                    description:'',
                },
                users:{
                        permission:{
                            'all':false,
                            'save':false,
                            'delete':false,
                        }
                }
            }
        },
        methods:{
           doDelete(){
            let arr=getIdSelections();
            if(arr.length>1){
                alertify.error("操作错误");
                return;
            }else if(arr.length===0){
                alertify.error("请选择一个权限修改");
                return;
            }
             this.$http.post("/backend/permission/delete/"+(arr[0].id)).
             then(({body})=>{
                if(body && body.status==0) alertify.success(body.message);
                $table.bootstrapTable('refresh');
             },()=>{
                 alertify.success("删除失败");
             })
           },
           doUpdate(){
            let arr=getIdSelections();
            if(arr.length>1){
                alertify.error("操作错误");
                return;
            }else if(arr.length===0){
                alertify.error("请选择一个权限修改");
                return;
            }
            let el={...arr[0],title:'修改权限'};
            Object.assign(this.permission,el);
            $("#permissionModal").modal("show");
           },
           doCreate(){
            $.each(Object.keys(this.permission),(index,v)=>{this.permission[v]=''})
            this.permission.title="创建权限";
            $("#permissionModal").modal("show");
           },
           doCreateOrUpdate(){
               this.$http.post("/backend/permission/save",JSON.stringify(this.permission)).then(
                ({body})=>{
                       if(body && body.status===0){
                         alertify.success(body.message);
                         $("#permissionModal").modal("hide");
                         $table.bootstrapTable('refresh');
                       }
                    },v=>{
                         alertify.error('操作失败');
                    }
               )
           }
        },
        mounted(){
            let namespace=this.$store.state.permissions;
            initTable();
            this.typeMap=typeMap;
            Object.assign(this.users.permission,namespace.users.permission)
        }
    }
</script>
