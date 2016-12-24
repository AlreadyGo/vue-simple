<style>
    .error{
        font-size:80%;
        color:red;
    }
    .text-center{
        text-align:center
    }
</style>
<template>
    <div class="row" style="margin-top: 5%">
        <div class="col-xs-10 col-xs-offset-1 col-sm-8 col-sm-offset-2 col-md-4 col-md-offset-4">
            <div class="login-panel panel panel-default">
                <div class="panel-heading text-center">用户登录</div>
                <div class="panel-body">
                    <form @submit.prevent="submit" class=" form-horizontal">
                        <fieldset>
                            <div class="form-group">
                                <div class="col-lg-12" :class="{'has-error':nameValid}">
                                    <input  placeholder="用户名" id="name" type="text" autofocus="" v-model.trim="form.name"
                                           :class="['form-control',{'tooltip-show':nameValid}]"  data-toggle="tooltip" data-placement="right" title="用户名不能为空"
                                    >
                                </div>
                            </div>
                            <div class="form-group">
                                <div class="col-lg-12" :class="{'has-error':passwordValid}">
                                    <input  placeholder="密码" id="password" type="password" v-model="form.password"
                                           :class="['form-control',{'tooltip-show':passwordValid}]"  data-toggle="tooltip" data-placement="right" title="密码不能为空"
                                    >
                                </div>
                            </div>
                            <div class="form-group">
                                <label class="col-lg-3 control-label " v-html="captcha"></label>
                                <div class="col-lg-9" :class="{'has-error':resultValid}">
                                    <input type="number"  id="captcha-result" placeholder="请输入计算结果" v-model.trim="result"
                                           :class="['form-control',{'tooltip-show':resultValid}]"  data-toggle="tooltip" data-placement="right" title="结果不正确"
                                    />
                                </div>
                            </div>
                            <div  class="form-group">
                                <button class=" btn btn-primary " style="margin-left: 40%">登录</button>
                                <a href="javascript:void(0)" style="padding-left:20px;color: black" data-toggle="modal" data-target="#registerModal">还没有账号?点击注册</a>
                            </div>
                        </fieldset>
                    </form>
                </div>
            </div>
        </div><!-- /.col-->
        <!-- 模态框（Modal） -->
        <div class="modal fade" id="registerModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                        <h4 class="modal-title text-center" id="myModalLabel">用户注册</h4>
                    </div>
                    <div class="modal-body">
                        <form class="form-horizontal">
                            <fieldset>
                                <div class="form-group">
                                    <label class="col-md-3 control-label" for="register-name">用户名:</label>
                                    <div class="col-md-9">
                                        <input class="form-control" placeholder="用户名" id="register-name" type="text"  v-model.trim="register.name">
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label class="col-md-3 control-label" for="register-email">邮箱:</label>
                                    <div class="col-md-9">
                                        <input class="form-control" placeholder="邮箱"  type="email" id="register-email" v-model.trim="register.email">
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label class="col-md-3 control-label" for="register-password">密码:</label>
                                    <div class="col-md-9">
                                        <input class="form-control" placeholder="密码"  type="text" id="register-password" v-model.trim="register.password">
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label class="col-md-3 control-label" for="register-repassword"> 确认密码:</label>
                                    <div class="col-md-9">
                                        <input class="form-control" placeholder="确认密码"  type="text"  id="register-repassword" v-model.trim="register.password">
                                    </div>
                                </div>
                            </fieldset>
                        </form>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>
                        <button type="button" class="btn btn-primary">提交注册</button>
                    </div>
                </div><!-- /.modal-content -->
            </div><!-- /.modal -->
        </div>
    </div><!-- /.row -->
</template>
<style>
    body{
        background-color:#ff0000;
    }
</style>
<script>
    import { USER_SIGNIN } from '../../store/user'
    export default{
        data(){
            return{
                btn: false, //true 已经提交过， false没有提交过
				form: {
					password: '',
					name: ''
				},
				register:{
				    name:'',
				    email:'',
				    password:''
				},
				result:'',
				correct:0
            }
        },
        methods:{
            submit(){
                this.btn = true;
				if(this.totalValid) return;
				this.$store.commit(USER_SIGNIN,Object.assign(this.form,{password:''}));
				this.$router.replace({ path: '/main/home' });
            },
            randomNumber(min, max) {
            return Math.floor(Math.random() * (max - min + 1) + min);
            }
        },
        computed:{
            captcha(){
                let first=this.randomNumber(1, 10),second=this.randomNumber(1, 10);
                this.correct=first+second;
                return [first, '+', second, '='].join(' ')
            },
            nameValid(){
               return  this.btn && !this.form.name;
            },
            passwordValid(){
                return this.btn && !this.form.password;
            },
            resultValid(){
                return this.btn && (!this.result || (this.result!=this.correct))
            },
            totalValid(){
                if(this.nameValid){
                    $("#name").tooltip();
                }else{
                    $("#name").tooltip('destroy');
                }
                if(this.passwordValid){
                   $("#password").tooltip();
                }else{
                   $("#password").tooltip('destroy');
                }
                if(this.resultValid){
                   $("#captcha-result").tooltip();
                }else{
                    $("#captcha-result").tooltip('destroy');
                }
                return this.nameValid && this.passwordValid && this.resultValid;
            }
        }
    }
</script>
