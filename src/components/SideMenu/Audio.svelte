<script lang="ts">
	import { durationSt } from '$stores/sound';
	import {
		specUrlSt,
		binsSt,
		acceptableBinNums,
		cappedDBSt,
		bufferSt,
		colorMapSt,
		specOpacitySt
	} from '$stores/spectrogram';

	import Range from './components/Range.svelte';
	import CheckBox from './components/CheckBox.svelte';

	import { getImageForAudio } from '../../spectrogram';
	import { getAudioBufferFromFile } from '../../spectrogram/getAudioBuffer';
	import { mapHot, mapGrayscale, ColorMap } from '$utils/colormap';
	import { maxFreqSt, minFreqSt } from '$stores/graph';

	const colorMaps = [
		{ name: 'hot', func: mapHot },
		{ name: 'grayscale', func: mapGrayscale }
	];
	let setTimeFromAudio = true;
	let setFreqFromAudio = true;

	$: if ($bufferSt) getSpec($bufferSt, $cappedDBSt, $binsSt, $colorMapSt);

	async function getAudioData(e: any) {
		const file = e.currentTarget.files[0] as File | undefined;
		if (!file) return;

		const buffer = await getAudioBufferFromFile(file);
		if (setTimeFromAudio) durationSt.set(buffer.duration);
		if (setFreqFromAudio) {
			minFreqSt.set(0);
			maxFreqSt.set(buffer.sampleRate / 2);
		}

		const image = await getImageForAudio(buffer);
		bufferSt.set(buffer);
		specUrlSt.set(image);
	}

	async function getSpec(
		buffer: AudioBuffer,
		_cappedDB: number,
		_bins: number,
		_colorMap: ColorMap
	) {
		if (!buffer) return;

		const image = await getImageForAudio(buffer);
		specUrlSt.set(image);
	}
</script>

<div class="row title-row">
	<h2>Audio</h2>
</div>

<h3 class="title">Spectrogram</h3>
<div class="row">
	<div class="inline">
		<label>
			<div class="btn-like">Upload Audio</div>
			<input type="file" on:input={getAudioData} />
		</label>
		<div>
			<CheckBox bind:checked={setTimeFromAudio} title="Set duration from audio" />
			<CheckBox bind:checked={setFreqFromAudio} title="Set frequencies from audio" />
		</div>
	</div>
</div>
<div class="row">
	<div>
		<label>
			<span>Bin Count</span>
			<select bind:value={$binsSt}>
				{#each acceptableBinNums as binNum}
					<option value={binNum}>{binNum}</option>
				{/each}
			</select>
		</label>
	</div>
	<br />
	<div>
		<Range min={-80} max={0} title="Lowest Allowed dB" bind:value={$cappedDBSt} updateOnRelease />
	</div>
	<br />
	<div>
		<label>
			<span>Color Map</span>
			<select bind:value={$colorMapSt}>
				{#each colorMaps as { name, func }}
					<option value={func}>{name}</option>
				{/each}
			</select>
		</label>
	</div>
</div>

<div class="row">
	<Range title="Spectrogram Opacity" min={0} max={1} step={0.01} bind:value={$specOpacitySt} />
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
	h3.title {
		margin-bottom: 0;
	}
	.inline {
		display: flex;
		grid-gap: 10px;
		align-items: center;
	}
	label {
		display: flex;
		align-items: center;
		grid-gap: 10px;
	}
</style>
