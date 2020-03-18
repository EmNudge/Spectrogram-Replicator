<script>
  import LineBar from './lineBar.svelte'
  import SegmentBar from './SegmentBar.svelte'
  import { linesStore, activeLineStore, activeSegmentStore, activeNodeStore, canvasStore } from "../stores/canvas";
  import { getNewLine } from "../canvas/exports";
  import NewLineIcon from './svg/NewLine.svelte';
  import NewSegmentIcon from './svg/NewSegment.svelte';

  function addLine() {
    linesStore.update(lines => {
      const newLine = getNewLine();
      const id = Symbol();

      lines.set(id, newLine)
      activeLineStore.set(id);
      activeNodeStore.set(null);

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
    {#each [...$linesStore.entries()] as [id, { hue, name, segments }]}
      <LineBar 
        {id}
        {hue} 
        {name}
        isActive={$activeLineStore === id} 
        on:click={() => setActiveLine(id)} />

        {#each [...segments.entries()] as segment}
          <SegmentBar 
            id={segment[0]}
            name={segment[1].name}
            isActive={$activeSegmentStore === segment[0]}
            on:click={() => setActiveSegment(id, segment[0])} />
        {/each}

    {/each}
  </div>

  <div class="buttons">
    <NewLineIcon on:click={addLine} />
    <NewSegmentIcon on:click={addSegment} />
  </div>
</div>
