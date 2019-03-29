import { IArticle, IResData } from '@models'

export interface IResArticles extends IResData {
    data: IArticle[]
}

export interface IState {
    data: IArticle
}
