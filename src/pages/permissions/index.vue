<template>
    <div>
        <v-header :title="title"></v-header>
        <div>
            <div class="row">
                <div class="col-lg-12">
                    <div class="panel panel-default">
                        <!--<div class="panel-heading">{{title}}</div>-->
                        <div class="panel-body">
                            <div id="toolbar">
                                <button id="dispatcher" class="btn btn-primary"  @click="doUpdate" v-if="users.permission.save">
                                    <i class="glyphicon  glyphicon-edit"></i> 编辑权限
                                </button>
                                <button  class="btn btn-info"  @click="doCreate" v-if="users.permission.save">
                                    <i class="glyphicon  glyphicon-plus"></i> 添加权限
                                </button>
                                <button  class="btn btn-danger"  @click="doDelete" v-if="users.permission.delete">
                                    <i class="glyphicon  glyphicon-remove"></i> 删除权限
                                </button>
                            </div>
                            <table id="table"    data-show-refresh="true"  data-show-columns="true" data-search="true" data-select-item-name="toolbar1" data-pagination="true" data-sort-name="name" data-sort-order="desc"
                                   data-page-size="5" data-page-list="[5,10,20]"  data-toolbar="#toolbar" data-id-table="advancedTable"
                                   data-side-pagination="client" data-striped="true" data-advanced-search="true"
                            >
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <v-modal vmodal-id="permissionModal" vmodal-labelledby="myModalLabel" :vmodal-title="permission.title" :vmodal-submit="doCreateOrUpdate">
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
        </v-modal>
    </div>
</template>
<script>
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
            try{
                 let arr=getSelections($table,true);
                 arr.forEach(s=>{
                     post("/backend/permission/delete/"+(s.id)).
                     then(body=>{
                         if(body && body.status==0){
                             alertify.success(body.message);
                             $table.bootstrapTable('refresh');
                         }else{
                             throw new Error(body.message);
                         }
                     })
                 })
             }catch(error){
                alertify.error(error.message);
             }
           },
           doUpdate(){
            try{
                let arr=getSelections($table);
                let el={...arr[0],title:'修改权限'};
                Object.assign(this.permission,el);
                $("#permissionModal").modal("show");
            }catch(error){
                alertify.error(error.message)
            }
           },
           doCreate(){
            $.each(Object.keys(this.permission),(index,v)=>{this.permission[v]=''})
            this.permission.title="创建权限";
            $("#permissionModal").modal("show");
           },
           doCreateOrUpdate(){
            try{
               post("/backend/permission/save",this.permission).then(
                body=>{
                       if(body && body.status===0){
                         alertify.success(body.message);
                         $("#permissionModal").modal("hide");
                         $table.bootstrapTable('refresh');
                       }else{
                            throw new Error(body.message);
                       }
                    })
               }catch(error){
                 alertify.error(error.message);
               }
           }
        },
        mounted(){
            let namespace=this.$store.state.permissions;
            initTable();
            this.typeMap=typeMap;
            this.$parent.current.item="users.permission";
            Object.assign(this.users.permission,namespace.users.permission)
        }
    }
</script>
