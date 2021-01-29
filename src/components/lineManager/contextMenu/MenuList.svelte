<script lang="ts">	
	export let isDisabled = false;
  export let text: string;
  
  let currentEl: HTMLDivElement;
  let x: number = 0;
  
  import { onMount } from 'svelte';
  onMount(() => {
    const { width } = currentEl.getBoundingClientRect();
    x = width;
  });
</script>

<style>
	.menu-list {
		padding: 2px 15px;
		cursor: default;
		font-size: 14px;
		display: flex;
		align-items: center;
		grid-gap: 5px;
    position: relative;

    display: flex;
    align-items: center;
	}
	.menu-list:hover {
		background: #0002;
	}
	.menu-list.disabled {
		color: #0006;
	}
	.menu-list.disabled:hover {
		background: white;
	}

  .menu-list:hover .menu {
    display: grid;
  }
  .menu {
		position: absolute;
    top: 0;
    left: var(--x);

		display: none;
		border: 1px solid #0003;
		box-shadow: 2px 2px 5px 0px #0002;
    background: white;
    z-index: 99999;
	}
</style>

<div
  class="menu-list"
  class:disabled={isDisabled}
  bind:this={currentEl}
>
  <span>{text}</span>
  <span>⮞</span> 
  
  <div class="menu" style="--x: {x}px">
    <slot />
  </div>
</div>
