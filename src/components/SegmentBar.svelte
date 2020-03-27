<script>
  export let id;
  export let name;
  export let isActive;

  import { linesStore, canvasStore, activeLineStore, activeSegmentStore, allowDeleteStore } from "../stores/canvas";
  import { onDestroy } from 'svelte';

  import Segment from './svg/Segment.svelte';

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
    linesStore.update(lines => {
      const line = lines.get($activeLineStore);
      const segment = line.segments.get(id);
      segment.name = name;

      return lines;
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

  function destroySegment() {
    linesStore.update(lines => {
      const activeLineId = $activeLineStore;
      const line = lines.get(activeLineId);

      if (line.segments.size) {
        let prevSegId = null;
        for (const [segId, _segment] of line.segments) {
          // use the segment just before if this isn't the first 
          if (id === segId && prevSegId) break; 
          // if it is the first, use the one right after
          if (prevSegId === id) break;

          prevSegId = segId;
        }
  
        line.segments.delete(id);
        activeSegmentStore.set(prevSegId);
        return lines;
      }

      // if this is the only segment of the given line, we must delete the line itself
      // and therefore choose a new line (and segment) to make active

      let prevLineId = null;
      for (const [lineId, _line] of lines) {
        // use the line just before if this isn't the first 
        if (activeLineId === lineId && prevLineId) break;
        // if it is the first, use the one right after
        if (prevLineId === id) break;

        prevLineId = lineId;
      }

      activeLineStore.set(prevLineId);

      // get the first segment of the new line
      const segments = lines.get(prevLineId).segments;
      let firstSegId = null;
      for (const [segId, _segment] of segments) {
        firstSegId = segId;
        break;
      }
      activeSegmentStore.set(firstSegId);

      // segment will get deleted along with line, so just this is fine
      lines.delete(activeLineId);

      return lines;
    });
  }
</script>

<style>
  .segment {
    padding: 5px;
    padding-left: 30px;
    display: grid;
    grid-template-columns: auto 1fr auto;
    grid-gap: 10px;
    align-items: center;

    opacity: 0.7;
    outline: none;
  }
  .segment.active {
    opacity: 1;
  }
  .segment.editing {
    grid-template-columns: auto 1fr;
  }
  .close {
    color: red;
    cursor: pointer;
    opacity: 0;
  }
  .segment:hover .close {
    opacity: 1;
  }

  input {
    border: none;
    padding: 0;
    margin: 0;
  }
</style>

<div class="segment" class:active={isActive} on:click class:editing>
  <Segment />

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
    <div class="close" on:click={destroySegment}>x</div>
  {/if}
</div>
