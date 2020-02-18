<script>
  import { onMount } from "svelte";
  import Canvas from "../canvas/canvas.js";
  import { canvasStore, lines, activeLine, activeNode } from "../stores/canvas";

  let canvasEl, canvasContainer;

  onMount(() => {
    const { width, height } = window.getComputedStyle(canvasContainer);
    canvasEl.width = parseInt(width);
    canvasEl.height = parseInt(height);
    const canvas = new Canvas(canvasEl);
    canvasStore.set(canvas);

    $canvasStore.draw();
  });

  const getPos = e => ({ x: e.offsetX, y: e.offsetY });

  function handleClick(e) {
    $canvasStore.onClick(getPos(e));
    $canvasStore.draw();
  }
  function handleHover(e) {
    $canvasStore.handleHover(getPos(e));
    $canvasStore.draw();
  }

  function handleMouseUp(e) {
    $canvasStore.onRelease();
  }

  function handleKeyDown(e) {
    const isDelete = ['Delete', 'Backspace'].includes(e.key)
    if (!isDelete) return;

    const currLine = $lines.get($activeLine)
    if (!currLine) return;

    if (!$activeNode) return;

    const oldKeyframes = currLine.keyframes;

    let index = 0;
    for (const [i, keyframe] of oldKeyframes.entries()) {
      const keyframe = currLine.keyframes[i]
      if (keyframe.id === $activeNode) index = i;
    }

    // either the one after or before
    const nextKeyframe = oldKeyframes[index + 1] || oldKeyframes[index - 1];

    // if this is the last node, set the new active to null
    const newActiveNode = nextKeyframe ? nextKeyframe.id : null;
    activeNode.set(newActiveNode)

    // remove active keyframe
    const keyframes = [
      ...oldKeyframes.slice(0, index),
      ...oldKeyframes.slice(index + 1),
    ]

    lines.update(l => {
      l.set($activeLine, { ...currLine, keyframes })
      return l;
    })
    

    $canvasStore.draw();
  }
</script>

<style>
  canvas {
    box-shadow: inset 2px 2px 4px rgba(0, 0, 0, 0.25);
    background: #fafafa;
    min-height: 300px;
  }
</style>

<svelte:window on:keydown={handleKeyDown} />

<div bind:this={canvasContainer}>
  <canvas
    bind:this={canvasEl}
    on:mousedown={handleClick}
    on:mouseup={handleMouseUp}
    on:mousemove={handleHover} />
</div>
