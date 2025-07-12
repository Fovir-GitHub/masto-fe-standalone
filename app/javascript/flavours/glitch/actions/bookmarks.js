import api, { getLinks } from '../api';

import { importFetchedStatuses } from './importer';

export const BOOKMARKED_STATUSES_FETCH_REQUEST = 'BOOKMARKED_STATUSES_FETCH_REQUEST';
export const BOOKMARKED_STATUSES_FETCH_SUCCESS = 'BOOKMARKED_STATUSES_FETCH_SUCCESS';
export const BOOKMARKED_STATUSES_FETCH_FAIL    = 'BOOKMARKED_STATUSES_FETCH_FAIL';

export const BOOKMARKED_STATUSES_EXPAND_REQUEST = 'BOOKMARKED_STATUSES_EXPAND_REQUEST';
export const BOOKMARKED_STATUSES_EXPAND_SUCCESS = 'BOOKMARKED_STATUSES_EXPAND_SUCCESS';
export const BOOKMARKED_STATUSES_EXPAND_FAIL    = 'BOOKMARKED_STATUSES_EXPAND_FAIL';

export function fetchBookmarkedStatuses(folderId) {
  return (dispatch, getState) => {
    const key = folderId ? `bookmarks:${folderId}`: 'bookmarks';

    if (getState().getIn(['status_lists', key, 'isLoading'])) {
      return;
    }

    dispatch(fetchBookmarkedStatusesRequest(folderId));

    api(getState).get('/api/v1/bookmarks', { params: { folder_id: folderId } }).then(response => {
      const next = getLinks(response).refs.find(link => link.rel === 'next');
      dispatch(importFetchedStatuses(response.data));
      dispatch(fetchBookmarkedStatusesSuccess(response.data, next ? next.uri : null, folderId));
    }).catch(error => {
      dispatch(fetchBookmarkedStatusesFail(error, folderId));
    });
  };
}

export function fetchBookmarkedStatusesRequest(folderId) {
  return {
    type: BOOKMARKED_STATUSES_FETCH_REQUEST,
    folderId,
  };
}

export function fetchBookmarkedStatusesSuccess(statuses, next, folderId) {
  return {
    type: BOOKMARKED_STATUSES_FETCH_SUCCESS,
    statuses,
    next,
    folderId,
  };
}

export function fetchBookmarkedStatusesFail(error, folderId) {
  return {
    type: BOOKMARKED_STATUSES_FETCH_FAIL,
    error,
    folderId,
  };
}

export function expandBookmarkedStatuses(folderId) {
  return (dispatch, getState) => {
    const key = folderId ? `bookmarks:${folderId}`: 'bookmarks';

    const url = getState().getIn(['status_lists', key, 'next'], null);

    if (url === null || getState().getIn(['status_lists', key, 'isLoading'])) {
      return;
    }

    dispatch(expandBookmarkedStatusesRequest(folderId));

    api(getState).get(url).then(response => {
      const next = getLinks(response).refs.find(link => link.rel === 'next');
      dispatch(importFetchedStatuses(response.data));
      dispatch(expandBookmarkedStatusesSuccess(response.data, next ? next.uri : null, folderId));
    }).catch(error => {
      dispatch(expandBookmarkedStatusesFail(error, folderId));
    });
  };
}

export function expandBookmarkedStatusesRequest(folderId) {
  return {
    type: BOOKMARKED_STATUSES_EXPAND_REQUEST,
    folderId,
  };
}

export function expandBookmarkedStatusesSuccess(statuses, next, folderId) {
  return {
    type: BOOKMARKED_STATUSES_EXPAND_SUCCESS,
    statuses,
    next,
    folderId,
  };
}

export function expandBookmarkedStatusesFail(error, folderId) {
  return {
    type: BOOKMARKED_STATUSES_EXPAND_FAIL,
    error,
    folderId,
  };
}
