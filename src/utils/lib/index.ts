import { Obj } from '@models'
import * as inf from './models'

export const getUrlParams: inf.iGetUrlParams = function () {
    let params: Obj = {}
    let urlParams: string = window.location.href.split('?')[1]
    if (urlParams) {
        urlParams.split('&').forEach(data => {
            let [key, val] = data.split('=')
            params[key] = val
        })
    }
    return params
}

// 获取cookie
export const getCookie: inf.iGetCookie = function (cname, defaultValue) {
    let value = new RegExp('(^|;| )' + cname + '=([^;]*?)(;|$)', 'g').exec(document.cookie);
    if (!value) return defaultValue;
    return value[2];
}

// 设置cookie
export const setCookie: inf.iSetCookie = function (cname, cvalue, day = 1, path = '/') {
    let date = new Date();
    date.setTime(date.getTime() + day * 24 * 60 * 60 * 1000);
    document.cookie = cname + '=' + cvalue + '; expires=' + date.toUTCString() + '; path=' + path + '; ';
}

// 删除cookie
export const deleteCookie: inf.iDeleteCookie = function (cname) {
    setCookie(cname, null, -1);
}