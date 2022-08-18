/*
 *
 * ITunes reducer
 *
 */
import produce from 'immer';
import { createActions } from 'reduxsauce';

export const initialState = { tuneName: null, tuneData: {}, tuneError: null };

export const { Types: iTunesTypes, Creators: iTunesCreators } = createActions({
  getItunesData: ['tuneName']
});

export const iTunesReducer = (state = initialState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case iTunesTypes.DEFAULT_ACTION:
        draft.somePayLoad = action.somePayLoad;
        break;
      default:
    }
  });

export default iTunesReducer;
