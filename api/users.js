var express = require('express');
var router = express.Router();
var URL = require('url');
//加载mysql模块
var mysql = require('mysql');
//创建连接
var connection = mysql.createConnection({
    host: '192.168.1.24',
    port: '3306',
    user: 'root',
    password: '123456',
    database: 'blog'
});
// //执行创建连接 
connection.connect();
//SQL语句
var sql = 'SELECT * FROM users';
var addSql = 'INSERT INTO name(id,name,sex) VALUES(?,?,?)';

router.get('/query', function (req, res, next) {

    connection.query(sql, function (err, result) {
        if (err) {
            console.log('[SELECT ERROR] - ', err.message);
            return;
        }
        console.log(params.id);

        res.send(result);
    });
});

router.get('/search', function (req, res, next) {


    //把搜索值输出
    res.send({ test: '12121' });
});

module.exports = router;