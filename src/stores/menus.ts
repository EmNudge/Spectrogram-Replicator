import { writable } from "svelte/store";

export const tabs = ['Main', 'Project', 'Download', 'Upload'];

export const activeTabSt = writable(0);