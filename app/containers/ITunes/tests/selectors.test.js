import { selectITunes, selectSomePayLoad } from '../selectors';

describe('ITunes selector tests', () => {
  const mockedState = {
    iTunes: {
      somePayLoad: 'W.S'
    }
  };

  it('should select the iTunes state', () => {
    const iTunesSelector = selectITunes();
    expect(iTunesSelector(mockedState)).toEqual(mockedState.iTunes);
  });

  it('should select the somePayLoad state', () => {
    const somePayLoadSelector = selectSomePayLoad();
    expect(somePayLoadSelector(mockedState)).toEqual(mockedState.iTunes.somePayLoad);
  });
});
