<style>
    .sidebar ul.nav li.parent ul li.active a{
       color: #3f51b5!important;
       background-color:white
    }
</style>
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
</div>
</template>
<script>
        import _ from 'lodash'
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
                    return _.defaultsDeep(base,subBase);
                },
                base:base
            }
        }
        let combineObj=transform();
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
		import {PULL} from "./store/permissions"
		import { mapState,mapActions } from 'vuex'
        export default{
            data(){
                return{
                    searchWord:'',
                    items:[]
                }
            },
            methods:{
                ...mapActions([USER_SIGNOUT,PULL]),
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
                let user=this.$store.state.user;
                this.$http.post("/backend/pull/"+user.name+user.timestamp).then(({body})=>{
                    let content=body.content;
                    if(content){
                        let items=[],menu2nds=
                        content.filter(c=>c.permissionType=="MENU2ND");
                        content.filter(c=>c.permissionType=="MENU1ST").forEach(
                            cc=>{
                                let reg=new RegExp("^"+cc.value+".");
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