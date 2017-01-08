<template>
    <div class="modal" :id="vmodalId" tabindex="-1" role="dialog" :aria-labelledby="vmodalLabelledby" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                    <h4 class="modal-title text-center" :id="vmodalLabelledby">{{vmodalTitle}}</h4>
                </div>
                <div class="modal-body">
                    <form class="form-horizontal" @submit.prevent="vmodalSubmit">
                        <fieldset>
                            <slot>
                            </slot>
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
</template>
<style>
</style>
<script>
    export default{
        props: {
            vmodalTitle: {
                type: String,
                default: ''
            },
            vmodalId:{
                type: String,
                default: ''
            },
            vmodalLabelledby:{
                type: String,
                default: ''
            },
            vmodalSubmit:{
                type: Function,
                default:function(){

                }
            }
        }
    }
</script>
