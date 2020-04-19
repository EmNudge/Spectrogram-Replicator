<script>
  import { allowDeleteStore } from "stores/canvas";
  import { onDestroy } from "svelte";

  export let value;
  export let title = "Text input:";

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

    allowDeleteStore.set(true);
  });
</script>

<style>
  label {
    display: grid;
    grid-template-rows: auto 1fr;
    grid-gap: 5px;
  }
</style>

<label>
  <span>{title}</span>
  <input
    type="text"
    bind:value
    on:focus
    on:blur
    on:input
    on:focus={removeDelete}
    on:blur={addDelete} />
</label>
