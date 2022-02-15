import type { Song } from '../types/songs';
import { LoadingStatus } from '../types/common';
import type { RequestHandler } from '../utilits/requestHelpers';
import { getPrepareStore } from '../utilits/storeHelpers';
import { ServiceNames } from '../constants/app.constants';

const initialSongs: Song[] = []
const getAllSongs: RequestHandler<Song[], string> = async (services, payload, update) => {
	update(s => ({...s, loadingStatus: LoadingStatus.pending}))

	const all = await services[ServiceNames.api].api.get(`https://itunes.apple.com/search?term=${payload}&entity=song`);

	update(s => ({...s, data: all.data.results, loadingStatus: LoadingStatus.success}))
}

const initialSong: Song = null
const getOneSong: RequestHandler<Song, string> = async (services, payload, update) => {
	update(s => ({...s, loadingStatus: LoadingStatus.pending}))

	const one = await services[ServiceNames.api].api.get(`https://itunes.apple.com/search?term=${payload}&entity=song`);

	update(s => ({...s, data: one.data.results[0], loadingStatus: LoadingStatus.success}))
}

export const prepareAllSongs = getPrepareStore(initialSongs, getAllSongs);
export const prepareSong = getPrepareStore(initialSong, getOneSong);