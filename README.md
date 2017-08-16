# 描述:

> 前端技术栈为vue全家桶(vuex+vue-router+vuelidate(简洁的校验库))+webpack+fetch+bootstrap(初次接触vue并没有找类似element之类的ui库)等,后端技术栈spring-boot+mybatis+spring-mvc等,完成了一个10个页面的简单订单系统,
前端模板来源于vue官方提供的webpack模板(热部署,生产打包,单元测试等),主要完成了注册,登录,细化到按钮级别的权限控制,excel上传解析,
表格查看展示等功能
# frontend

> A Vue.js+webpack project [vue-simple](http://github.com/alreadygo/vue-simple)

# backend

> [springboot-simple](https://github.com/alreadygo/springboot-simple) project

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:3333
npm run dev

# build for production with minification
npm run build

```


#项目结构
├─build #webpack构建配置文件
├─node_modules #项目依赖
├─dist #项目生成物
├─config #配置文件
├─src #源码
│ ├─common #通用方法
│ ├─components #全局简单组件封装
│ ├─filters #全局过滤器
│ ├─pages #各个应用代码
│ │ ├─accounts
│ │ ├─cost
│ │ ├─customers
│ │ ├─fundsApp
│ │ ├─fundsSum
│ │ ├─home
│ │ ├─login
│ │ ├─orders
│ │ ├─permissions
│ │ ├─roles
│ │ └─users
│ └─store #vuex相关
└─static #静态文件
├─css
├─img
└─js
#npm配置文件package.json
<pre>{
  "name": "vue-webpack2.0",
  "version": "1.0.0",
  "description": "",
  "private": true,
  "scripts": {
    "dev": "node build/dev-server.js",#dev调试脚本 npm run dev
    "build": "node build/build.js" #生成生存生成物,包括压缩js,抽取样式等
  },
  "dependencies": {
    "vue": "^2.1.6",
    "vue-router": "^2.1.1",
    "vuelidate": "^0.2.0",
    "vuex": "^2.1.1"
  },
  "devDependencies": {
    "alertifyjs": "^1.8.0", #消息提醒
    "autoprefixer": "^6.4.0",#兼容性
    "babel-core": "^6.0.0",
    "babel-loader": "^6.0.0",
    "babel-plugin-istanbul": "^3.0.0",
    "babel-plugin-transform-object-assign": "^6.8.0",
    "babel-plugin-transform-runtime": "^6.0.0",
    "babel-preset-es2015": "^6.18.0",
    "babel-preset-stage-0": "^6.16.0",
    "babel-register": "^6.0.0",
    "bootstrap": "^3.3.7",
    "bootstrap-table": "^1.11.0",
    "chai": "^3.5.0",
    "chalk": "^1.1.3",
    "connect-history-api-fallback": "^1.1.0",
    "cross-env": "^3.1.3",
    "css-loader": "^0.25.0",
    "date-fns": "^1.27.1",#时间日期库
    "eventsource-polyfill": "^0.9.6",
    "express": "^4.13.3",#node 
    "extract-text-webpack-plugin": "^1.0.1",#用于抽取vue组件中的样式
    "file-loader": "^0.9.0",
    "friendly-errors-webpack-plugin": "^1.1.2",
    "function-bind": "^1.0.2",#es7方法绑定插件
    "html-webpack-plugin": "^2.8.1",#html模板插件
    "http-proxy-middleware": "^0.17.2",
    "inject-loader": "^2.0.1",
    "jquery": "^3.1.1",
    "js-cookie": "^2.1.3",#cookie库
    "json-loader": "^0.5.4",
    "lodash": "^4.17.2",
    "opn": "^4.0.2",
    "ora": "^0.3.0",
    "semver": "^5.3.0",
    "shelljs": "^0.7.4",
    "url-loader": "^0.5.7",
    "vue-loader": "^10.0.0",
    "vue-style-loader": "^1.0.0",
    "vue-template-compiler": "^2.1.0",
    "webpack": "^1.13.2",
    "webpack-dev-middleware": "^1.8.3",
    "webpack-dev-server": "^1.16.2",
    "webpack-merge": "^0.14.1"
  },
  "engines": {
    "node": "&gt;= 4.0.0",
    "npm": "&gt;= 3.0.0"
  }
}
</pre>
#webpack配置文件webpack.base.conf.js
<pre>var path = require('path')
var config = require('../config')
var utils = require('./utils')
var projectRoot = path.resolve(__dirname, '../')
var webpack = require('webpack')

var env = process.env.NODE_ENV
// check env &amp; config/index.js to decide whether to enable CSS source maps for the
// various preprocessor loaders added to vue-loader at the end of this file
var cssSourceMapDev = (env === 'development' &amp;&amp; config.dev.cssSourceMap)
var cssSourceMapProd = (env === 'production' &amp;&amp; config.build.productionSourceMap)
var useCssSourceMap = cssSourceMapDev || cssSourceMapProd

module.exports = {
  entry: [
    './src/main.js' #入口
  ],
  output: {#生成物
    path: config.build.assetsRoot,
    publicPath: process.env.NODE_ENV === 'production' ? config.build.assetsPublicPath : config.dev.assetsPublicPath,
    filename: '[name].js'
  },
  resolve: {
    extensions: ['', '.js', '.vue', '.json'],#后缀名
    fallback: [path.join(__dirname, '../node_modules')],#寻找文件失败后回调
    alias: {#设置别名
      'vue$': 'vue/dist/vue.common.js',
      'src': path.resolve(__dirname, '../src'),
      'filters': path.resolve(__dirname, '../src/filters'),
      'components': path.resolve(__dirname, '../src/components')
    }
  },
  resolveLoader: {
    fallback: [path.join(__dirname, '../node_modules')]
  },
  module: {
    loaders: [#设置各种文件loader
      {
        test: /\.vue$/,
        loader: 'vue'
      },
      {
        test: /\.js$/,
        loader: 'babel',
        include: [
          path.join(projectRoot, 'src'),#只编译src下源码
        ],
        exclude: /node_modules/
      },
      {
        test: /\.json$/,
        loader: 'json'
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url',
        query: {
          limit: 10000,
          name: utils.assetsPath('img/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url',
        query: {
          limit: 10000,
          name: utils.assetsPath('fonts/[name].[hash:7].[ext]')
        }
      }
    ]
  },
  vue: {
    loaders: utils.cssLoaders({ sourceMap: useCssSourceMap }),
    postcss: [
      require('autoprefixer')({
        browsers: ['last 2 versions'] #兼容浏览器前2个版本
      })
    ]
  },
  plugins:[
    new webpack.ProvidePlugin({
      $: "jquery",
      jQuery: "jquery",
      "window.jQuery": "jquery"
    }) #将jquery设为全局变量
    
  ]
}
</pre>
#common.js通用方法
<pre>let format = require('date-fns/format');
Date.prototype.format = function (fmt="YYYY-MM-DD HH:mm:ss") {
    return format(this,fmt);
}//时间格式化

window.post=(url,params,headers)=&gt;{
    return fetch(url,
                {method:'POST',credentials: 'include',headers: Object.assign({'Content-Type': 'application/json'
                },headers || {}),body:JSON.stringify(params || '')}
            ).then(v=&gt;v.json()).catch(()=&gt;{throw new Error(commonErrorMessage);})
}//封装fetch的post方法

window.formPost=(url,params)=&gt;{
    let body='';
    if(params) body=Object.keys(params).map(key=&gt;key+"="+params[key]).join("&amp;");
    return fetch(url,
        {method:'POST',credentials: 'include',headers: {'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
        },body:body}
    ).then(v=&gt;v.json()).catch(()=&gt;{throw new Error(commonErrorMessage);})
}//封装post表单提交

window.get=(url,headers)=&gt;{
    return fetch(url,{
            headers:headers || {}
        })
        .then(v=&gt;v.text()
        ).catch(()=&gt;{throw new Error(commonErrorMessage);})
}//封装get方法
window.upload=(url,formData)=&gt;{
    if(!(formData instanceof FormData)) return new Promise(()=&gt;{throw new Error('正文内容必须为FormData')});
    return fetch(url,{
                method: 'POST',
                body:formData,
                credentials: 'include'
            }).then(r=&gt;{
                return r.json();
            }).catch(()=&gt;{throw new Error(commonErrorMessage);})
}//封装上传
window.timeout=(duration = 0)=&gt; {
    return new Promise(resolve=&gt; 
        setTimeout(resolve, duration)
    )
}//封装超时
</pre>
#源码部分比较简单
项目入口为src/main.js
<pre>Vue.use(Vuelidate);//表单校验组件
Vue.use(VueRouter);//路由组件
Object.keys(components).forEach((key) =&gt; {
    var name = key.replace(/(\w)/, (v) =&gt; v.toUpperCase()) //首字母大写
    Vue.component(`v${name}`, components[key])
}) //加载全局组件,v开头
Object.keys(filters).forEach((key) =&gt; {
    Vue.filter(key, filters[key])
}) //加载全局过滤器
const routes = [//配置路由
    {
        path:'/',
        component:App,
        children: [
            {
                path: 'main/home',
                component: home
            },
            {
                path: 'main/users',
                component: users,
            },
            {
                path: 'main/roles',
                component: roles
            },
            {
                path: 'main/permissions',
                component: permissions
            },
            {
                path: 'main/customers/sendInfo',
                component: sendInfo
            },
            {
                path: 'main/customers/deliveryManInfo',
                component: deliveryManInfo
            },
            {
                path: 'main/customers/personalInfo',
                component: personalInfo
            },
            {
                path: 'main/orders',
                component: orders
            },
            {
                path: 'main/orders/:orderNum',
                component: orders
            },
            {
                path: 'main/accounts',
                component: accounts
            },
            {
                path: 'main/accounts/:orderNum',
                component: accounts
            },
            {
                path: 'main/fundsApp/fundsApplication',
                component: fundsApplication
            },
            {
                path: 'main/fundsApp/fundsCheck',
                component: fundsCheck
            },
            {
                path: 'main/fundsSum/fundsStatistics',
                component: fundsStatistics
            },
            {
                path: 'main/cost/costMaintain/:orderNum',
                component: costMaintain
            },
            {
                path: 'main/cost/costMaintain',
                component: costMaintain
            },
        ]
    },
    {
        path:'/goHome',
        component:goHome
    },
    {
        path:'/login',
        meta: { auth: false },
        component:login
    }
];

const router = new VueRouter({
    routes
});
//路由导航钩子,用于检查登录跳转
router.beforeEach(({meta, path}, from, next) =&gt; {
    var { auth = true } = meta;
    var isLogin = Boolean(store.state.user.name) //true用户已登录， false用户未登录
    var loginReg=/^\/login/;
    
    if (auth &amp;&amp; !isLogin &amp;&amp; !loginReg.test(path)) {
        return next({ path: '/login' })
    }else if(loginReg.test(path) &amp;&amp; isLogin ){
        return next({ path: '/main/home' })
    }
    next()
});
//挂载vue
const  vue=new Vue({
    store,
    router,
    mounted(){
    }
}).$mount('#app');</pre> 


For detailed explanation on how things work, checkout the [guide](http://alreadygo.cn/zh/blog/?p=58),[template](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).
