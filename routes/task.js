const router=require('../router')
module.exports = router;

//加载配置文件
const config = require('../config/mysql');
const mysql = require('mysql');
const conn = mysql.createConnection(config);

//获取指定医生的所有任务信息
router.all('/get_task_by_did', (req, res) => {
  let doctor_id=req.body.doctor_id
  let sqlStr = `SELECT * FROM task_info where task_doctor_id='${doctor_id}' ORDER BY task_time DESC`; 
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
        message:'No task information found'
      })
    }
    res.status(200).json({
      err_code:0,
      message:'get success',
      tasks:result
    })
  });
});