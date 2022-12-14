import MockAdapter from 'axios-mock-adapter';
import { getApiClient } from '@utils/apiUtils';
import { getItunes, getSongDetails } from '../iTuneApi';

describe('iTunesApi test', () => {
  const tuneName = 'test';

  it('should make the api call to "/search?term=${tuneName}&limit=12&entity=song', async () => {
    const mock = new MockAdapter(getApiClient('iTunes').axiosInstance);
    const data = {
      resultCount: 1,
      result: [{ tuneName }]
    };
    mock.onGet(`/search?term=${tuneName}&limit=12&entity=song`).reply(200, data);
    const res = await getItunes(tuneName);
    expect(res.data).toEqual(data);
  });
  it('should make the api call to "/lookup?id=${tuneName}', async () => {
    const mock = new MockAdapter(getApiClient('iTunes').axiosInstance);
    const data = {
      resultCount: 1,
      result: [{ tuneName }]
    };
    mock.onGet(`/lookup?id=${tuneName}`).reply(200, data);
    const res = await getSongDetails(tuneName);
    expect(res.data).toEqual(data);
  });
});
