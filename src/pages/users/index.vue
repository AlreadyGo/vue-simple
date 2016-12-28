<template>
    <div class="main" >
        <div class="row">
            <div class="col-lg-12">
                <div class="panel panel-default">
                    <div class="panel-heading">{{title}}</div>
                    <div class="panel-body">
                        <div id="toolbar">
                            <button id="remove" class="btn btn-warning"  @click="doForbid">
                                <i class="glyphicon glyphicon-warning-sign"></i> 禁用
                            </button>
                            <button  class="btn btn-info"  @click="doStart">
                                <i class="glyphicon glyphicon-ok"></i> 启用
                            </button>
                            <button id="dispatcher" class="btn btn-primary"  @click="doDispatch">
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
</template>
<script>
    import moment from 'moment';
    import alertify from 'alertifyjs';
    let getIdSelections=()=>{
        return $table.bootstrapTable('getSelections');
    }
    let timeFormatter=(row, index )=>{
        return moment(row).format("YYYY-MM-DD HH:mm");
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
                title:'用户管理'
            }
        },
        methods:{
           doStart(){
            this.$http.post("/backend/user/save",JSON.stringify(Object.assign(getIdSelections()[0],{status:'VALID'}))).
             then(({body})=>{
                if(body.status==0) alertify.success("启用成功");
                $table.bootstrapTable('refresh');
             },()=>{
                 alertify.success("启用失败");
             })
           },
           doForbid(){
            this.$http.post("/backend/user/save",JSON.stringify(Object.assign(getIdSelections()[0],{status:'INVALID'}))).
             then(({body})=>{
                if(body.status==0) alertify.success("禁用成功");
                $table.bootstrapTable('refresh');
             },()=>{
                 alertify.success("禁用失败");
             })
           },
           doDispatch(){
            console.log(getIdSelections())
           }
        },
        mounted(){
            initTable();
        }
    }
</script>
