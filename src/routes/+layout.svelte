<script lang="ts">
	import "../app.css";
	import Header from "$lib/components/layout/Header.svelte";
	import Footer from "$lib/components/layout/Footer.svelte";
	import { afterNavigate } from "$app/navigation";
	import { page } from "$app/state";

	let { children } = $props();

	afterNavigate(() => {
		window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
	});

	const websiteSchema = {
		"@context": "https://schema.org",
		"@type": "WebSite",
		name: "James Hoffmann",
		url: "https://hffmnn.com",
		description: "James Hoffmann. Founder of Pulsyn, building the Rune 1 smart ring and PRANA 0.7B on-device AI from Phoenix, AZ.",
		author: {
			"@type": "Person",
			name: "James Hoffmann",
			url: "https://hffmnn.com",
			jobTitle: "Founder & CEO",
			worksFor: {
				"@type": "Organization",
				name: "Pulsyn"
			},
			sameAs: [
				"https://github.com/hffmnnj",
				"https://x.com/hffmnnj"
			]
		}
	};
</script>

<svelte:head>
	<meta name="theme-color" content="#f5f3ed" />
	<meta name="color-scheme" content="light" />
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
	<meta name="twitter:site" content="@hffmnnj" />
	<meta name="twitter:creator" content="@hffmnnj" />
	<meta name="twitter:image" content="https://hffmnn.com/og-image.png" />

	<!-- JSON-LD Structured Data -->
	{@html `<script type="application/ld+json">${JSON.stringify(websiteSchema)}</script>`}

	{@html `<style>html { scroll-behavior: smooth; }</style>`}
</svelte:head>

<div class="min-h-screen flex flex-col bg-paper text-ink paper-texture">
	<Header />
	<main class="flex-1">
		{@render children()}
	</main>
	<Footer />
</div>
