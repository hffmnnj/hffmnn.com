<script lang="ts">
	import { Button } from "$lib/components/ui/button";
	import { Badge } from "$lib/components/ui/badge";
	import { HugeiconsIcon } from "@hugeicons/svelte";
	import { ArrowRight01Icon, GithubIcon } from "@hugeicons/core-free-icons";
	import { projects, capyseoProjects } from "$lib/data/projects";

	function handleGithubClick(e: MouseEvent, url: string) {
		e.preventDefault();
		e.stopPropagation();
		window.open(url, '_blank', 'noopener,noreferrer');
	}
</script>

<section class="py-24 px-6 border-t border-white/5">
	<div class="max-w-6xl mx-auto">
		<div class="flex items-end justify-between mb-12 animate-fade-up">
			<div>
				<h2 class="font-display text-3xl md:text-4xl font-bold mb-2">
					Featured Projects
				</h2>
				<p class="text-muted-foreground">
					Open source tools for privacy and productivity
				</p>
			</div>
			<Button href="/tools" variant="ghost" class="hidden md:inline-flex text-muted-foreground hover:text-white">
				View all
				<span class="ml-2"><HugeiconsIcon icon={ArrowRight01Icon} size={16} /></span>
			</Button>
		</div>

		<div class="grid md:grid-cols-2 gap-6 items-stretch">
			{#each projects as project, i}
				<a href="/tools/{project.slug}" class="flex flex-col glass-card p-8 group hover:border-white/15 transition-all duration-500 animate-fade-up relative h-full {i === 0 ? 'delay-100' : 'delay-200'}">
					<article class="flex-1">
						<div class="flex items-start justify-between mb-4">
							<h3 class="font-display text-2xl font-semibold">
								{project.title}
							</h3>
							<button
									onclick={(e) => handleGithubClick(e, project.githubUrl)}
									class="p-2 rounded-lg glass-button opacity-60 hover:opacity-100 hover:scale-110 transition-all"
									aria-label="View on GitHub"
								>
									<HugeiconsIcon icon={GithubIcon} size={20} />
							</button>
						</div>

						<p class="text-muted-foreground mb-6 leading-relaxed">
							{project.shortDescription}
						</p>

						<div class="flex flex-wrap gap-2">
							{#each project.tags.slice(0, 4) as tag}
								<Badge variant="secondary" class="bg-white/5 border-white/10 text-white/70">
									{tag}
								</Badge>
							{/each}
						</div>
					</article>

					<!-- Arrow indicator -->
					<div class="absolute bottom-8 right-8 opacity-40 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300">
						<HugeiconsIcon icon={ArrowRight01Icon} size={24} />
					</div>
				</a>
			{/each}
		</div>

		<!-- Capyseo Section -->
		<div class="mt-16 animate-fade-up delay-300">
			<div class="flex items-center gap-3 mb-8">
				<div class="w-1 h-8 bg-capybara rounded-full"></div>
				<h3 class="font-display text-2xl md:text-3xl font-bold">Capyseo</h3>
				<span class="text-muted-foreground text-sm">AI-powered SEO toolkit</span>
			</div>

			<div class="grid md:grid-cols-3 gap-6">
				{#each capyseoProjects as project, i}
					<a href="/tools/{project.slug}" class="flex flex-col glass-card p-6 group hover:border-white/15 transition-all duration-500 animate-fade-up relative h-full {i === 0 ? 'delay-400' : i === 1 ? 'delay-500' : 'delay-600'}">
						<article class="flex-1">
							<div class="flex items-start justify-between mb-4">
								<h4 class="font-display text-lg font-semibold">
									{project.title}
								</h4>
								<button
									onclick={(e) => handleGithubClick(e, project.githubUrl)}
									class="p-1.5 rounded-lg glass-button opacity-60 hover:opacity-100 hover:scale-110 transition-all"
									aria-label="View on GitHub"
								>
									<HugeiconsIcon icon={GithubIcon} size={16} />
								</button>
							</div>

							<p class="text-muted-foreground text-sm mb-4 leading-relaxed">
								{project.shortDescription}
							</p>

							<div class="flex flex-wrap gap-1.5">
								{#each project.tags.slice(0, 3) as tag}
									<Badge variant="secondary" class="bg-white/5 border-white/10 text-white/70 text-xs">
										{tag}
									</Badge>
								{/each}
							</div>
						</article>

						<!-- Arrow indicator -->
						<div class="absolute bottom-6 right-6 opacity-40 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300">
							<HugeiconsIcon icon={ArrowRight01Icon} size={20} />
						</div>
					</a>
				{/each}
			</div>
		</div>

		<div class="mt-8 text-center md:hidden">
			<Button href="/tools" variant="ghost" class="text-muted-foreground hover:text-white">
				View all projects
				<span class="ml-2"><HugeiconsIcon icon={ArrowRight01Icon} size={16} /></span>
			</Button>
		</div>
	</div>
</section>
