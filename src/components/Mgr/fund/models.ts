import { ITableColumn, IResData, IArticle, ICategory, ITag } from '@models'

export interface IState {
    data: any[]
    selectedRowKeys: number[]
    columns: ITableColumn[]
}

export interface IResArticles extends IResData {
    data: IArticle[]
}

export interface IResTags extends IResData {
    data: ITag[]
}

export interface IResCategory extends IResData {
    data: ICategory[]
}

export interface IEditorState {
    code: number
}

export interface IEditorProp {
    onRef: Function
    form: any
}


export interface IProp {
    form: any
    onRef: Function
}
