import { Dispatch } from 'redux';
import { Metadata } from '../../../data'
import * as actionType from '../actionType'
import { BlogMetaData } from '../../../interface/BlogMetaData';

export const loadMetadataAction = (): any => async (
  dispatch: Dispatch
) => {
  try {
    const metadata = await Metadata.getMetadata()
    dispatch({
      type:actionType.metadata_loaded,
      payload: metadata as BlogMetaData
    })
    return metadata
  } catch(err) {
    return err
  }
}
