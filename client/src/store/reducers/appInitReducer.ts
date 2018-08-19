import * as actionType from '../actions/actionType'
import { AppInitState } from '../../interface/AppInitState';
import { ReduxAction } from '../../interface/ReduxAction';

export const appInitReducer = (state: AppInitState, action: ReduxAction<any>) => {

    if (!state) {
        state = { initialized: false }
    }

    switch(action.type) {
        case actionType.user_authenticated: {
            return {...state, initialized: true }
        }
        case actionType.user_signed_out: {
            return {...state, initialized: true }
        }
        default: return state
    }
}

