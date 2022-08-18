import { takeLatest } from 'redux-saga/effects';
import { iTunesTypes } from './reducer';

// Individual exports for testing
const { REQUEST_GET_ITUNES_DATA } = iTunesTypes;

export function* defaultFunction(/* action */) {
  // console.log('Do something here')
}

export default function* iTunesSaga() {
  yield takeLatest(REQUEST_GET_ITUNES_DATA, defaultFunction);
}
