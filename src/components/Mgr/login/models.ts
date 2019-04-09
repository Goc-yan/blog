import { IResData, IArticle } from '@models'

export interface iState {
    data: IArticle[]
}

export interface iResArticles extends IResData {
    data: IArticle[]
}
