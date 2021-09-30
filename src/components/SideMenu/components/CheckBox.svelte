<script>
    export let checked = false;
    export let title = 'CheckBox Component'
</script>

<label>
    <input type="checkbox" bind:checked />
    <span>{title}</span>
</label>

<style>
    label {
        display: grid;
        grid-template-columns: auto 1fr;
        grid-gap: 5px;
    }
    input {
        width: inherit;
    }
</style>