<script>
	import { setContext } from 'svelte';

	export let x;
	export let y;
	
	import { createEventDispatcher } from 'svelte';
	const dispatch = createEventDispatcher();	
	
	setContext('menu', {
		dispatchClick: () => dispatch('click')
	});
	
	let menuEl;
	function onPageClick(e) {
		if (e.target === menuEl || menuEl.contains(e.target)) return;
		dispatch('clickoutside');
	}
</script>

<style>
	div {
		position: absolute;
		display: grid;
		border: 1px solid #0003;
		box-shadow: 2px 2px 5px 0px #0002;
    background: white;
    z-index: 99999;
	}
</style>

<svelte:body on:click={onPageClick} />

<div bind:this={menuEl} style="top: {y}px; left: {x}px;">
	<slot />
</div>