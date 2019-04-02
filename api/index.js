var express = require('express');
var router = express.Router();


var articles = require('./articles')
var categorys = require('./categorys')
var tags = require('./tags')
var funds = require('./funds')

router.use('/articles', articles)
router.use('/categorys', categorys)
router.use('/tags', tags)
router.use('/funds', funds)

module.exports = router;