import axios from 'axios'

import { Obj } from '@models'

let ROOT_HOST: string = ''

/**
 * 错误处理
 * @param data 返回数据
 * @param callback 回调函数
 */
let errorHandle = function (data: any, callback: Function) {
    switch (data.errCode) {
        case 1001:
            location.href = '#login'
            return
    }
    if (callback) callback(data)
}

let urlStringify = function (obj: Obj): string {

    if (JSON.stringify(obj) === '{}') return ''

    let list = []
    for (var key in obj) {
        list.push(key + '=' + obj[key])
    }
    return '?' + list.join('&')
}

let $post = function (url: string, options: object, callback: Function): void {

    axios.post(ROOT_HOST + url, options)
        .then(response => errorHandle(response.data, callback))
        .catch(error => console.log(error))
}

let $delete = function (url: string, ...arg: any[]): void {

    let params = typeof arg[0] === 'object' ? urlStringify(arg[0]) : ''
    let callback = typeof arg[0] === 'function' ? arg[0] : arg[1]

    axios.delete(ROOT_HOST + url + params)
        .then(response => errorHandle(response.data, callback))
        .catch(error => console.log(error))
}

let $put = function (url: string, options: object, callback: Function): void {

    axios.put(ROOT_HOST + url, options)
        .then(response => errorHandle(response.data, callback))
        .catch(error => console.log(error))
}

let $get = function (url: string, ...arg: any[]): void {

    let params = typeof arg[0] === 'object' ? urlStringify(arg[0]) : ''
    let callback = typeof arg[0] === 'function' ? arg[0] : arg[1]

    axios.get(ROOT_HOST + url + params)
        .then(response => errorHandle(response.data, callback))
        .catch(error => console.log(error))
}

export {
    $post,
    $delete,
    $put,
    $get,
}