export default function clickOutside(node) {
  function handleClick(e) {
    if (e.target === node || node.contains(e.target)) return;

    node.dispatchEvent(new CustomEvent('clickoutside'));
  }
  
  window.addEventListener('click', handleClick)
  
  return {
    destroy() {
      window.removeEventListener('click', handleClick)
    }
  }
}