<script lang="ts">
    import { tabs, tabIcons, activeTabSt } from '$stores/menus';
</script>

<header>
    <div class="buttons">
        {#each tabs as tab, i}
            <button 
                on:click={() => $activeTabSt = i}
                class:selected={i === $activeTabSt}
            >
                <img src="/icons/{tabIcons.get(tab)}" alt={tab} />
            </button>
        {/each}
    </div>
    <div>
        <a href="https://github.com/EmNudge/Spectrogram-Replicator">
            <img src="/icons/github.svg" alt="github" />
        </a>
    </div>
</header>

<style>
    header {
        background: #D8D8D8;
        --size: 50px;
        height: var(--size);
        display: flex;
        justify-content: space-between;
    }
    .buttons {
        display: flex;
    }
    button {
        height: var(--size);
        width: var(--size);
        background: none;
        margin: 0;
        border: none;
        color: #0008;
        padding: 0;
        cursor: pointer;
        font-weight: 800;
    }
    button:hover {
        background: #C4C4C4AA;
    }
    button.selected {
        background: #C4C4C4;
    }
    a img {
        height: 100%;
    }
    button img {
        height: 16px;
    }
</style>