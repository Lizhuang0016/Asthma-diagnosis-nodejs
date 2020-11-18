const express=require('express')
const md5=require('blueimp-md5')
const Doctor = require('../models/doctor')

const router=express.Router()

router.get('/get_all_doctor',(req,res)=>{
  Doctor.find((err,doctors)=>{
    if(err){
      return res.status(500).json({
        err_code:500,
        message:err.message
      })
    }
    if(!doctors){
      return res.status(200).json({
        err_code:1,
        message:'These doctors was not found'
      })
    }
    res.status(200).json({
      err_code:0,
      message:'get success',
      doctors:doctors
    })
  })
})

router.post('/login',(req,res)=>{
  var body=req.body
  Doctor.findOne({
    doctor_account:body.doctor_account,
    doctor_password:body.doctor_password
  },(err,doctor)=>{
    if(err){
      return res.status(500).json({
        err_code:500,
        message:err.message
      })
    }
    if(!doctor){
      return res.status(200).json({
        err_code:1,
        message:'Email or password is invalid'
      })
    }
    req.session.doctor=doctor
    res.status(200).json({
      err_code:0,
      message:'login success',
      doctor:doctor
    })
  })
})

router.post('/get_doctor_by_id',(req,res)=>{
  var curr_doctor_id=req.body.doctor_id
  Doctor.findOne({
    _id:curr_doctor_id
  },(err,doctor)=>{
    if(err){
      return res.status(500).json({
        err_code:500,
        message:err.message
      })
    }
    if(!doctor){
      return res.status(200).json({
        err_code:1,
        message:'The current user was not found'
      })
    }
    res.status(200).json({
      err_code:0,
      message:'get success',
      doctor:doctor
    })
  })
})

router.post('/update_doctor_info_by_did',(req,res)=>{
  var body=req.body
  Doctor.findByIdAndUpdate(body._id,body,(err,doctor)=>{
    if(err){
      return res.status(500).json({
        err_code:500,
        message:err.message
      })
    }
    if(!doctor){
      return res.status(200).json({
        err_code:1,
        message:'The current user was not found'
      })
    }
    res.status(200).json({
      err_code:0,
      message:'update success',
      doctor:doctor
    })
  })
})



module.exports=router
