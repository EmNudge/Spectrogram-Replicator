<script lang="ts">
    export let checked: boolean;
    export let title: string;
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