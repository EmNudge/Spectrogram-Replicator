<script>
	export let min = 0;
	export let max = 100;
    export let step = 1;
	export let title = 'Range Component';
	export let value = 50;

	const uniqueId = Math.random().toString(16).slice(2).toUpperCase();
</script>

<div class="container">
	<label for={uniqueId}>{title}</label>
	<div class="inputs">
		<input type="range" {min} {max} {step} id={uniqueId} bind:value />
		<input type="number" bind:value {min} {max} {step} />
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
    input[type=range] {
        width: 100%;
        box-sizing: border-box;
    }
</style>