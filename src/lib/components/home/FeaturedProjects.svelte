<script lang="ts">
	import { Kicker, Byline } from "$lib/components/editorial";
	import { Badge } from "$lib/components/ui/badge";
	import { projects, capyseoProjects, reinsProjects } from "$lib/data/projects";
	import { onMount } from "svelte";

	onMount(() => {
		const els = document.querySelectorAll(".reveal-clip");
		const io = new IntersectionObserver(
			(entries) => {
				for (const e of entries) {
					if (e.isIntersecting) {
						e.target.classList.add("is-visible");
						io.unobserve(e.target);
					}
				}
			},
			{ threshold: 0.08 }
		);
		els.forEach((el) => io.observe(el));
		return () => io.disconnect();
	});
</script>

<section id="tools-section" class="section-counter py-20 md:py-28 px-6 border-t border-rule" data-n="03">
	<div class="max-w-6xl mx-auto">
		<Kicker label="DEPARTMENT  ·  TOOLS" showRule={true} />

		<div class="flex items-end justify-between mb-10 animate-fade-up">
			<div>
				<h2 class="font-display text-4xl md:text-6xl font-bold tracking-[-0.03em] text-ink mb-2 fraunces-hover">
					The Work
				</h2>
				<p class="editorial-byline text-base">
					Ten open source projects across privacy, on-device AI, and developer tooling.
				</p>
			</div>
			<a href="/tools" class="hidden md:inline-flex editorial-link text-sm items-center gap-2">
				View all <span aria-hidden="true">&rarr;</span>
			</a>
		</div>

		<div>
			{#each projects as project, i (project.slug)}
				<a
					href="/tools/{project.slug}"
					class="ledger-row group grid md:grid-cols-12 gap-4 md:gap-6 py-8 md:py-10 px-2 -mx-2 reveal-clip {i === 0 ? 'border-t-2 border-ink' : 'border-t border-rule'}"
					style="transition-delay: {i * 80}ms"
				>
					<div class="md:col-span-4">
						<h3 class="ledger-row-title fraunces-hover font-display {i === 0 ? 'text-2xl md:text-3xl' : 'text-xl md:text-2xl'} font-semibold text-ink group-hover:text-accent transition-colors mb-2">
							{project.title}
						</h3>
						<Byline class="text-xs" />
					</div>

					<div class="md:col-span-6">
						<p class="font-body text-base text-ink-soft leading-[1.65] mb-3" style="text-wrap: pretty;">
							{project.shortDescription}
						</p>
						<div class="flex flex-wrap gap-x-4 gap-y-1">
							{#each project.tags.slice(0, 5) as tag (tag)}
								<Badge variant="kicker">{tag}</Badge>
							{/each}
						</div>
					</div>

					<div class="md:col-span-2 md:text-right self-center">
						<span class="editorial-link text-sm inline-flex items-center gap-2 text-ink-soft group-hover:text-accent">
							Read more <span aria-hidden="true">&rarr;</span>
						</span>
					</div>
				</a>
			{/each}
		</div>

		<!-- Ornamental break -->
		<div class="ornament-break my-14" aria-hidden="true">
			<span class="editorial-mono text-xs text-ink-faint" style="letter-spacing: 0.2em;">&#10022;</span>
		</div>

		<!-- Capyseo sub-department -->
		<div class="animate-fade-up delay-300">
			<Kicker label="SUB-DEPARTMENT  ·  CAPYSEO" />
			<div class="flex items-baseline justify-between mb-8 mt-2">
				<h3 class="font-display text-2xl md:text-3xl font-semibold tracking-[-0.02em] text-ink fraunces-hover">
					Capyseo
				</h3>
				<span class="editorial-byline text-sm">50+ rules, four AI providers.</span>
			</div>

			<div class="grid md:grid-cols-3 gap-8 md:divide-x md:divide-rule">
				{#each capyseoProjects as project, i (project.slug)}
					<a
						href="/tools/{project.slug}"
						class="group md:px-6 md:first:pl-0 md:last:pr-0 reveal-clip"
						style="transition-delay: {i * 100}ms"
					>
						<h4 class="ledger-row-title fraunces-hover font-display text-lg md:text-xl font-semibold text-ink group-hover:text-accent transition-colors mb-2">
							{project.title}
						</h4>
						<p class="font-body text-sm text-ink-soft leading-[1.65] mb-3">
							{project.shortDescription}
						</p>
						<div class="flex flex-wrap gap-x-3 gap-y-1 mb-3">
							{#each project.tags.slice(0, 3) as tag (tag)}
								<Badge variant="kicker">{tag}</Badge>
							{/each}
						</div>
						<span class="editorial-link text-xs inline-flex items-center gap-1 text-ink-soft group-hover:text-accent">
							Read more <span aria-hidden="true">&rarr;</span>
						</span>
					</a>
				{/each}
			</div>
		</div>

		<!-- Ornamental break -->
		<div class="ornament-break my-14" aria-hidden="true">
			<span class="editorial-mono text-xs text-ink-faint" style="letter-spacing: 0.2em;">&#10022;</span>
		</div>

		<!-- Reins sub-department -->
		<div class="animate-fade-up delay-500">
			<Kicker label="SUB-DEPARTMENT  ·  REINS" />
			<div class="flex items-baseline justify-between mb-8 mt-2">
				<h3 class="font-display text-2xl md:text-3xl font-semibold tracking-[-0.02em] text-ink fraunces-hover">
					Reins
				</h3>
				<span class="editorial-byline text-sm">Your AI, your device, your rules</span>
			</div>

			<div class="grid md:grid-cols-2 gap-8 md:divide-x md:divide-rule">
				{#each reinsProjects as project, i (project.slug)}
					<a
						href="/tools/{project.slug}"
						class="group md:px-6 md:first:pl-0 md:last:pr-0 reveal-clip"
						style="transition-delay: {i * 100}ms"
					>
						<h4 class="ledger-row-title fraunces-hover font-display text-lg md:text-xl font-semibold text-ink group-hover:text-accent transition-colors mb-2">
							{project.title}
						</h4>
						<p class="font-body text-sm text-ink-soft leading-[1.65] mb-3">
							{project.shortDescription}
						</p>
						<div class="flex flex-wrap gap-x-3 gap-y-1 mb-3">
							{#each project.tags.slice(0, 3) as tag (tag)}
								<Badge variant="kicker">{tag}</Badge>
							{/each}
						</div>
						<div class="flex items-center gap-4">
							<span class="editorial-link text-xs inline-flex items-center gap-1 text-ink-soft group-hover:text-accent">
								Read more <span aria-hidden="true">&rarr;</span>
							</span>
							{#if project.websiteUrl}
								<button
									type="button"
									onclick={(e) => { e.preventDefault(); e.stopPropagation(); window.open(project.websiteUrl, '_blank', 'noopener,noreferrer'); }}
									class="editorial-link text-xs text-ink-faint hover:text-accent"
								>
									Website <span aria-hidden="true">&nearr;</span>
								</button>
							{/if}
						</div>
					</a>
				{/each}
			</div>
		</div>

		<div class="mt-10 text-center md:hidden">
			<a href="/tools" class="editorial-link text-sm inline-flex items-center gap-2">
				View all projects <span aria-hidden="true">&rarr;</span>
			</a>
		</div>
	</div>
</section>
