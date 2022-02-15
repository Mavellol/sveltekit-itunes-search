import type { Services } from '../services/types';
import { createRequestStore } from '../utilits/requestHelpers';
import { prepareAllSongs, prepareSong } from './songs';

export const initStore = (services: Services) => ({
	songs: {
		getAllSongs: createRequestStore(services, prepareAllSongs.initialState, prepareAllSongs.handler),
		getOneSong: createRequestStore(services, prepareSong.initialState, prepareSong.handler),
	}
});