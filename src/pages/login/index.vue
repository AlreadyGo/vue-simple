<template>
    <div class="login-form">
        <div class="inner-bg">
            <div class="container">
                <div class="row">
                    <div class="element-center">
                        <div class="form-top">
                            <div class="form-top-left">
                                <h3>用户登录</h3>
                                <div class="error" v-show="errLogin">用户名或密码不正确</div>
                            </div>
                            <div class="form-top-right">
                            </div>
                        </div>
                        <div class="form-bottom">
                            <form @submit.prevent="submit" class=" form-horizontal">
                                <fieldset>
                                    <div class="form-group" :class="{'has-error':$v_form.name.$error}">
                                        <div class="col-lg-12">
                                        <input  class="form-control" placeholder="用户名" id="name" type="text"  v-model.trim="form.name" required  @input="$v_form.name.$touch()"
                                        >
                                            <span class="form-group-message" v-if="!$v_form.name.required">用户名必填</span>
                                        </div>
                                    </div>
                                    <div class="form-group" :class="{'has-error':$v_form.password.$error}">
                                        <div class="col-lg-12">
                                        <input  placeholder="密码" id="password" type="password" v-model="form.password" required class="form-control"  @input="$v_form.password.$touch()"
                                        >
                                            <span class="form-group-message" v-if="!$v_form.password.required">密码必填</span>
                                        </div>
                                    </div>
                                    <!--<div class="form-group">-->
                                        <!--<label class="col-lg-3 control-label " id="capContainer"></label>-->
                                        <!--<div class="col-lg-9" :class="{'has-error':resultNotValid}">-->
                                        <!--<input type="number"  id="captcha-result" placeholder="请输入计算结果" v-model.trim="result"-->
                                        <!--:class="['form-control',{'tooltip-show':resultNotValid}]"   data-placement="right" title="结果不正确"-->
                                        <!--/>-->
                                        <!--</div>-->
                                    <!--</div>-->
                                    <div  >
                                        <button class=" btn btn-primary" style="margin-left: 40%" type="submit">登录</button>
                                        <a href="javascript:void(0)" style="padding-left:20px;color: black" data-toggle="modal" data-target="#registerModal">还没有账号?点击注册</a>
                                    </div>
                                </fieldset>
                                </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <v-modal vmodal-id="registerModal" vmodal-labelledby="registerModalLabel" vmodal-title="用户注册" :vmodal-submit="doRegister" class="inner-bg">
            <div class="form-group" :class="{'has-error':$v_register.name.$error}">
                <label class="col-md-2 control-label" for="register-name">用户名:</label>
                <div class="col-md-10">
                    <input class="form-control" placeholder="用户名" id="register-name" type="text"  v-model.trim="register.name" autofocus="autofocus" @input="$v_register.name.$touch()">
                    <span class="form-group-message" v-if="!$v_register.name.required">用户名必填</span>
                    <span class="form-group-message" v-if="!$v_register.name.isUnique">用户名已存在</span>
                </div>
            </div>
            <div class="form-group" :class="{'has-error':$v_register.email.$error}">
                <label class="col-md-2 control-label" for="register-email">邮箱:</label>
                <div class="col-md-10">
                    <input class="form-control" placeholder="邮箱"  type="email" id="register-email" v-model.trim="register.email" @input="$v_register.email.$touch()">
                    <span class="form-group-message" v-if="!$v_register.email.email">填写正确的邮箱格式</span>
                </div>
            </div>
            <div class="form-group" :class="{'has-error':$v_register.password.$error}">
                <label class="col-md-2 control-label" for="register-password">密码:</label>
                <div class="col-md-10">
                    <input class="form-control" placeholder="密码"  type="password" id="register-password" v-model.trim="register.password" @input="$v_register.password.$touch()" >
                    <span class="form-group-message" v-if="!$v_register.password.minLength">必填,长度不小于6</span>
                </div>
            </div>
            <div class="form-group" :class="{'has-error':!$v_register.rpassword.sameAsPassword}">
                <label class="col-md-2 control-label" for="register-rpassword"> 确认密码:</label>
                <div class="col-md-10">
                    <input class="form-control" placeholder="确认密码"  type="password"  id="register-rpassword" v-model.trim="register.rpassword" >
                    <span class="form-group-message" v-if="!$v_register.rpassword.sameAsPassword">两次密码需一致</span>
                </div>
            </div>
        </v-modal>
        <div class="black_overlay">
            <img :src="src">
        </div>
    </div>

</template>
<style>

</style>
<style>
    .has-error {
        color: #f04124;
    }
    .has-error input{
        border-color: #f04124;
    }
    .form-group-message {
        line-height: 1;
        display: none;
        margin-left: 14px;
        margin-top: 0.5rem;
        margin-bottom: -1rem;
    }
    .has-error .form-group-message {
        display: block;
        color: #f57f6c;
    }
    .inner-bg {
        margin-top: 5%;
    }
    .element-center{
        margin:0 auto;
        width:35%
    }
    .form-top {
        overflow: hidden;
        padding: 0 25px 15px 25px;
        background: #fff;
        -moz-border-radius: 4px 4px 0 0;
        -webkit-border-radius: 4px 4px 0 0;
        border-radius: 4px 4px 0 0;
        text-align: left;
    }
    .form-bottom {
        padding: 25px 25px 30px 25px;
        background: #eee;
        -moz-border-radius: 0 0 4px 4px;
        -webkit-border-radius: 0 0 4px 4px;
        border-radius: 0 0 4px 4px;
        text-align: left;
    }
    .form-top-left {
        float: left;
        width: 75%;
        padding-top: 25px;
    }
    .form-top-right {
        float: left;
        width: 25%;
        padding-top: 5px;
        font-size: 50px;
        color: #ddd;
        line-height: 60px;
        text-align: right;
    }
    .error{
        color:red;
    }


</style>
<script>
    import { USER_SIGNIN } from '../../store/user'
    import { mapActions } from 'vuex'
    import bg from './bg.jpg'
    import { required, minLength, between,sameAs,email } from 'vuelidate/lib/validators'
    import  isUnique from '../../common/validations/isUnique'

    export default{
        data(){
            return{
                src:bg,
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
        validations: {
            form: {
                password: {
                    required
                },
                name: {
                    required
                }
            },
            register:{
                name:{
                    required,
                    isUnique
                },
                email:{
                    required,
                    email
                },
                password:{
                    required,
                    minLength: minLength(6)
                },
                rpassword:{
                    required,
                    sameAsPassword: sameAs('password')
                }
            }
        },
        methods:{
            ...mapActions([USER_SIGNIN]),
            submit(){
                this.btn = true;
				if(this.$v_form.$invalid) return;
				let timestamp=Date.now();
                post("/backend/login/"+timestamp,{name:this.form.name,password:this.form.password}).
                then(body=>{
                    if(body.status==0 && body.content){
                        this.USER_SIGNIN(Object.assign(this.form,{password:'',timestamp}));
				        this.$router.replace({ path: '/main/home' });
                    }else{
                        throw new Error("登录失败")
                    }
                }).catch(e=>{
                    this.createCap();
                    this.errLogin=true;
                })
            },
            randomNumber(min, max) {
            return Math.floor(Math.random() * (max - min + 1) + min);
            },
            doRegister(){
                if(!this.$v_register.$invalid){
                    post("/backend/user/save",this.register).then(body=>{
                        if(body.status===0){
                            $("#registerModal").modal("hide");
                            let timestamp=Date.now();
                            post("/backend/login/"+timestamp,{name:this.register.name}).
                            then(body=>{
                                if(body.status==0 && body.content){
                                    this.USER_SIGNIN(Object.assign(this.register,{password:'',timestamp}));
                                    this.$router.replace({ path: '/goHome' });
                                }else{
                                    this.errLogin=true;
                                }
                            })
                        }else{
                            throw new Error()
                        }
                    }).catch(v=>{
                         alertify.error('注册失败,用户名不能重复');
                    })
                }
            },
            createCap(){
                let first=this.randomNumber(1, 10),second=this.randomNumber(1, 10);
                this.correct=first+second;
                let $capContainer=$("#capContainer"),height=$capContainer.next().height();
                let $cap=$('<canvas style="border:1px solid #d3d3d3;" >\
	                验证码无法显示</canvas>').attr('width',$capContainer.width()).attr('height',height);
                var ctx=$cap[0].getContext("2d");
                    ctx.font="30px Arial";
                    ctx.fillText([first, '+', second, '='].join(' '),0,height*0.6);
                $capContainer.children().remove();
                $capContainer.append($cap)
            }
        },
        computed:{
            $v_register(){
                return this.$v.register;
            },
            $v_form(){
                return this.$v.form;
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
        },
        mounted(){
            this.createCap();
        }
    }
</script>
