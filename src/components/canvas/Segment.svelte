<script lang="ts">
  export let nodes: Canvas.Node[] = [];
  export let segmentId: Symbol | null = null;
  export let inActiveLine = false;

  import Node from './Node.svelte';
  import { activeStore } from '../../stores/canvas';
  import { getOrSet } from '../../utils/hashmap';

  $: lines = getLines(nodes);
  function getLines(_val: Canvas.Node[]) {
    type Line = { x1: string, y1: string, x2: string, y2: string };
    const lines: Line[] = [];

    for (let i = 0; i < nodes.length - 1; i++) {
      const node = nodes[i];
      const nextNode = nodes[i + 1];
      lines.push({
        x1: `${node.x * 100}%`,
        y1: `${node.y * 100}%`,
        x2: `${nextNode.x * 100}%`,
        y2: `${nextNode.y * 100}%`
      });
    }
    return lines;
  }

  function nodeIsActive(nodeId: Symbol) {
    if (!inActiveLine || !segmentId) return false;
    
    const { segments } = $activeStore;
    const currSegment = segments.get(segmentId);
    return currSegment && currSegment.has(nodeId);
  }

  const onClick = (nodeId: Symbol) => (e: MouseEvent) => {
    if (!inActiveLine) return;

    activeStore.update(activeData => {
      const { segments } = activeData;
      const segment = getOrSet(segments, segmentId, new Set());
      
      const isSelected = segment.has(nodeId);
      if (isSelected) return activeData;

      // if not multi select, clear all segments
      if (!e.ctrlKey) {
        for (const [_id, nodes] of segments) nodes.clear();
      }

      segment.add(nodeId);
      
      return activeData;
    });
  }
</script>

<style>
  line {
    stroke: hsl(var(--line-hue, 0), 50%, 65%);
    stroke-width: 3;
  }
  line.active {
    z-index: 3;
  }
</style>

<g>
  {#each lines as line}
    <line {...line} />
  {/each}
  {#each nodes as { x, y, id } (id)}
    <Node
      x="{x * 100}%"
      y="{y * 100}%"
      on:mousedown={onClick(id)}
      isActive={nodeIsActive(id)} />
  {/each}
</g>
