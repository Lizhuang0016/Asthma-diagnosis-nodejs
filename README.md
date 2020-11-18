## nodejs + mongodb 实现疾病管理系统的后台接口

### 实现流程
+ 装包
  + npm init -y 初始化
  + npm i express 安装express框架
  + npm i body-parser 安装解析表单插件
  + npm i cors 安装跨域插件
  + npm i mongoose 安装mongodb插件
+ 创建文件及文件夹
  + app.js  程序的入口文件
  + models文件夹  存储使用mongoose设计的数据模型
  + config文件夹  存储数据库相关的配置文件
  + api文件夹  存储对应模块的接口
+ 编写项目架构，完成入口文件的编写
+ 配置数据库相关配置
+ 设计各个模块的数据模型
+ 设计各个模块的接口api
