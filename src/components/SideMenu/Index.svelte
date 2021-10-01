<script lang="ts">
	import type { SvelteComponent } from 'svelte';
	import { tabs, activeTabSt } from '../../stores/menus';

	import Main from './Main.svelte';
	import Project from './Project.svelte';
	import Export from './Export.svelte';
	import Import from './Import.svelte';
	const componentMap = new Map<typeof tabs[number], typeof SvelteComponent>([
        ['Main', Main],
		['Project', Project],
		['Export', Export],
		['Import', Import],
	]);

    $: activeTabName = tabs[$activeTabSt]
    $: activeSideMenu = componentMap.get(activeTabName)

    let isCollapsed = false;
    function collapse() {
        isCollapsed = !isCollapsed;
    }
</script>

<div class="menu" class:collapsed={isCollapsed}>
    <button class="collapse-icon" on:click={collapse}>
        <img class:flipped={isCollapsed} src="/icons/collapse.svg" alt="collapse">
    </button>

    <div class="content">
        <svelte:component this={activeSideMenu} />
    </div>
    <div class="spacer"></div>
</div>

<style>
    .menu {
        width: 400px;
        --padding: 15px;
        --gap: 1px;
        font-size: 14px;
        display: grid;
        grid-template-rows: auto 1fr;

        position: relative;
        left: 0px;
        margin-left: 0px;
        transition: .5s;
    }
    .menu.collapsed {
        margin-left: -400px;
        left: 400px;
    }
    .collapse-icon {
        border: none;
        background: none;
        padding: 0;

        position: absolute;
        --pad: 20px;
        top: var(--pad);
        left: calc(-24px - var(--pad));
    }
    .collapse-icon img {
        opacity: .8;
        width: 24px;
        transition: .5s;
    }
    .collapse-icon img:hover {
        opacity: 1;
    }
    .collapse-icon img.flipped {
        transform: scaleX(-1);
    }

    .content > :global(*) {
        background: white;
        margin-bottom: var(--gap);
        padding: var(--padding);
    }
    .menu :global(input), .menu :global(button) {
        background: #F9F9F9;
        border-radius: 5px;
        padding: 10px;
        text-align: center;
    }
    .menu :global(input[type=number]) {
        border: 1px solid #d8d8d8;
        width: 100px;
    }
    .menu :global(button) {
        padding: 20px 30px;
        width: max-content;
    }
    .spacer {
        height: 100%;
        background: white;
    }
</style>
