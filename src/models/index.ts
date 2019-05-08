export interface Obj {
    [propName: string]: any
}

export interface IResData {
    errCode: number
    data?: any
    errMsg?: string
}

/** antd column */
export interface ITableColumn {
    title: string,
    width?: number,
    key?: string,
    dataIndex?: string
    render?: any
}

/** Article */
export interface IArticle {
    id: number
    title: string
    content: string
    tags: number[]
    category: string
}

export interface IEditorArticle {
    id?: number
    title?: string
    content?: string
    tags?: number[]
    category?: string
}

/** Tag */
export interface ITag {
    id: number | null
    tagName: string
}

/** Category */
export interface ICategory {
    id: number | null
    category: string
}

/** nav base */
interface INavBase {
    name: string
    remark: string
}

export interface INavOption extends INavBase {
    router: string
}

export interface ISubNav extends INavBase {
    options: INavOption[]
}

export interface INav extends INavBase {
    options: ISubNav[]
}

