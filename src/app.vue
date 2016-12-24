<template>
<div>
    <nav class="navbar navbar-inverse navbar-fixed-top" role="navigation" style="background-color:#009688">
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
                        <a href="/" class="dropdown-toggle" data-toggle="dropdown"><span class="glyphicon glyphicon-user"></span> {{userInfo.name}} <span class="caret"></span></a>
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
            <li class="parent ">
                <a href="javascript:void(0)">
                    <span class="glyphicon glyphicon-list"></span> 菜单一 <span data-toggle="collapse" href="#sub-item-1" class="icon pull-right"><em class="glyphicon glyphicon-s glyphicon-plus"></em></span>
                </a>
                <ul class="children collapse" id="sub-item-1">
                    <li v-for="item in subItems">
                        <router-link :to="item.path" v-show="searchWord=='' || !(item.desc.indexOf(searchWord)<0)">{{item.desc}}</router-link>
                    </li>
                    <!--<li>-->
                    <!--<a class="" href="#">-->
                    <!--<span class="glyphicon glyphicon-share-alt"></span> Sub Item 3-->
                    <!--</a>-->
                    <!--</li>-->
                </ul>
            </li>
            <li class="parent ">
                <a href="javascript:void(0)">
                    <span class="glyphicon glyphicon-list"></span> 菜单二 <span data-toggle="collapse" href="#sub-item-2" class="icon pull-right"><em class="glyphicon glyphicon-s glyphicon-plus"></em></span>
                </a>
                <ul class="children collapse" id="sub-item-2">
                    <li v-for="item in subItems">
                        <router-link :to="item.path" v-show="searchWord=='' || !(item.desc.indexOf(searchWord)<0)">{{item.desc}}</router-link>
                    </li>
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
        export default{
            data(){
                return{
                    searchWord:'',
                    subItems:[
                        {
                            path:'/main/home',
                            desc:'主页'
                        },
                        {
                             path:'/main/test2',
                             desc:'选择二'
                        }
                    ]
                }
            },
            methods:{
                logout(){
                    this.$store.commit(USER_SIGNOUT);
                    this.$router.replace({path:'/login'})
                },
                doConfig(){
                }
            },
            computed:{
                userInfo(){
                    return this.$store.state.user;
                }
            }
        }
</script>