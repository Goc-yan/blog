import { ITableColumn, IResData, IArticle, ICategory, ITag } from '@models'

export interface IState {
    data: IArticle[]
    tags: ITag[]
    categorys: ICategory[]
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

export interface IResCategory extends IResData {
    data: ICategory[]
}

export interface IEditorState {
    confirmDirty: boolean
    autoCompleteResult: string[]
    selectedTags: number[]
}

export interface IProp {
    form: any
    data: IArticle
    tags: ITag[]
    categorys: ICategory[]
    update: any
    add: any
}
