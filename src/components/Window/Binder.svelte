<script>
	import Window from './Window.svelte';
	export let title = "Binder";
	export let tabs;
	
	let activeTab = 0;
	$: activeComponent = tabs[activeTab].component;
</script>

<style>
	.binder {
		display: grid;
		grid-template-columns: 100px 1fr;	
		height: 100%;
	}
	.component {
		padding: 10px;
	}
	.titles {
		display: flex;
		flex-direction: column;
		background: #d8d8d8;
    	color: #464646;
	}
	span {
		padding: 5px;
		text-align: center;
		cursor: pointer;
		user-select: none;
	}
	span.active {
		background: white;
		color: black;
		cursor: auto;
	}
</style>

<Window {title} on:close padding={false}>
	<div class="binder">
		<div class="titles">
			{#each tabs as {name}, i}
				<span 
					class="{activeTab === i ? 'active' : ''}"
					on:click={() => activeTab = i}
				>{name}</span>
			{/each}
		</div>
		<div class="component">
			<svelte:component this={activeComponent} />
		</div>
	</div>
</Window>