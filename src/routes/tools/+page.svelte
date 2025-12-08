<script lang="ts">
	import ProjectCard from "$lib/components/tools/ProjectCard.svelte";
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
	<title>Tools & Open Source Projects - hffmnn</title>
	<meta name="description" content="Privacy-focused tools and open source projects by hffmnn. Explore Vibearchy desktop environment, Me and My Friends AI advisor, and Capyseo SEO toolkit." />

	<!-- Open Graph -->
	<meta property="og:title" content="Tools & Projects | hffmnn" />
	<meta property="og:description" content="Open-source projects focused on privacy, productivity, and beautiful design." />
	<meta property="og:url" content="https://hffmnn.com/tools" />

	<!-- Twitter -->
	<meta name="twitter:title" content="Tools & Projects | hffmnn" />
	<meta name="twitter:description" content="Open-source projects focused on privacy, productivity, and beautiful design." />

	<!-- JSON-LD Structured Data -->
	{@html `<script type="application/ld+json">${JSON.stringify(collectionSchema)}</script>`}
</svelte:head>

<div class="pt-24 pb-16 px-6">
	<div class="max-w-6xl mx-auto">
		<header class="mb-16 text-center animate-fade-up">
			<h1 class="font-display text-4xl md:text-5xl font-bold mb-4">
				Tools & Projects
			</h1>
			<p class="text-lg text-muted-foreground max-w-2xl mx-auto">
				Open-source projects focused on privacy, productivity, and beautiful design.
			</p>
		</header>

		<div class="grid md:grid-cols-2 gap-8 items-stretch">
			{#each projects as project, i}
				<div class="animate-fade-up h-full {i === 0 ? 'delay-100' : i === 1 ? 'delay-200' : i === 2 ? 'delay-300' : 'delay-400'}">
				<ProjectCard
					slug={project.slug}
					title={project.title}
					description={project.description}
					tags={project.tags}
					githubUrl={project.githubUrl}
					features={project.features}
				/>
				</div>
			{/each}
		</div>

		<!-- Capyseo Section -->
		<section class="mt-20 animate-fade-up delay-300">
			<div class="flex items-center gap-3 mb-8">
				<div class="w-1 h-8 bg-capybara rounded-full"></div>
				<h2 class="font-display text-2xl md:text-3xl font-bold">Capyseo</h2>
				<span class="text-muted-foreground text-sm">AI-powered SEO toolkit</span>
			</div>

			<div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch">
				{#each capyseoProjects as project, i}
					<div class="animate-fade-up h-full {i === 0 ? 'delay-400' : i === 1 ? 'delay-500' : 'delay-600'}">
						<ProjectCard
							slug={project.slug}
							title={project.title}
							description={project.description}
							tags={project.tags}
							githubUrl={project.githubUrl}
							features={project.features}
						/>
					</div>
				{/each}
			</div>
		</section>
	</div>
</div>
