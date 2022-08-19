/**
 * Test iTunes sagas
 */

import { takeLatest } from 'redux-saga/effects';
import iTunesSaga, { defaultFunction } from '../saga';
import { iTunesTypes } from '../reducer';

describe('ITunes saga tests', () => {
  const generator = iTunesSaga();

  it('should start task to watch for REQUEST_GET_ITUNES_DATA action', () => {
    expect(generator.next().value).toEqual(takeLatest(iTunesTypes.REQUEST_GET_ITUNES_DATA, defaultFunction));
  });
});
