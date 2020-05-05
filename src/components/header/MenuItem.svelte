<script>
  export let menu;
  export let root = false;
  export let expanded = null;
  import { onMount } from 'svelte';
  let spanEl;
  let anchor = { x: 0, y: 0 };
  onMount(() => {
    const { x, y, bottom, right, top, height } = spanEl.getBoundingClientRect();
    if (root) {
      anchor = { x, y: bottom };
      return;
    }
    anchor = { x: right - x, y: top - height };
  });
</script>

<style>
  .menu {
    width: max-content;
    display: flex;
    flex-direction: column;
    position: absolute;
    box-shadow: -3px 3px 10px 0px #0000009e;
  }
  span.name {
    cursor: pointer;
    padding: 10px 25px;
    font-size: .8em;
    background: #333;
    min-width: 50px;
    text-align: left;
    display: grid;
    grid-template-columns: 1fr auto;
    grid-gap: 20px;
  }
  span.name.root {
    padding: 10px 10px;
    text-align: center;
    min-width: 30px;
    display: flex;
    justify-content: center;
  }
  span.name:hover {
    background: #555;
  }
  .children-icon {
    font-weight: bold;
    margin-top: -2px;
    opacity: .8;
  }
</style>

<div class="container"
  on:mouseover={() => expanded = root ? expanded : true}
  on:mouseleave={() => expanded = root ? expanded : false}
  on:mouseover>

  <span 
    on:click={menu.action || (() => 0)}
    bind:this={spanEl}    
    class="name"
    class:root>
    <span>{menu.name}</span>
    {#if menu.children && !root}
      <span class="children-icon">➤</span>
    {/if}
  </span>

  {#if menu.children && expanded === true}
    <div class="menu" style="left: {anchor.x}px; top: {anchor.y}px">
      {#each menu.children as menuItem}
        <svelte:self menu={menuItem} />
      {/each}
    </div>
  {/if}
</div>