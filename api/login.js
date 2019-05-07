let express = require('express');
let router = express.Router();

let { md5, sha512, createCookie } = require('../utils')

// 连接数据库
let { connection } = require('../db')

const resData = (errCode, data) => ({ errCode, data })
const resErr = (errCode, errMsg) => ({ errCode, errMsg })

// 创建token
const createToken = (name, timestamp) => sha512(`name=${name}&timestamp=${timestamp}`)

// 登陆
router.post('/', function (req, res, next) {
    
    let { userName, password, timestamp } = req.body
    console.log(req.body)
    
    let name = userName
    let pwd = md5(password)

    // SQL语句
    let sql = `SELECT * FROM users WHERE name='${name}' AND pwd='${pwd}' LIMIT 1;`;

    connection.query(sql, function (err, result) {

        if (err) {
            console.error('[SELECT ERROR] - ', err.message)
            return
        }
        
        if (result.length === 0) res.send(resErr(1, '用户名或密码错误'));
        
        let token = createToken(name, timestamp)

        let cookieList = createCookie(name, timestamp, token)

        res.setHeader("Set-Cookie", cookieList);

        res.send(resData(0, '登陆成功'))
    });

});

module.exports = router;
