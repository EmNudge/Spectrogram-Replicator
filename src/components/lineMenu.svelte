<script>
  import LineBar from './lineBar.svelte'
  import { lines, activeLine, activeNode, canvasStore } from "../stores/canvas";
  import { getNewLine } from "../canvas";

  $: getTemp = () => " auto".repeat($lines.size + 1) + " 1fr";

  function addLine() {
    const newLine = getNewLine();
    const id = Symbol();

    activeLine.set(id);
    activeNode.set(null);
    lines.update(l => l.set(id, newLine));
    $canvasStore.draw();
  }

  function changeActive(id) {
    activeLine.set(id);
    $canvasStore.draw();
  }

</script>

<style>
  .container {
    --shdw: 2px 2px 2px #00000026;
    display: grid;
    grid-gap: 10px;
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
  {#each [...$lines.entries()] as [id, line]}
    <LineBar 
      {id}
      hue={line.hue} 
      name={line.name} 
      isActive={$activeLine === id} 
      on:click={() => changeActive(id)} />
  {/each}
  <button on:click={addLine}>+</button>
  <div class="empty" />
</div>
