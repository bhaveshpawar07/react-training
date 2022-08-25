import { getItunes, getSongDetails } from '@services/iTuneApi';
import { put, call, takeLatest, all } from 'redux-saga/effects';
import { iTunesCreators, iTunesTypes } from './reducer';

// Individual exports for testing
const { REQUEST_GET_ITUNES_DATA, REQUEST_GET_SONG_DETAILS } = iTunesTypes;
const { successGetItunesData, failureGetItunesData, successGetSongDetails, failureGetSongDetails } = iTunesCreators;
export function* getItunesData(action) {
  const response = yield call(getItunes, action.tuneName);
  const { ok, data } = response;
  if (ok) {
    yield put(successGetItunesData(data));
  } else {
    yield put(failureGetItunesData(data));
  }
}

export function* getDetails(action) {
  const response = yield call(getSongDetails, action.songId);
  const { ok, data } = response;
  if (ok) {
    yield put(successGetSongDetails(data));
  } else {
    yield put(failureGetSongDetails(data));
  }
}

export default function* iTunesProviderSaga() {
  yield all([takeLatest(REQUEST_GET_ITUNES_DATA, getItunesData), takeLatest(REQUEST_GET_SONG_DETAILS, getDetails)]);
}
