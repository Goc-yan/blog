export interface Obj {
    [propName: string]: any
}

export interface ResData {
    errCode: number
    errMsg?: string
    data: any[]
}

export interface TableColumn {
    title: string,
    width: number,
    key?: string,
    dataIndex?: string
    render?: any
}

export interface Article {
    id?: number
    title: string
    content: string
}
