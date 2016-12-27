<template>
    <div class="main" >
        <div class="row">
            <div class="col-lg-12">
                <div class="panel panel-default">
                    <div class="panel-heading">{{title}}</div>
                    <div class="panel-body">
                        <div id="toolbar">
                            <button  class="btn btn-warning"  @click="doForbid">
                                <i class="glyphicon glyphicon-remove"></i> 禁用
                            </button>
                            <button  class="btn btn-primary"  @click="doDispatch">
                                <i class="glyphicon glyphicon-asterisk"></i> 配置权限
                            </button>
                            <button  class="btn btn-info"  @click="doDispatch">
                                <i class="glyphicon  glyphicon-edit"></i> 编辑角色
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
    let getIdSelections=()=>{
        return $.map($('#table').bootstrapTable('getSelections'), function (row) {
                    return row.id
                });
    }
    let statusMap={"VALID":"有效","INVALID":"无效"}
    let statusFormatter=(row, index )=>{
        return statusMap[row];
    }

    let initTable=()=>{
              $("#table").bootstrapTable({
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
                title:'角色管理'
            }
        },
        methods:{
           doForbid(){
            console.log(getIdSelections())
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
