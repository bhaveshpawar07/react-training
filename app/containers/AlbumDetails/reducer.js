/*
 *
 * AlbumDetails reducer
 *
 */
import produce from 'immer';
import { get } from 'lodash';
import { createActions } from 'reduxsauce';

export const initialState = {
  songId: '',
  songData: {},
  songError: null,
  loading: false
};

export const { Types: albumDetailsTypes, Creators: albumDetailsCreators } = createActions({
  requestGetSongDetails: ['songId'],
  successGetSongDetails: ['songData'],
  failureGetSongDetails: ['songError'],
  clearSongDetails: {}
});

export const albumDetailsReducer = (state = initialState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case albumDetailsTypes.REQUEST_GET_SONG_DETAILS:
        draft.songId = action.songId;
        draft.songError = null;
        draft.loading = true;

        break;
      case albumDetailsTypes.SUCCESS_GET_SONG_DETAILS:
        draft.songData = action.songData;
        draft.loading = false;
        break;
      case albumDetailsTypes.FAILURE_GET_SONG_DETAILS:
        draft.songError = get(action.songError, 'message', 'something_went_wrong');
        draft.loading = false;
        break;
      case albumDetailsTypes.CLEAR_SONG_DETAILS:
        draft.songData = {};
        draft.songError = null;
        draft.loading = false;
        break;
      default:
    }
  });

export default albumDetailsReducer;
