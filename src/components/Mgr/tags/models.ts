import { ITableColumn, IResData, IArticle, ITag } from '@models'

export interface IState {
    data: IArticle[]
    selectedRowKeys: number[]
    columns: ITableColumn[]
    loading: boolean
    visible: boolean
    submitting: boolean
    editorData?: ITag
    formRef?: any
}

export interface IResArticles extends IResData {
    data: IArticle[]
}

export interface IProp {
    form: any
    data: ITag
    setFormData: Function
}