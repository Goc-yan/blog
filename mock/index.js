let content = `
# 谈谈跨域

> 这是内容

test

\`\`\` js
    var React = require('react');
    var Markdown = require('react-markdown');

    React.render(
    <Markdown source="# Your markdown here" />,
    document.getElementById('content')
    );
\`\`\`

`

const proxy = {

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
            data: [{
                id: 2,
                title: 'webpack简易上手指南',
                tags: '1,2',
                category: '1',
                content: content
            }, {
                id: 3,
                title: '谈谈跨域',
                tags: '1,2',
                category: '1',
                content: '# 谈谈跨域\n\n> 这是内容'
            }]
        }
        res.send(resData)
    },

    'GET /api/articles/2': function (req, res) {

        var resData = {
            errCode: 0,
            data: {
                id: 2,
                title: 'webpack简易上手指南',
                tags: ['javascript', 'webpack'],
                category: '日志',
                content: content
            }
        }
        res.send(resData)
    },

    'GET /api/articles/3': function (req, res) {

        var resData = {
            errCode: 0,
            data: {
                id: 3,
                title: '谈谈跨域',
                tags: ['javascript', 'webpack'],
                category: '随笔',
                content: '# 谈谈跨域\n\n> 这是内容'
            }
        }
        res.send(resData)
    },

    // 标签
    'POST /api/tags': function (req, res) {

        var resData = {
            errCode: 0,
            errMsg: '保存成功',
        }
        res.send(resData)
    },
    'DELETE /api/tags': function (req, res) {

        var resData = {
            errCode: 0,
            errMsg: '删除成功',
        }
        res.send(resData)
    },
    'PUT /api/tags': function (req, res) {

        var resData = {
            errCode: 0,
            errMsg: '修改成功',
        }
        res.send(resData)
    },
    'GET /api/tags': function (req, res) {

        var resData = {
            errCode: 0,
            data: [{
                id: 1,
                tagName: 'webpack',
            }, {
                id: 2,
                tagName: 'node',
            }, {
                id: 3,
                tagName: 'javascript',
            }]
        }
        res.send(resData)
    },

    // 分类
    'POST /api/categorys': function (req, res) {

        var resData = {
            errCode: 0,
            errMsg: '保存成功',
        }
        res.send(resData)
    },
    'DELETE /api/categorys': function (req, res) {

        var resData = {
            errCode: 0,
            errMsg: '删除成功',
        }
        res.send(resData)
    },
    'PUT /api/categorys': function (req, res) {

        var resData = {
            errCode: 0,
            errMsg: '修改成功',
        }
        res.send(resData)
    },
    'GET /api/categorys': function (req, res) {

        var resData = {
            errCode: 0,
            data: [{
                id: 1,
                category: '随笔',
            }, {
                id: 2,
                category: '日志',
            }, {
                id: 3,
                category: '技术',
            }]
        }
        res.send(resData)
    },

};
module.exports = proxy;