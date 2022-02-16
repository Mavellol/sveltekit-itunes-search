import type { Services } from '../services/types';
import { createRequestStore } from '../utilits/requestHelpers';
import type { SongStore } from './songs';
import { prepareAllSongs, prepareSong } from './songs';

export type Store = SongStore

export const initStore = (services: Services) => ({
	songs: {
		getAllSongs: createRequestStore(services, prepareAllSongs.initialState, prepareAllSongs.handler, prepareAllSongs.meta),
		getOneSong: createRequestStore(services, prepareSong.initialState, prepareSong.handler, prepareAllSongs.meta),
	}
} as unknown as Store);
