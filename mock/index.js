let { sha512 } = require('../utils')

let tags = require('./tags')
let categorys = require('./categorys')
let articles = require('./articles')

const proxy = {

    // 登录
    'POST /api/login': function (req, res) {

        let name = req.body.userName, timestamp = req.body.timestamp
        let content = 'name=' + name + '&timestamp=' + timestamp
        let token = sha512(content)

        var resData = {
            errCode: 0,
            errMsg: '登陆成功'
        }

        res.setHeader("Set-Cookie", ['name=' + name + ';path=/', 'timestamp=' + timestamp + ';path=/', 'token=' + token + ';path=/']);

        res.send(resData)
    },

    ...articles.proxy,
    ...tags.proxy,
    ...categorys.proxy,   

};
module.exports = proxy;