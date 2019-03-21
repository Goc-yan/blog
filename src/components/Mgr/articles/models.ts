import { ITableColumn, IResData, IArticle, ITag } from '@models'

export interface IState {
    data: IArticle[]
    tags: ITag[]
    selectedRowKeys: number[]
    columns: ITableColumn[]
    isEditor: boolean
    article: IArticle
}

export interface IResArticles extends IResData {
    data: IArticle[]
}

export interface IResTags extends IResData {
    data: ITag[]
}

export interface IEditorState {
    confirmDirty: boolean
    autoCompleteResult: string[]
    selectedTags: number[]
    modules: any
    formats: string[]
}

export interface IProp {
    form: any
    data: IArticle
    tags: ITag[]
    update: any
    add: any
}
