import axios from 'axios'

let urlparse = function (obj: any) {

    if (JSON.stringify(obj) === '{}') return ''

    let list = []
    for (var key in obj) {
        list.push(key + '=' + obj[key])
    }
    return '?' + list.join('&')
}

let $get = function () {

    let url = arguments[0]
    let params = typeof arguments[1] === 'object' ? urlparse(arguments[1]) : ''
    let callback = typeof arguments[1] === 'function' ? arguments[1] : arguments[2]

    axios.get(url + params).then(function (response) {
        callback(response.data)
    })
}

let $post = function (url: string, options: object, callback: Function) {

    axios.post(url, options).then(function (response) {
        callback(response.data)
    }).catch(function (error) {
        console.log(error);
    });
}

export {
    $get,
    $post
}