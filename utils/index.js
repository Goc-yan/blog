const crypto = require('crypto');

const { ENCRYPTION_SECRET } = require('../config/private')

/** MD5加密 */
const md5 = pwd => crypto.createHash('md5').update(pwd).digest('base64');

/** SHA512加密 */
const sha512 = (pwd) => crypto.createHmac('sha512', ENCRYPTION_SECRET).update(pwd).digest('base64').substring(0, 32)

/** 新建 cookie */
const createCookie = (name, timestamp, token) => {
    
    let res = []
    let expires = new Date(timestamp + 30 * 60 * 1000).toGMTString()
    let cookieArg = ';path=/;expires=' + expires

    res.push('name=' + name + cookieArg)
    res.push('timestamp=' + timestamp + cookieArg)
    res.push('token=' + token + cookieArg)
    return res
}

module.exports = {
    md5,
    sha512,
    createCookie
}