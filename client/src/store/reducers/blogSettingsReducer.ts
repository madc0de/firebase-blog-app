import { IAction } from '../../interface'
import { IBlogSettings } from '../../interface'
import * as actionType from '../actions/actionType'
import { initail_BlogSetting } from '../initialState';

export const blogSettingsReducer = (state: IBlogSettings = initail_BlogSetting, action: IAction<IBlogSettings>): IBlogSettings => {
    switch(action.type) {
        case actionType.blogsetting_loaded: {
            return { 
              ...state,  
              ...action.payload,
              loaded: true
            }
        }
        default: return state
    }
}

