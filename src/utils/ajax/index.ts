import axios from 'axios'

import { Obj } from '@models'

let ROOT_HOST: string = ''

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
        .then(response => callback(response.data))
        .catch(error => console.log(error))
}

let $delete = function (url: string, ...arg: any[]): void {

    let params = typeof arg[0] === 'object' ? urlStringify(arg[0]) : ''
    let callback = typeof arg[0] === 'function' ? arg[0] : arg[1]

    axios.delete(ROOT_HOST + url + params)
        .then(response => callback(response.data))
        .catch(error => console.log(error))
}

let $put = function (url: string, options: object, callback: Function): void {

    axios.put(ROOT_HOST + url, options)
        .then(response => callback(response.data))
        .catch(error => console.log(error))
}

let $get = function (url: string, ...arg: any[]): void {

    let params = typeof arg[0] === 'object' ? urlStringify(arg[0]) : ''
    let callback = typeof arg[0] === 'function' ? arg[0] : arg[1]

    axios.get(ROOT_HOST + url + params)
        .then(response => callback(response.data))
        .catch(error => console.log(error))
}

export {
    $post,
    $delete,
    $put,
    $get,
}