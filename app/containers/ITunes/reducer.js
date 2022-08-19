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
      case iTunesTypes.REQUEST_GET_ITUNES_DATA:
        // eslint-disable-next-line no-console
        console.log('Dispatcher called for ', action.tuneName);
        draft.tuneName = action.tuneName;
        break;
      default:
    }
  });

export default iTunesReducer;
