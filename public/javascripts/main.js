console.log(1111111)
var url = '/api/articles/create'
var data = {
    title: 'title',
    createDate: new Date().getTime(),
    article: 'this is a paragraph'
}
$.post(url, data, function (result) {
    console.log(result)
});