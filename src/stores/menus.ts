import { writable } from "svelte/store";

export const tabs = ['Main', 'Project', 'Download', 'Upload'];
export const tabIcons = new Map<typeof tabs[number], string>([
    ['Main', 'line_icon.svg'],
    ['Project', 'graph.svg'],
    ['Download', 'download.svg'],
    ['Upload', 'upload.svg'],
]);

export const activeTabSt = writable(0);