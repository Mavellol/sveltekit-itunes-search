<script>
	import {page} from '$app/stores';
	import {onMount} from 'svelte';
	import {goto} from '$app/navigation';
	import { allSongs } from '../../store/songs';
	import { LoadingStatus } from '../../types/common';
	import preloader from '../../../static/preloader.gif';

	onMount(() => {
		allSongs.run($page.params.searched);
		return () => {
			allSongs.reset();
		}
	})
</script>

<section>
	{#if $allSongs.loadingStatus === LoadingStatus.pending}
		<img src='{preloader}' alt='alt'>
	{:else }
		<div class="grid grid-cols-2 md:grid-cols-3 grod-flow row gap-3">
			{#each $allSongs.data as song}
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