<script lang="ts">
  import LineBar from './lineBar.svelte'
  import SegmentBar from './SegmentBar.svelte'
  import { linesStore, activeStore } from "../../stores/canvas";
  import { getNewLine, getSelectionFromLine } from "../../canvas/exports";
  import NewLineIcon from '../svg/NewLine.svelte';
  import NewSegmentIcon from '../svg/NewSegment.svelte';

  function addLine() {
    linesStore.update(lines => {
      const newLine = getNewLine();
      const id = Symbol();
      lines.set(id, newLine);

      activeStore.set(getSelectionFromLine(id, newLine));
      
      return lines;
    });
  }

  function addSegment() {
    linesStore.update(lines => {
      const line = lines.get($activeStore.lineId);

      const segmentId = Symbol();
      line.segments.set(segmentId, {
        name: `Segment ${line.segments.size + 1}`,
        nodes: []
      });

      $activeStore.segmentId = segmentId;
      $activeStore.segments = new Map();

      return lines;
    });
  }

  function setActiveLine(id) {
    $activeStore.lineId = id;

    // getting first segment ID in given line
    const line = $linesStore.get(id);
    let segmentId = null;
    for (const [segId, segment] of line.segments) {
      segmentId = segId;
      break;
    }

    $activeStore.segmentId = segmentId;
  }
  function setActiveSegment(lineId, segmentId) {
    if (segmentId === $activeStore.segmentId) return;

    $activeStore = {
      lineId,
      segmentId,
      segments: new Map(),
    };
  }

  import BarContextMenu from './BarContextMenu.svelte';
  
	let pos = { x: 0, y: 0 };
	let showMenu = false;
  
  let activelineId;
	const openContextMenu = lineId => (e) => {
    e.preventDefault();
    activelineId = lineId;
		pos = { x: e.clientX, y: e.clientY };
		showMenu = true;
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
    height: 100%;
  }
  .buttons span {
    cursor: pointer;
  }
</style>

<div class="line-menu">
  <div class="container">
    {#each [...$linesStore] as [id, line]}
      <LineBar 
        {id}
        isActive={$activeStore.lineId === id} 
        on:click={() => setActiveLine(id)}
        on:contextmenu={openContextMenu(id)} />

        {#each [...line.segments] as segment}
          <SegmentBar 
            id={segment[0]}
            name={segment[1].name}
            isActive={$activeStore.segmentId === segment[0]}
            on:click={() => setActiveSegment(id, segment[0])} />
        {/each}

    {/each}
  </div>

  <div class="buttons">
    <span>
      <NewLineIcon on:click={addLine} />
    </span>
    <span>
      <NewSegmentIcon on:click={addSegment} />
    </span>
  </div>
</div>

{#if showMenu}
  <BarContextMenu 
    lineId={activelineId} 
    {pos} 
    on:close={() => showMenu = false} />
{/if}