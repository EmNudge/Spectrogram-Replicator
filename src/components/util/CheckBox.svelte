<script>
  export let checked;
  export let title = 'Checkbox'
</script>

<style>
  label {
    display: grid;
    grid-template-columns: auto 1fr;
    align-items: center;
    grid-gap: 5px;
  }
  input[type=checkbox] { 
    margin: 0; 
    margin-top: 1px; 
  }
</style>

<label>
  <input type="checkbox" bind:checked />
  <span>{title}</span>
</label>