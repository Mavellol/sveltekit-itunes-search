<script>
	import {page} from '$app/stores';
	import {onMount} from 'svelte';
	import { songs } from '../../store/songs';

	onMount(() => {
		songs.getOne($page.params.songId)
	})
</script>

<section>
	<div class="mt-12 flex flex-col items-center justify-center">
		<h1 class="text-3xl font-bold text-center mb-12">{$songs.one?.trackName || ''}</h1>
		<img src={$songs.one?.artworkUrl100 || ''} alt="img" class="w-1/4 rounded-md mb-12">
		<audio controls>
			<source src={$songs.one?.previewUrl || ''} type="audio/mpeg">
		</audio>
	</div>
</section>