import { combineReducers, createStore } from 'redux'

import { Article } from '@models'

function articles(state: Article[] = [], action: any) {

    if (action.type === 'getArticles') {

        return [{
            id: 1,
            title: 'webpack简易上手指南',
        }, {
            id: 2,
            title: '谈谈跨域',
        }]
    }
    return []
}


let reducer = combineReducers({ articles })
let store = createStore(reducer)

store.subscribe(() => console.log(store.getState()));


// store.dispatch({ type: 'SET_VISIBILITY_FILTER', filter: 'OTHER' });
// store.dispatch({ type: 'ADD_TODO', text: 'WHAT' });
// store.dispatch({ type: 'ADD_TODO', text: 'WWWWWHAT' });


export default store