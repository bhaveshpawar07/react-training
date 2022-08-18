import { takeLatest } from 'redux-saga/effects';
import { iTunesTypes } from './reducer';

// Individual exports for testing
const { DEFAULT_ACTION } = iTunesTypes;

export function* defaultFunction(/* action */) {
  // console.log('Do something here')
}

export default function* iTunesSaga() {
  yield takeLatest(DEFAULT_ACTION, defaultFunction);
}
