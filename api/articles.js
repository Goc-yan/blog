var express = require('express');
var router = express.Router();

// 连接数据库
var { connection, query } = require('../db')

const resData = (errCode, data) => ({ errCode, data })

// 获取所有文章
router.get('/', async function (req, res, next) {

    // SQL语句
    var sql = 'SELECT * FROM articles';

    connection.query(sql, function (err, result) {

        result.forEach(data => data.tags = data.tags.split(',').map(str => Number(str)))

        err ? console.log('[SELECT ERROR] - ', err.message) : res.send(resData(0, result));
    });

});

// 新增文章
router.post('/', async function (req, res, next) {

    // 插入数据
    var addSql = 'INSERT INTO articles(id, title, createDate, updateDate, category, tags, content) VALUES(?,?,?,?,?,?,?)';
    var querySql = 'SELECT * FROM articles ORDER BY id DESC LIMIT 1'


    // 获取数据
    var data = req.body
    var date = new Date().getTime()

    data.tags = data.tags.join(',')
    var queryData = await query(querySql)

    if (queryData[0] === undefined) queryData = 1

    var addSqlParams = [
        queryData[0].id + 1,
        data.title,
        date,
        date,
        data.category,
        data.tags,
        data.content
    ];

    //增
    connection.query(addSql, addSqlParams, function (err, result) {

        err ? console.log('[INSERT ERROR] - ', err.message) : res.send(resData(0, 'success'));
    });
});

// 更新文章
router.put('/', function (req, res, next) {

    var data = req.body
    data.tags = data.tags.join(',')

    var tmp = []

    for (var key in data) {
        if (key !== 'id') tmp.push(key + ' = \'' + data[key] + '\'')
    }

    var updateSql = 'UPDATE articles SET ' + tmp.join(',') + ' WHERE id = ' + data.id


    connection.query(updateSql, function (err, result) {

        err ? console.log('[SELECT ERROR] - ', err.message) : res.send(resData(0, result));
    });

});

// 移除文章
router.delete('/', function (req, res, next) {

    // var data = req.body.data.join(',')
    var data = req.query

    var delSql = 'DELETE FROM articles WHERE id IN (' + data.ids + ')'

    // 删除
    connection.query(delSql, function (err, result) {
        err ? console.log('[INSERT ERROR] - ', err.message) : res.send(resData(0, result));
    });

});

// 查看文章
router.get('/detail', function (req, res, next) {

    //把搜索值输出
    res.send({ test: 'detail' });
});

module.exports = router;
