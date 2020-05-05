import { getOutput } from '@/audio';
import { getProject, download } from '@/utils';
import { titleStore } from 'stores/project'
import { get } from 'svelte/store'

function genericDownload() {
  const title = get(titleStore).replace(' ', '-');
  const output = JSON.stringify(getOutput());
  download(`GENERIC-${title}.json`, output);
}

function projectDownload() {
  const title = get(titleStore).replace(' ', '-');
  const output = JSON.stringify(getProject());
  download(`PROJECT-${title}.json`, output);
}

function setData(e) {
  const file = e.target.files[0];
  file.text().then(text => {
    setProject(JSON.parse(text))
  });
}

function upload() {
  const fileInput = document.createElement('input');
  fileInput.setAttribute('type', 'file');

  document.body.appendChild(fileInput);
  fileInput.addEventListener('change', setData);
  fileInput.click();
  
  document.body.removeChild(fileInput);
}

const menu = [
  { name: 'File', children: [
    { name: 'Download', children: [
      { name: 'Generic Output', action: genericDownload },
      { name: 'Project', action: projectDownload },
    ]},
    { name: 'Upload', action: upload },
  ]}
];

export default menu;