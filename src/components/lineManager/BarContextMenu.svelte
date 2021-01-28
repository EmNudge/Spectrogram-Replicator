<script>
  import Menu from './contextMenu/Menu.svelte';
  import MenuOption from './contextMenu/MenuOption.svelte';

	export let pos = { x: 0, y: 0 };

  import { createEventDispatcher } from 'svelte';
  const dispatch = createEventDispatcher();
  function closeMenu() {
    dispatch('close');
  }
</script>

<Menu {...pos} on:click={closeMenu} on:clickoutside={closeMenu}>
  <MenuOption 
    on:click={console.log} 
    isDisabled={true}
    text="Rename" />
  <MenuOption 
    on:click={console.log} 
    isDisabled={true}
    text="Change Color" />
  <MenuOption 
    on:click={console.log} 
    isDisabled={true}
    text="Disable" />
  <MenuOption 
    on:click={console.log} 
    isDisabled={true}
    text="Delete" />
</Menu>