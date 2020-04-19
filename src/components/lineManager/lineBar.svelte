<script>
  export let id;
  export let name;
  export let hue;
  export let isActive;

  import { linesStore, canvasStore, activeLineStore, allowDeleteStore } from "@/stores/canvas";
  import { onDestroy } from 'svelte';

  import Line from '../svg/Line.svelte';

  let editing = false;
  let inputEl;
  let allowDelete;

  onDestroy(() => {
    if (!allowDelete) return;
    allowDeleteStore.set(true);
  })

  function toggleInput() {
    editing = true;

    // this is so that we can close it once it gets blurred
    setTimeout(() => {
      inputEl.focus();
      inputEl.select();
    }, 0)
  }

  function updateName(isBlurred) {
    linesStore.update(l => {
      const line = l.get(id);
      line.name = name;
      l.set(id, line);
      return l;
    });
  }

  function handleBlur() {
    allowDeleteStore.set(true);
    editing = false;
    updateName();
  }

  function handleFocus() {
    allowDeleteStore.set(false);
  }

  function handleKeyDown(e) {
    if (e.key !== "Enter") return;
    editing = false;
  }

  function destroyLine() {
    let prevId = null;
    for (const [lineId, _line] of $linesStore) {
      if (lineId === id) break;
      prevId = lineId;
    }

    linesStore.update(l => {
      l.delete(id);
      return l;
    });
    activeLineStore.set(prevId);
  }
</script>

<style>
  .line {
    padding: 5px;
    display: grid;
    grid-template-columns: auto 1fr auto;
    grid-gap: 10px;
    align-items: center;

    opacity: 0.7;
    outline: none;
  }
  .line.active {
    opacity: 1;
  }
  .line.editing {
    grid-template-columns: auto 1fr;
  }
  .close {
    color: red;
    cursor: pointer;
    opacity: 0;
  }
  .line:hover .close {
    opacity: 1;
  }

  input {
    border: none;
    padding: 0;
    margin: 0;
  }
</style>

<div class="line" class:active={isActive} on:click class:editing>
  <Line color="hsl({hue}, 50%, 50%)" />

  {#if !editing}
    <div on:dblclick={toggleInput}>{name}</div>
  {:else}
    <input
      type="text"
      bind:value={name}
      bind:this={inputEl}
      on:blur={handleBlur}
      on:focus={handleFocus}
      on:keydown={handleKeyDown} />
  {/if}

  {#if !editing}
    <div class="close" on:click={destroyLine}>x</div>
  {/if}
</div>
