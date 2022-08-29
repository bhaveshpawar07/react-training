import iTunesReducer, { iTunesTypes, initialState } from '../reducer';

describe('ITunes reducer tests', () => {
  it('should return the initial state by default', () => {
    expect(iTunesReducer(undefined, {})).toEqual(initialState);
  });

  it('should return the updated state when an action of type REQUEST_GET_ITUNES_DATA is dispatched', () => {
    const expectedResult = { ...initialState, tuneName: 'test', loading: true };
    expect(
      iTunesReducer(initialState, {
        type: iTunesTypes.REQUEST_GET_ITUNES_DATA,
        tuneName: 'test'
      })
    ).toEqual(expectedResult);
  });
  it('should return the itunes data when an action of type SUCCESS_GET_ITUNES_DATA is dispatched', () => {
    const data = { resultCount: 1, result: [{ tuneName: 'test' }] };
    const expectedResult = { ...initialState, tuneData: data };
    expect(
      iTunesReducer(initialState, {
        type: iTunesTypes.SUCCESS_GET_ITUNES_DATA,
        data
      })
    ).toEqual(expectedResult);
  });

  it('should return the error when an action of type FAILURE_GET_ITUNES_DATA is dispatched', () => {
    const error = 'something_went_wrong';
    const expectedResult = { ...initialState, tuneError: error };
    expect(
      iTunesReducer(initialState, {
        type: iTunesTypes.FAILURE_GET_ITUNES_DATA,
        tuneError: error
      })
    ).toEqual(expectedResult);
  });

  it('should return the initial state when an action of type CLEAR_ITUNES_DATA is dispatched', () => {
    const expectedResult = { ...initialState, tuneName: null, tuneData: {}, tuneError: null };
    expect(
      iTunesReducer(initialState, {
        type: iTunesTypes.CLEAR_ITUNES_DATA
      })
    ).toEqual(expectedResult);
  });

  it('should return the updated state when an action of type REQUEST_SET_SONG_DETAILS is dispatched', () => {
    const data = { resultCount: 1, result: [{ tuneName: 'test' }] };
    const expectedResult = { ...initialState, songData: data, loading: false };
    expect(
      iTunesReducer(initialState, {
        type: iTunesTypes.REQUEST_SET_SONG_DETAILS,
        songDetails: data
      })
    ).toEqual(expectedResult);
  });
  it('should return the updated state when an action of type REQUEST_GET_SONG_DETAILS is dispatched', () => {
    const expectedResult = { ...initialState, songId: 'test', loading: true };
    expect(
      iTunesReducer(initialState, {
        type: iTunesTypes.REQUEST_GET_SONG_DETAILS,
        songId: 'test'
      })
    ).toEqual(expectedResult);
  });
  it('should return the itunes data when an action of type SUCCESS_GET_SONG_DETAILS is dispatched', () => {
    const songData = { resultCount: 1, result: [{ tuneName: 'test' }] };
    const expectedResult = { ...initialState, songData: songData };
    expect(
      iTunesReducer(initialState, {
        type: iTunesTypes.SUCCESS_GET_SONG_DETAILS,
        songData: songData
      })
    ).toEqual(expectedResult);
  });

  it('should return the error when an action of type FAILURE_GET_SONG_DETAILS is dispatched', () => {
    const error = 'something_went_wrong';
    const expectedResult = { ...initialState, songError: error };
    expect(
      iTunesReducer(initialState, {
        type: iTunesTypes.FAILURE_GET_SONG_DETAILS,
        songError: error
      })
    ).toEqual(expectedResult);
  });

  it('should return the initial state when an action of type CLEAR_SONG_DETAILS is dispatched', () => {
    const expectedResult = { ...initialState, songId: '', songData: {}, songError: null, loading: false };
    expect(
      iTunesReducer(initialState, {
        type: iTunesTypes.CLEAR_SONG_DETAILS
      })
    ).toEqual(expectedResult);
  });
});
