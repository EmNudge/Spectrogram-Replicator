<script lang="ts">
	export let min = 0;
	export let max = 100;
	export let step = 1;
	export let title: string;
	export let value = 50;
	export let updateOnRelease = false;

	let localValue = value;
	$: if (!updateOnRelease) value = localValue;

	const uniqueId = Math.random().toString(16).slice(2).toUpperCase();

	function updateValue() {
        value = localValue;
    }
</script>

<div class="container">
	<label for={uniqueId}>{title}</label>
	<div class="inputs">
		<input
			type="range"
			{min}
			{max}
			{step}
			id={uniqueId}
			bind:value={localValue}
			on:change={updateValue}
		/>
		<input type="number" {min} {max} {step} bind:value={localValue} on:blur={updateValue} />
	</div>
</div>

<style>
	.container {
		width: 100%;
	}
	.inputs {
		display: grid;
		grid-template-columns: 1fr auto;
		grid-gap: 10px;
		justify-items: stretch;
	}
	input[type='range'] {
		width: 100%;
		box-sizing: border-box;
	}
</style>
