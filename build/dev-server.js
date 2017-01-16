require('./check-versions')()
var config = require('../config')
if (!process.env.NODE_ENV) process.env.NODE_ENV = JSON.parse(config.dev.env.NODE_ENV)
var path = require('path')
var webpack = require('webpack')
var opn = require('opn')
var webpackConfig =  require('./webpack.dev.conf')
var webpackDevServer = require('webpack-dev-server');
var port=config.dev.port
const compiler = webpack(webpackConfig);
const server = new webpackDevServer(compiler,{
  inline:true,
  hot:true,
  noInfo:true,
  publicPath:config.dev.assetsPublicPath,
  proxy: config.dev.proxyTable
});

server.listen(port,'localhost',()=>{
  var uri='http://localhost:'+port+"/index.html"
  console.log('server started at '+uri);
  opn(uri)
});
