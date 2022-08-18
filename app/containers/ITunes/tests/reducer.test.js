import { iTunesReducer, iTunesTypes, initialState } from '../reducer';

describe('ITunes reducer tests', () => {
  it('should return the initial state by default', () => {
    expect(iTunesReducer(undefined, {})).toEqual(initialState);
  });

  it('should return the updated state when an action of type DEFAULT is dispatched', () => {
    const expectedResult = { ...initialState, somePayLoad: 'Mohammed Ali Chherawalla' };
    expect(
      iTunesReducer(initialState, {
        type: iTunesTypes.DEFAULT_ACTION,
        somePayLoad: 'Mohammed Ali Chherawalla'
      })
    ).toEqual(expectedResult);
  });
});
