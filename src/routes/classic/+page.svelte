<script lang="ts">
	import { projects, capyseoProjects } from '$lib/data/projects.js';
</script>

<svelte:head>
	<title>James Hoffmann — Portfolio</title>
	<meta name="description" content="Projects and work by James Hoffmann." />
</svelte:head>

<main class="classic">
	<header class="classic__header">
		<h1 class="classic__name">James Hoffmann</h1>
		<p class="classic__subtitle">
			The museum requires a modern desktop browser with WebGL 2.0 support.
			Here's the full portfolio in text form.
		</p>
		<a class="classic__museum-link" href="/">← Try the museum</a>
	</header>

	<section class="classic__section">
		<h2 class="classic__section-title">Projects</h2>
		<ul class="classic__list">
			{#each projects as project (project.slug)}
				<li class="classic__item">
					<a class="classic__item-title" href="/tools/{project.slug}">{project.title}</a>
					<p class="classic__item-desc">{project.shortDescription}</p>
					<div class="classic__item-tags">
						{#each project.tags.slice(0, 4) as tag (tag)}
							<span class="classic__tag">{tag}</span>
						{/each}
					</div>
				</li>
			{/each}
		</ul>
	</section>

	<section class="classic__section">
		<h2 class="classic__section-title">CapySEO Suite</h2>
		<ul class="classic__list">
			{#each capyseoProjects as project (project.slug)}
				<li class="classic__item">
					<a class="classic__item-title" href="/tools/{project.slug}">{project.title}</a>
					<p class="classic__item-desc">{project.shortDescription}</p>
				</li>
			{/each}
		</ul>
	</section>
</main>
