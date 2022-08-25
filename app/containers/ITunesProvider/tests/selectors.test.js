import { initialState } from '../reducer';
import { selectITunesDomain, selectITunesName, selectITunesData, selectITunesError } from '../selectors';

describe('ITunes selector tests', () => {
  let mockedState;
  let tuneData;
  let tuneName;
  let tuneError;

  beforeEach(() => {
    tuneName = 'test';
    tuneData = { resultCount: 1, results: [{ tuneName }] };
    tuneError = 'There was some error while fetching the album details';

    mockedState = {
      iTunesProviderReducer: {
        tuneName,
        tuneData,
        tuneError
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
});
