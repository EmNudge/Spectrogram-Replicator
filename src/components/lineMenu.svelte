<script>
  import LineBar from './lineBar.svelte'
  import { linesStore, activeLineStore, activeNodeStore, canvasStore } from "../stores/canvas";
  import { getNewLine } from "./canvas/utils";
  import NewLineIcon from './svg/NewLine.svelte';
  import NewSegmentIcon from './svg/NewSegment.svelte';

  $: getTemp = () => " auto".repeat($linesStore.size + 1) + " 1fr";

  function addLine() {
    const newLine = getNewLine();
    const id = Symbol();

    activeLineStore.set(id);
    activeNodeStore.set(null);
    linesStore.update(l => l.set(id, newLine));
  }

  function changeActive(id) {
    activeLineStore.set(id);
  }

</script>

<style>
  .line-menu {
    display: grid;
    grid-template-rows: 1fr auto;
    grid-gap: 30px;
    height: 400px;
  }
  .container {
    max-height: 400px;
    overflow-y: scroll;
    padding: 10px;
    height: 100%;
  }
</style>

<div class="line-menu">
  <div class="container">
    {#each [...$linesStore.entries()] as [id, line]}
      <LineBar 
        {id}
        hue={line.hue} 
        name={line.name} 
        isActive={$activeLineStore === id} 
        on:click={() => changeActive(id)} />
    {/each}
  </div>

  <div class="buttons">
    <NewLineIcon on:click={addLine} />
    <NewSegmentIcon />
  </div>
</div>
