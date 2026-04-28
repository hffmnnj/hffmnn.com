<script lang="ts">
	import ProjectCard from "$lib/components/tools/ProjectCard.svelte";
	import { Kicker, Byline } from "$lib/components/editorial";
	import { projects, capyseoProjects } from "$lib/data/projects";

	const allProjects = [...projects, ...capyseoProjects];
	const collectionSchema = {
		"@context": "https://schema.org",
		"@type": "CollectionPage",
		name: "Tools",
		description: "Privacy-focused tools and projects by hffmnn",
		url: "https://hffmnn.com/tools",
		mainEntity: {
			"@type": "ItemList",
			itemListElement: allProjects.map((p, i) => ({
				"@type": "ListItem",
				position: i + 1,
				url: `https://hffmnn.com/tools/${p.slug}`,
				name: p.title
			}))
		}
	};
</script>

<svelte:head>
	<title>Open Source Work — hffmnn</title>
	<meta name="description" content="Ten open source projects: Enclave Mail, Vibearchy, GoopSpec, CapySEO, Reins, and more. Privacy tools, AI infrastructure, developer utilities." />

	<!-- Open Graph -->
	<meta property="og:title" content="Open Source Work — hffmnn" />
	<meta property="og:description" content="Ten open source projects: Enclave Mail, Vibearchy, GoopSpec, CapySEO, Reins, and more. Privacy tools, AI infrastructure, developer utilities." />
	<meta property="og:url" content="https://hffmnn.com/tools" />

	<!-- Twitter -->
	<meta name="twitter:title" content="Open Source Work — hffmnn" />
	<meta name="twitter:description" content="Ten open source projects: Enclave Mail, Vibearchy, GoopSpec, CapySEO, Reins, and more. Privacy tools, AI infrastructure, developer utilities." />

	<!-- JSON-LD Structured Data -->
	{@html `<script type="application/ld+json">${JSON.stringify(collectionSchema)}</script>`}
</svelte:head>

<div class="px-6 py-12 md:py-16">
	<div class="max-w-6xl mx-auto">
		<header class="mb-12 md:mb-16 animate-fade-up">
			<Kicker label="DEPARTMENT  ·  TOOLS  ·  ISSUE 04" showRule={true} />
			<h1 class="font-display text-4xl md:text-6xl font-semibold tracking-[-0.02em] text-ink mb-3">
				Open Source Work
			</h1>
			<p class="font-body text-lg text-ink-soft max-w-2xl leading-[1.6]">
				Ten projects across privacy infrastructure, AI tooling, and developer utilities. All open source.
			</p>
			<Byline class="mt-4 text-xs" />
		</header>

		<!-- Main projects (ledger style) -->
		<div class="divide-y divide-rule animate-fade-up delay-100">
			{#each projects as project (project.slug)}
				<ProjectCard
					slug={project.slug}
					title={project.title}
					description={project.description}
					tags={project.tags}
					githubUrl={project.githubUrl}
					features={project.features}
				/>
			{/each}
		</div>

		<!-- Capyseo sub-department -->
		<section class="mt-16 md:mt-20 pt-12 border-t border-rule-strong animate-fade-up delay-200">
			<Kicker label="SUB-DEPARTMENT  ·  CAPYSEO" showRule={true} />
			<div class="flex items-baseline justify-between mb-8">
				<h2 class="font-display text-3xl md:text-4xl font-semibold tracking-[-0.02em] text-ink">
					Capyseo
				</h2>
				<span class="editorial-byline text-sm hidden md:block">50+ SEO rules, multi-provider AI, one toolkit.</span>
			</div>
			<div class="divide-y divide-rule">
				{#each capyseoProjects as project (project.slug)}
					<ProjectCard
						slug={project.slug}
						title={project.title}
						description={project.description}
						tags={project.tags}
						githubUrl={project.githubUrl}
						features={project.features}
					/>
				{/each}
			</div>
		</section>
	</div>
</div>
