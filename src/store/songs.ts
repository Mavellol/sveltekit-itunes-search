import type { Song } from '../types/songs';
import { LoadingStatus } from '../types/common';
import type { ExecutingRequest } from '../utilits/requestHelpers';
import { createRequestStore } from '../utilits/requestHelpers';

const initialSongs: Song[] = []
const getAllSongs: ExecutingRequest<Song[], string> = async (payload, update) => {
	update(s => ({...s, loadingStatus: LoadingStatus.pending}))

	const itunesSearched = await fetch(`https://itunes.apple.com/search?term=${payload}&entity=song`);
	const all = await itunesSearched.json();

	update(s => ({...s, data: all.results, loadingStatus: LoadingStatus.success}))
}

const initialSong: Song = null
const getOneSongs: ExecutingRequest<Song, string> = async (payload, update) => {
	update(s => ({...s, loadingStatus: LoadingStatus.pending}))

	const itunesSearched = await fetch(`https://itunes.apple.com/search?term=${payload}&entity=song`);
	const one = await itunesSearched.json();

	update(s => ({...s, data: one.results[0], loadingStatus: LoadingStatus.success}))
}

export const allSongs = createRequestStore(initialSongs, getAllSongs);
export const song = createRequestStore(initialSong, getOneSongs);