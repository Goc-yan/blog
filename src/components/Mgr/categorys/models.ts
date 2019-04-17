import { ITableColumn, IResData, IArticle, ICategory } from '@models'

export interface IState {
    data: IArticle[]
    selectedRowKeys: number[]
    columns: ITableColumn[]
    loading: boolean
    visible: boolean
    submitting: boolean
    editorData?: ICategory
    formRef?: any
}

export interface IResArticles extends IResData {
    data: IArticle[]
}

export interface IProp {
    form: any
    data: ICategory
    onRef: Function
}

export interface IEditorState {
    category: ICategory
}