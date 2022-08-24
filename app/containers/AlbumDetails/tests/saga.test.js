/**
 * Test albumDetails sagas
 */

import { takeLatest } from 'redux-saga/effects';
import albumDetailsSaga, { defaultFunction } from '../saga';
import { albumDetailsTypes } from '../reducer';

describe('AlbumDetails saga tests', () => {
  const generator = albumDetailsSaga();

  it('should start task to watch for DEFAULT_ACTION action', () => {
    expect(generator.next().value).toEqual(takeLatest(albumDetailsTypes.DEFAULT_ACTION, defaultFunction));
  });
});
