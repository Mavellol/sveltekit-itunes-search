<script>
	import {page} from '$app/stores';
	import {onMount} from 'svelte';
	import { song } from '../../store/songs';
	import { LoadingStatus } from '../../types/common';
	import preloader from '../../../static/preloader.gif';

	onMount(() => {
		song.request($page.params.songId)
		return () => {
			song.reset()
		}
	})
</script>

<section>

	{#if $song.loadingStatus === LoadingStatus.pending}
		<img src='{preloader}' alt='alt'>
	{:else }
		<div class="mt-12 flex flex-col items-center justify-center">
			<h1 class="text-3xl font-bold text-center mb-12">{$song?.data?.trackName || ''}</h1>
			<img src={$song?.data?.artworkUrl100 || ''} alt="img" class="w-1/4 rounded-md mb-12">
			<audio controls>
				<source src={$song?.data?.previewUrl || ''} type="audio/mpeg">
			</audio>
		</div>
	{/if}
</section>