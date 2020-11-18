const router=require('../router')
module.exports = router;

//加载配置文件
const config = require('../config/mysql');
const mysql = require('mysql');
const conn = mysql.createConnection(config);

//获取所有医生信息
router.all('/get_all_doctor', (req, res) => {
  // 定义SQL语句
  let sqlStr = `SELECT * FROM user_doctor `; 

  conn.query(sqlStr, (err, result) => {
    if(err){
      return res.status(500).json({
        err_code:500,
        message:err.message
      })
    }
    if(!result){
      return res.status(200).json({
        err_code:1,
        message:'The current user was not found'
      })
    }
    res.status(200).json({
      err_code:0,
      message:'get success',
      doctors:result
    })
  });
});

//医生登录
router.all('/doctor_login', (req, res) => {
  // 定义SQL语句
  let doctor=req.body
  //其实也就SQL语句不同其他都一样
  let sqlStr = `SELECT * FROM user_doctor 
  where doctor_account="${doctor.doctor_account}" 
  and doctor_password="${doctor.doctor_password}"`; 
  conn.query(sqlStr, (err, result) => {
    if(err){
      return res.status(500).json({
        err_code:500,
        message:err.message
      })
    }
    if(!result){
      return res.status(200).json({
        err_code:1,
        message:'The current user was not found'
      })
    }
    res.status(200).json({
      err_code:0,
      message:'login success',
      doctor:result
    })
  });
});

//根据医生id获取医生信息
//获取数据（all方法支持post或get传参方式）
router.all('/get_doctor_by_did', (req, res) => {
  // 定义SQL语句
  let curr_doctor_id=req.body.doctor_id
  //其实也就SQL语句不同其他都一样
  let sqlStr = `SELECT * FROM user_doctor where doctor_id="${curr_doctor_id}"`; 

  conn.query(sqlStr, (err, result) => {
    if(err){
      return res.status(500).json({
        err_code:500,
        message:err.message
      })
    }
    if(!result){
      return res.status(200).json({
        err_code:1,
        message:'The current user was not found'
      })
    }
    res.status(200).json({
      err_code:0,
      message:'get success',
      doctor:result
    })
  });
});

//添加医生信息
router.all('/insert_doctor', (req, res) => {
  // 定义SQL语句
  let doctor=req.body
  //其实也就SQL语句不同其他都一样
  let sqlStr = `INSERT INTO user_doctor (doctor_account, doctor_password,doctor_name, doctor_sex, doctor_age, doctor_email, doctor_phone,doctor_image) 
  VALUES ('${doctor.doctor_account}', '${doctor.doctor_password}', '${doctor.doctor_name}', '${doctor.doctor_sex}', '${doctor.doctor_age}', '${doctor.doctor_email}', '${doctor.doctor_phone}', '${doctor.doctor_image}')`
  conn.query(sqlStr, (err, result) => {
    if(err){
      return res.status(500).json({
        err_code:500,
        message:err.message
      })
    }
    if(!result){
      return res.status(200).json({
        err_code:1,
        message:'The current user information is empty'
      })
    }
    res.status(200).json({
      err_code:0,
      message:'insert success',
      insert_info:result
    })
  });
});

//更新医生信息
router.all('/update_doctor_info_by_did', (req, res) => {
  // 定义SQL语句
  let doctor=req.body
  //其实也就SQL语句不同其他都一样
  let sqlStr = `UPDATE user_doctor 
  SET doctor_name = '${doctor.doctor_name}',doctor_age = '${doctor.doctor_age}',
  doctor_sex = '${doctor.doctor_sex}',doctor_phone = '${doctor.doctor_phone}',
  doctor_email = '${doctor.doctor_email}'
  WHERE doctor_id = '${doctor.doctor_id}'`
  conn.query(sqlStr, (err, result) => {
    if(err){
      return res.status(500).json({
        err_code:500,
        message:err.message
      })
    }
    if(!result){
      return res.status(200).json({
        err_code:1,
        message:'The current user information is empty'
      })
    }
    res.status(200).json({
      err_code:0,
      message:'update success',
      update_info:result
    })
  });
});

//修改医生密码
router.all('/update_doctor_info_by_did', (req, res) => {
  // 定义SQL语句
  let doctor=req.body
  //其实也就SQL语句不同其他都一样
  let sqlStr = `UPDATE user_doctor 
  SET doctor_password = '${doctor.doctor_password}'
  WHERE doctor_id = '${doctor.doctor_id}'`
  conn.query(sqlStr, (err, result) => {
    if(err){
      return res.status(500).json({
        err_code:500,
        message:err.message
      })
    }
    if(!result){
      return res.status(200).json({
        err_code:1,
        message:'The current user information is empty'
      })
    }
    res.status(200).json({
      err_code:0,
      message:'change password success',
      update_info:result
    })
  });
});
