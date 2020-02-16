<script>
  import { lines, activeLine } from '../stores/canvas';
  import { getNewLine } from '../canvas'
  import { canvasStore } from '../stores/canvas'

  $: getTemp = () => ' auto'.repeat($lines.size + 1) + ' 1fr';

  function addLine() {
    const newLine = getNewLine()
    const id = Symbol();

    activeLine.set(id);
    lines.update(l => l.set(id, newLine));
    $canvasStore.draw()
  }

  function closeLine(id) {
    lines.update(l => {
      l.delete(id)
      return l
    });
    $canvasStore.draw()
  }

  function changeActive(id) {
    activeLine.set(id)
    $canvasStore.draw()
  }
</script>

<style>
  .container {
    --shdw: 2px 2px 2px #00000026;
    display: grid;
    grid-gap: 10px;
  }

  .line {
    padding: 10px;
    display: grid;
    grid-template-columns: auto 1fr auto;
    grid-gap: 10px;
    box-shadow: var(--shdw);
    background: #eee;
    opacity: .7;
  }
  .line.active {
     opacity: 1;
  }
  .color {
    height: 20px;
    width: 20px;
    background: hsl(var(--bg), 50%, 50%);
  }
  .close {
    color: red;
    cursor: pointer;
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
    <div class="line" class:active={$activeLine === id} on:click={() => changeActive(id)}>
      <div class="color" style="--bg: {line.hue}" />
      <div>{line.name}</div>
      <div class="close" on:click={() => closeLine(id)}>x</div>
    </div>
  {/each}
  <button on:click={addLine}>+</button>
  <div class="empty"></div>
</div>