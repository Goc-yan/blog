export interface Obj {
    [propName: string]: any
}

export interface IResData {
    errCode: number
    msg?: string
    data?: any[]
    errMsg?: string
}

export interface ITableColumn {
    title: string,
    width: number,
    key?: string,
    dataIndex?: string
    render?: any
}

export interface IArticle {
    id?: number | null
    title: string
    content: string
    tags?: number[]
    category?: string
}

export interface ITag {
    id: number | null
    tagName: string
}

export interface ICategory {
    id: number | null
    category: string
}

