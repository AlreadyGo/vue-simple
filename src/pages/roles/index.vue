<template>
    <div>
        <v-header :title="title"></v-header>
        <div >
            <div class="row">
                <div class="col-lg-12">
                    <div class="panel panel-default">
                        <!--<div class="panel-heading">{{title}}</div>-->
                        <div class="panel-body">
                            <div id="toolbar">
                                <button  class="btn btn-warning"  @click="doStartOrForbid(1)" v-if="users.role.status">
                                    <i class="glyphicon glyphicon-remove"></i> 禁用
                                </button>
                                <button  class="btn btn-info"  @click="doStartOrForbid(0)" v-if="users.role.status">
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
                            <table id="table"    data-show-refresh="true"  data-show-columns="true" data-search="true" data-select-item-name="toolbar1" data-pagination="true" data-sort-name="name" data-sort-order="desc"
                                   data-page-size="10" data-page-list="[5,10,20]"  data-toolbar="#toolbar"
                                   data-side-pagination="client" data-striped="true"
                            >
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <v-modal vmodal-id="roleModal" vmodal-labelledby="myModalLabel" :vmodal-title="role.title" :vmodal-submit="doCreateOrUpdate">
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
        </v-modal>
        <v-modal vmodal-id="dispatchModal" vmodal-labelledby="dispatchModalLabel" vmodal-title="配置权限" :vmodal-submit="doDispatch">
            <form role="search">
                <div class="">
                    <input type="text" class="form-control" placeholder="搜索权限" @keydown.enter v-model.trim="searchWord">
                </div>
            </form>
            <ul class="nav menu" v-for='ap in allPermissions'>
                <li class="parent">
                    <a href="javascript:void(0)">
                        <span class="glyphicon glyphicon-list"></span>{{ap.name}} <span data-toggle="collapse" :href="'#'+ap.name" class="icon pull-right"><em class="glyphicon glyphicon-s glyphicon-chevron-down"></em></span>
                    </a>
                    <ul class="children collapse in" :id="ap.name">
                        <div class="fixed-height">
                            <li  v-for="f in ap.body" v-show="searchWord=='' || !(f.name.indexOf(searchWord)<0)">
                                <input type="checkbox" :id="f.id" :value="f.id" v-model="permissionIds" >
                                <label :for="f.id">{{f.name}}</label>
                            </li>
                        </div>
                    </ul>
                </li>
            </ul>
        </v-modal>
    </div>
</template>
<script>
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
                searchWord:'',
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
            doDelete(){
            try{
             let arr=getSelections($table,true);
             arr.forEach(s=>{
                 post("/backend/role/delete/"+(s.id)).
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
           doStartOrForbid(flag){
               try{
                 post("/backend/role/updateStatus",Object.assign(getSelections($table)[0],{status:flag==0?'VALID':'INVALID'})).
                 then(body=>{
                    if(body && body.status==0){
                        alertify.success(body.message);
                        $table.bootstrapTable('refresh');
                    }else{
                        throw new Error(body.message);
                    }
                 })
               }catch(error){
                alertify.error(error.message);
               }
           },
           startDispatch(){
                try{
                      let arr=getSelections($table);this.roleId=arr[0].id;
                      post("/backend/permission/all").then(body=>{
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
                        }else{
                            throw new Error(commonErrorMessage);
                        }
                      }).then(()=>
                        post("/backend/role/getPermissionIdsByRid/"+this.roleId).then(body=>{
                            if(body && body.status==0){
                                this.permissionIds=body.content.map(pr=>pr.pid);
                            }
                        })
                      ).then(
                        ()=>{
                             $("#dispatchModal").modal("show");
                        }
                      )
                }catch(error){
                    alertify.error(error.message);
                }
           },
           doDispatch(){
                post("/backend/role/dispatch",{id:this.roleId,subIds:this.permissionIds})
                .then(body=>{
                    if(body && body.status==0){
                        alertify.success(body.message);
                    }else{
                       throw new Error(commonErrorMessage);
                    }
                }).catch(()=>{
                   alertify.error("配置权限失败");
                }).then(()=>{$("#dispatchModal").modal("hide");})
           },
           doCreate(){
                $.each(Object.keys(this.role),(index,v)=>{this.role[v]=''})
                this.role.title="创建角色";
                $("#roleModal").modal("show");
           },
           doUpdate(){
                try{
                   let arr=getSelections($table);
                    let el={...arr[0],title:'修改角色'};
                    Object.assign(this.role,el);
                    $("#roleModal").modal("show");
                }catch(error){
                    alertify.error(error.message)
                }
           },
           doCreateOrUpdate(){
               post("/backend/role/save",this.role).then(
                body=>{
                       if(body && body.status===0){
                         alertify.success(body.message);
                         $("#roleModal").modal("hide");
                         $table.bootstrapTable('refresh');
                       }else{
                         throw new Error(body.message);
                       }
                    }).catch(v=>{
                         alertify.error(v.message);
                    }
               )
           }
        },
        mounted(){
            let namespace=this.$store.state.permissions;
            this.$parent.current.item="users.role";
            initTable();
            this.statusMap=statusMap;
            Object.assign(this.users.role,namespace.users.role || {})
        }
    }
</script>
