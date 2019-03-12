import axios from 'axios'

interface Obj {
    [propName: string]: any;
}

let urlStringify = function (obj: Obj): string {

    if (JSON.stringify(obj) === '{}') return ''

    let list = []
    for (var key in obj) {
        list.push(key + '=' + obj[key])
    }
    return '?' + list.join('&')
}

let $get = function (...arg: any[]): void {

    let url = arg[0]
    let params = typeof arg[1] === 'object' ? urlStringify(arg[1]) : ''
    let callback = typeof arg[1] === 'function' ? arg[1] : arg[2]

    axios.get(url + params).then(function (response) {
        callback(response.data)
    }).catch(function (error) {
        console.log(error);
    })
}

let $post = function (url: string, options: object, callback: Function) {

    axios.post(url, options).then(function (response) {
        callback(response.data)
    }).catch(function (error) {
        console.log(error);
    })
}

export {
    $get,
    $post,
}