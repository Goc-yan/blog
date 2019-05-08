import { ITableColumn, IResData, IArticle, IEditorArticle, ICategory, ITag } from '@models'

export interface IState {
    data: IArticle[]
    tags: ITag[]
    categorys: ICategory[]
    selectedRowKeys: number[]
    columns: ITableColumn[]
    isEditor: boolean
    article: IEditorArticle
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
    selectedTags: number[]
}

export interface IProp {
    form: any
    data: IEditorArticle
    tags: ITag[]
    categorys: ICategory[]
    update: any
    add: any
}
