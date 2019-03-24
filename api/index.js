var express = require('express');
var router = express.Router();


var articles = require('./articles')
var categorys = require('./categorys')
var tags = require('./tags')

router.use('/articles', articles)
router.use('/categorys', categorys)
router.use('/tags', tags)

module.exports = router;