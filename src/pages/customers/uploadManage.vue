<template>
    <div>
        <v-header :title="title"></v-header>
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
    export default{
        data(){
            return{
                title:'上传管理'
            }
        },
    }
</script>
