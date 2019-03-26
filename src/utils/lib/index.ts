import { Obj } from '@models'

export const getUrlParams = function (): Obj {

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