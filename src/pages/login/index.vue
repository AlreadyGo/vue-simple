<template>
    <div class="row" >
        <div class="col-xs-10 col-xs-offset-1 col-sm-8 col-sm-offset-2 col-md-4 col-md-offset-4">
            <div class="login-panel panel panel-default">
                <div class="panel-heading text-center">用户登录</div>
                <div class="panel-body">
                    <form @submit.prevent="submit" class=" form-horizontal">
                        <fieldset>
                            <div class="error text-center" v-show="errLogin">用户名或密码不正确</div>
                            <div class="form-group">
                                <div class="col-lg-12" :class="{'has-error':nameNotValid}">
                                    <input  class="form-control" placeholder="用户名" id="name" type="text" autofocus="autofocus" v-model.trim="form.name" required
                                    >
                                </div>
                            </div>
                            <div class="form-group">
                                <div class="col-lg-12" :class="{'has-error':passwordNotValid}">
                                    <input  placeholder="密码" id="password" type="password" v-model="form.password" required class="form-control"
                                    >
                                </div>
                            </div>
                            <div class="form-group">
                                <label class="col-lg-3 control-label " v-html="captcha"></label>
                                <div class="col-lg-9" :class="{'has-error':resultNotValid}">
                                    <input type="number"  id="captcha-result" placeholder="请输入计算结果" v-model.trim="result"
                                           :class="['form-control',{'tooltip-show':resultNotValid}]"   data-placement="right" title="结果不正确"
                                    />
                                </div>
                            </div>
                            <div  class="form-group">
                                <button class=" btn btn-primary " style="margin-left: 40%" type="submit">登录</button>
                                <a href="javascript:void(0)" style="padding-left:20px;color: black" data-toggle="modal" data-target="#registerModal">还没有账号?点击注册</a>
                            </div>
                        </fieldset>
                    </form>
                </div>
            </div>
        </div>
        <div class="modal" id="registerModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                        <h4 class="modal-title text-center" id="myModalLabel">用户注册</h4>
                    </div>
                    <div class="modal-body">
                        <form class="form-horizontal" @submit.prevent="doRegister">
                            <fieldset>
                                <div class="form-group">
                                    <label class="col-md-3 control-label" for="register-name">用户名:</label>
                                    <div class="col-md-9">
                                        <input class="form-control" placeholder="用户名" id="register-name" type="text"  v-model.trim="register.name" required>
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label class="col-md-3 control-label" for="register-email">邮箱:</label>
                                    <div class="col-md-9">
                                        <input class="form-control" placeholder="邮箱"  type="email" id="register-email" v-model.trim="register.email" required>
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label class="col-md-3 control-label" for="register-password">密码:</label>
                                    <div class="col-md-9">
                                        <input class="form-control" placeholder="密码"  type="password" id="register-password" v-model.trim="register.password" required pattern=".{6,}" title="密码至少为6位">
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label class="col-md-3 control-label" for="register-repassword"> 确认密码:</label>
                                    <div class="col-md-9" :class="{'has-error':!isEq}">
                                        <input class="form-control" placeholder="确认密码"  type="password"  id="register-repassword" v-model.trim="register.rpassword" required @keyup="isEqFunc">
                                        <span class="error" v-show="!isEq">两次密码需一致,且保证6位以上</span>
                                    </div>
                                </div>
                            </fieldset>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>
                                <button type="submit" class="btn btn-primary">提交注册</button>
                            </div>
                        </form>
                    </div>
                </div><!-- /.modal-content -->
            </div><!-- /.modal -->
        </div>
    </div>
</template>
<style>
    .error{
        font-size:80%;
        color:red;
    }
    .text-center{
        text-align:center
    }
</style>
<script>
    import { USER_SIGNIN } from '../../store/user'
    import { mapActions } from 'vuex'
    import alertify  from 'alertifyjs'
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
				    password:'',
				    rpassword:''
				},
				result:'',
				correct:0,
				isEq:true,
				errLogin:false
            }
        },
        methods:{
            ...mapActions([USER_SIGNIN]),
            submit(){
                this.btn = true;
				if(this.nameNotValid || this.passwordNotValid || this.resultNotValid) return;
				let timestamp=Date.now();
                this.$http.post("/backend/login/"+timestamp,JSON.stringify({name:this.form.name})).
                then(({body})=>{
                    if(body.status==0 && body.content){
                        this.USER_SIGNIN(Object.assign(this.form,{password:'',timestamp}));
				        this.$router.replace({ path: '/main/home' });
                    }else{
                        this.errLogin=true;
                    }
                })
            },
            randomNumber(min, max) {
            return Math.floor(Math.random() * (max - min + 1) + min);
            },
            isEqFunc(){
                this.isEq=(this.register.password==this.register.rpassword)
            },
            doRegister(){
                if(this.isEq && this.register.name && this.register.email && this.register.password){
                    if(this.register.password.length<6 || (this.register.password!=this.register.rpassword)){
                        this.isEq=false;
                        return;
                    }
                    this.$http.post("/backend/user/save",JSON.stringify(this.register)).then(({body})=>{
                        if(body.status===0){
                            $("#registerModal").modal("hide");
                            let timestamp=Date.now();
                            this.$http.post("/backend/login/"+timestamp,JSON.stringify({name:this.register.name})).
                            then(({body})=>{
                                if(body.status==0 && body.content){
                                    this.USER_SIGNIN(Object.assign(this.register,{password:'',timestamp}));
                                    this.$router.replace({ path: '/goHome' });
                                }else{
                                    this.errLogin=true;
                                }
                            })
                        }
                    },v=>{
                         alertify.error('注册失败,用户名不能重复');
                    })
                }
            }
        },
        computed:{
            captcha(){
                let first=this.randomNumber(1, 10),second=this.randomNumber(1, 10);
                this.correct=first+second;
                return [first, '+', second, '='].join(' ')
            },
            nameNotValid(){
                return  this.btn && !this.form.name;
            },
            passwordNotValid(){
                return this.btn && !this.form.password;
            },
            resultNotValid(){
                var valid= this.btn && (!this.result || (this.result!=this.correct));
                if(valid){
                   $("#captcha-result").tooltip('show');
                }else{
                    $("#captcha-result").tooltip('destroy');
                }
                return valid;
            },
        }
    }
</script>
