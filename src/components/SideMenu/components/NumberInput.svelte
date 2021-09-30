<script>
    export let title = 'Input Component';
    export let value = 50;
</script>

<label>
    <span>{title}</span>
    <input type="Number" bind:value={value} />
</label>

<style>
	label {
		display: grid;
		justify-content: center;
        grid-gap: 5px;
	}
</style>