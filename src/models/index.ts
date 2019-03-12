export interface Article {
    id: number;
    title: string;
}

export interface Obj {
    [propName: string]: any;
}

// 函数类型
interface Func {
    (source: string, subString: string): boolean;
}
// 
let mySearch: Func = function (source, subString) {

    let result = source.search(subString);
    return result > -1;
}