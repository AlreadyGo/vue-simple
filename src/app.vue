<template>
<div>
    <nav class="navbar navbar-inverse navbar-fixed-top" role="navigation" >
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
                            <li><a href="javascript:void(0)" @click="doConfig"><span class="glyphicon glyphicon-cog"></span> 设置</a></li>
                            <li><a href="javascript:void(0)" @click="logout"><span class="glyphicon glyphicon-log-out"></span> 登出</a></li>
                        </ul>
                    </li>
                </ul>
            </div>
        </div><!-- /.container-fluid -->
    </nav>

    <div id="sidebar-collapse" class="col-sm-3 col-lg-2 sidebar">
        <form role="search">
            <div class="form-group">
                <input type="text" class="form-control" placeholder="搜索" @keydown.enter v-model.trim="searchWord">
            </div>
        </form>
        <ul class="nav menu">
            <!--<li class="active"><a href="index.html"><span class="glyphicon glyphicon-dashboard"></span> Dashboard</a></li>-->
            <li class="parent " v-for="item in items">
                <a href="javascript:void(0)">
                    <span class="glyphicon glyphicon-list"></span> {{item.parent.desc}} <span data-toggle="collapse" :href="'#'+item.parent.name" class="icon pull-right"><em class="glyphicon glyphicon-s glyphicon-plus"></em></span>
                </a>
                <ul class="children collapse" :id="item.parent.name">
                    <li  v-for="sub in item.subs">
                        <router-link :to="sub.path" v-show="searchWord=='' || !(sub.desc.indexOf(searchWord)<0)">
                            <span class="glyphicon" :class="sub.style"></span>
                            {{sub.desc}}
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
</div>
</template>
<script>
		!function ($) {
		    $(document).on("click","ul.nav li.parent > a > span.icon", function(){
		        $(this).find('em:first').toggleClass("glyphicon-minus");
		    });
		    $(".sidebar span.icon").find('em:first').addClass("glyphicon-plus");
		}(window.jQuery);

		$(window).on('resize', function () {
		  if ($(window).width() > 768) $('#sidebar-collapse').collapse('show')
		})
		$(window).on('resize', function () {
		  if ($(window).width() <= 767) $('#sidebar-collapse').collapse('hide')
		});

		import {USER_SIGNOUT} from "./store/user"
		import { mapState,mapActions } from 'vuex'
        export default{
            data(){
                return{
                    searchWord:'',
                    items:[
                        {
                            parent:{
                                desc:'用户管理',
                                name:'users'
                            },
                            subs:[
                               {
                                path:'/main/users',
                                desc:'用户管理',
                                style:'glyphicon-user'
                               },
                               {
                                 path:'/main/roles',
                                 desc:'角色管理',
                                 style:'glyphicon-fire'
                               },
                               {
                                 path:'/main/permissions',
                                 desc:'权限管理',
                                 style:'glyphicon-eye-open'
                               }
                            ]
                        }
                    ]
                }
            },
            methods:{
                ...mapActions([USER_SIGNOUT]),
                logout(){
                    this.USER_SIGNOUT();
                    this.$router.replace({path:'/login'})
                },
                doConfig(){
                }
            },
            computed:{
                ...mapState([
                    'user'
                ]),
            },
            mounted(){
            }
        }
</script>