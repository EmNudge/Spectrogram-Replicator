<script>
	import Canvas from './components/canvas/SvgCanvas.svelte'
	import LineManager from './components/lineManager/Manager.svelte'
	import Controls from './components/audio/controls.svelte'
	import FilePicker from './components/FilePicker.svelte'
	import { titleStore } from './stores/project'
	import { canvasWidthStore } from './stores/canvas'

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
		margin: 0 auto;
		padding: 0 20px;
	}
	h1 {
		font-weight: 400;
		color: #0006;
		max-width: 900px;
		margin: 20px auto;
	}
	.main-area {
		display: grid;
		grid-template-columns: 1fr 250px;
		grid-gap: 20px;
	}
	.workspace {
		display: grid;
		grid-template-columns: 60px 500px;
		grid-gap: 5px;
	}
</style>

<main>
	<h1>{$titleStore}</h1>
	<div class="main-area">
		<div 
			class="workspace" 
			style="grid-template-columns: 1fr {$canvasWidthStore}px">
			<Canvas {bg} />
			<Controls />
		</div>
		<LineManager />
	</div>

	<br/>
	<label for="">Choose Background Image:</label>
	<FilePicker on:file={handleFile} />
	<button on:click={handleDefaultImage}>Use Default Image</button>
</main>
