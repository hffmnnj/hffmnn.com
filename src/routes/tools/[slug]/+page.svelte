<script lang="ts">
	import { Badge } from "$lib/components/ui/badge";
	import { Kicker, Byline } from "$lib/components/editorial";
	import { formatRelativeTime } from "$lib/utils/github";
	import { parseMarkdown } from "$lib/utils/markdown";
	import { afterNavigate } from "$app/navigation";

	let { data } = $props();

	let renderedHtml = $derived(
		data.markdown
			? parseMarkdown(data.markdown, {
					owner: data.project.githubOwner,
					repo: data.project.githubRepo
				})
			: null
	);

	// Determine back link based on where user navigated from
	let backLink = $state({ href: "/tools", label: "Back to Tools" });

	afterNavigate((navigation) => {
		const fromPath = navigation.from?.url?.pathname;
		if (fromPath === "/" || fromPath === "") {
			backLink = { href: "/", label: "Back to Home" };
		} else {
			backLink = { href: "/tools", label: "Back to Tools" };
		}
	});

	const softwareSchema = $derived({
		"@context": "https://schema.org",
		"@type": "SoftwareApplication",
		name: data.project.title,
		description: data.project.description,
		url: `https://hffmnn.com/tools/${data.project.slug}`,
		applicationCategory: "DeveloperApplication",
		operatingSystem: "Linux",
		offers: {
			"@type": "Offer",
			price: "0",
			priceCurrency: "USD"
		},
		author: {
			"@type": "Person",
			name: "hffmnn",
			url: "https://hffmnn.com"
		}
	});
</script>

<svelte:head>
	<title>{data.project.title} - hffmnn</title>
	<meta name="description" content={data.project.description} />

	<!-- Page-specific Open Graph -->
	<meta property="og:title" content="{data.project.title} - hffmnn" />
	<meta property="og:description" content={data.project.description} />
	<meta property="og:url" content="https://hffmnn.com/tools/{data.project.slug}" />
	<meta property="og:type" content="article" />

	<!-- Twitter -->
	<meta name="twitter:title" content="{data.project.title} - hffmnn" />
	<meta name="twitter:description" content={data.project.description} />

	<!-- JSON-LD Structured Data -->
	{@html `<script type="application/ld+json">${JSON.stringify(softwareSchema)}</script>`}
</svelte:head>

<article class="px-6 py-12 md:py-16">
	<div class="max-w-3xl mx-auto">
		<nav class="mb-8 animate-fade-in">
			<a
				href={backLink.href}
				class="editorial-link text-sm inline-flex items-center gap-2 text-ink-soft hover:text-ink"
			>
				<span aria-hidden="true">&larr;</span> {backLink.label}
			</a>
		</nav>

		<header class="mb-10 pb-8 border-b border-rule animate-fade-up">
			<Kicker label="PROJECT  ·  TOOLS" showRule={true} />

			<div class="flex flex-wrap items-start justify-between gap-4 mb-4">
				<h1 class="font-display text-4xl md:text-5xl font-semibold tracking-[-0.02em] text-ink leading-[1.05]">
					{data.project.title}
				</h1>
				<a
					href={data.project.githubUrl}
					target="_blank"
					rel="noopener noreferrer"
					class="editorial-link text-sm text-ink-soft hover:text-ink whitespace-nowrap"
				>
					GitHub <span aria-hidden="true">&rarr;</span>
				</a>
			</div>

			<Byline class="mb-4" />

			<p class="font-body text-base md:text-lg text-ink-soft mb-5 leading-[1.6]">
				{data.project.description}
			</p>

			<div class="flex flex-wrap items-center gap-x-4 gap-y-2">
				{#each data.project.tags as tag (tag)}
					<Badge variant="kicker">{tag}</Badge>
				{/each}
				{#if data.lastCommit}
					<span class="editorial-mono text-xs text-ink-faint border border-rule rounded-sm px-2 py-0.5">
						LAST CHANGES &nbsp;·&nbsp; {formatRelativeTime(data.lastCommit.date).toUpperCase()}
					</span>
				{/if}
			</div>
		</header>

		{#if data.error}
			<div class="border border-rule p-8 text-center animate-fade-up delay-200">
				<p class="font-body text-ink-soft mb-4">{data.error}</p>
				<a
					href={data.project.githubUrl}
					target="_blank"
					rel="noopener noreferrer"
					class="inline-flex items-center gap-2 px-5 py-2.5 bg-ink text-paper rounded-sm text-sm font-medium hover:bg-ink/90 transition-colors"
				>
					View on GitHub <span aria-hidden="true">&rarr;</span>
				</a>
			</div>
		{:else if renderedHtml}
			<section class="readme-content animate-fade-up delay-200">
				{@html renderedHtml}
			</section>
		{/if}
	</div>
</article>

<style>
	:global(.readme-content h1:first-child) {
		display: none;
	}
	:global(.readme-content h1) {
		font-family: var(--font-display);
		font-size: 2.25rem;
		font-weight: 700;
		margin-top: 2.5rem;
		margin-bottom: 1rem;
		letter-spacing: -0.02em;
		color: var(--ink);
	}
	:global(.readme-content h2) {
		font-family: var(--font-display);
		font-size: 1.75rem;
		font-weight: 600;
		margin-top: 2.5rem;
		margin-bottom: 1rem;
		letter-spacing: -0.02em;
		color: var(--ink);
		border-bottom: 1px solid var(--rule);
		padding-bottom: 0.5rem;
	}
	:global(.readme-content h3) {
		font-family: var(--font-display);
		font-size: 1.375rem;
		font-weight: 600;
		margin-top: 1.75rem;
		margin-bottom: 0.75rem;
		letter-spacing: -0.01em;
		color: var(--ink);
	}
	:global(.readme-content h4) {
		font-family: var(--font-display);
		font-size: 1.125rem;
		font-weight: 600;
		margin-top: 1.25rem;
		margin-bottom: 0.5rem;
		color: var(--ink);
	}
	:global(.readme-content p) {
		color: var(--ink-soft);
		font-family: var(--font-body);
		line-height: 1.7;
		margin-bottom: 1.1rem;
		font-size: 1rem;
	}
	:global(.readme-content ul),
	:global(.readme-content ol) {
		margin-bottom: 1.1rem;
		padding-left: 1.5rem;
		color: var(--ink-soft);
	}
	:global(.readme-content li) {
		color: var(--ink-soft);
		margin-bottom: 0.35rem;
		line-height: 1.7;
	}
	:global(.readme-content ul li) {
		list-style-type: disc;
	}
	:global(.readme-content ol li) {
		list-style-type: decimal;
	}
	:global(.readme-content code) {
		background-color: var(--paper-elevated);
		border: 1px solid var(--rule);
		padding: 0.1rem 0.4rem;
		border-radius: 2px;
		font-size: 0.875em;
		font-family: var(--font-mono);
		color: var(--ink);
	}
	:global(.readme-content pre) {
		background-color: var(--paper-elevated);
		border: 1px solid var(--rule);
		border-radius: 2px;
		padding: 1rem;
		overflow-x: auto;
		margin-bottom: 1.25rem;
	}
	:global(.readme-content pre code) {
		background-color: transparent;
		border: 0;
		padding: 0;
		color: var(--ink);
	}
	:global(.readme-content table) {
		width: 100%;
		border-collapse: collapse;
		margin-bottom: 1.25rem;
		font-size: 0.9375rem;
	}
	:global(.readme-content th),
	:global(.readme-content td) {
		border: 1px solid var(--rule);
		padding: 0.55rem 0.875rem;
		text-align: left;
		color: var(--ink);
	}
	:global(.readme-content th) {
		background-color: var(--paper-elevated);
		font-weight: 600;
		font-family: var(--font-display);
	}
	:global(.readme-content img) {
		max-width: 100%;
		height: auto;
		border: 1px solid var(--rule);
		border-radius: 2px;
		margin: 1.25rem 0;
	}
	:global(.readme-content blockquote) {
		border-left: 3px solid var(--accent);
		padding-left: 1rem;
		font-style: italic;
		color: var(--ink-soft);
		margin: 1.25rem 0;
		font-family: var(--font-body);
	}
	:global(.readme-content hr) {
		border: 0;
		border-top: 1px solid var(--rule);
		margin: 2rem 0;
	}
	:global(.readme-content strong) {
		font-weight: 600;
		color: var(--ink);
	}
	:global(.readme-content em) {
		font-style: italic;
	}
	:global(.readme-content a) {
		color: var(--accent);
		text-decoration: underline;
		text-decoration-thickness: 1px;
		text-underline-offset: 2px;
	}
	:global(.readme-content a:hover) {
		text-decoration-thickness: 2px;
	}
</style>
