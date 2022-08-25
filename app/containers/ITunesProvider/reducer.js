/*
 *
 * ITunes reducer
 *
 */
import produce from 'immer';
import { get } from 'lodash';
import { createActions } from 'reduxsauce';

export const initialState = {
  tuneName: null,
  tuneData: {},
  tuneError: null,
  songId: '',
  songData: {},
  songError: null,
  loading: false
};

export const { Types: iTunesTypes, Creators: iTunesCreators } = createActions({
  requestGetItunesData: ['tuneName'],
  successGetItunesData: ['data'],
  failureGetItunesData: ['tuneError'],
  requestGetSongDetails: ['songId'],
  requestSetSongDetails: ['songDetails'],
  successGetSongDetails: ['songData'],
  failureGetSongDetails: ['songError'],
  clearSongDetails: {},
  clearItunesData: {}
});

export const iTunesProviderReducer = (state = initialState, action) =>
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
        draft.loading = false;
        break;
      case iTunesTypes.REQUEST_SET_SONG_DETAILS:
        draft.songData = action.songDetails;
        draft.songError = null;
        draft.loading = false;
        break;
      case iTunesTypes.REQUEST_GET_SONG_DETAILS:
        draft.songId = action.songId;
        draft.songError = null;
        draft.loading = true;
        break;
      case iTunesTypes.SUCCESS_GET_SONG_DETAILS:
        draft.songData = action.songData;
        draft.loading = false;
        break;
      case iTunesTypes.FAILURE_GET_SONG_DETAILS:
        draft.songError = get(action.songError, 'message', 'something_went_wrong');
        draft.loading = false;
        break;
      case iTunesTypes.CLEAR_SONG_DETAILS:
        draft.songId = '';
        draft.songData = {};
        draft.songError = null;
        draft.loading = false;
        break;
      default:
    }
  });

export default iTunesProviderReducer;
