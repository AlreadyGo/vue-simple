<template>
    <div id="personalInfoPart">
        <v-header :title="title"></v-header>
        <div>
            <div class="row">
                <div class="col-lg-12">
                    <div class="panel panel-default">
                        <div class="panel-body">
                            <div id="toolbar">
                                <button id="dispatcher" class="btn btn-primary"   @click="doUpdate" v-if="customers.personalInfo.save">
                                    <i class="glyphicon  glyphicon-edit"></i> 编辑
                                </button>
                                <button  class="btn btn-info"  @click="doCreate" v-if="customers.personalInfo.save">
                                    <i class="glyphicon  glyphicon-plus"></i> 添加
                                </button>
                                <label class="btn btn-primary">
                                    上传 <input type="file" style="display: none;" id="personalInfo-upload" accept=".xls?" multiple>
                                </label>
                                <button  class="btn btn-danger" @click="doDelete" v-if="customers.personalInfo.delete">
                                    <i class="glyphicon  glyphicon-remove"></i> 删除
                                </button>
                                <button  class="btn btn-info"  @click="viewUploadResult" v-if="customers.personalInfo.view">
                                    <i class="glyphicon glyphicon-eye-open"></i> 上传一览
                                </button>
                                <select class="btn" style="border: 1px solid #30a5ff;" v-model.number="searchKeys.dateRange" @change="changeByDateRange">
                                    <option value="1">最近一个月</option>
                                    <option value="3">最近三个月</option>
                                    <option value="6">最近半年</option>
                                    <option value="12">最近一年</option>
                                </select>
                            </div>
                            <table id="table"    data-show-refresh="true"  data-show-columns="true" data-search="true" data-select-item-name="toolbar1" data-pagination="true"  data-sort-name="create_date" data-sort-order="desc"
                                   data-page-size="5" data-page-list="[5,10,20,50]"  data-toolbar="#toolbar" data-advanced-search="true" data-id-table="advancedTable"
                                   data-side-pagination="client" data-striped="true"
                            >
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="modal fade" id="uploadResultModal" tabindex="-1" role="dialog" aria-labelledby="uploadResultModalLabel" aria-hidden="true">
            <div class="modal-dialog modal-lg">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span></button>
                        <h4 class="modal-title">上传一览</h4>
                    </div>
                    <div class="modal-body">
                        <table id="uploadResultTable"  data-pagination="true"  data-sort-order="desc" data-sort-name="create_date"
                               data-page-size="10"
                               data-side-pagination="client" data-striped="true"
                               data-height="400"
                        >
                        </table>
                    </div>
                </div><!-- /.modal-content -->
            </div><!-- /.modal-dialog -->
        </div><!-- /.modal -->

        <v-modal vmodal-id="personalInfoModal" vmodal-labelledby="myModalLabel" :vmodal-title="personalInfo.title" :vmodal-submit="doCreateOrUpdate">
            <div class="fixed-height">
                <div class="form-group margin0">
                    <label class="col-md-3 control-label" for="personalInfo-route">承运线路:</label>
                    <div class="col-md-9">
                        <input class="form-control" placeholder="承运线路" id="personalInfo-route" type="text"  v-model.trim="personalInfo.route" >
                    </div>
                </div>
                <div class="form-group margin0">
                    <label class="col-md-3 control-label" for="personalInfo-driverName">司机姓名:</label>
                    <div class="col-md-9">
                        <input class="form-control" placeholder="司机姓名" id="personalInfo-driverName" type="text"  v-model.trim="personalInfo.driverName" required>
                    </div>
                </div>
                <div class="form-group margin0">
                    <label class="col-md-3 control-label" for="personalInfo-carNum">车号:</label>
                    <div class="col-md-9">
                        <input class="form-control" placeholder="车号" id="personalInfo-carNum" type="text"  v-model.trim="personalInfo.carNum" required>
                    </div>
                </div>
                <div class="form-group margin0">
                    <label class="col-md-3 control-label" for="personalInfo-telephoneNum">手机号:</label>
                    <div class="col-md-9">
                        <input class="form-control" placeholder="手机号" id="personalInfo-telephoneNum" type="text"  v-model.trim="personalInfo.telephoneNum" required>
                    </div>
                </div>
                <div class="form-group margin0">
                    <label class="col-md-3 control-label" for="personalInfo-carType">车型:</label>
                    <div class="col-md-9">
                        <input class="form-control" placeholder="车型" id="personalInfo-carType" type="text"  v-model.trim="personalInfo.carType" required>
                    </div>
                </div>
                <div class="form-group margin0">
                    <label class="col-md-3 control-label" for="personalInfo-carTeam">车队:</label>
                    <div class="col-md-9">
                        <input class="form-control" placeholder="车队" id="personalInfo-carTeam" type="text"  v-model.trim="personalInfo.carTeam" >
                    </div>
                </div>
                <div class="form-group margin0">
                    <label class="col-md-3 control-label" for="personalInfo-bankNum">银行账号:</label>
                    <div class="col-md-9">
                        <input class="form-control" placeholder="银行账号" id="personalInfo-bankNum" type="text"  v-model.trim="personalInfo.bankNum" >
                    </div>
                </div>
                <div class="form-group margin0">
                    <label class="col-md-3 control-label" for="personalInfo-orderRate">接单频率:</label>
                    <div class="col-md-9">
                        <input class="form-control" placeholder="接单频率" id="personalInfo-orderRate" type="text"  v-model.trim="personalInfo.orderRate" >
                    </div>
                </div>
                <div class="form-group margin0">
                    <label class="col-md-3 control-label" for="personalInfo-serviceAbility">服务能力:</label>
                    <div class="col-md-9">
                        <input class="form-control" placeholder="服务能力" id="personalInfo-serviceAbility" type="text"  v-model.trim="personalInfo.serviceAbility" >
                    </div>
                </div>
                <div class="form-group margin0">
                    <label class="col-md-3 control-label" for="personalInfo-address">联系地址:</label>
                    <div class="col-md-9">
                        <input class="form-control" placeholder="联系地址" id="personalInfo-address" type="text"  v-model.trim="personalInfo.address" >
                    </div>
                </div>
                <div class="form-group margin0">
                    <label class="col-md-3 control-label" for="personalInfo-description">备注:</label>
                    <div class="col-md-9">
                        <input class="form-control" placeholder="备注" id="personalInfo-description" type="text"  v-model.trim="personalInfo.description" >
                    </div>
                </div>
            </div>
        </v-modal>
    </div>
</template>
<style>
</style>
<script>
    let $table,$modal,$uploadResultTable,$uploadResultModal,searchKeys={dateRange:3},
    commonColumns=[
    {
        field: 'route',
        title: '承运线路',
        sortable: true,
        align: 'center'
    },
    {
        field: 'driverName',
        title: '司机姓名',
        sortable: true,
        align: 'center'
    },
    {
        field: 'carNum',
        title: '车号',
        sortable: true,
        align: 'center'
    },
    {
        field: 'telephoneNum',
        title: '手机号',
        sortable: true,
        align: 'center'
    },
    {
        field: 'carType',
        title: '车型',
        sortable: true,
        align: 'center'
    },
    {
        field: 'carTeam',
        title: '车队',
        sortable: true,
        align: 'center'
    },
    {
        field: 'bankNum',
        title: '银行账号',
        sortable: true,
        align: 'center'
    },
    {
        field: 'orderRate',
        title: '接单频率',
        sortable: true,
        align: 'center'
    },
    {
        field: 'serviceAbility',
        title: '服务能力',
        sortable: true,
        align: 'center'
    },
    {
        field: 'address',
        title: '联系地址',
        sortable: true,
        align: 'center'
    },
    {
        field: 'description',
        title: '备注',
        sortable: true,
        align: 'center'
    },
    ];
    let timeFormatter=(row, index )=>{
        return (new Date(row)).format();
    },
    refreshTable=()=>{
        $table.bootstrapTable('refresh');
    },
    statusStyle= (value, row, index, field)=> {
      return {
        classes: '',
        css: {"color": value=="失败"?"red":""}
      };
    }
    $(document).on('change', '#personalInfo-upload', function() {
            let $this=$(this),files=$this.get(0).files;
            let body = new FormData();

            try {
                $.each(files, (i, file) => {
                    if (!excelReg.test(file.name)) {
                        throw new Error("上传文件格式不正确");
                    }
                    body.append('file[]', file);
                });
                upload('/backend/personalInfo/upload', body).then(v => {
                    $this.val("");
                    if (v && v.status === 0) {
                        alertify.success(v.message);
                        refreshTable();
                    } else {
                        throw new Error(v.message)
                    }

                }).catch(error => {
                    alertify.error(error.message);
                });
            }catch(error){
                alertify.error(error.message);
            }
    });
    function ajaxRequest(params) {
        formPost("/backend/personalInfo/all",Object.assign(params.data,searchKeys)).then(v=>{
             params.success(v)
        }).catch(e=>{
            alertify.error(e.message)
        })
    }
    function ajaxUploadResultRequest(params) {
        formPost("/backend/uploadResult/view/PERSONALINFO",Object.assign(params.data,searchKeys)).then(v=>{
             params.success(v)
        }).catch(e=>{
            alertify.error(e.message)
        })
    }
    function responseHandler(res) {
        return res;
    }

    let initTable=()=>{
              $table=$("#table")
              $table.bootstrapTable({
                 ajax: ajaxRequest,
                 responseHandler:responseHandler,
                 columns: [
                  [{
                      field: 'state',
                      align: 'center',
                      checkbox:true,
                  },
                  {
                      field: 'id',
                      title: 'ID',
                      sortable: true,
                      align: 'center',
                  },
                  {
                      field: 'updateDate',
                      title: '修改时间',
                      sortable: true,
                      align: 'center',
                      formatter: timeFormatter,
                  },
                  ...commonColumns,
                  {
                      field: 'createDate',
                      title: '创建时间',
                      sortable: true,
                      align: 'center',
                      formatter: timeFormatter,
                  },
                  ]
          ],
          onLoadSuccess: function(){

          },
          onLoadError: function(){

          }
      });
    };
    let initUploadResultTable=()=>{
              $uploadResultTable=$("#uploadResultTable")
              $uploadResultTable.bootstrapTable({
                 ajax: ajaxUploadResultRequest,
                 columns: [
                  [{
                      field: 'status',
                      title: '状态',
                      align: 'center',
                      sortable: true,
                      cellStyle:statusStyle
                  },
                  {
                      field: 'createDate',
                      title: '导入时间',
                      align: 'center',
                      formatter: timeFormatter,
                      sortable: true,
                  },
                  {
                      field: 'errorReason',
                      title: '错误原因',
                      align: 'center',
                  },
                  ...commonColumns
                  ]
          ],
      });
    };
    export default{
        data(){
            return{
                searchKeys: searchKeys,
                title:'个体司机信息',
                personalInfo:{
                    title:"添加个体司机信息",
                    route:"",
                    driverName:"",
                    carNum:"",
                    telephoneNum:"",
                    carType:"",
                    carTeam:"",
                    bankNum:"",
                    orderRate:"",
                    serviceAbility:"",
                    address:"",
                    description:"",
                },
                customers:{
                    personalInfo:{
                        'all':false,
                        'save':false,
                        'upload':false,
                        'view':false,
                        'delete':false,
                    }
                }            }
        },
        methods:{
            changeByDateRange(){
               refreshTable()
            },
            doCreateOrUpdate(){
                post("/backend/personalInfo/save",this.personalInfo).then(v=>{
                    if(v.status==0){
                        alertify.success(v.message);
                        $modal.modal("hide");
                        refreshTable();
                    }else{
                        throw new Error(v.message)
                    }
                }).catch(e=>{
                    alertify.error("操作失败")
                })
            },
            viewUploadResult(){
                $uploadResultTable.bootstrapTable('refresh');
                $uploadResultModal.modal("show")
            },
            doCreate(){
                $.each(Object.keys(this.personalInfo),(index,v)=>{this.personalInfo[v]=''})
                this.personalInfo.title="添加个体司机信息";
                $modal.modal("show");
            },
            doUpdate(){
                try{
                    let arr=getSelections($table);
                    let el={...arr[0],title:'个体司机信息'};
                    Object.assign(this.personalInfo,el);
                    $modal.modal("show");
                }catch(e){
                    alertify.error(e.message)
                }
            },
            doDelete(){
                alertify.confirm("提示信息","确定删除?",
                    function(){
                        try{
                            let arr=getSelections($table,true);
                            arr.forEach(s=>{
                                post(`/backend/personalInfo/delete/${s.id}`).
                            then(body=>{
                                if(body && body.status==0){
                                alertify.success(body.message);
                                $table.bootstrapTable('refresh');
                            }else{
                                alertify.error(body.message)
                            }
                        })
                        })
                        }catch(e){
                            alertify.error(e.message)
                        }
                    },
                    function(){
                });
            }
        },
        mounted(){
            let namespace=this.$store.state.permissions;
            $modal=$("#personalInfoModal");
            $uploadResultModal=$("#uploadResultModal");
            this.$parent.current.item="customers.personalInfo";
            initTable();
            initUploadResultTable();
            Object.assign(this.customers.personalInfo,namespace.customers.sendInfo || {})

        }
    }
</script>
