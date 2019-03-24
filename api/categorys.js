var express = require('express');
var router = express.Router();

// 连接数据库
var { connection, query } = require('../db')

const resData = (errCode, data) => ({ errCode, data })

// 获取所有分类
router.get('/', async function (req, res, next) {

    // SQL语句
    var sql = 'SELECT * FROM categorys';

    connection.query(sql, function (err, result) {

        err ? console.log('[SELECT ERROR] - ', err.message) : res.send(resData(0, result));
    });

});

// 新增分类
router.post('/', async function (req, res, next) {

    // 插入数据
    var addSql = 'INSERT INTO categorys(id, category) VALUES(?,?)';
    var querySql = 'SELECT * FROM categorys ORDER BY id DESC LIMIT 1'


    // 获取数据
    var data = req.body

    var queryData = await query(querySql)

    id = queryData[0] ? queryData[0].id + 1 : 1

    var addSqlParams = [
        id,
        data.category,
    ];

    //增
    connection.query(addSql, addSqlParams, function (err, result) {

        err ? console.log('[INSERT ERROR] - ', err.message) : res.send(resData(0, 'success'));
    });
});

// 更新分类
router.put('/', function (req, res, next) {

    var data = req.body

    var updateSql = 'UPDATE categorys SET category = \'' + data.category + '\' WHERE id = ' + data.id

    console.log(updateSql)

    connection.query(updateSql, function (err, result) {

        err ? console.log('[SELECT ERROR] - ', err.message) : res.send(resData(0, result));
    });

});

// 移除分类
router.delete('/', function (req, res, next) {

    var data = req.query

    var delSql = 'DELETE FROM categorys WHERE id IN (' + data.ids + ')'

    // 删除
    connection.query(delSql, function (err, result) {
        err ? console.log('[INSERT ERROR] - ', err.message) : res.send(resData(0, result));
    });

});


module.exports = router;
