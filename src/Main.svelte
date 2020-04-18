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
	main {
		user-select: none;
		min-width: 900px;
		margin: 0 auto;
	}
  h1 {
    font-weight: 400;
    color: #0006;
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
