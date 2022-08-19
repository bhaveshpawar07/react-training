/**
 * Test iTunes sagas
 */

import { takeLatest, call, put } from 'redux-saga/effects';
import iTunesSaga, { getItunesData } from '../saga';
import { iTunesTypes } from '../reducer';
import { getItunes } from '@services/iTuneApi';
import { apiResponseGenerator } from '@utils/testUtils';

describe('ITunes saga tests', () => {
  const generator = iTunesSaga();
  const tuneName = 'test';
  let getItunesDataGenerator = getItunesData({ tuneName });

  it('should start task to watch for REQUEST_GET_ITUNES_DATA action', () => {
    expect(generator.next().value).toEqual(takeLatest(iTunesTypes.REQUEST_GET_ITUNES_DATA, getItunesData));
  });

  it('should ensure that the action FAILURE_GET_GITHUB_REPOS is dispatched when the api call fails', () => {
    const res = getItunesDataGenerator.next().value;
    expect(res).toEqual(call(getItunes, tuneName));
    const errorResponse = {
      errorMessage: 'There was an error while fetching repo informations.'
    };
    expect(getItunesDataGenerator.next(apiResponseGenerator(false, errorResponse)).value).toEqual(
      put({
        type: iTunesTypes.FAILURE_GET_ITUNES_DATA,
        tuneError: errorResponse
      })
    );
  });

  it('should ensure that the action SUCCESS_GET_ITUNES_DATA is dispatched when the api call succeeds', () => {
    getItunesDataGenerator = getItunesData({ tuneName });
    const res = getItunesDataGenerator.next().value;
    expect(res).toEqual(call(getItunes, tuneName));
    const response = {
      resultCount: 1,
      result: [{ tuneName }]
    };
    expect(getItunesDataGenerator.next(apiResponseGenerator(true, response)).value).toEqual(
      put({
        type: iTunesTypes.SUCCESS_GET_ITUNES_DATA,
        data: response
      })
    );
  });
});
