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
                                    <div class="form-group">
                                        <div class="col-lg-12" :class="{'has-error':nameNotValid}">
                                        <input  class="form-control" placeholder="用户名" id="name" type="text"  v-model.trim="form.name" required
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
                                        <label class="col-lg-3 control-label " id="capContainer"></label>
                                        <div class="col-lg-9" :class="{'has-error':resultNotValid}">
                                        <input type="number"  id="captcha-result" placeholder="请输入计算结果" v-model.trim="result"
                                        :class="['form-control',{'tooltip-show':resultNotValid}]"   data-placement="right" title="结果不正确"
                                        />
                                        </div>
                                    </div>
                                    <div  >
                                        <button class=" btn " style="margin-left: 40%" type="submit">登录</button>
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
            <div class="form-group">
                <label class="col-md-2 control-label" for="register-name">用户名:</label>
                <div class="col-md-10">
                    <input class="form-control" placeholder="用户名" id="register-name" type="text"  v-model.trim="register.name" required autofocus="autofocus">
                </div>
            </div>
            <div class="form-group">
                <label class="col-md-2 control-label" for="register-email">邮箱:</label>
                <div class="col-md-10">
                    <input class="form-control" placeholder="邮箱"  type="email" id="register-email" v-model.trim="register.email" required>
                </div>
            </div>
            <div class="form-group">
                <label class="col-md-2 control-label" for="register-password">密码:</label>
                <div class="col-md-10">
                    <input class="form-control" placeholder="密码"  type="password" id="register-password" v-model.trim="register.password" required pattern=".{6,}" title="密码至少为6位">
                </div>
            </div>
            <div class="form-group">
                <label class="col-md-2 control-label" for="register-repassword"> 确认密码:</label>
                <div class="col-md-10" :class="{'has-error':!isEq}">
                    <input class="form-control" placeholder="确认密码"  type="password"  id="register-repassword" v-model.trim="register.rpassword" required @keyup="isEqFunc">
                    <span class="error" v-show="!isEq">两次密码需一致,且保证6位以上</span>
                </div>
            </div>
        </v-modal>
        <div class="backstretch" style="left: 0px; top: 0px;  margin: 0px; padding: 0px; z-index: -999999; position: fixed;">
            <img :src="src" style=" border: none;  max-height: none; max-width: none;height:150%;width:150%;   z-index: -999999; ">
        </div>
    </div>

</template>
<style>
    .inner-bg {
        margin-top: 5%;
    }
    .element-center{
        margin:0 auto;
        width:45%
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
        font-size: 66px;
        color: #ddd;
        line-height: 100px;
        text-align: right;
    }
    .error{
        color:red;
    }
    .text-center{
        text-align:center
    }


.login-form input[type="password"],
.login-form input[type="text"],
.login-form input[type="email"],
.login-form input[type="number"],
.login-form textarea,
.login-form textarea.form-control {
	height: 50px;
    margin: 0;
    padding: 0 20px;
    vertical-align: middle;
    background: #f8f8f8;
    border: 3px solid #ddd;
    font-family: 'Roboto', sans-serif;
    font-size: 16px;
    font-weight: 300;
    line-height: 50px;
    color: #888;
    -moz-border-radius: 4px; -webkit-border-radius: 4px; border-radius: 4px;
    -o-transition: all .3s; -moz-transition: all .3s; -webkit-transition: all .3s; -ms-transition: all .3s; transition: all .3s;
}

.login-form button.btn {
	height: 50px;
    margin: 0;
    padding: 0 20px;
    vertical-align: middle;
    background: #4aaf51;
    border: 0;
    font-family: 'Roboto', sans-serif;
    font-size: 16px;
    font-weight: 300;
    line-height: 50px;
    color: #fff;
     -moz-border-radius: 4px; -webkit-border-radius: 4px; border-radius: 4px;
    text-shadow: none;
     -moz-box-shadow: none; -webkit-box-shadow: none; box-shadow: none;
     -o-transition: all .3s; -moz-transition: all .3s; -webkit-transition: all .3s; -ms-transition: all .3s; transition: all .3s;
}

.login-form button.btn:hover { opacity: 0.6; color: #fff; }

.login-form button.btn:active { outline: 0; opacity: 0.6; color: #fff; -moz-box-shadow: none; -webkit-box-shadow: none; box-shadow: none; }

.login-form button.btn:focus { outline: 0; opacity: 0.6; background: #4aaf51; color: #fff; }

.login-form button.btn:active:focus, button.btn.active:focus { outline: 0; opacity: 0.6; background: #4aaf51; color: #fff; }

</style>
<script>
    import { USER_SIGNIN } from '../../store/user'
    import { mapActions } from 'vuex'
    import bg from './bg.jpg'
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
        methods:{
            ...mapActions([USER_SIGNIN]),
            submit(){
                this.btn = true;
				if(this.nameNotValid || this.passwordNotValid || this.resultNotValid) return;
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
            isEqFunc(){
                this.isEq=(this.register.password==this.register.rpassword)
            },
            doRegister(){
                if(this.isEq && this.register.name && this.register.email && this.register.password){
                    if(this.register.password.length<6 || (this.register.password!=this.register.rpassword)){
                        this.isEq=false;
                        return;
                    }
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
        },
        mounted(){
            this.createCap()
        }
    }
</script>
