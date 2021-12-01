<script lang="ts">
	import { specUrlSt } from '$stores/spectrogram';
	import { downloadItem } from '$utils/download';
	import { downloadChart, downloadProjectSettings } from './utils';

	const chartTypes = ['SVG', 'PNG'];
	let chartType = chartTypes[0];
</script>

<div class="row title-row">
	<h2>Export</h2>
</div>

<div class="row">
	<button on:click={() => downloadChart(chartType)}>Download Chart</button>
	<select bind:value={chartType}>
		{#each chartTypes as type}
			<option value={type}>As {type}</option>
		{/each}
	</select>

	{#if $specUrlSt}
		<br />
		<br />
		<div>
			<button on:click={() => downloadItem($specUrlSt, 'spectrogram.png')}>
				Download PNG Spectrogram
			</button>
		</div>
	{/if}
</div>

<div class="row">
	<h3 class="title">JSON Data</h3>
	<br />
	<button disabled>Download General Graph Data</button>
	<br />
	<br />
	<button on:click={downloadProjectSettings}>Download Project</button>
</div>
