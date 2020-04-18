<script>
  import { debugModeStore } from '../../stores/canvas'
</script>

<style>
  label {
    display: grid;
    grid-template-columns: auto 1fr;
    grid-gap: 5px;
  }
  input[type=checkbox] { 
    margin: 0; 
    margin-top: 1px; 
  }
</style>

<label>
  <input type="checkbox" bind:checked={$debugModeStore} />
  <span>Debug Mode</span>
</label>