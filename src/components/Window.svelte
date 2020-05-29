<script>
  import { drag, barDrag } from "../actions";
  import { createEventDispatcher, onMount } from "svelte";

  export let title = "";
  export let padding = true;

  const dispatch = createEventDispatcher();

  export let x = null;
  export let y = null;
  const pos = { x, y };

  function handleDrag(e) {
    const { x: xPos, y: yPos } = e.detail.pos;
    x = xPos;
    y = yPos;
  }

  function handleBarDrag(e) {
    const { width: w, height: h } = e.detail;
    if (w) width = w;
    if (h) height = h;
  }

  function closeWindow() {
    dispatch("close");
  }

  function isInitialized() {
    return !(x == null || y == null);
  }

  let windowEl;
  let height, width;
  onMount(() => {
    const style = window.getComputedStyle(windowEl);
    height = Math.round(parseFloat(style.height));
    width = Math.round(parseFloat(style.width));

    if (!isInitialized()) {
      x = window.innerWidth/2 - width/2;
      y = window.innerHeight/2 - height/2;
      pos.x = x;
      pos.y = y;
    }
  });
</script>

<style>
  .window {
    z-index: 5;

    display: grid;
    grid-template-rows: auto 1fr;

    box-shadow: 2px 2px 2px #0002, 0 0 10px #0002;

    position: absolute;
    top: 0;
    left: 0;

    width: var(--w, auto);
    height: var(--h, auto);
    transform: translate(var(--x, 0), var(--y, 0));
  }

  .content {
    background: white;
    position: relative;
  }
  .content.padding {
    padding: 3px 10px;
  }

  header {
    display: grid;
    grid-template-columns: 1fr auto;
    background: #eee;

    border-radius: 4px 4px 0 0;
  }
  header div {
    padding: 3px 10px;
    user-select: none;
  }
  header .close {
    background: red;
    color: white;
    padding: 5px 10px;
    cursor: pointer;
  }

  .bar {
    position: absolute;
    z-index: 4;
    --size: 10px;
  }
  .bar.right {
    right: calc(var(--size) / -2);
    top: 0;
    bottom: 0;
    width: var(--size);
    cursor: e-resize;
  }
  .bar.bottom {
    right: 0;
    left: 0;
    bottom: calc(var(--size) / -2);
    height: var(--size);
    cursor: s-resize;
  }
  .bottom-right.bar {
    right: calc(var(--size) / -2);
    bottom: calc(var(--size) / -2);

    height: calc(var(--size) * 1.5);
    width: calc(var(--size) * 1.5);

    cursor: se-resize;
  }
</style>

<div
  class="window"
  style="--x: {x}px; --y: {y}px; --w: {width}px; --h: {height}px"
  on:contextmenu|preventDefault
  bind:this={windowEl}>

  <header use:drag={pos} on:drag={handleDrag}>
    <div>{title}</div>
    <span class="close" on:click={closeWindow}>X</span>
  </header>

  <div class="content" class:padding>
    <slot />

    <div
      class="right bar"
      use:barDrag={{ parentLevel: 2, dirs: ['horizontal'] }} 
      on:bardrag={handleBarDrag}
      />
    <div
      class="bottom bar"
      use:barDrag={{ parentLevel: 2, dirs: ['vertical'] }} 
      on:bardrag={handleBarDrag}
      />
    <div
      class="bottom-right bar"
      use:barDrag={{ parentLevel: 2, dirs: ['vertical', 'horizontal'] }} 
      on:bardrag={handleBarDrag}
      />
  </div>

</div>
