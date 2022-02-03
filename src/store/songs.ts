import { writable } from 'svelte/store';
import type { Song } from '../types/songs';
import { LoadingStatus } from '../types/common';
import { createInitialRequestState } from './utils';

const initialSongs: Song[] = []

function createGetAllSongs() {
	const { subscribe, set, update } = writable(createInitialRequestState(initialSongs));

	const run =  async (searched) => {
		update(s => ({...s, loadingStatus: LoadingStatus.pending}))

		const itunesSearched = await fetch(`https://itunes.apple.com/search?term=${searched}&entity=song`);
		const all = await itunesSearched.json();

		update(s => ({...s, data: all.results, loadingStatus: LoadingStatus.success}))
	}

	const reset =  () => {
		set(createInitialRequestState(initialSongs))
	}

	return {
		subscribe,
		run,
		reset
	};
}

const initialSong: Song = null

function createGetSong() {
	const { subscribe, set, update } = writable(createInitialRequestState(initialSong));

	const reset =  () => {
		set(createInitialRequestState(initialSong))
	}

	const run = async (songId) => {
		update(s => ({...s, loadingStatus: LoadingStatus.pending}))

		const itunesSearched = await fetch(`https://itunes.apple.com/search?term=${songId}&entity=song`);
		const one = await itunesSearched.json();

		update(s => ({...s, data: one.results[0], loadingStatus: LoadingStatus.success}))
	}

	return {
		subscribe,
		run,
		reset
	};
}

export const allSongs = createGetAllSongs();
export const song = createGetSong();