<script>
	import {page} from '$app/stores';
	import {onMount} from 'svelte';
	import {goto} from '$app/navigation';
	import { songs } from '../../store/songs';

	onMount(() => {
		songs.getAll($page.params.searched);
	})
</script>

<section>
	<div class="grid grid-cols-2 md:grid-cols-3 grod-flow row gap-3">
		{#each $songs.all as song}
			<button on:click={goto(`${$page.params.searched}/${song.trackId}`)} class="p-3 flex bg-white rounded-md bg-opacity-20 border-2 border-white border-opacity-30">
				<img src={song.artworkUrl100} alt="img" class="rounded-md mr-4 w-1/4">
				<div class="flex flex-col items-start text-left">
					<div class="mb-2 h-6 overflow-hidden">{song.trackName}</div>
					<div class="text-xs font-bold">{song.artistName}</div>
				</div>
			</button>
		{/each}
	</div>
</section>