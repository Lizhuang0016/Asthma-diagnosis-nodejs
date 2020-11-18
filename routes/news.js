const router=require('../router')
module.exports = router;

//加载配置文件
const config = require('../config/mysql');
const mysql = require('mysql');
const conn = mysql.createConnection(config);

//获取所有新闻信息
router.all('/get_all_news', (req, res) => {
  // 定义SQL语句
  let sqlStr = `SELECT * FROM news_info ORDER BY news_time DESC`; 
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
        message:'No news information found'
      })
    }
    res.status(200).json({
      err_code:0,
      message:'get success',
      news:result
    })
  });
});

//根据新闻id获取新闻内容
router.all('/get_news_by_id', (req, res) => {
  let news_id=req.body.news_id
  let sqlStr = `SELECT * FROM news_info where news_id='${news_id}'`; 
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
        message:'No news information found'
      })
    }
    res.status(200).json({
      err_code:0,
      message:'get success',
      news:result
    })
  });
});


//插入新的新闻信息
router.all('/insert_news', (req, res) => {
  let news=req.body
  let sqlStr = `INSERT INTO news_info
  (news_title, news_author, news_author_id, news_time, news_views, news_content) 
  VALUES ('${news.news_title}', '${news.news_author}', '${news.news_author_id}', '${news.news_time}', '${news.news_views}', '${news.news_content}');`; 
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
        message:'The new message is empty'
      })
    }
    res.status(200).json({
      err_code:0,
      message:'insert success',
      news:result
    })
  });
});
