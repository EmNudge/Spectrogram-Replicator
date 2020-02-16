<script>
  import { lines, activeLine } from '../stores/canvas';
  import { getNewLine } from '../canvas'

  const getTemp = () => ' auto'.repeat(lines.size + 1) + ' 1fr';

  function addLine() {
    const newLine = getNewLine()
    const id = Symbol();

    activeLine.set(id);
    lines.set(id, newLine);
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
  }
  .color {
    height: 20px;
    width: 20px;
    background: hsl(var(--bg), 50%, 50%);
  }
  .close {
    color: red;
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
  {#each lines as [,line]}
    <div class="line">
      <div class="color" style="--bg: {line.hue}" />
      <div>{line.name}</div>
      <div class="close">x</div>
    </div>
  {/each}
  <button on:click={addLine}>+</button>
  <div class="empty"></div>
</div>