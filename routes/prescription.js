const router=require('../router')
module.exports = router;

//加载配置文件
const config = require('../config/mysql');
const mysql = require('mysql');
const conn = mysql.createConnection(config);

//获取所有的处方信息
router.all('/get_all_prescription', (req, res) => {
  // 定义SQL语句
  let sqlStr = `SELECT * FROM prescription_patient_info`; 
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
        message:'No prescription information found'
      })
    }
    res.status(200).json({
      err_code:0,
      message:'get success',
      prescriptions:result
    })
  });
});