let tags = [{
    id: 1,
    tagName: 'webpack',
}, {
    id: 2,
    tagName: 'node',
}, {
    id: 3,
    tagName: 'javascript',
}]

let proxy = {

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
            data: tags
        }
        res.send(resData)
    },
}

module.exports = {
    tags,
    proxy
};