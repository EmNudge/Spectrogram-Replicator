<script>
	import Canvas from './components/canvas/SvgCanvas.svelte'
	import LineMenu from './components/lineMenu.svelte'
	import Controls from './components/audio/controls.svelte'
	import FilePicker from './components/FilePicker.svelte'

	let bg = '';
	function handleFile(e) {
		const { url } = e.detail;
		bg = url;
	}

	function handleDefaultImage() {
		bg = '/images/spectrogram.jpg'
	}
</script>

<style>
	:global(body) {
		padding: 10px;
		--grey: #eee;
	}
	main {
		max-width: 900px;
		margin: 0 auto;
		padding: 0 20px;
		user-select: none;
	}
	.workspace {
		display: grid;
		grid-template-columns: 1fr 250px;
		grid-gap: 20px;
	}
	.controls {
		display: grid;
		grid-template-columns: 1fr 250px;
		grid-gap: 20px;
	}
</style>

<svelte:window />

<main>
	<h1>Spectrogram Replicator</h1>
	<div class="workspace">
		<Canvas {bg} />
		<LineMenu />
	</div>
	<div class="controls">
		<Controls />
		<div class="dummy-element"></div>
	</div>

	
	<FilePicker on:file={handleFile} />
	<button on:click={handleDefaultImage}>Use Default Image</button>
</main>
