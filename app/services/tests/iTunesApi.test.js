import MockAdapter from 'axios-mock-adapter';
import { getApiClient } from '@utils/apiUtils';
import { getItunes } from '../iTuneApi';

describe('iTunesApi test', () => {
  const tuneName = 'test';

  it('should make the api call to "/search?term=${tuneName}&limit=10', async () => {
    const mock = new MockAdapter(getApiClient('iTunes').axiosInstance);
    const data = {
      resultCount: 1,
      result: [{ tuneName }]
    };
    mock.onGet(`/search?term=${tuneName}&limit=10`).reply(200, data);
    const res = await getItunes(tuneName);
    expect(res.data).toEqual(data);
  });
});
