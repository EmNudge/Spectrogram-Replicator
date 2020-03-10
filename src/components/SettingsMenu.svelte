<script>
  import Window from "./Window.svelte";
  import {
    minFreqStore,
    maxFreqStore,
    audioLengthStore
  } from "../stores/audio";
  import { allowDeleteStore } from "../stores/canvas";
  import { onDestroy } from "svelte";

  // keep track of local disallows so we don't make it allowed for someone else
  let allowDelete = true;

  function removeDelete() {
    allowDeleteStore.set(false);
    allowDelete = false;
  }
  function addDelete() {
    allowDeleteStore.set(true);
    allowDelete = false;
  }

  onDestroy(() => {
    // checking to see if we changed it locally
    if (!allowDelete) return;

    allowDelete.set(true);
  });
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
      <input
        type="number"
        bind:value={$audioLengthStore}
        on:focus={removeDelete}
        on:blur={addDelete} />
    </label>
    <label>
      <span>Min Frequency:</span>
      <input
        type="number"
        bind:value={$minFreqStore}
        on:focus={removeDelete}
        on:blur={addDelete} />
    </label>
    <label>
      <span>Max Frequency:</span>
      <input
        type="number"
        bind:value={$maxFreqStore}
        on:focus={removeDelete}
        on:blur={addDelete} />
    </label>
  </div>
</Window>
