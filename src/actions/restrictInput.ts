export default function restrictInput(
  node: HTMLInputElement,
  restrictFunc: (str: string) => boolean
) {
  let lastGoodValue = node.value;

  function handleInput(e: MouseEvent) {
    const val = (e.target as HTMLInputElement).value;
    if (restrictFunc(val)) {
      lastGoodValue = val;
      return;
    }
    e.preventDefault();
    node.value = lastGoodValue;
    node.dispatchEvent(new CustomEvent("input"));
  }

  node.addEventListener("input", handleInput as EventListener);

  return () => {
    node.removeEventListener("input", handleInput as EventListener);
  };
}
