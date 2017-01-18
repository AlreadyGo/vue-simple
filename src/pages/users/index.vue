<template>
    <div>
        <v-header :title="title"></v-header>
        <div  >
            <div class="row">
                <div class="col-lg-12">
                    <div class="panel panel-default">
                        <!--<div class="panel-heading">{{title}}</div>-->
                        <div class="panel-body">
                            <div id="toolbar">
                                <button id="remove" class="btn btn-warning"  @click="doStartOrForbid(1)" v-if="users.user.status">
                                    <i class="glyphicon glyphicon-remove"></i> 禁用
                                </button>
                                <button  class="btn btn-info"  @click="doStartOrForbid(0)" v-if="users.user.status">
                                    <i class="glyphicon glyphicon-ok"></i> 启用
                                </button>
                                <button id="dispatcher" class="btn btn-primary"  @click="startDispatch" v-if="users.user.dispatch">
                                    <i class="glyphicon glyphicon-asterisk"></i> 分配角色
                                </button>
                            </div>
                            <table id="table"    data-show-refresh="true"  data-show-columns="true" data-search="true" data-select-item-name="toolbar1" data-pagination="true" data-sort-name="name" data-sort-order="desc"
                                   data-page-size="10" data-page-list="[5,10,20]" data-single-select="true" data-toolbar="#toolbar"
                                   data-side-pagination="client" data-striped="true"
                            >
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <v-modal vmodal-id="dispatchModal" vmodal-labelledby="dispatchModalLabel" vmodal-title="分配角色" :vmodal-submit="doDispatch">
            <div class="form-group">
                <div class="fixed-height">
                    <div v-for="f in allRoles" class="col-md-3">
                        <input type="checkbox" :id="f.id" :value="f.id" v-model="rids" >
                        <label :for="f.id">{{f.name}}</label>
                    </div>
                </div>
            </div>
        </v-modal>
    </div>
</template>
<script>
    let getSelections=()=>{
        let selections=$table.bootstrapTable('getSelections');
        if(selections.length===0) throw new Error("个数不能为0")
        return selections;
    }
    let timeFormatter=(row, index )=>{
        return (new Date(row)).format("yyyy-MM-dd hh:mm:ss");
    }
    let statusMap={"VALID":"有效","INVALID":"无效"}
    let statusFormatter=(row, index )=>{
        return statusMap[row];
    }
    let $table;
    let initTable=()=>{
              $table=$("#table");
              $table.bootstrapTable({
                 url:'/backend/user/all',
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
                      title: '用户名',
                      align: 'center'
                  },
                  {
                      field: 'email',
                      title: '邮箱',
                      align: 'center'
                  },
                  {
                      field: 'lastLogin',
                      title: '最近登录时间',
                      sortable: true,
                      align: 'center',
                      formatter: timeFormatter
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
                title:'用户管理',
                userId:'',
                rids:[],
                allRoles:[],
                users:{
                    user:{
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
                let arr=getSelections();
                if(arr.length>1){
                    alertify.error("操作错误");
                    return null;
                }else if(arr.length===0){
                    alertify.error("请选择一个用户");
                    return null;
                }
                return arr;
            },
           doStartOrForbid(flag){
            post("/backend/user/updateStatus",Object.assign(getSelections()[0],{status:flag==0?'VALID':'INVALID'})).
             then(body=>{
                if(body && body.status==0){
                    alertify.success(body.message);
                    $table.bootstrapTable('refresh');
                }else{
                    throw new Error();
                }
             }).catch(()=>{
                 alertify.success("操作失败");
             })
           },
           startDispatch(){
              let arr=this.doCheck();if(!arr) return;this.userId=arr[0].id;
              post("/backend/role/all").then(body=>{
                if(body && body.status===0)
                this.allRoles=body;
              }).then(()=>{
                    post("/backend/user/getRolesByUid/"+this.userId).then(body=>{
                        if(body && body.status===0){
                            this.rids=body.content.map(ur=>ur.rid);
                        }else{
                            throw new Error()
                        }
                    })
                }).then(
                ()=>{
                     $("#dispatchModal").modal("show");
                }
              ).catch(()=>{
                alertify.error("获取角色失败");
              })

           },
           doDispatch(){
             post("/backend/user/dispatch",{id:this.userId,subIds:this.rids})
                .then(body=>{
                    if(body && body.status==0){
                        alertify.success(body.message);
                    }else{
                        throw new Error()
                    }
                }).catch(()=>{
                   alertify.error("配置角色失败");
                }).then(()=>{$("#dispatchModal").modal("hide");})
           }
        },
        mounted(){
            let namespace=this.$store.state.permissions;
            this.$parent.current.item="users.user";
            initTable();
            Object.assign(this.users.user,namespace.users.user || {})
        }
    }
</script>
