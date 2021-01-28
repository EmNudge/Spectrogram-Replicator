<script>
  import LineBar from './lineBar.svelte'
  import SegmentBar from './SegmentBar.svelte'
  import { linesStore, activeLineStore, activeSegmentStore, activeNodeStore, canvasStore } from "../../stores/canvas";
  import { getNewLine } from "../../canvas/exports";
  import NewLineIcon from '../svg/NewLine.svelte';
  import NewSegmentIcon from '../svg/NewSegment.svelte';

  function addLine() {
    linesStore.update(lines => {
      const newLine = getNewLine();
      const id = Symbol();

      activeLineStore.set(id);
      activeNodeStore.set(null);
      
      lines.set(id, newLine);

      return lines;
    });
  }

  function addSegment() {
    linesStore.update(lines => {
      const line = lines.get($activeLineStore);

      const segmentId = Symbol();
      line.segments.set(segmentId, {
        name: `Segment ${line.segments.size + 1}`,
        nodes: []
      })
      activeSegmentStore.set(segmentId);
      activeNodeStore.set(null);

      return lines;
    });
  }

  function setActiveLine(id) {
    activeLineStore.set(id);
    // getting first segment ID in given line
    const line = $linesStore.get(id);
    let segmentId = null;
    for (const [segId, segment] of line.segments) {
      segmentId = segId;
      break;
    }

    activeSegmentStore.set(segmentId);
  }
  function setActiveSegment(lineId, segmentId) {
    if (segmentId === $activeSegmentStore) return;

    activeLineStore.set(lineId);
    activeSegmentStore.set(segmentId);
    activeNodeStore.set(null);
  }

  import BarContextMenu from './BarContextMenu.svelte';
  
	let pos = { x: 0, y: 0 };
	let showMenu = false;
	
	function openContextMenu(e) {
		pos = { x: e.clientX, y: e.clientY };
		showMenu = true;
	}
	
	function closeMenu() {
		showMenu = false;
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

<div class="line-menu" on:contextmenu|preventDefault={openContextMenu}>
  <div class="container">
    {#each [...$linesStore] as [id, { hue, name, segments }]}
      <LineBar 
        {id}
        {hue} 
        {name}
        isActive={$activeLineStore === id} 
        on:click={() => setActiveLine(id)} />

        {#each [...segments] as segment}
          <SegmentBar 
            id={segment[0]}
            name={segment[1].name}
            isActive={$activeSegmentStore === segment[0]}
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
	<BarContextMenu {pos} on:close={closeMenu} />
{/if}