import { selectAlbumDetails, selectSomePayLoad } from '../selectors';

describe('AlbumDetails selector tests', () => {
  const mockedState = {
    albumDetails: {
      somePayLoad: 'W.S'
    }
  };

  it('should select the albumDetails state', () => {
    const albumDetailsSelector = selectAlbumDetails();
    expect(albumDetailsSelector(mockedState)).toEqual(mockedState.albumDetails);
  });

  it('should select the somePayLoad state', () => {
    const somePayLoadSelector = selectSomePayLoad();
    expect(somePayLoadSelector(mockedState)).toEqual(mockedState.albumDetails.somePayLoad);
  });
});
