<script>
    import Header from '../components/Header.svelte';
    import Title from '../components/Title.svelte';
    import Graph from '../components/Graph/Index.svelte';
    import Playback from '../components/Playback.svelte';

    import SideMenu from '../components/SideMenu/Index.svelte';
</script>

<Header />

<main>
    <section class="main">
        <Title />
        <Graph />
        <Playback />
    </section>
    <SideMenu />
</main>


<style>
    main {
        display: grid;
        grid-template-columns: 1fr auto;
        height: 100%;
    }
    section {
        min-width: 700px;
        margin: 0 auto;
        padding-top: 36px;
    }
    section.main {
        display: grid;
        grid-template-columns: 60px 1fr;
        grid-gap: 20px 10px;
    }
</style>