import { Map as ImmutableMap, List as ImmutableList, fromJS } from 'immutable';

import {
  SERVER_FETCH_REQUEST,
  SERVER_FETCH_SUCCESS,
  SERVER_FETCH_FAIL,
  SERVER_DOMAIN_BLOCKS_FETCH_REQUEST,
  SERVER_DOMAIN_BLOCKS_FETCH_SUCCESS,
  SERVER_DOMAIN_BLOCKS_FETCH_FAIL,
} from 'mastodon/actions/server';

const initialState = ImmutableMap({
  server: ImmutableMap({
    isLoading: false,
  }),

  domainBlocks: ImmutableMap({
    isLoading: false,
    isAvailable: true,
    items: ImmutableList(),
  }),
});

export default function server(state = initialState, action) {
  switch (action.type) {
  case SERVER_FETCH_REQUEST:
    return state.setIn(['server', 'isLoading'], true);
  case SERVER_FETCH_SUCCESS:
    return state.set('server', fromJS(action.server)).setIn(['server', 'isLoading'], false);
  case SERVER_FETCH_FAIL:
    return state.setIn(['server', 'isLoading'], false);
  case SERVER_DOMAIN_BLOCKS_FETCH_REQUEST:
    return state.setIn(['domainBlocks', 'isLoading'], true);
  case SERVER_DOMAIN_BLOCKS_FETCH_SUCCESS:
    return state.setIn(['domainBlocks', 'items'], fromJS(action.blocks)).setIn(['domainBlocks', 'isLoading'], false).setIn(['domainBlocks', 'isAvailable'], action.isAvailable);
  case SERVER_DOMAIN_BLOCKS_FETCH_FAIL:
    return state.setIn(['domainBlocks', 'isLoading'], false);
  default:
    return state;
  }
}
