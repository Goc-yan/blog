import { ITableColumn, IResData, IArticle } from '@models'

export interface IState {
    data: IArticle[]
    selectedRowKeys: number[]
    columns: ITableColumn[]
    isEditor: boolean
    article: IArticle
}

export interface IResArticles extends IResData {
    data: IArticle[]
}