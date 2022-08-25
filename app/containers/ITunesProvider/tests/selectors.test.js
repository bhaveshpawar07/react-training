import { initialState } from '../reducer';
import {
  selectITunesDomain,
  selectITunesName,
  selectITunesData,
  selectITunesError,
  selectITunesLoading,
  selectSongId,
  selectSongError,
  selectSongData
} from '../selectors';

describe('ITunes selector tests', () => {
  let mockedState;
  let tuneData;
  let tuneName, songId, songData, songError, loading;
  let tuneError;

  beforeEach(() => {
    tuneName = 'test';
    tuneData = { resultCount: 1, results: [{ tuneName }] };
    tuneError = 'There was some error while fetching the album details';
    songId = '007';
    songData = { resultCount: 1, results: [{ songId }] };
    songError = 'There was some error while fetching the album details';
    loading = false;
    mockedState = {
      iTunesProviderReducer: {
        tuneName,
        tuneData,
        tuneError,
        loading,
        songId,
        songData,
        songError
      }
    };
  });

  it('should select the global state', () => {
    const selector = selectITunesDomain(initialState);
    expect(selector).toEqual(initialState);
  });

  it('should select the iTunesName', () => {
    const nameSelector = selectITunesName();
    expect(nameSelector(mockedState)).toEqual(tuneName);
  });

  it('should select the iTunesData', () => {
    const nameSelector = selectITunesData();
    expect(nameSelector(mockedState)).toEqual(tuneData);
  });

  it('should select the iTunesError', () => {
    const nameSelector = selectITunesError();
    expect(nameSelector(mockedState)).toEqual(tuneError);
  });

  it('should select the songId', () => {
    const nameSelector = selectSongId();
    expect(nameSelector(mockedState)).toEqual(songId);
  });

  it('should select the songData', () => {
    const nameSelector = selectSongData();
    expect(nameSelector(mockedState)).toEqual(songData);
  });

  it('should select the selectSongError', () => {
    const nameSelector = selectSongError();
    expect(nameSelector(mockedState)).toEqual(songError);
  });
  it('should select the selectSongError', () => {
    const nameSelector = selectITunesLoading();
    expect(nameSelector(mockedState)).toEqual(loading);
  });
});
