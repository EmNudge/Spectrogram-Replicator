<script lang="ts">
	import { draggerSt } from '$stores/canvas';
	import { currentTimePercSt } from '$stores/sound';
	import { graphElSt } from '$stores/project';

	import { handleMouseDown, handleMouseMove, handleMouseUp, handleKeyDown } from './utils';

	import Grid from './Grid.svelte';
	import Hertz from './Hertz.svelte';
	import Canvas from './Canvas/Index.svelte';
	import Container from './Container.svelte';
</script>

<Hertz />

<svelte:window on:keydown={handleKeyDown} />

<Container>
	<svg
		bind:this={$graphElSt}
		class:dragging={$draggerSt}
		on:mousedown={handleMouseDown}
		on:mousemove={handleMouseMove}
		on:mouseup={handleMouseUp}
	>
		<Grid />
		<rect x="{$currentTimePercSt * 100}%" y="0%" />
		<Canvas />
	</svg>
</Container>

<style>
	.dragging :global(circle) {
		cursor: move;
	}
	svg {
		height: 100%;
		width: 100%;
		border-radius: 4px;
	}
	rect {
		fill: #0003;
		width: 2px;
		height: 100%;
		transition: 0.05s;
	}
</style>
