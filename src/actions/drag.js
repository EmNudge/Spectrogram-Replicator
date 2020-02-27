export default function drag(node) {
  let offset = { x: 0, y: 0 };

  function handleHover(e) {
    const pos = { 
      x: e.clientX - offset.x,
      y: e.clientY - offset.y,
    };

    node.dispatchEvent(new CustomEvent('drag', { 
      detail: {
        pos,
        e
      } 
    }));
  }

  function handleMouseDown(e) {
    offset = {
      x: e.clientX - node.offsetLeft,
      y: e.clientY - node.offsetTop
    };

    if (e.target !== node) return;

    window.addEventListener('mousemove', handleHover);
  }

  function handleMouseUp() {
    window.removeEventListener('mousemove', handleHover);
  }

  node.addEventListener('mousedown', handleMouseDown);
  window.addEventListener('mouseup', handleMouseUp);
  
  return {
    destroy() {
      node.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
		}
	};
}