export default function transformInput(
  node: HTMLInputElement,
  transformer: (str: string) => any
) {
  function handleInput(e: MouseEvent) {
    const val = (e.target as HTMLInputElement).value;
    e.preventDefault();
    node.value = transformer(val);
    node.dispatchEvent(new CustomEvent("transform"));
  }

  node.addEventListener("input", handleInput as EventListener);

  return () => {
    node.removeEventListener("input", handleInput as EventListener);
  };
}
