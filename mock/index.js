const proxy = {
    
    'GET /api/articles/list': function (req, res) {

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
    'POST /api/articles/delete': function (req, res) {

        // console.log(req.body.data)
        var resData = {
            errCode: 0,
        }
        res.send(resData)
    },
};
module.exports = proxy;