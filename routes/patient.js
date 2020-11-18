const router=require('../router')
module.exports = router;

//加载配置文件
const config = require('../config/mysql');
const mysql = require('mysql');
const conn = mysql.createConnection(config);

//获取所有病人信息
router.all('/get_all_patients', (req, res) => {
  let sqlStr = `SELECT * FROM patient_info ORDER BY patient_clinic_time DESC`; 
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
        message:'No patient information was found'
      })
    }
    res.status(200).json({
      err_code:0,
      message:'get success',
      patients:result
    })
  });
});

//获取该医生所有病人信息
router.all('/get_patients_by_did', (req, res) => {
  let doctor_id=req.body.doctor_id
  let sqlStr = `SELECT * FROM patient_info where patient_doctor_id='${doctor_id}' ORDER BY patient_clinic_time DESC`; 
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
        message:'No patient information was found'
      })
    }
    res.status(200).json({
      err_code:0,
      message:'get success',
      patients:result
    })
  });
});

//根据病人id获取病人信息
router.all('/get_patient_by_pid', (req, res) => {
  let patient_id=req.body.patient_id
  let sqlStr = `SELECT * FROM patient_info where patient_id='${patient_id}'`; 
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
        message:'No patient information was found'
      })
    }
    res.status(200).json({
      err_code:0,
      message:'get success',
      patient:result
    })
  });
});

//根据病人id获取病人血常规信息
router.all('/get_rbdata_by_pid', (req, res) => {
  let patient_id=req.body.patient_id
  let sqlStr = `SELECT * FROM routine_blood_info where rb_patient_id='${patient_id}'`; 
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
        message:'No patient information was found'
      })
    }
    res.status(200).json({
      err_code:0,
      message:'get success',
      rbdata:result
    })
  });
});

//插入病人信息
router.all('/insert_patient', (req, res) => {
  let patient=req.body
  let sqlStr = `INSERT INTO patient_info 
  (patient_name, patient_sex, patient_age, patient_phone, patient_disease_cate, patient_disease_info, patient_clinic_time, patient_doctor_id, patient_doctor_name) 
  VALUES ('${patient.patient_name}', '${patient.patient_sex}', '${patient.patient_age}', '${patient.patient_phone}', '${patient.patient_disease_cate}', '${patient.patient_disease_info}', '${patient.patient_clinic_time}', '${patient.patient_doctor_id}', '${patient.patient_doctor_name}')`; 
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
        message:'The insert message cannot be empty'
      })
    }
    res.status(200).json({
      err_code:0,
      message:'insert success',
      insertinfo:result
    })
  });
});

//插入血常规信息
router.all('/insert_patient', (req, res) => {
  let rbdata=req.body
  let sqlStr = `INSERT INTO routine_blood_info 
  (rb_patient_id, BASO2, BASO1, EO2, EO1, HCT, HGB, LYMPH2, LYMPH1, MCH, MCHC, MCV, MONO2, MONO1, 
  MPV, NEUT2, NEUT1, PCT, PDW, PLT, RBC, RDW, WBC) 
  VALUES ('${rbdata.rb_patient_id}', '${rbdata.BASO2}', '${rbdata.BASO1}', '${rbdata.EO2}', '${rbdata.EO1}', '${rbdata.HCT}', '${rbdata.HGB}', '${rbdata.LYMPH2}',
  '${rbdata.LYMPH1}', '${rbdata.MCH}', '${rbdata.MCHC}', '${rbdata.MCV}', '${rbdata.MONO2}', '${rbdata.MONO1}', '${rbdata.MPV}', '${rbdata.NEUT2}', '${rbdata.NEUT1}',
   '${rbdata.PCT}', '${rbdata.PDW}', '${rbdata.PLT}', '${rbdata.RBC}', '${rbdata.RDW}', '${rbdata.WBC}')`; 
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
        message:'The insert rbdata cannot be empty'
      })
    }
    res.status(200).json({
      err_code:0,
      message:'insert success',
      insertinfo:result
    })
  });
});

//根据病人id更新病人诊断信息
router.all('/update_patient_disinfo_by_pid', (req, res) => {
  let patient=req.body
  let sqlStr = `UPDATE patient_info 
  SET patient_disease_info = '${patient.patient_disease_info}',patient_disease_cate = '${patient.patient_disease_cate}' 
  WHERE patient_id = '${patient.patient_id}'`; 
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
        message:'Update information cannot be empty'
      })
    }
    res.status(200).json({
      err_code:0,
      message:'update success',
      updateinfo:result
    })
  });
});
