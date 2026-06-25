<script lang="ts">
	import Hero from "$lib/components/home/Hero.svelte";
	import About from "$lib/components/home/About.svelte";
	import FeaturedProjects from "$lib/components/home/FeaturedProjects.svelte";
	import Writing from "$lib/components/home/Writing.svelte";
	import PulsynSection from "$lib/components/home/PulsynSection.svelte";
	import { RunningHeader } from "$lib/components/editorial";
	// Note: data prop intentionally not destructured — no page-level data needed
</script>

<svelte:head>
	<title>James Hoffmann - Founder of Pulsyn</title>
	<meta name="description" content="James Hoffmann. Founder of Pulsyn, building the Rune 1 smart ring and PRANA 0.7B on-device AI from Phoenix, AZ. Privacy advocate, open source builder." />

	<!-- Open Graph -->
	<meta property="og:title" content="James Hoffmann - Founder of Pulsyn" />
	<meta property="og:description" content="James Hoffmann. Founder of Pulsyn, building the Rune 1 smart ring and PRANA 0.7B on-device AI from Phoenix, AZ. Privacy advocate, open source builder." />
	<meta property="og:url" content="https://hffmnn.com" />

	<!-- Twitter -->
	<meta name="twitter:title" content="James Hoffmann - Founder of Pulsyn" />
	<meta name="twitter:description" content="James Hoffmann. Founder of Pulsyn, building the Rune 1 smart ring and PRANA 0.7B on-device AI from Phoenix, AZ. Privacy advocate, open source builder." />
</svelte:head>

<RunningHeader />
<Hero />
<About />
<Writing />
<FeaturedProjects />
<PulsynSection />
