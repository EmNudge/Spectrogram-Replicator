<script>
    export let title = 'Input Component';
    export let min = 0;

    export let value = 50;

    let val = value;
    $: value = Number(val)
</script>

<label>
    <span>{title}</span>
    <input type="Number" {min} bind:value={val} />
</label>

<style>
	label {
		display: grid;
		justify-content: center;
        grid-gap: 5px;
	}
</style>