// this is for specifying differences between right click and left click

// while onclick is specifically left click and oncontextmenu is right click,
// you cannot specify differences using onmousedown without using e.which

export default function click(node: Element) {

  function handleMouseDown(e: MouseEvent) {
    // 1 == left click, 2 == middle mouse, 3 == right click
    const num = e.button;

    if (num === 0) {
      node.dispatchEvent(new CustomEvent('leftclick', { detail: e }));
      return;
    }

    if (num === 1) {
      node.dispatchEvent(new CustomEvent('middleclick', { detail: e }));
      return;
    }

    // num === 2
    node.dispatchEvent(new CustomEvent('rightclick', { detail: e }));
  }

  node.addEventListener('mousedown', handleMouseDown);
  
  return {
    destroy() {
      node.removeEventListener('mousedown', handleMouseDown);
		}
	};
}