//加载mysql模块
var mysql = require('mysql');

// private
var PRIVATE = require('../config/private')

//创建连接
var connection = mysql.createConnection({
    host: PRIVATE.BASE_HOST,
    port: '3306',
    user: PRIVATE.SQL_USER,
    password: PRIVATE.SQL_PWD,
    database: 'blog'
})

// //执行创建连接 
connection.connect(err => {
    // 如果在这一步抛出错误 请检查数据库配置  比如权限 选中数据库是否存在等等..
    if (err) return console.log('数据库连接失败', err.message);
    console.log('数据库连接成功');
})


let query = sql => new Promise((resolve, reject) => connection.query(sql, (err, rows) => err ? reject(err) : resolve(rows)))

module.exports = {
    connection,
    query
};