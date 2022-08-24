import { albumDetailsReducer, albumDetailsTypes, initialState } from '../reducer';

describe('AlbumDetails reducer tests', () => {
  it('should return the initial state by default', () => {
    expect(albumDetailsReducer(undefined, {})).toEqual(initialState);
  });

  it('should return the updated state when an action of type DEFAULT is dispatched', () => {
    const expectedResult = { ...initialState, somePayLoad: 'Mohammed Ali Chherawalla' };
    expect(
      albumDetailsReducer(initialState, {
        type: albumDetailsTypes.DEFAULT_ACTION,
        somePayLoad: 'Mohammed Ali Chherawalla'
      })
    ).toEqual(expectedResult);
  });
});
