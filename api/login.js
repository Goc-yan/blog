var express = require('express');
var router = express.Router();

// 连接数据库
var { connection, query } = require('../db')

const resData = (errCode, data) => ({ errCode, data })

// 获取所有标签
router.get('/', function (req, res, next) {

    // SQL语句
    var sql = 'SELECT * FROM tags';

    connection.query(sql, function (err, result) {

        err ? console.log('[SELECT ERROR] - ', err.message) : res.send(resData(0, result));
    });

});

// 新增标签
router.post('/', async function (req, res, next) {

    let data = {
        errCode: 0,
        errMsg: 'success'
    }
    res.send(data)

    // 插入数据
    // var addSql = 'INSERT INTO tags (tagName) VALUES(?)';

    // 获取数据
    // var data = req.body

    // var addSqlParams = [ data.tagName ];

    //增
    // connection.query(addSql, addSqlParams, function (err, result) {

    //     err ? console.log('[INSERT ERROR] - ', err.message) : res.send(resData(0, 'success'));
    // });
});

// 更新标签
router.put('/', function (req, res, next) {

    var data = req.body

    var updateSql = 'UPDATE tags SET tagName = \'' + data.tagName + '\' WHERE id = ' + data.id

    connection.query(updateSql, function (err, result) {

        err ? console.log('[SELECT ERROR] - ', err.message) : res.send(resData(0, result));
    });

});

// 移除标签
router.delete('/', function (req, res, next) {

    var data = req.query

    var delSql = 'DELETE FROM tags WHERE id IN (' + data.ids + ')'

    // 删除
    connection.query(delSql, function (err, result) {
        err ? console.log('[INSERT ERROR] - ', err.message) : res.send(resData(0, result));
    });

});


module.exports = router;
