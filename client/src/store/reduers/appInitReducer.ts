import { IAction } from '../../interface'
import { IAppInitState } from '../../interface'
import * as actionType from '../actions/actionType'

const appInitizingReducer = (state: IAppInitState, action: IAction<any>) => {

    if (!state) {
        state = { initialized: false }
    }

    switch(action.type) {
        case actionType.user_authenticated: {
            return {...state, initialized: true }
        }
        case actionType.user_not_authenticated: {
            return {...state, initialized: true }
        }
        default: return state
    }
}

export default appInitizingReducer
