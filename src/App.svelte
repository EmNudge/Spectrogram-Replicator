<script>
	import Main from './Main.svelte'
	import Header from './components/header/Header.svelte'
</script>

<style>
	:global(body) {
		padding: 0;
		--grey: #eee;
		display: grid;
		grid-template-columns: auto 1fr;
		grid-gap: 40px;
	}
</style>

<Header />
<Main />