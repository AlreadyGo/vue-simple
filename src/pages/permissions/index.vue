<template>
    <div class="main" >
        <div class="row">
            <div class="col-lg-12">
                <div class="panel panel-default">
                    <div class="panel-heading">{{title}}</div>
                    <div class="panel-body">
                        <div id="toolbar">
                            <button id="dispatcher" class="btn btn-primary"  @click="doUpdate">
                                <i class="glyphicon  glyphicon-edit"></i> 编辑权限
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
    let getIdSelections=()=>{
        return $.map($('#table').bootstrapTable('getSelections'), function (row) {
                    return row.id
                });
    }
    let typeMap={'BUTTON':'按钮','MENU2ND':'二级菜单','MENU1ST':'一级菜单','URL':'URL'}
    let typeFormatter=(row,index)=>{
        return typeMap[row];
    }
    let initTable=()=>{
              $("#table").bootstrapTable({
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
                title:'权限管理'
            }
        },
        methods:{
           doUpdate(){
            console.log(getIdSelections())
           }
        },
        mounted(){
            initTable();
        }
    }
</script>
