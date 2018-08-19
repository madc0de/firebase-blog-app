import * as actionType from '../actions/actionType'
import { initial_MetaData } from '../initialState';
import { BlogMetaData } from '../../interface/BlogMetaData';
import { ReduxAction } from '../../interface/ReduxAction';

export const metaDataReducer = (state: BlogMetaData = initial_MetaData, action: ReduxAction<BlogMetaData>) => {
  switch(action.type) {
    case actionType.metadata_loaded: {
      return handle_metadata_loaded(state, action)
    }
    default: return state
  }
}

function handle_metadata_loaded(state: BlogMetaData, action: ReduxAction<BlogMetaData>) {
  return {
    ...state,
    ...action.payload
  }
}