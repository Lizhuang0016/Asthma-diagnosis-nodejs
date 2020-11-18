const express=require('express')
var borderParser=require('body-parser')
var session=require('express-session')

const doctor = require('./routes/doctor')
const news=require('./routes/news')
const patient=require('./routes/patient')
const department=require('./routes/department')
const prescription=require('./routes/prescription')
const task=require('./routes/task')

const app=express()

//配置解析表单POST请求体插件，注意一定要在app.use(router)之前
app.use(borderParser.urlencoded({extended:false}))
app.use(borderParser.json())

//设置跨域访问
app.all('*', function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
  res.header("X-Powered-By", ' 3.2.1')
  res.header("Content-Type", "application/json;charset=utf-8");
  next();
});

//在Express这个框架中，默认不支持Session和Cookie
//但是我们可以使用第三方中间件：express-session来解决
//1.npm install express-session
//2.配置（一定要在挂载路由之前）
//  该插件会为req请求对象添加一个成员，req.session，默认是一个对象
//  这是最简单的配置方式，暂且不用关心里面参数的含义
app.use(session({
  secret:'keyboard cat',//配置加密字符串，他会在原有的加密基础上和这个字符串拼接起来去加密，目的是为了增加安全性，防止客户端恶意伪造
  resave:false,
  saveUninitialized:true//无论你是否使用Session，我都默认给你直接分配一把钥匙
}))
//3.使用
//  当把这个插件配置好之后，我们就可以用过req.session来访问和设置Session成员
//  添加Session数据：req.session.foo='bar'
//  访问Session数据：req.session.foo

//把路由挂载到app中
app.use(doctor)
app.use(news)
app.use(patient)
app.use(department)
app.use(prescription)
app.use(task)

app.listen(5000,function () {
  console.log('running...');
})