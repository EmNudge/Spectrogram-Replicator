export default function drag(node, pos = { x: 0, y: 0}) {
  let offset = { x: 0, y: 0 };
  if (!pos.x || !pos.y) {
    pos.x = 0;
    pos.y = 0;
  }

  function handleHover(e) {
    pos = { 
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
      x: e.clientX - pos.x,
      y: e.clientY - pos.y
    };

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