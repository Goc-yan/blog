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

let $get = function (url: string, ...arg: any[]): void {

    let params = typeof arg[0] === 'object' ? urlStringify(arg[0]) : ''
    let callback = typeof arg[0] === 'function' ? arg[0] : arg[1]

    axios.get(url + params)
        .then(response => callback(response.data))
        .catch(error => console.log(error))
}

let $post = function (url: string, options: object, callback: Function) {

    axios.post(url, options)
        .then(response => callback(response.data))
        .catch(error => console.log(error))
}

export {
    $get,
    $post,
}