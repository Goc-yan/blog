var Mock = require('mockjs')
var Random = Mock.Random

let { tags } = require('./tags')
let { categorys } = require('./categorys')

let articles = []
let randomNum = Random.integer(2, 5)

for (let i = 0; i < randomNum; i++) {
    articles.push(Mock.mock({
        'id': i + 1,
        'title': Random.ctitle(),
        'tags': Random.integer(1, tags.length),
        'category': Random.integer(1, categorys.length),
        'content': Random.csentence()
    }))
}

let proxy = {

    // 文章
    'POST /api/articles': function (req, res) {

        var resData = {
            errCode: 0,
            errMsg: '保存成功',
        }
        res.send(resData)
    },
    'DELETE /api/articles': function (req, res) {

        var resData = {
            errCode: 0,
            errMsg: '删除成功',
        }
        res.send(resData)
    },
    'PUT /api/articles': function (req, res) {

        var resData = {
            errCode: 0,
            errMsg: '修改成功',
        }
        res.send(resData)
    },
    'GET /api/articles': function (req, res) {

        var resData = {
            errCode: 0,
            data: articles
        }
        res.send(resData)
    },

}

articles.forEach((article) => {

    proxy[`GET /api/articles/${article.id}`] = function (req, res) {
        var resData = {
            errCode: 0,
            data: [{
                id: article.id,
                title: article.title,
                tags: ['javascript', 'webpack'],
                category: '日志',
                content: article.content
            }]
        }
        res.send(resData)
    }
})


module.exports = {
    articles,
    proxy
};