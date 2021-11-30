<script lang="ts">
	import { specUrlSt } from '$stores/spectrogram';
	import { graphElSt } from '$stores/project';
	import { downloadSVG, downloadPNG, downloadItem } from '$utils/download';

	const chartTypes = ['SVG', 'PNG'];
	let chartType = chartTypes[0];
	function downloadChart() {
		const graphEl = $graphElSt;
		if (!graphEl) return;

		const downloadFunc = [downloadSVG, downloadPNG][chartTypes.indexOf(chartType)];
		downloadFunc(graphEl);
	}
</script>

<div class="row title-row">
	<h2>Export</h2>
</div>

<div class="row">
	<button on:click={downloadChart}>Download Chart</button>
	<select bind:value={chartType}>
		{#each chartTypes as type}
			<option value={type}>As {type}</option>
		{/each}
	</select>

	<br />
	<br />
	<div>
		<button disabled={!$specUrlSt} on:click={() => downloadItem($specUrlSt, 'spectrogram.png')}
			>Download PNG Spectrogram</button
		>
	</div>
</div>

<div class="row">
	<h3 class="title">JSON Data</h3>
	<br />
	<button disabled>Download General Graph Data</button>
	<br />
	<br />
	<button disabled>Download Project</button>
</div>
