<script>
	import {page} from '$app/stores';
	import { getContext, onMount } from 'svelte';
	import { LoadingStatus } from '../../types/common';
	import preloader from '../../../static/preloader.gif';

	const container = getContext('container');

	onMount(() => {
		container.store.songs.getOneSong.request($page.params.songId);
		return () => {
			container.store.songs.getOneSong.reset()
		}
	})
</script>

<section>

	{#if $container.store.songs.getOneSong.loadingStatus === LoadingStatus.pending}
		<img src='{preloader}' alt='alt'>
	{:else }
		<div class="mt-12 flex flex-col items-center justify-center">
			<h1 class="text-3xl font-bold text-center mb-12">{$container.store.songs.getOneSong?.data?.trackName || ''}</h1>
			<img src={$container.store.songs.getOneSong?.data?.artworkUrl100 || ''} alt="img" class="w-1/4 rounded-md mb-12">
			<audio controls>
				<source src={$container.store.songs.getOneSong?.data?.previewUrl || ''} type="audio/mpeg">
			</audio>
		</div>
	{/if}
</section>