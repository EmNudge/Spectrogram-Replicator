<script>
	export let tabs;
	
	let activeTab = 0;
	$: activeComponent = tabs[activeTab].component;
</script>

<style>
	.titles {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(50px, 1fr));
		margin-bottom: 10px;
	}
	span {
		padding: 10px;
		text-align: center;
		cursor: pointer;
		user-select: none;
	}
	span.active {
		border-bottom: 2px solid rgb(56, 56, 185);
		cursor: auto;
	}
</style>

<div class="binder">
	<div class="titles">
		{#each tabs as {name}, i}
			<span 
				class="{activeTab === i ? 'active' : ''}"
				on:click={() => activeTab = i}
			>{name}</span>
		{/each}
	</div>
	<svelte:component this={activeComponent} />
</div>