/*
 *
 * ITunes reducer
 *
 */
import produce from 'immer';
import { get } from 'lodash';
import { createActions } from 'reduxsauce';

export const initialState = { tuneName: null, tuneData: {}, tuneError: null };

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
        break;
      case iTunesTypes.SUCCESS_GET_ITUNES_DATA:
        draft.tuneData = action.data;
        break;
      case iTunesTypes.FAILURE_GET_ITUNES_DATA:
        draft.tuneError = get(action.tuneError, 'message', 'something_went_wrong');
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
