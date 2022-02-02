import { writable } from 'svelte/store';

interface InitialSongsType {
	all: any[];
	one: any;
}

const initialSongs: InitialSongsType = {
	all: [],
	one: null,
}

function createSongs() {
	const { subscribe, set, update } = writable(initialSongs);

	const getAll =  async (searched) => {
		const itunesSearched = await fetch(`https://itunes.apple.com/search?term=${searched}&entity=song`);
		const all = await itunesSearched.json();
		update(s => ({...s, all: all.results}))
	}

	const getOne =  async (songId) => {
		const itunesSearched = await fetch(`https://itunes.apple.com/search?term=${songId}&entity=song`);
		const one = await itunesSearched.json();
		update(s => ({...s, one: one.results[0] }))
	}

	return {
		subscribe,
		getAll,
		getOne,
	};
}

export const songs = createSongs();