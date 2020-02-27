// this is for specifying differences between right click and left click

// while onclick is specifically left click and oncontextmenu is right click,
// you cannot specify differences using onmousedown without using e.which

export default function click(node) {
  let controlIsHeld = false;

  function handleMouseDown(e) {
    // 1 == left click, 2 == middle mouse, 3 == right click
    const num = e.which;

    if (!controlIsHeld && num === 1) {
      node.dispatchEvent(new CustomEvent('leftclick', { detail: e }));
      return;
    }

    if (num === 2) {
      node.dispatchEvent(new CustomEvent('middleclick', { detail: e }));
      return;
    }

    node.dispatchEvent(new CustomEvent('rightclick', { detail: e }));
  }

  function handleKeyDown(e) {
    if (e.key === 'Control') controlIsHeld = true;
  }
  function handleKeyUp(e) {
    if (e.key === 'Control') controlIsHeld = false;
  }

  node.addEventListener('mousedown', handleMouseDown);
  window.addEventListener('keydown', handleKeyDown);
  window.addEventListener('keyup', handleKeyUp);
  
  return {
    destroy() {
      node.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
		}
	};
}