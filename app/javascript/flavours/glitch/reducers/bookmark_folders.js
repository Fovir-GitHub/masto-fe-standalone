import { Map as ImmutableMap, fromJS } from 'immutable';

import {
  BOOKMARK_FOLDERS_FETCH_SUCCESS,
  BOOKMARK_FOLDER_CREATE_SUCCESS,
  BOOKMARK_FOLDER_UPDATE_SUCCESS,
  BOOKMARK_FOLDER_DELETE_SUCCESS,
} from '../actions/bookmark_folders';

const initialState = ImmutableMap();

const normalizeBookmarkFolder = (state, folder) => state.set(folder.id, fromJS(folder));

const normalizeBookmarkFolders = (state, folders) => {
  folders.forEach(folder => {
    state = normalizeBookmarkFolder(state, folder);
  });

  return state;
};

export default function bookmarkFolders(state = initialState, action) {
  switch(action.type) {
  case BOOKMARK_FOLDER_CREATE_SUCCESS:
  case BOOKMARK_FOLDER_UPDATE_SUCCESS:
    return normalizeBookmarkFolder(state, action.folder);
  case BOOKMARK_FOLDERS_FETCH_SUCCESS:
    return normalizeBookmarkFolders(state, action.folders);
  case BOOKMARK_FOLDER_DELETE_SUCCESS:
    return state.set(action.id, false);
  default:
    return state;
  }
}
