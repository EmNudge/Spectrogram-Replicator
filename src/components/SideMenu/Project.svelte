<script lang="ts">
	import {
		rowsSt,
		columnsSt,
		minFreqSt,
		maxFreqSt,
		canvasWidthSt,
		lightenOddRowsSt,
		showGridst,
		debugModeSt
	} from '$stores/graph';
	import { durationSt } from '$stores/sound';
	import { colorMapSt, specDataSt, specOpacitySt } from '$stores/spectrogram';

	import Range from './components/Range.svelte';
	import NumberInput from './components/NumberInput.svelte';
	import CheckBox from './components/CheckBox.svelte';

	import { getAudioBufferFromFile } from '../../spectrogram/getAudioBuffer';
	import { generateData } from '../../spectrogram/generateData';
	import { colorMaps, ColorMap } from '../../spectrogram/generateImage';
	
	async function getAudioData(e) {
		const file = e.currentTarget.files[0] as File;
		const buffer = await getAudioBufferFromFile(file);
		durationSt.set(buffer.duration);

		const data = await generateData(buffer);
		specDataSt.set(data);
	}
	const nameFromKey = (key: string) => key.replace(/^[a-z]|[A-Z]/g, c => ' ' + c.toUpperCase());
	$: defaultKey = colorMaps.find(([k,v]) => v === $colorMapSt)![0];

	function handleChangeColorMap(e) {
		const colorMap = ColorMap[e.currentTarget.value];
		$colorMapSt = colorMap;
	}
</script>

<div class="row title-row">
	<h2>Graph</h2>
	<CheckBox title="Show Grid" bind:checked={$showGridst} />
	<CheckBox title="Debug Mode" bind:checked={$debugModeSt} />
</div>

<h3 class="title">Spectrogram</h3>
<div class="row">
	<div class="row split">
		<div>
			<label>
				<div class="btn-like">Upload Audio</div>
				<input type="file" on:input={getAudioData}>
			</label>
		</div>
		<div>
			<select value={defaultKey} on:input={handleChangeColorMap}>
				{#each colorMaps as [key]}
					<option value={key}>{nameFromKey(key)}</option>
				{/each}
			</select>
		</div>
	</div>
</div>

<div class="row">
	<Range title="Spectrogram Opacity" min={0} max={1} step={0.01} bind:value={$specOpacitySt} />
</div>

<div class="row split">
	<div>
		<NumberInput title="Min Frequency (Hz)" bind:value={$minFreqSt} />
	</div>
	<div>
		<NumberInput title="Max Frequency (Hz)" bind:value={$maxFreqSt} />
	</div>
</div>


<div class="row">
	<Range title="Canvas Width" min={600} max={1500} bind:value={$canvasWidthSt} />
</div>

<h3 class="title">Graph</h3>
<div class="row split">
	<div>
		<NumberInput title="Columns" min={2} bind:value={$columnsSt} />
	</div>
	<div>
		<NumberInput title="Rows" min={2} bind:value={$rowsSt} />
	</div>
</div>

<div class="row">
	<CheckBox title="Lighten Odd Rows" bind:checked={$lightenOddRowsSt} />
</div>

<style>
	.title-row {
		display: grid;
		grid-template-columns: 1fr auto auto;
		grid-gap: 15px;
		align-items: center;
	}
	h2 {
		margin: 0;
	}
	.row.split {
		display: grid;
		grid-template-columns: 1fr 1fr;
		grid-gap: var(--gap);
		background: none;
		padding: 0;
	}
	.row.split > * {
		padding: var(--padding);
		background: white;
		text-align: center;
	}
	h3.title {
		margin-bottom: 0;
	}
</style>
