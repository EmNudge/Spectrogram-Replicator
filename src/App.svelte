<script>
	import Canvas from './components/canvas.svelte'
	import LineMenu from './components/lineMenu.svelte'
	import Controls from './components/audio/controls.svelte'
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
		<Canvas />
		<LineMenu />
	</div>
	<div class="controls">
		<Controls />
		<div class="dummy-element"></div>
	</div>
</main>
