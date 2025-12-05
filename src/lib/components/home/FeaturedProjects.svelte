<script lang="ts">
	import { Button } from "$lib/components/ui/button";
	import { Badge } from "$lib/components/ui/badge";
	import { HugeiconsIcon } from "@hugeicons/svelte";
	import { ArrowRight01Icon, GithubIcon, InformationCircleIcon } from "@hugeicons/core-free-icons";
	import { projects } from "$lib/data/projects";
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
				<HugeiconsIcon icon={ArrowRight01Icon} size={16} class="ml-2" />
			</Button>
		</div>

		<div class="grid md:grid-cols-2 gap-6">
			{#each projects as project, i}
				<article class="glass-card p-8 group hover:border-white/15 transition-all duration-500 animate-fade-up {i === 0 ? 'delay-100' : 'delay-200'}">
					<div class="flex items-start justify-between mb-4">
						<h3 class="font-display text-2xl font-semibold">
							{project.title}
						</h3>
						<div class="flex gap-2">
							<a
								href="/tools/{project.slug}"
								class="p-2 rounded-lg glass-button opacity-60 group-hover:opacity-100 transition-opacity"
								aria-label="View project details"
							>
								<HugeiconsIcon icon={InformationCircleIcon} size={20} />
							</a>
							<a
								href={project.githubUrl}
								target="_blank"
								rel="noopener noreferrer"
								class="p-2 rounded-lg glass-button opacity-60 group-hover:opacity-100 transition-opacity"
								aria-label="View on GitHub"
							>
								<HugeiconsIcon icon={GithubIcon} size={20} />
							</a>
						</div>
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
			{/each}
		</div>

		<div class="mt-8 text-center md:hidden">
			<Button href="/tools" variant="ghost" class="text-muted-foreground hover:text-white">
				View all projects
				<HugeiconsIcon icon={ArrowRight01Icon} size={16} class="ml-2" />
			</Button>
		</div>
	</div>
</section>
