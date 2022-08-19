import { generateApiClient } from '@utils/apiUtils';

const iTunesApi = generateApiClient('iTunes');

export const getItunes = (tunesName) => iTunesApi.get(`/search?term=${tunesName}&limit=10`);
