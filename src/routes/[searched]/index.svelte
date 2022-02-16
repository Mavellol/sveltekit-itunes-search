<script lang="ts">
	import { page } from '$app/stores';
	import { getContext, onMount } from 'svelte';
	import { goto } from '$app/navigation';
	import { LoadingStatus } from '../../types/common';
	import preloader from '../../../static/preloader.gif';
	import { Container } from '../../useAppContainer';

	const container: Container = getContext('container');

	const getAllSongs = container.store.songs.getAllSongs;

	onMount(() => {
		if ($getAllSongs.meta.filter !== $page.params.searched) {
			getAllSongs.request($page.params.searched);
		}
	})
</script>

<section>
	{#if $getAllSongs.loadingStatus === LoadingStatus.pending}
		<img src='{preloader}' alt='alt'>
	{:else }
		<div class="grid grid-cols-2 md:grid-cols-3 grod-flow row gap-3">
			{#each $getAllSongs.data as song}
				<button on:click={goto(`${$page.params.searched}/${song.trackId}`)} class="p-3 flex bg-white rounded-md bg-opacity-20 border-2 border-white border-opacity-30">
					<img src={song.artworkUrl100} alt="img" class="rounded-md mr-4 w-1/4">
					<div class="flex flex-col items-start text-left">
						<div class="mb-2 h-6 overflow-hidden">{song.trackName}</div>
						<div class="text-xs font-bold">{song.artistName}</div>
					</div>
				</button>
			{/each}
		</div>
	{/if}
</section>