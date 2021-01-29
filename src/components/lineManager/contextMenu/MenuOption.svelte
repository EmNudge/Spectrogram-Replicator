<script lang="ts">
	import { getContext } from 'svelte';
	
	export let isDisabled = false;
	export let text = '';
	
	import { createEventDispatcher } from 'svelte';
	const dispatch = createEventDispatcher();	
	
	const { dispatchClick } = getContext('menu');
	
	const handleClick = e => {
		if (isDisabled) return;
		
		dispatch('click');
		dispatchClick();
	}
</script>

<style>
	div {
		padding: 2px 15px;
		cursor: default;
		font-size: 14px;
		display: flex;
		align-items: center;
		grid-gap: 5px;
	}
	div:hover {
		background: #0002;
	}
	div.disabled {
		color: #0006;
	}
	div.disabled:hover {
		background: white;
	}
</style>

<div 
  class:disabled={isDisabled}
  on:click={handleClick}
>
	{#if text}
		{text}
	{:else}
		<slot />
	{/if}
</div>
