<script>
  import Window from './Window.svelte'
  import { minFreqStore, maxFreqStore, audioLengthStore } from '../stores/audio';
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
      <input type="number" bind:value={$audioLengthStore}>
    </label>
    <label>
      <span>Min Frequency:</span>
      <input type="number" bind:value={$minFreqStore}>
    </label>
    <label>
      <span>Max Frequency:</span>
      <input type="number" bind:value={$maxFreqStore}>
    </label>
  </div>
</Window>
