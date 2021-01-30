<script lang="ts">
  import Menu from './contextMenu/Menu.svelte';
  import MenuOption from './contextMenu/MenuOption.svelte';
  import MenuList from './contextMenu/MenuList.svelte';
  import { colorMap } from '../../canvas/colors';
  import { linesStore, updateLine } from '../../stores/canvas';

  export let pos = { x: 0, y: 0 };
  export let lineId: Symbol;

  $: line = $linesStore.get(lineId);
  $: hue = line.hue;
  
  import { createEventDispatcher } from 'svelte';
  const dispatch = createEventDispatcher();
  function closeMenu() {
    dispatch('close');
  }

  const toTitleCase = (text: string) => text
    .toLowerCase()
    .replace(/^./, n => n.toUpperCase());

  const update = updateLine(lineId);

  const changeColor = (hue: number) => () => {
    update(line => line.hue = hue);
  }

  const rename = () => {
    update(line => line.isEditing = true);
  }
  
  const deleteLine = () => {
    linesStore.update(lines => {
      lines.delete(lineId);
      return lines;
    })
  }
</script>

<style>
  .color-box {
    height: 10px;
    width: 10px;
    background: hsl(var(--hue), 50%, 50%);
  }
</style>

<Menu {...pos} on:click={closeMenu} on:clickoutside={closeMenu}>
  <MenuOption 
    on:click={rename}
    text="Rename" />

  <MenuList text="Change Color">
    {#each Array.from(colorMap) as [name, color]}
      <MenuOption 
        on:click={changeColor(color)}
        isDisabled={hue === color}
      >
        <span class="color-box" style="--hue: {color}"></span>
        <span>{toTitleCase(name)}</span>
      </MenuOption>
    {/each}
  </MenuList>

  <MenuOption 
    on:click={console.log} 
    isDisabled={true}
    text="Disable" />
  <MenuOption 
    on:click={deleteLine} 
    text="Delete" />
</Menu>