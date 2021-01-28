import App from './App.svelte';

// removing caching to help development

// if('serviceWorker' in navigator) {
// 	navigator.serviceWorker
// 		.register('/service-worker.js')
// 		.then(() => console.log('Service Worker Registered'));
// }

const app = new App({	target: document.body });

export default app;