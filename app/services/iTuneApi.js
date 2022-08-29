import { generateApiClient } from '@utils/apiUtils';

const iTunesApi = generateApiClient('iTunes');

export const getItunes = (tunesName) => iTunesApi.get(`/search?term=${tunesName}&limit=12&entity=song`);
export const getSongDetails = (tunesName) => iTunesApi.get(`/lookup?id=${tunesName}`);
