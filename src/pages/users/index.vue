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
        <div  >
            <div class="row">
                <div class="col-lg-12">
                    <div class="panel panel-default">
                        <!--<div class="panel-heading">{{title}}</div>-->
                        <div class="panel-body">
                            <div id="toolbar">
                                <button id="remove" class="btn btn-warning"  @click="doForbid" v-if="users.user.save">
                                    <i class="glyphicon glyphicon-remove"></i> 禁用
                                </button>
                                <button  class="btn btn-info"  @click="doStart" v-if="users.user.save">
                                    <i class="glyphicon glyphicon-ok"></i> 启用
                                </button>
                                <button id="dispatcher" class="btn btn-primary"  @click="startDispatch" v-if="users.user.dispatch">
                                    <i class="glyphicon glyphicon-asterisk"></i> 分配角色
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
        <div class="modal" id="dispatchModal" tabindex="-1" role="dialog" aria-labelledby="dispatchModalLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                        <h4 class="modal-title text-center" id="dispatchModalLabel">分配角色</h4>
                    </div>
                    <div class="form-group">
                        <div class="fixed-height">
                            <div v-for="f in allRoles" class="col-md-3">
                                <input type="checkbox" :id="f.id" :value="f.id" v-model="rids" >
                                <label :for="f.id">{{f.name}}</label>
                            </div>
                        </div>
                    </div>
                    <div class="modal-body" >
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
           doStart(){
            this.$http.post("/backend/user/save",JSON.stringify(Object.assign(getIdSelections()[0],{status:'VALID'}))).
             then(({body})=>{
                if(body && body.status==0) alertify.success("启用成功");
                $table.bootstrapTable('refresh');
             },()=>{
                 alertify.success("启用失败");
             })
           },
           doForbid(){
            this.$http.post("/backend/user/save",JSON.stringify(Object.assign(getIdSelections()[0],{status:'INVALID'}))).
             then(({body})=>{
                if(body && body.status==0) alertify.success("禁用成功");
                $table.bootstrapTable('refresh');
             },()=>{
                 alertify.success("禁用失败");
             })
           },
           startDispatch(){
              let arr=this.doCheck();if(!arr) return;this.userId=arr[0].id;
              this.$http.post("/backend/role/all").then(({body})=>{
                if(body)
                this.allRoles=body;
              },()=>{
                alertify.error("获取角色失败");
              }).then(()=>{
                    this.$http.post("/backend/user/getRolesByUid/"+this.userId).then(({body})=>{
                        if(body)
                        this.rids=body.content.map(ur=>ur.rid);
                    })
                }).then(
                ()=>{
                     $("#dispatchModal").modal("show");
                }
              )

           },
           doDispatch(){
             this.$http.post("/backend/user/dispatch",JSON.stringify({id:this.userId,subIds:this.rids}))
                .then(({body})=>{
                    if(body && body.status==0){
                        alertify.success(body.message);
                    }
                },()=>{
                   alertify.error("配置角色失败");
                }).then(()=>{$("#dispatchModal").modal("hide");})
           }
        },
        mounted(){
            let namespace=this.$store.state.permissions;
            initTable();
            Object.assign(this.users.user,namespace.users.user || {})
        }
    }
</script>
