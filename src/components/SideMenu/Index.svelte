<script lang="ts">
	import type { SvelteComponent } from 'svelte';
	import { tabs, activeTabSt } from '../../stores/menus';

	import Main from './Main.svelte';
	import Project from './Project.svelte';
	const componentMap = new Map<typeof tabs[number], typeof SvelteComponent>([
        ['Main', Main],
		['Project', Project],
	]);

    $: activeTabName = tabs[$activeTabSt]
    $: activeSideMenu = componentMap.get(activeTabName)
</script>

<div class="menu">
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
