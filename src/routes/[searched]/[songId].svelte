<script lang="ts">
	import {page} from '$app/stores';
	import { getContext, onMount } from 'svelte';
	import { LoadingStatus } from '../../types/common';
	import preloader from '../../../static/preloader.gif';
	import { Container } from '../../useAppContainer';

	const container: Container = getContext('container');

	const getOneSong = container.store.songs.getOneSong;

	onMount(() => {
		getOneSong.request($page.params.songId);
		return () => {
			getOneSong.reset()
		}
	})
</script>

<section>
	{#if $getOneSong.loadingStatus === LoadingStatus.pending}
		<img src='{preloader}' alt='alt'>
	{:else }
		<div class="mt-12 flex flex-col items-center justify-center">
			<h1 class="text-3xl font-bold text-center mb-12">{$getOneSong?.data?.trackName || ''}</h1>
			<img src={$getOneSong?.data?.artworkUrl100 || ''} alt="img" class="w-1/4 rounded-md mb-12">
			<audio controls>
				<source src={$getOneSong?.data?.previewUrl || ''} type="audio/mpeg">
			</audio>
		</div>
	{/if}
</section>