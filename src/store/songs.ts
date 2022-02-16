import type { Song } from '../types/songs';
import { LoadingStatus } from '../types/common';
import type { RequestHandler } from '../utilits/requestHelpers';
import { getPrepareStore } from '../utilits/storeHelpers';
import { ServiceNames } from '../constants/app.constants';
import type { RequestStore } from '../utilits/requestHelpers';

export interface Filters {
	filter: string
}

export interface SongStore {
	songs: {
		getAllSongs: RequestStore<Song[], string, Filters>
		getOneSong: RequestStore<Song, string, Filters>
	}
}

const initialSongs: Song[] = []
const metaSongs: Filters = {filter: ''}
const getAllSongs: RequestHandler<Song[], string, Filters> = async (services, payload, update) => {
	update(s => ({...s, loadingStatus: LoadingStatus.pending}))

	const all = await services[ServiceNames.api].api.get(`https://itunes.apple.com/search?term=${payload}&entity=song`);

	update(s => ({
		...s,
		data: all.data.results,
		loadingStatus: LoadingStatus.success,
		meta: {filter: payload}
	}))
}

const initialSong: Song = null
const metaSong: Filters = {filter: ''}
const getOneSong: RequestHandler<Song, string, Filters> = async (services, payload, update) => {
	update(s => ({...s, loadingStatus: LoadingStatus.pending}))

	const one = await services[ServiceNames.api].api.get(`https://itunes.apple.com/search?term=${payload}&entity=song`);

	update(s => ({
		...s,
		data: one.data.results[0],
		loadingStatus: LoadingStatus.success,
		meta: {filter: payload}
	}))
}

export const prepareAllSongs = getPrepareStore(initialSongs, getAllSongs, metaSongs);
export const prepareSong = getPrepareStore(initialSong, getOneSong, metaSong);
