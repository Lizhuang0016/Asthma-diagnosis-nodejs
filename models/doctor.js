var mongoose=require('mongoose')
//连接数据库
mongoose.connect('mongodb://localhost/asthma_system',{useNewUrlParser:true})

var Schema=mongoose.Schema

var doctorSchema=new Schema({
  doctor_account:{
    type:String,
    required:true
  },
  doctor_password:{
    type:String,
    required:true
  },
  doctor_name:{
    type:String,
    required:true
  },
  doctor_sex:{
    type:Number,
    enum:[0,1],
    default:0
  },
  doctor_age:{
    type:Number,
    required:true
  },
  doctor_email:{
    type:String,
  },
  doctor_phone:{
    type:String,
  },
  doctor_image:{
    type:String,
  },
})

module.exports=mongoose.model('Doctor',doctorSchema)