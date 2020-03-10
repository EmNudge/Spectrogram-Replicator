export default function barDrag(node, { dirs, parentLevel }) {
  let mainEl = node;
  for (let i = 0; i < parentLevel; i++) {
    mainEl = mainEl.parentElement;
  }

  let { width, height } = window.getComputedStyle(mainEl);
  width = parseFloat(width);
  height = parseFloat(height);

  node.addEventListener('mousedown', handleMouseDown);
  
  function handleMouseDown() {
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
  }
  
  function handleMouseUp() {
    window.removeEventListener('mousemove', handleMouseMove);
    window.removeEventListener('mouseup', handleMouseUp);
  }
  
  function handleMouseMove(e) {
    const mouse = { x: e.clientX, y: e.clientY };

    if (dirs.includes('horizontal')) {
      const x = parseFloat(mainEl.style.getPropertyValue('--x'));
      const diff = mouse.x - x;

      const detail =  { width: diff };

      if (diff < width) {
        const currWidth = parseFloat(mainEl.style.getPropertyValue('--h'));
        if (currWidth === width) return;
        detail.width = width;
      }

      node.dispatchEvent(new CustomEvent('bardrag', { detail }));
    }

    if (dirs.includes('vertical')) {
      const y = parseFloat(mainEl.style.getPropertyValue('--y'));
      const diff = mouse.y - y;

      const detail =  { height: diff };

      if (diff < height) {
        const currHeight = parseFloat(mainEl.style.getPropertyValue('--h'));
        if (currHeight === height) return;
        detail.height = height;
      }

      node.dispatchEvent(new CustomEvent('bardrag', { detail }));
    }
  }
  
  return {
    destroy() {
      node.removeEventListener('mousedown', handleMouseDown);
    }
  }
}