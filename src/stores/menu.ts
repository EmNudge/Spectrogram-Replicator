import { writable } from 'svelte/store';

export const activeMenuStore = writable(false);
export const openSettingsStore = writable(false);