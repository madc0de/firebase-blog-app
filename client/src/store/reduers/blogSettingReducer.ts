import { IAction } from '../../interface'
import { IBlogSetting } from '../../interface'
import * as actionType from '../actions/actionType'
import { initail_BlogSetting } from '../../store/initialState';

const reducer = (state: IBlogSetting = initail_BlogSetting, action: IAction<IBlogSetting>) => {
    switch(action.type) {
        case actionType.blogsetting_loaded: {
            return { 
              ...state,  
              ...action.payload
            }
        }
        default: return state
    }
}

export default reducer
