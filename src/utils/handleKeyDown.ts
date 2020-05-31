import { get } from 'svelte/store';
import { allowDeleteStore } from 'stores/canvas';
import { deleteNode } from '../canvas/exports'

function handleKeyDown(e: KeyboardEvent) {
    if (!['Delete', 'Backspace'].includes(e.key)) return;

    if (!get(allowDeleteStore)) return;

    deleteNode();
}

export default handleKeyDown;