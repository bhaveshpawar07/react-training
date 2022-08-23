/*
 *
 * ITunes reducer
 *
 */
import produce from 'immer';
import { get } from 'lodash';
import { createActions } from 'reduxsauce';

export const initialState = { tuneName: null, tuneData: {}, tuneError: null, loading: false };

export const { Types: iTunesTypes, Creators: iTunesCreators } = createActions({
  requestGetItunesData: ['tuneName'],
  successGetItunesData: ['data'],
  failureGetItunesData: ['tuneError'],
  clearItunesData: {}
});

export const iTunesReducer = (state = initialState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case iTunesTypes.REQUEST_GET_ITUNES_DATA:
        draft.tuneName = action.tuneName;
        draft.loading = true;
        break;
      case iTunesTypes.SUCCESS_GET_ITUNES_DATA:
        draft.tuneData = action.data;
        draft.loading = false;
        break;
      case iTunesTypes.FAILURE_GET_ITUNES_DATA:
        draft.tuneError = get(action.tuneError, 'message', 'something_went_wrong');
        draft.loading = false;
        break;
      case iTunesTypes.CLEAR_ITUNES_DATA:
        draft.tuneName = null;
        draft.tuneData = {};
        draft.tuneError = null;
        break;
      default:
    }
  });

export default iTunesReducer;
