import App from './App.svelte';

if('serviceWorker' in navigator) {
	navigator.serviceWorker
		.register('/service-worker.js')
		.then(() => console.log('Service Worker Registered'));
}

const app = new App({
	target: document.body,
	props: {
		name: 'world'
	}
});

export default app;