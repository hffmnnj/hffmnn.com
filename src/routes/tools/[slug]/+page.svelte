<script lang="ts">
	import { Badge } from "$lib/components/ui/badge";
	import { Button } from "$lib/components/ui/button";
	import { HugeiconsIcon } from "@hugeicons/svelte";
	import { ArrowLeft01Icon, GithubIcon, RefreshIcon } from "@hugeicons/core-free-icons";
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

<div class="pt-24 pb-16 px-6">
	<div class="max-w-4xl mx-auto">
		<nav class="mb-8 animate-fade-in">
			<Button href={backLink.href} variant="ghost" class="text-muted-foreground hover:text-white">
				<HugeiconsIcon icon={ArrowLeft01Icon} size={16} class="mr-2" />
				{backLink.label}
			</Button>
		</nav>

		<header class="mb-8 pb-8 border-b border-white/10 animate-fade-up">
			<div class="flex items-start justify-between mb-4">
				<h1 class="font-display text-3xl md:text-4xl font-bold tracking-tight">
					{data.project.title}
				</h1>
				<div class="flex items-center gap-2">
					{#if data.lastCommit}
						<div class="flex items-center gap-1.5 px-2.5 py-2 rounded-lg bg-white/5 border border-white/10 text-xs text-white/60">
							<HugeiconsIcon icon={RefreshIcon} size={14} class="text-white/40" />
							<span>{formatRelativeTime(data.lastCommit.date)}</span>
						</div>
					{/if}
					<a
						href={data.project.githubUrl}
						target="_blank"
						rel="noopener noreferrer"
						class="p-2 rounded-lg glass-button opacity-60 hover:opacity-100 hover:scale-110 transition-all"
						aria-label="View on GitHub"
					>
						<HugeiconsIcon icon={GithubIcon} size={20} />
					</a>
				</div>
			</div>

			<p class="text-muted-foreground mb-4">{data.project.description}</p>

			<div class="flex flex-wrap gap-2">
				{#each data.project.tags as tag}
					<Badge variant="secondary" class="bg-white/5 border-white/10 text-white/70">
						{tag}
					</Badge>
				{/each}
			</div>
		</header>

		{#if data.error}
			<div class="glass-card p-8 text-center animate-fade-up delay-200">
				<p class="text-muted-foreground mb-4">{data.error}</p>
				<Button href={data.project.githubUrl} target="_blank" rel="noopener noreferrer">
					View on GitHub
					<HugeiconsIcon icon={GithubIcon} size={16} class="ml-2" />
				</Button>
			</div>
		{:else if renderedHtml}
			<article class="readme-content animate-fade-up delay-200">
				{@html renderedHtml}
			</article>
		{/if}
	</div>
</div>

<style>
	:global(.readme-content h1:first-child) {
		display: none;
	}
	:global(.readme-content h1) {
		font-family: var(--font-display);
		font-size: 1.875rem;
		font-weight: 700;
		margin-top: 2rem;
		margin-bottom: 1rem;
		letter-spacing: -0.025em;
	}
	:global(.readme-content h2) {
		font-family: var(--font-display);
		font-size: 1.5rem;
		font-weight: 600;
		margin-top: 2rem;
		margin-bottom: 1rem;
		letter-spacing: -0.025em;
		border-bottom: 1px solid rgb(255 255 255 / 0.1);
		padding-bottom: 0.5rem;
	}
	:global(.readme-content h3) {
		font-family: var(--font-display);
		font-size: 1.25rem;
		font-weight: 600;
		margin-top: 1.5rem;
		margin-bottom: 0.75rem;
		letter-spacing: -0.025em;
	}
	:global(.readme-content h4) {
		font-family: var(--font-display);
		font-size: 1.125rem;
		font-weight: 600;
		margin-top: 1.25rem;
		margin-bottom: 0.5rem;
	}
	:global(.readme-content p) {
		color: rgb(255 255 255 / 0.8);
		line-height: 1.75;
		margin-bottom: 1rem;
	}
	:global(.readme-content ul),
	:global(.readme-content ol) {
		margin-bottom: 1rem;
		padding-left: 1.5rem;
	}
	:global(.readme-content li) {
		color: rgb(255 255 255 / 0.8);
		margin-bottom: 0.25rem;
	}
	:global(.readme-content ul li) {
		list-style-type: disc;
	}
	:global(.readme-content ol li) {
		list-style-type: decimal;
	}
	:global(.readme-content code) {
		background-color: rgb(255 255 255 / 0.1);
		padding: 0.125rem 0.375rem;
		border-radius: 0.25rem;
		font-size: 0.875rem;
		font-family: "Kode Mono Variable", monospace;
	}
	:global(.readme-content pre) {
		background-color: rgb(255 255 255 / 0.05);
		border: 1px solid rgb(255 255 255 / 0.1);
		border-radius: 0.5rem;
		padding: 1rem;
		overflow-x: auto;
		margin-bottom: 1rem;
	}
	:global(.readme-content pre code) {
		background-color: transparent;
		padding: 0;
	}
	:global(.readme-content table) {
		width: 100%;
		border-collapse: collapse;
		margin-bottom: 1rem;
	}
	:global(.readme-content th),
	:global(.readme-content td) {
		border: 1px solid rgb(255 255 255 / 0.1);
		padding: 0.5rem 1rem;
		text-align: left;
	}
	:global(.readme-content th) {
		background-color: rgb(255 255 255 / 0.05);
		font-weight: 600;
	}
	:global(.readme-content img) {
		max-width: 100%;
		height: auto;
		border-radius: 0.5rem;
		margin: 1rem 0;
	}
	:global(.readme-content blockquote) {
		border-left: 4px solid rgb(255 255 255 / 0.2);
		padding-left: 1rem;
		font-style: italic;
		color: rgb(255 255 255 / 0.6);
		margin: 1rem 0;
	}
	:global(.readme-content hr) {
		border-color: rgb(255 255 255 / 0.1);
		margin: 2rem 0;
	}
	:global(.readme-content strong) {
		font-weight: 600;
	}
	:global(.readme-content em) {
		font-style: italic;
	}
</style>
