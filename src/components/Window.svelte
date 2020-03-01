<script>
  import { drag } from "../actions";
  import { createEventDispatcher } from "svelte";

  export let title = "";

  const dispatch = createEventDispatcher();

  export let x = 0;
  export let y = 0;

  function handleDrag(e) {
    const { x: xPos, y: yPos } = e.detail.pos;
    x = xPos;
    y = yPos;
  }

  function closeWindow() {
    dispatch("close");
  }
</script>

<style>
  .window {
    z-index: 5;

    display: grid;
    grid-template-rows: auto 1fr;
    grid-gap: 10px;

    background: white;
    box-shadow: 2px 2px 2px #0002, 0 0 10px #0002;

    position: absolute;
    top: 0;
    left: 0;

    border-radius: 4px 4px 0 0;
    overflow: hidden;
  }

  .content {
    padding: 3px 10px;
  }

  header {
    display: grid;
    grid-template-columns: 1fr auto;
    background: #eee;
  }
  header div {
    padding: 3px 10px;
  }
  header .close {
    background: red;
    color: white;
    padding: 5px 10px;
    cursor: pointer;
  }
</style>

<div class="window" style="transform: translate({x}px, {y}px)" on:contextmenu|preventDefault>
  <header use:drag={{ x, y }} on:drag={handleDrag}>
    <div>{title}</div>
    <span class="close" on:click={closeWindow}>X</span>
  </header>
  <div class="content">
    <slot />
  </div>
</div>
