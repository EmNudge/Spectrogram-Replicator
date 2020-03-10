<script>
  import Window from './Window.svelte'
</script>

<style>
  .inputs {
    padding: 5px;
    display: grid;
    grid-template-rows: 1fr;
    grid-gap: 10px;
  }
  label {
    display: grid;
    grid-template-rows: auto 1fr;
    grid-gap: 5px;
  }
</style>

<Window on:close title="Audio Settings">
  <div class="inputs">
    <label>
      <span>Length (seconds)</span>
      <input type="text">
    </label>
    <label>
      <span>Min Frequency:</span>
      <input type="number">
    </label>
    <label>
      <span>Max Frequency:</span>
      <input type="number">
    </label>
  </div>
</Window>
