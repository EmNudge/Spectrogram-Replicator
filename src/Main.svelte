<script>
	import Canvas from './components/canvas/SvgCanvas.svelte'
	import LineManager from './components/lineManager/Manager.svelte'
	import Controls from './components/audio/controls.svelte'
	import FilePicker from './components/FilePicker.svelte'
	import { titleStore } from 'stores/project'

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
	.main-area {
		display: grid;
		grid-template-columns: auto 1fr;
		grid-gap: 20px;
	}
	.workspace {
		display: grid;
		grid-template-columns: 60px minmax(250px, 500px);
		grid-gap: 5px;
	}
</style>

<main>
	<h1>{$titleStore}</h1>
	<div class="main-area">
		<div class="workspace">
			<Canvas {bg} />
			<Controls />
		</div>
		<LineManager />
	</div>

	<br/>
	<label>Coose Background Image:</label>
	<FilePicker on:file={handleFile} />
	<button on:click={handleDefaultImage}>Use Default Image</button>
</main>
