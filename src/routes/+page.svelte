<script lang="ts">
	import Hero from "$lib/components/home/Hero.svelte";
	import About from "$lib/components/home/About.svelte";
	import FeaturedProjects from "$lib/components/home/FeaturedProjects.svelte";
	import PulsynSection from "$lib/components/home/PulsynSection.svelte";

	let { data } = $props();
</script>

<svelte:head>
	<title>hffmnn - Developer & Privacy Advocate</title>
	<meta name="description" content="Personal portfolio showcasing privacy-focused tools and projects. Building elegant, privacy-respecting software for developers who value security and simplicity." />

	<!-- Open Graph -->
	<meta property="og:title" content="hffmnn - Developer & Privacy Advocate" />
	<meta property="og:description" content="Personal portfolio showcasing privacy-focused tools and projects. Building elegant, privacy-respecting software." />
	<meta property="og:url" content="https://hffmnn.com" />

	<!-- Twitter -->
	<meta name="twitter:title" content="hffmnn - Developer & Privacy Advocate" />
	<meta name="twitter:description" content="Personal portfolio showcasing privacy-focused tools and projects." />
</svelte:head>

<div>
	<Hero />
	<About />
	<FeaturedProjects commits={data.commits} />
	<PulsynSection />
</div>
