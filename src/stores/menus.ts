import { writable } from "svelte/store";

export type TabName = 'Main' | 'Project' | 'Export' | 'Import';

export const tabs: TabName[] = ['Main', 'Project', 'Export', 'Import'];
export const tabIcons = new Map<TabName, string>([
    ['Main', 'line_icon.svg'],
    ['Project', 'graph.svg'],
    ['Export', 'download.svg'],
    ['Import', 'upload.svg'],
]);

export const activeTabSt = writable(0);