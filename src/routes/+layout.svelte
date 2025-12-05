<script lang="ts">
	import "../app.css";
	import Header from "$lib/components/layout/Header.svelte";
	import Footer from "$lib/components/layout/Footer.svelte";
	import { afterNavigate } from "$app/navigation";
	import { page } from "$app/state";

	let { children } = $props();

	afterNavigate(() => {
		window.scrollTo(0, 0);
	});

	const websiteSchema = {
		"@context": "https://schema.org",
		"@type": "WebSite",
		name: "hffmnn",
		url: "https://hffmnn.com",
		description: "Privacy-focused developer portfolio and projects",
		author: {
			"@type": "Person",
			name: "hffmnn"
		}
	};
</script>

<svelte:head>
	<meta name="theme-color" content="#000000" />
	<meta name="color-scheme" content="dark" />
	<link rel="icon" type="image/svg+xml" href="/favicon.svg" />
	<link rel="canonical" href="https://hffmnn.com{page.url.pathname}" />

	<!-- Open Graph defaults (can be overridden per page) -->
	<meta property="og:type" content="website" />
	<meta property="og:site_name" content="hffmnn" />
	<meta property="og:image" content="https://hffmnn.com/og-image.png" />
	<meta property="og:image:width" content="1200" />
	<meta property="og:image:height" content="630" />

	<!-- Twitter Card -->
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:image" content="https://hffmnn.com/og-image.png" />

	<!-- JSON-LD Structured Data -->
	{@html `<script type="application/ld+json">${JSON.stringify(websiteSchema)}</script>`}
</svelte:head>

<div class="min-h-screen flex flex-col mesh-gradient">
	<Header />
	<main class="flex-1">
		{@render children()}
	</main>
	<Footer />
</div>
