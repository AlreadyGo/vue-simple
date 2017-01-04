<template>
    <div>
        <div class="row">
            <ol class="breadcrumb">
                <li><a href="#/main/home"><span class="glyphicon glyphicon-home"></span></a></li>
                <li class="active">{{title}}</li>
            </ol>
        </div>
        <div class="row">
            <div class="col-lg-12">
                <h4></h4>
            </div>
        </div>
        <div >
            <div class="row">
                <div class="col-lg-12">
                    <div class="panel panel-default">
                        <!--<div class="panel-heading">{{title}}</div>-->
                        <div class="panel-body">
                            <div id="toolbar">
                                <button  class="btn btn-warning"  @click="doForbid" v-if="users.role.save">
                                    <i class="glyphicon glyphicon-remove"></i> 禁用
                                </button>
                                <button  class="btn btn-info"  @click="doStart" v-if="users.role.save">
                                    <i class="glyphicon glyphicon-ok"></i> 启用
                                </button>
                                <button  class="btn btn-primary"  @click="startDispatch" v-if="users.role.dispatch">
                                    <i class="glyphicon glyphicon-asterisk"></i> 配置权限
                                </button>
                                <button  class="btn btn-info" @click="doUpdate" v-if="users.role.save">
                                    <i class="glyphicon  glyphicon-edit"></i> 编辑角色
                                </button>
                                <button  class="btn btn-success"   @click="doCreate" v-if="users.role.save">
                                    <i class="glyphicon  glyphicon-plus"></i> 添加角色
                                </button>
                                <button  class="btn btn-danger"  @click="doDelete" v-if="users.role.delete">
                                    <i class="glyphicon  glyphicon-remove"></i> 删除角色
                                </button>
                            </div>
                            <table id="table"    data-show-refresh="true" data-show-toggle="true" data-show-columns="true" data-search="true" data-select-item-name="toolbar1" data-pagination="true" data-sort-name="name" data-sort-order="desc"
                                   data-page-size="10" data-page-list="[5,10,20]" data-single-select="true" data-toolbar="#toolbar"
                                   data-side-pagination="client" data-striped="true"
                            >
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="modal" id="roleModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                        <h4 class="modal-title text-center" id="myModalLabel">{{role.title}}</h4>
                    </div>
                    <div class="modal-body">
                        <form class="form-horizontal" @submit.prevent="doCreateOrUpdate">
                            <fieldset>
                                <div class="form-group">
                                    <label class="col-md-3 control-label" for="role-name">角色名:</label>
                                    <div class="col-md-9">
                                        <input class="form-control" placeholder="角色名" id="role-name" type="text"  v-model.trim="role.name" required>
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label class="col-md-3 control-label" for="role-type">角色状态:</label>
                                    <div class="col-md-9">
                                        <select class="form-control" id="role-type" v-model="role.status">
                                            <option  value="" disabled>角色状态</option>
                                            <option v-for='(t,k) in  statusMap' :value="k" >{{t}}</option>
                                        </select>
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label class="col-md-3 control-label" for="role-value">描述:</label>
                                    <div class="col-md-9">
                                        <input class="form-control" placeholder="描述"  type="text" id="role-value" v-model.trim="role.description" required >
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
        <div class="modal" id="dispatchModal" tabindex="-1" role="dialog" aria-labelledby="dispatchModalLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                        <h4 class="modal-title text-center" id="dispatchModalLabel">配置权限</h4>
                    </div>
                    <div class="modal-body" >
                        <div>
                            <ul class="nav menu" v-for='ap in allPermissions'>
                                <li class="parent">
                                    <a href="javascript:void(0)">
                                        <span class="glyphicon glyphicon-list"></span>{{ap.name}} <span data-toggle="collapse" :href="'#'+ap.name" class="icon pull-right"><em class="glyphicon glyphicon-s glyphicon-chevron-down"></em></span>
                                    </a>
                                    <ul class="children collapse in" :id="ap.name">
                                        <div class="fixed-height">
                                            <li  v-for="f in ap.body">
                                                <input type="checkbox" :id="f.id" :value="f.id" v-model="permissionIds" >
                                                <label :for="f.id">{{f.name}}</label>
                                            </li>
                                        </div>
                                    </ul>
                                </li>
                            </ul>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>
                            <button type="submit" class="btn btn-primary" @click="doDispatch">确定</button>
                        </div>
                    </div>
                </div><!-- /.modal-content -->
            </div><!-- /.modal -->
        </div>
    </div>
</template>
<script>
    let getIdSelections=()=>{
        return $table.bootstrapTable('getSelections');
    }
    let statusMap={"VALID":"有效","INVALID":"无效"}
    let statusFormatter=(row, index )=>{
        return statusMap[row];
    }
    let $table;
    let initTable=()=>{
              $table=$("#table");
              $table.bootstrapTable({
                 url:'/backend/role/all',
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
                      title: '角色名',
                      align: 'center'
                  },
                  {
                      field: 'description',
                      title: '描述',
                      align: 'center'
                  },
                  {
                      field: 'status',
                      title: '状态',
                      align: 'center',
                      formatter: statusFormatter
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
                statusMap:'',
                title:'角色管理',
                role:{
                    title:'创建角色',
                    status:'',
                    name:'',
                    description:''
                },
                first:[],
                second:[],
                buttons:[],
                permissionIds:[],
                roleId:'',
                allPermissions:[],
                users:{
                    role:{
                        'all':false,
                        'save':false,
                        'delete':false,
                        'dispatch':false
                    }
                }
            }
        },
        methods:{
            doCheck(){
                let arr=getIdSelections();
                if(arr.length>1){
                    alertify.error("操作错误");
                    return null;
                }else if(arr.length===0){
                    alertify.error("请选择一个");
                    return null;
                }
                return arr;
            },
            doDelete(){
             let arr=this.doCheck();if(!arr) return;
             this.$http.post("/backend/role/delete/"+(arr[0].id)).
             then(({body})=>{
                if(body && body.status==0) alertify.success(body.message);
                $table.bootstrapTable('refresh');
             },()=>{
                 alertify.success("删除失败");
             })
           },
           doStart(){
            this.$http.post("/backend/role/save",JSON.stringify(Object.assign(getIdSelections()[0],{status:'VALID'}))).
             then(({body})=>{
                if(body && body.status==0) alertify.success("启用成功");
                $table.bootstrapTable('refresh');
             },()=>{
                 alertify.success("启用失败");
             })
           },
           doForbid(){
            this.$http.post("/backend/role/save",JSON.stringify(Object.assign(getIdSelections()[0],{status:'INVALID'}))).
             then(({body})=>{
                if(body && body.status==0) alertify.success("禁用成功");
                $table.bootstrapTable('refresh');
             },()=>{
                 alertify.success("禁用失败");
             })
           },
           startDispatch(){
              let arr=this.doCheck();if(!arr) return;this.roleId=arr[0].id;
              this.$http.post("/backend/permission/all").then(({body})=>{
                if(body){
                    var first=[],second=[],buttons=[];
                    body.forEach(v=>{
                    if(v.permissionType=="MENU1ST"){
                        first.push(v)
                    }else if(v.permissionType=="MENU2ND"){
                        second.push(v)
                    }else{
                        buttons.push(v)
                    }
                });
                this.allPermissions=[{name:'一级菜单',body:first},{name:'二级菜单',body:second},{name:'按钮级菜单',body:buttons}];
                }
              },()=>{
                alertify.error("获取权限失败");
              }).then(()=>{
                this.$http.post("/backend/role/getPermissionIdsByRid/"+this.roleId).then(({body})=>{
                    if(body && body.status==0){
                        this.permissionIds=body.content.map(pr=>pr.pid);
                    }
                })
              }).then(
                ()=>{
                     $("#dispatchModal").modal("show");
                }
              )

           },
           doDispatch(){
                this.$http.post("/backend/role/dispatch",JSON.stringify({id:this.roleId,subIds:this.permissionIds}))
                .then(({body})=>{
                    if(body && body.status==0){
                        alertify.success(body.message);
                    }else{
                       alertify.error("配置权限失败");
                    }
                },()=>{
                   alertify.error("配置权限失败");
                }).then(()=>{$("#dispatchModal").modal("hide");})
           },
           doCreate(){
                $.each(Object.keys(this.role),(index,v)=>{this.role[v]=''})
                this.role.title="创建角色";
                $("#roleModal").modal("show");
           },
           doUpdate(){
               let arr=this.doCheck();if(!arr) return;
                let el={...arr[0],title:'修改角色'};
                Object.assign(this.role,el);
                $("#roleModal").modal("show");
           },
           doCreateOrUpdate(){
               this.$http.post("/backend/role/save",JSON.stringify(this.role)).then(
                ({body})=>{
                       if(body && body.status===0){
                         alertify.success(body.message);
                         $("#roleModal").modal("hide");
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
            this.statusMap=statusMap;
            Object.assign(this.users.role,namespace.users.role || {})
        }
    }
</script>
