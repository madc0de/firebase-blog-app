import { IAuthState, IUserData, IAction } from '../../interface'
import * as actionType from '../actions/actionType'
import { initial_AuthState } from '../../store/initialState'


const authStateReducer = (state: IAuthState, action: IAction<IUserData>) => {
    state = state ? state : initial_AuthState

    switch (action.type) {
        case actionType.user_authenticated: {
            const newState = {
                ...initial_AuthState,
                authenticated: true,
                authUser: action.payload
            }            
            return newState
        }
        case actionType.user_not_authenticated: {
            const newState = {...initial_AuthState }
            return newState
        }
        default: return state
    }
}

export default authStateReducer