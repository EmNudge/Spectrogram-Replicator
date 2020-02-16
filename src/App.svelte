<script>
	import Canvas from './components/canvas.svelte'
	import LineMenu from './components/lineMenu.svelte'
</script>

<style>
	:global(body) {
		padding: 10px;
	}
	main {
		max-width: 900px;
		margin: 0 auto;
		padding: 0 20px;
	}
	.workspace {
		display: grid;
		grid-template-columns: 1fr 250px;
		grid-gap: 20px;
		height: 400px;
	}
</style>

<svelte:window />

<main>
	<h1>Spectrogram Replicator</h1>
	<div class="workspace">
		<Canvas />
		<LineMenu />
	</div>
</main>
