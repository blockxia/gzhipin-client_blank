import {combineReducers} from 'redux'

function xxx(state=0,action) {
    switch (action.type){
        // case :
        //     return
        // case :
        //     return
        default:
            return state
    }
}

function yyy(state=1,action) {
    switch(action.type){
        // case :
        //     return
        // case:
        //     return
        default:
            return state

    }
}

export default combineReducers({xxx,yyy})