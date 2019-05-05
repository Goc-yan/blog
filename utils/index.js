const crypto = require('crypto');

const { ENCRYPTION_SECRET } = require('../config/private')

// MD5加密
const md5 = pwd => crypto.createHash('md5').update(pwd).digest('base64');

// SHA512加密
const sha512 = (pwd) => crypto.createHmac('sha512', ENCRYPTION_SECRET).update(pwd).digest('base64').substring(0, 32)

module.exports = {
    md5,
    sha512
}