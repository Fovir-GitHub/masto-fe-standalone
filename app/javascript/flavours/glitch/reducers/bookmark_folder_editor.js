import { Map as ImmutableMap } from 'immutable';

import {
  BOOKMARK_FOLDER_CREATE_REQUEST,
  BOOKMARK_FOLDER_CREATE_FAIL,
  BOOKMARK_FOLDER_CREATE_SUCCESS,
  BOOKMARK_FOLDER_UPDATE_REQUEST,
  BOOKMARK_FOLDER_UPDATE_FAIL,
  BOOKMARK_FOLDER_UPDATE_SUCCESS,
  BOOKMARK_FOLDER_EDITOR_RESET,
  BOOKMARK_FOLDER_EDITOR_SETUP,
  BOOKMARK_FOLDER_EDITOR_NAME_CHANGE,
} from '../actions/bookmark_folders';

const initialState = ImmutableMap({
  folderId: null,
  isSubmitting: false,
  isChanged: false,
  name: '',
});

export default function listEditorReducer(state = initialState, action) {
  switch(action.type) {
  case BOOKMARK_FOLDER_EDITOR_RESET:
    return initialState;
  case BOOKMARK_FOLDER_EDITOR_SETUP:
    return state.withMutations(map => {
      map.set('folderId', action.folder.get('id'));
      map.set('folder', action.folder.get('title'));
    });
  case BOOKMARK_FOLDER_EDITOR_NAME_CHANGE:
    return state.withMutations(map => {
      map.set('name', action.value);
      map.set('isChanged', true);
    });
  case BOOKMARK_FOLDER_CREATE_REQUEST:
  case BOOKMARK_FOLDER_UPDATE_REQUEST:
    return state.withMutations(map => {
      map.set('isSubmitting', true);
      map.set('isChanged', false);
    });
  case BOOKMARK_FOLDER_CREATE_FAIL:
  case BOOKMARK_FOLDER_UPDATE_FAIL:
    return state.set('isSubmitting', false);
  case BOOKMARK_FOLDER_CREATE_SUCCESS:
  case BOOKMARK_FOLDER_UPDATE_SUCCESS:
    return state.withMutations(map => {
      map.set('isSubmitting', false);
      map.set('folderId', action.folder.id);
    });
  default:
    return state;
  }
}
