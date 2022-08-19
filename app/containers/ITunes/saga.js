import { getItunes } from '@services/iTuneApi';
import { put, call, takeLatest } from 'redux-saga/effects';
import { iTunesCreators, iTunesTypes } from './reducer';

// Individual exports for testing
const { REQUEST_GET_ITUNES_DATA } = iTunesTypes;
const { successGetItunesData, failureGetItunesData } = iTunesCreators;
export function* getItunesData(action) {
  // console.log('Do something here')
  const response = yield call(getItunes, action.tuneName);
  const { ok, data } = response;
  if (ok) {
    yield put(successGetItunesData(data));
  } else {
    yield put(failureGetItunesData(data));
  }
}

export default function* iTunesSaga() {
  yield takeLatest(REQUEST_GET_ITUNES_DATA, getItunesData);
}
