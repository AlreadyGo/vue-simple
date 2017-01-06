<style>
    .sidebar ul.nav li.parent ul li.active a{
       color: #00b38a!important;
       background-color:white
    }
</style>
<template>
<div>
    <nav class="navbar navbar-inverse navbar-fixed-top" role="navigation" style="background-color:#00b38a">
        <div class="container-fluid">
            <div class="navbar-header">
                <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#sidebar-collapse">
                    <span class="sr-only">Toggle navigation</span>
                    <span class="icon-bar"></span>
                    <span class="icon-bar"></span>
                    <span class="icon-bar"></span>
                </button>
                <a class="navbar-brand" href="#">后台管理系统</a>
                <ul class="user-menu">
                    <li class="dropdown pull-right">
                        <a href="/" class="dropdown-toggle" data-toggle="dropdown"><span class="glyphicon glyphicon-user"></span> {{user.name}} <span class="caret"></span></a>
                        <ul class="dropdown-menu" role="menu">
                            <li><a href="javascript:void(0)" @click="showConfig"><span class="glyphicon glyphicon-cog"></span> 修改密码</a></li>
                            <li><a href="javascript:void(0)" @click="logout"><span class="glyphicon glyphicon-log-out"></span> 登出</a></li>
                        </ul>
                    </li>
                </ul>
            </div>
        </div><!-- /.container-fluid -->
    </nav>

    <div id="sidebar-collapse" class="col-sm-3 col-lg-2 sidebar">
        <form role="search">
            <div class="">
                <input type="text" class="form-control" placeholder="搜索" @keydown.enter v-model.trim="searchWord">
            </div>
        </form>
        <ul class="nav menu">
            <!--<li class="active"><a href="index.html"><span class="glyphicon glyphicon-dashboard"></span> Dashboard</a></li>-->
            <li class="parent " v-for="item in items">
                <a href="javascript:void(0)">
                    <span class="glyphicon glyphicon-list"></span> {{item.parent.description}} <span data-toggle="collapse" :href="'#'+item.parent.value" class="icon pull-right"><em class="glyphicon glyphicon-s glyphicon-plus"></em></span>
                </a>
                <ul class="children collapse" :id="item.parent.value">
                    <li  v-for="sub in item.subs">
                        <router-link :to="sub.url" v-show="searchWord=='' || !(sub.description.indexOf(searchWord)<0)">
                            <span class="glyphicon" :class="sub.style"></span>
                            {{sub.description}}
                        </router-link>
                    </li>
                    <!--<li>-->
                    <!--<a class="" href="#">-->
                    <!--<span class="glyphicon glyphicon-share-alt"></span> Sub Item 3-->
                    <!--</a>-->
                    <!--</li>-->
                </ul>
            </li>
            <!--<li role="presentation" class="divider"></li>-->
            <!--<li> <router-link to="/login">登录</router-link></li>-->
        </ul>
    </div><!--/.sidebar-->

    <div class="col-sm-9 col-sm-offset-3 col-lg-10 col-lg-offset-2 main">

        <router-view></router-view>


    </div>
    <div class="modal" id="configModal" tabindex="-1" role="dialog" aria-labelledby="modalLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                    <h4 class="modal-title text-center" id="modalLabel">修改密码</h4>
                </div>
                <div class="modal-body">
                    <form class="form-horizontal" @submit.prevent="doConfig">
                        <fieldset>
                            <div class="form-group">
                                <label class="col-md-3 control-label" for="config-name">原密码:</label>
                                <div class="col-md-9">
                                    <input class="form-control" placeholder="原密码" id="config-name" type="password"  v-model.trim="config.origin" required>
                                </div>
                            </div>
                            <div class="form-group">
                                <label class="col-md-3 control-label" for="config-password">新密码:</label>
                                <div class="col-md-9">
                                    <input class="form-control" placeholder="新密码"  type="password" id="config-password" v-model.trim="config.newPassword" required pattern=".{6,}" title="密码至少为6位">
                                </div>
                            </div>
                            <div class="form-group">
                                <label class="col-md-3 control-label" for="config-repassword"> 确认新密码:</label>
                                <div class="col-md-9" :class="{'has-error':!isEq}">
                                    <input class="form-control" placeholder="确认新密码"  type="password"  id="config-repassword" v-model.trim="config.newRePassword" required @keyup="isEqFunc">
                                    <span class="error" v-show="!isEq">两次密码需一致,且保证6位以上</span>
                                </div>
                            </div>
                        </fieldset>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>
                            <button type="submit" class="btn btn-primary">确认修改</button>
                        </div>
                    </form>
                </div>
            </div><!-- /.modal-content -->
        </div><!-- /.modal -->
    </div>

</div>
</template>
<script>
        import defaultsDeep from 'lodash/defaultsDeep'
        function transform(){
            let base={};
            return {
                combine:function (k,v){
                    let ks=k.split('.'),subBase={}, cbase;
                    for(let i=0;i<ks.length;i++){
                        if(i===0){
                            cbase=subBase[ks[i]]={};
                        }else if(ks.length-1!==i){
                            cbase=cbase[ks[i]]={}
                        }else if(ks.length-1===i){
                            cbase[ks[i]]=v;
                        }
                    }
                    return defaultsDeep(base,subBase);
                },
                base
            }
        }
		!function ($) {
		    $(document).on("click","ul.nav li.parent > a > span.icon", function(){
		        $(this).find('em:first').toggleClass("glyphicon-minus");
		    });
		    $(".sidebar span.icon").find('em:first').addClass("glyphicon-plus");
		    $(document).on("click",".sidebar ul.nav li.parent ul li",function(){
		    	$.each($(".sidebar ul.nav li.parent ul li"),(index,el)=>{
		            $(el).removeClass("active");
		        });
		        $(this).addClass("active")
		    })
		}(window.jQuery);

		$(window).on('resize', function () {
		  if ($(window).width() > 768) $('#sidebar-collapse').collapse('show')
		})
		$(window).on('resize', function () {
		  if ($(window).width() <= 767) $('#sidebar-collapse').collapse('hide')
		});

		import {USER_SIGNOUT} from "./store/user"
		import {PULL,DESTROY} from "./store/permissions"
		import { mapState,mapActions } from 'vuex'
		import alertify from 'alertifyjs'
        export default{
            data(){
                return{
                    searchWord:'',
                    items:[],
                    config:{
                        origin:'',
                        newPassword:'',
                        newRePassword:''
                    },
                    isEq:true,
                }
            },
            methods:{
                ...mapActions([USER_SIGNOUT,PULL,DESTROY]),
                logout(){
                    this.USER_SIGNOUT();
                    this.DESTROY();
                    this.$router.replace({path:'/login'})
                },
                doConfig(){
                    let user=this.$store.state.user;
                    if(this.config.newPassword.length<6 || (this.config.newPassword!=this.config.newRePassword)){
                        this.isEq=false;
                        return;
                    }
                    this.$http.post("/backend/user/updatePassword/"+this.config.origin,JSON.stringify({name:user.name,password:this.config.newRePassword})).
                    then(({body})=>{
                        if(body && body.content){
                            alertify.success("密码修改成功");
                            $("#configModal").modal("hide");
                        }else{
                            alertify.error("原密码不正确")
                        }
                    })

                },
                showConfig(){
                    $("#configModal").modal("show");
                },
                isEqFunc(){
                    this.isEq=(this.config.newPassword==this.config.newRePassword)
                },
            },
            computed:{
                ...mapState([
                    'user'
                ]),

            },
            mounted(){
                let user=this.$store.state.user,combineObj=transform();
                this.$http.post("/backend/pull/"+user.name+user.timestamp).then(({body})=>{
                    let content=body.content;
                    if(content){
                        let items=[],menu2nds=
                        content.filter(c=>c.permissionType=="MENU2ND");
                        content.filter(c=>c.permissionType=="MENU1ST").forEach(
                            cc=>{
                                let reg=new RegExp("^"+cc.value+"\.");
                                items.push({
                                   parent:cc,
                                   subs:menu2nds.filter(sub=>{
                                    return reg.test(sub.value)
                                   })
                                })
                            }
                        )
                        content.filter(c=>c.permissionType=="BUTTON").forEach(v=>{
                            combineObj.combine(v.value,true);
                        })
                        this.items=items;
                        this.PULL(combineObj.base)
                    }else{
                        this.logout();
                    }

                });

            }
        }
</script>