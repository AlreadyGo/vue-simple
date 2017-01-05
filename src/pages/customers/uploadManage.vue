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
        <div>
            <div class="row">
                <div class="col-lg-12">
                    <div class="panel panel-default">
                        <div class="panel-body">
                            <label class="btn btn-primary btn-file">
                                上传 <input type="file" style="display: none;" >
                            </label>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<style>

</style>
<script>
    $(document).on('change', ':file', function() {
            var body = new FormData();
            body.append('file', $(this).get(0).files[0]);
            body.append('user', 'hubot');
            fetch('/avatars', {
              method: 'POST',
              body
            });
    });
    export default{
        data(){
            return{
                title:'上传管理'
            }
        },
    }
</script>
