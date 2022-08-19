import { iTunesReducer, iTunesTypes, initialState } from '../reducer';

describe('ITunes reducer tests', () => {
  it('should return the initial state by default', () => {
    expect(iTunesReducer(undefined, {})).toEqual(initialState);
  });

  it('should return the updated state when an action of type DEFAULT is dispatched', () => {
    const expectedResult = { ...initialState, tuneName: 'test tune' };
    expect(
      iTunesReducer(initialState, {
        type: iTunesTypes.REQUEST_GET_ITUNES_DATA,
        tuneName: 'test tune'
      })
    ).toEqual(expectedResult);
  });
});
