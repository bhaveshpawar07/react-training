import { getSongDetails } from '@services/iTuneApi';
import { takeLatest, call, put } from 'redux-saga/effects';
import { albumDetailsCreators, albumDetailsTypes } from './reducer';

// Individual exports for testing
const { REQUEST_GET_SONG_DETAILS } = albumDetailsTypes;
const { successGetSongDetails, failureGetSongDetails } = albumDetailsCreators;
export function* getDetails(action) {
  const response = yield call(getSongDetails, action.songId);
  const { ok, data } = response;
  if (ok) {
    yield put(successGetSongDetails(data));
  } else {
    yield put(failureGetSongDetails(data));
  }
}

export default function* albumDetailsSaga() {
  yield takeLatest(REQUEST_GET_SONG_DETAILS, getDetails);
}
