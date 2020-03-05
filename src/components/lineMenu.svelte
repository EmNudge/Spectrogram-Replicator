<script>
  import LineBar from './lineBar.svelte'
  import { linesStore, activeLineStore, activeNodeStore, canvasStore } from "../stores/canvas";
  import { getNewLine } from "./canvas/utils";

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
  .container {
    --shdw: 2px 2px 2px #00000026;
    display: grid;
    grid-gap: 10px;
    max-height: 400px;
    overflow-y: scroll;
    padding: 10px;
  }

  button {
    border: none;
    padding: 5px 20px;
    box-shadow: var(--shdw);
    background: #eee;
    width: 75px;
  }
</style>

<div class="container" style="grid-template-rows: {getTemp()}">
  {#each [...$linesStore.entries()] as [id, line]}
    <LineBar 
      {id}
      hue={line.hue} 
      name={line.name} 
      isActive={$activeLineStore === id} 
      on:click={() => changeActive(id)} />
  {/each}
  <button on:click={addLine}>+</button>
  <div class="empty" />
</div>
