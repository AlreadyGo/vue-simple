require('./check-versions')()
var config = require('../config')
if (!process.env.NODE_ENV) process.env.NODE_ENV = JSON.parse(config.dev.env.NODE_ENV)
var path = require('path')
var webpack = require('webpack')
var opn = require('opn')
var webpackConfig =  require('./webpack.dev.conf')
const webpackDevServer = require('webpack-dev-server');

const compiler = webpack(webpackConfig);

const server = new webpackDevServer(compiler,{
  inline:true,
  hot:true,
  noInfo:true,
  publicPath:config.dev.assetsPublicPath,
  proxy: config.dev.proxyTable
});

server.listen(3333,'localhost',()=>{
  console.log('server started at localhost:3333');
  // opn(uri)
});