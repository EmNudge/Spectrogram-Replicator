<script lang="ts">
  export let id: Symbol;
  export let isActive: boolean;

  import { linesStore, activeStore, allowDeleteStore } from "../../stores/canvas";
  import { onDestroy } from 'svelte';
  import CloseIcon from '../svg/Close.svelte';

  import LineSvg from '../svg/Line.svelte';

  $: line = $linesStore.get(id)!;
  $: hue = line.hue;
  $: editing = line.isEditing;
  $: if (editing) {
    editName();
  }

  let name = $linesStore.get(id)!.name;

  let inputEl: HTMLInputElement;
  let allowDelete: boolean;

  onDestroy(() => {
    if (!allowDelete) return;
    allowDeleteStore.set(true);
  })

  function updateLine(func: (line: Canvas.Line) => void) {
    linesStore.update(lines => {
      const line = lines.get(id)!;
      func(line);

      return lines;
    });
  }

  function editName() {
    // this is so that we can close it once it gets blurred
    setTimeout(() => {
      inputEl.focus();
      inputEl.select();
    }, 0)
  }

  function handleBlur() {
    allowDeleteStore.set(true);
    updateLine(line => {
      line.name = name;
      line.isEditing = false;
    });
  }

  function handleFocus() {
    allowDeleteStore.set(false);
  }

  function handleKeyDown(e: KeyboardEvent) {
    if (e.key !== "Enter") return;
    updateLine(line => line.isEditing = false);
  }

  function destroyLine() {
    let prevId: Symbol | null = null;
    for (const [lineId, _line] of $linesStore) {
      if (lineId === id) break;
      prevId = lineId;
    }

    linesStore.update(l => {
      l.delete(id);
      return l;
    });
    
    activeStore.update(activeData => ({ 
      ...activeData, 
      lineId: prevId || Symbol() 
    }));
  }
</script>

<style>
  .line {
    padding: 10px;
    display: grid;
    grid-template-columns: auto 1fr auto;
    grid-gap: 10px;
    align-items: center;

    opacity: 0.7;
    outline: none;
  }
  .line:hover {
    background: #8080800f;
  }
  .line.active {
    opacity: 1;
    background: #80808024;
  }
  .line.active:hover {
    background: #80808024;
  }
  .line.editing {
    grid-template-columns: auto 1fr;
  }
  span {
    transition: .15s;
    cursor: pointer;
    opacity: 0;
  }
  .line:hover span {
    opacity: 1;
  }

  input {
    border: none;
    padding: 0;
    margin: 0;
  }
</style>

<div class="line" class:active={isActive} on:click class:editing on:contextmenu>
  <LineSvg color="hsl({hue}, 50%, 50%)" />

  {#if !editing}
    <div 
      on:dblclick={() => updateLine(line => line.isEditing = true)}
    >{name}</div>
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
    <span>
      <CloseIcon size={10} on:click={destroyLine} />
    </span>
  {/if}
</div>
