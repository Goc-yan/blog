let categorys = [{
    id: 1,
    category: '随笔',
}, {
    id: 2,
    category: '日志',
}, {
    id: 3,
    category: '技术',
}]

let proxy = {

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
            data: categorys
        }
        res.send(resData)
    },
}

module.exports = {
    categorys,
    proxy
};