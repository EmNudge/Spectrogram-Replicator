export function download(filename: string, text: string) {
  const element = document.createElement('a');
  const URIText = encodeURIComponent(text);
  const link = `data:text/plain;charset=utf-8,${URIText}`
  element.setAttribute('href', link);
  element.setAttribute('download', filename);

  element.style.display = 'none';
  document.body.appendChild(element);

  element.click();

  document.body.removeChild(element);
}