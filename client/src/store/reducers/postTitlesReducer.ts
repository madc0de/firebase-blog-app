import { PostTitlesState } from "../../interface/PostTitlesState";
import { PostTitleDocument } from "../../interface/PostTitleData";
import { actionType } from "../actions";
import { ReduxAction } from "../../interface/ReduxAction";
import { initial_PostTitlesState } from "../initialState";


export const postTitlesReducer = (state: PostTitlesState = initial_PostTitlesState, action: ReduxAction<PostTitleDocument[]>) => {
  switch(action.type) {
    case actionType.posttitle_loaded: {
      return handle_posttitle_loaded(state, action)
    }
    default: return state
  }
}

const handle_posttitle_loaded = (state: PostTitlesState, action: ReduxAction<PostTitleDocument[]>) => {
  return {
    ...state,
    postTitles: [
      ...action.payload
    ]
  }
}
