<template>
    <div class="row" style="margin-top: 5%">
        <div class="col-xs-10 col-xs-offset-1 col-sm-8 col-sm-offset-2 col-md-4 col-md-offset-4">
            <div class="login-panel panel panel-default">
                <div class="panel-heading text-center">登录</div>
                <div class="panel-body">
                    <form @submit.prevent="submit">
                        <fieldset>
                            <div class="form-group">
                                <input class="form-control" placeholder="用户名" name="name" type="text" autofocus="" v-model="form.name">
                            </div>
                            <div class="form-group">
                                <input class="form-control" placeholder="密码" name="password" type="password" v-model="form.password">
                            </div>
                            <div class="checkbox">
                                <label>
                                    <input name="remember" type="checkbox" value="Remember Me">记住我
                                </label>
                            </div>
                            <div>
                                <button class=" btn btn-primary " style="margin-left: 40%">登录</button>
                                <a href="javascript:void(0)" style="padding-left:20px;color: black">还没有账号?点击注册</a>
                            </div>
                        </fieldset>
                    </form>
                </div>
            </div>
        </div><!-- /.col-->
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
				}
            }
        },
        methods:{
            submit(){
                this.btn = true;
				if(!this.form.password || !this.form.name) return;
				this.$store.commit(USER_SIGNIN,Object.assign(this.form,{password:''}));
				this.$router.replace({ path: '/main/home' });
            }
        }
    }
</script>
