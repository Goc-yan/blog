var express = require('express');
var http = require('http');
var router = express.Router();

// 连接数据库
var { connection, query } = require('../db')

const codes = ['161810', '000591']

const resData = (errCode, data) => ({ errCode, data })

let getData = async function (code) {

    let url = `http://fundgz.1234567.com.cn/js/${code}.js?rt=${new Date().getTime()}`

    return new Promise(function (resolve, reject) {
        return http.get(url, function (res) {
            res.setEncoding('utf-8')
            let rawData = '';
            res.on('data', (chunk) => {
                chunk = chunk.slice(8, chunk.length - 2)
                rawData += chunk;
            });
            res.on('end', () => {
                try {
                    resolve(JSON.parse(rawData))
                } catch (e) {
                    console.error(e.message);
                }
            });
        }).on('error', (e) => {
            reject(`Got error: ${e.message}`);
        });
    })
}

// 获取所有文章
router.get('/', async function (req, res, next) {

    let results = await Promise.all(codes.map(async (data) => await getData(data)));
    res.send({ results })
});


// 查看文章
// router.get('/:id', function (req, res, next) {

//     let id = req.params.id

//     // SQL语句
//     var sql = `SELECT * FROM articles WHERE id=${id} LIMIT 1`

//     connection.query(sql, async function (err, result) {

//         let tagsWithId = result[0].tags
//         let categoryID = result[0].category

//         let queryTags = `SELECT * FROM tags WHERE id in (${tagsWithId})`
//         let queryCategory = `SELECT * FROM categorys WHERE id = ${categoryID} LIMIT 1`

//         let tags = await query(queryTags)
//         let [ { category } ] = await query(queryCategory)

//         result[0].category = category
//         result[0].tags = tags.map(tag => tag.tagName)

//         err ? console.log('[SELECT ERROR] - ', err.message) : res.send(resData(0, result));
//     });
// });

module.exports = router;