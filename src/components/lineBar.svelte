<script>
  export let id;
  export let name;
  export let hue;
  export let isActive;

  import { lines, canvasStore, activeLine } from "../stores/canvas";

  let editing = false;
  let inputEl;

  function toggleInput() {
    editing = true;

    // this is so that we can close it once it gets blurred
    setTimeout(() => {
      inputEl.focus();
      inputEl.select();
    }, 0)
  }

  function updateName() {
    lines.update(l => {
      const line = l.get(id);
      line.name = name;
      l.set(id, line);
      return l;
    });

    editing = false;
  }

  function handleKeyDown(e) {
    if (e.key !== "Enter") return;
    updateName();
  }

  function destroyLine() {
    let prevId = null;
    for (const [lineId, _line] of $lines) {
      if (lineId === id) break;
      prevId = lineId;
    }

    lines.update(l => {
      l.delete(id);
      return l;
    });
    activeLine.set(prevId);
    $canvasStore.draw();
  }
</script>

<style>
  .line {
    padding: 10px;
    display: grid;
    grid-template-columns: auto 1fr auto;
    grid-gap: 10px;
    box-shadow: var(--shdw);
    background: var(--grey);
    opacity: 0.7;
    outline: none;
  }
  .line.active {
    opacity: 1;
  }
  .color {
    height: 20px;
    width: 20px;
    background: hsl(var(--bg), 50%, 50%);
  }
  .close {
    color: red;
    cursor: pointer;
  }

  input {
    border: none;
    padding: 0;
    margin: 0;
  }
</style>

<div class="line" class:active={isActive} on:click>
  <div class="color" style="--bg: {hue}" />

  {#if !editing}
    <div on:dblclick={toggleInput}>{name}</div>
  {:else}
    <input
      type="text"
      bind:value={name}
      bind:this={inputEl}
      on:blur={updateName}
      on:keydown={handleKeyDown} />
  {/if}

  <div class="close" on:click={destroyLine}>x</div>
</div>
