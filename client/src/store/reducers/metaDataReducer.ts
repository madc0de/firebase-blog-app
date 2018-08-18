import { IAction } from '../../interface'
import { IMetaData } from '../../interface'
import * as actionType from '../actions/actionType'
import { initial_MetaData } from '../initialState';

export const metaDataReducer = (state: IMetaData = initial_MetaData, action: IAction<IMetaData>) => {
  switch(action.type) {
    case actionType.metadata_loaded: {
      return handle_metadata_loaded(state, action)
    }
    default: return state
  }
}

function handle_metadata_loaded(state: IMetaData, action: IAction<IMetaData>) {
  return {
    ...state,
    ...action.payload
  }
}