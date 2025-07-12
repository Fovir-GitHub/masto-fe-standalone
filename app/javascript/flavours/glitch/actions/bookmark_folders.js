import api from '../api';

export const BOOKMARK_FOLDERS_FETCH_REQUEST = 'BOOKMARK_FOLDERS_FETCH_REQUEST';
export const BOOKMARK_FOLDERS_FETCH_SUCCESS = 'BOOKMARK_FOLDERS_FETCH_SUCCESS';
export const BOOKMARK_FOLDERS_FETCH_FAIL    = 'BOOKMARK_FOLDERS_FETCH_FAIL';

export const BOOKMARK_FOLDER_CREATE_REQUEST = 'BOOKMARK_FOLDER_CREATE_REQUEST';
export const BOOKMARK_FOLDER_CREATE_SUCCESS = 'BOOKMARK_FOLDER_CREATE_SUCCESS';
export const BOOKMARK_FOLDER_CREATE_FAIL    = 'BOOKMARK_FOLDER_CREATE_FAIL';

export const BOOKMARK_FOLDER_UPDATE_REQUEST = 'BOOKMARK_FOLDER_UPDATE_REQUEST';
export const BOOKMARK_FOLDER_UPDATE_SUCCESS = 'BOOKMARK_FOLDER_UPDATE_SUCCESS';
export const BOOKMARK_FOLDER_UPDATE_FAIL    = 'BOOKMARK_FOLDER_UPDATE_FAIL';

export const BOOKMARK_FOLDER_DELETE_REQUEST = 'BOOKMARK_FOLDER_DELETE_REQUEST';
export const BOOKMARK_FOLDER_DELETE_SUCCESS = 'BOOKMARK_FOLDER_DELETE_SUCCESS';
export const BOOKMARK_FOLDER_DELETE_FAIL    = 'BOOKMARK_FOLDER_DELETE_FAIL';

export const BOOKMARK_FOLDER_EDITOR_NAME_CHANGE = 'BOOKMARK_FOLDER_EDITOR_NAME_CHANGE';
export const BOOKMARK_FOLDER_EDITOR_RESET       = 'BOOKMARK_FOLDER_EDITOR_RESET';
export const BOOKMARK_FOLDER_EDITOR_SETUP       = 'BOOKMARK_FOLDER_EDITOR_SETUP';

export const fetchBookmarkFolders = () => (dispatch, getState) => {
  dispatch(fetchBookmarkFoldersRequest());

  api(getState).get('/api/v1/bookmark_folders')
    .then(({ data }) => dispatch(fetchBookmarkFoldersSuccess(data)))
    .catch(err => dispatch(fetchBookmarkFoldersFail(err)));
};

export const fetchBookmarkFoldersRequest = () => ({
  type: BOOKMARK_FOLDERS_FETCH_REQUEST,
});

export const fetchBookmarkFoldersSuccess = folders => ({
  type: BOOKMARK_FOLDERS_FETCH_SUCCESS,
  folders,
});

export const fetchBookmarkFoldersFail = error => ({
  type: BOOKMARK_FOLDERS_FETCH_FAIL,
  error,
});

export const createBookmarkFolder = (name, shouldReset) => (dispatch, getState) => {
  dispatch(createBookmarkFolderRequest());

  api(getState).post('/api/v1/bookmark_folders', { name }).then(({ data }) => {
    dispatch(createBookmarkFolderSuccess(data));
    
    if (shouldReset) {
      dispatch(resetBookmarkFolderEditor());
    }
  }).catch(err => dispatch(createBookmarkFolderFail(err)));
};

export const createBookmarkFolderRequest = () => ({
  type: BOOKMARK_FOLDER_CREATE_REQUEST,
});

export const createBookmarkFolderSuccess = folder => ({
  type: BOOKMARK_FOLDER_CREATE_SUCCESS,
  folder,
});

export const createBookmarkFolderFail = error => ({
  type: BOOKMARK_FOLDER_CREATE_FAIL,
  error,
});

export const updateBookmarkFolder = (id, name, shouldReset) => (dispatch, getState) => {
  dispatch(updateBookmarkFolderRequest(id));

  api(getState).put(`/api/v1/bookmark_folders/${id}`, { name }).then(({ data }) => {
    dispatch(updateBookmarkFolderSuccess(data));
    
    if (shouldReset) {
      dispatch(resetBookmarkFolderEditor());
    }
  }).catch(err => dispatch(updateBookmarkFolderFail(id, err)));
};

export const updateBookmarkFolderRequest = id => ({
  type: BOOKMARK_FOLDER_UPDATE_REQUEST,
  id,
});

export const updateBookmarkFolderSuccess = folder => ({
  type: BOOKMARK_FOLDER_UPDATE_SUCCESS,
  folder,
});

export const updateBookmarkFolderFail = (id, error) => ({
  type: BOOKMARK_FOLDER_UPDATE_FAIL,
  id,
  error,
});

export const deleteBookmarkFolder = id => (dispatch, getState) => {
  dispatch(deleteBookmarkFolderRequest(id));

  api(getState).delete(`/api/v1/bookmark_folders/${id}`)
    .then(() => dispatch(deleteBookmarkFolderSuccess(id)))
    .catch(err => dispatch(deleteBookmarkFolderFail(id, err)));
};

export const deleteBookmarkFolderRequest = id => ({
  type: BOOKMARK_FOLDER_DELETE_REQUEST,
  id,
});

export const deleteBookmarkFolderSuccess = id => ({
  type: BOOKMARK_FOLDER_DELETE_SUCCESS,
  id,
});

export const deleteBookmarkFolderFail = (id, error) => ({
  type: BOOKMARK_FOLDER_DELETE_FAIL,
  id,
  error,
});

export const submitBookmarkFolderEditor = shouldReset => (dispatch, getState) => {
  const folderId = getState().getIn(['bookmarkFolderEditor', 'folderId']);
  const name  = getState().getIn(['bookmarkFolderEditor', 'name']);

  if (folderId === null) {
    dispatch(createBookmarkFolder(name, shouldReset));
  } else {
    dispatch(updateBookmarkFolder(folderId, name, shouldReset));
  }
};

export const resetBookmarkFolderEditor = () => ({
  type: BOOKMARK_FOLDER_EDITOR_RESET,
});

export const setupBookmarkFolderEditor = folderId => (dispatch, getState) => dispatch({
  type: BOOKMARK_FOLDER_EDITOR_SETUP,
  folder: getState().getIn(['bookmarkFolders', folderId]),
});

export const changeBookmarkFolderEditorName = value => ({
  type: BOOKMARK_FOLDER_EDITOR_NAME_CHANGE,
  value,
});
