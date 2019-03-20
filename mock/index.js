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
                    content: '内容'
                },
                {
                    id: 3,
                    title: '谈谈跨域',
                    content: '内容'
                }
            ]
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
                },
                {
                    id: 2,
                    tagName: 'node',
                },
                {
                    id: 3,
                    tagName: 'javascript',
                }
            ]
        }
        res.send(resData)
    },

};
module.exports = proxy;