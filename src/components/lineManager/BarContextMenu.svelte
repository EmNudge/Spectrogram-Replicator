<script lang="ts">
  import Menu from './contextMenu/Menu.svelte';
  import MenuOption from './contextMenu/MenuOption.svelte';
  import MenuList from './contextMenu/MenuList.svelte';
  import { colorMap } from '../../canvas/colors';
  import { linesStore } from '../../stores/canvas';

  export let pos = { x: 0, y: 0 };
  export let lineId: Symbol | {};

  import { createEventDispatcher } from 'svelte';
  const dispatch = createEventDispatcher();
  function closeMenu() {
    dispatch('close');
  }

  const toTitleCase = (text: string) => text
    .toLowerCase()
    .replace(/^./, n => n.toUpperCase());

  const changeColor = (hue: number) => () => {
    linesStore.update(lines => {
      const line = lines.get(lineId);
      line.hue = hue;
      return lines;
    });
  }

  const rename = () => {
    linesStore.update(lines => {
      const line = lines.get(lineId);
      line.isEditing = true;
      return lines;
    })
  }
</script>

<Menu {...pos} on:click={closeMenu} on:clickoutside={closeMenu}>
  <MenuOption 
    on:click={rename}
    text="Rename" />

  <MenuList text="Change Color">
    {#each Array.from(colorMap) as [name, color]}
      <MenuOption 
        on:click={changeColor(color)}
        text={toTitleCase(name)} />
    {/each}
  </MenuList>

  <MenuOption 
    on:click={console.log} 
    isDisabled={true}
    text="Disable" />
  <MenuOption 
    on:click={console.log} 
    isDisabled={true}
    text="Delete" />
</Menu>