var express = require('express');
var router = express.Router();

// 连接数据库
var { connection, query } = require('../db')

const resData = (errCode, data) => ({ errCode, data })

// 获取所有文章
router.get('/', function (req, res, next) {

    console.log('获取所有文章')

    // SQL语句
    var sql = 'SELECT * FROM articles';

    connection.query(sql, function (err, result) {

        try {

            if (result && Array.isArray(result)) {
                result.forEach(data => data.tags = data.tags.split(',').map(str => Number(str)))
                err ? console.log('[SELECT ERROR] - ', err.message) : res.send(resData(0, result));
            } else {
                res.send(resData(0, []));
            }

        } catch (e) {
            console.log(e)
        }

    });

});

// 新增文章
router.post('/', async function (req, res, next) {

    // 插入数据
    var addSql = 'INSERT INTO articles(title, createDate, updateDate, category, tags, content) VALUES(?,?,?,?,?,?)';

    // 获取数据
    var data = req.body
    var date = new Date().getTime()

    data.tags = data.tags.join(',')

    var addSqlParams = [
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
router.get('/:id', function (req, res, next) {

    let id = req.params.id

    // SQL语句
    var sql = `SELECT * FROM articles WHERE id=${id} LIMIT 1`

    connection.query(sql, async function (err, result) {

        let tagsWithId = result[0].tags
        let categoryID = result[0].category

        let queryTags = `SELECT * FROM tags WHERE id in (${tagsWithId})`
        let queryCategory = `SELECT * FROM categorys WHERE id = ${categoryID} LIMIT 1`

        let tags = await query(queryTags)
        let [ { category } ] = await query(queryCategory)

        result[0].category = category
        result[0].tags = tags.map(tag => tag.tagName)

        err ? console.log('[SELECT ERROR] - ', err.message) : res.send(resData(0, result));
    });
});

module.exports = router;