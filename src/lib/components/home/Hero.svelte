<script lang="ts">
	import { Button } from "$lib/components/ui/button";
	import { HugeiconsIcon } from "@hugeicons/svelte";
	import { ArrowRight01Icon, GithubIcon } from "@hugeicons/core-free-icons";
</script>

<section class="min-h-[70vh] flex items-center justify-center px-6 pt-16">
	<div class="max-w-4xl text-center">
		<h1 class="font-display text-5xl md:text-7xl font-bold mb-6 animate-fade-up">
			<span class="text-gradient">Building tools</span>
			<br />
			<span class="text-muted-foreground">for privacy & productivity</span>
		</h1>

		<p class="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed animate-fade-up delay-200">
			Developer focused on creating elegant, privacy-respecting software.
			From desktop environments to AI-powered tools.
		</p>

		<div class="flex items-center justify-center gap-4 flex-wrap animate-fade-up delay-400">
			<Button href="/tools" class="glass-button px-6 py-3 rounded-xl h-auto">
				View Projects
				<HugeiconsIcon icon={ArrowRight01Icon} size={16} class="ml-2" />
			</Button>
			<Button
				href="https://github.com/hffmnnj"
				variant="ghost"
				class="text-muted-foreground hover:text-white h-auto px-6 py-3"
			>
				<HugeiconsIcon icon={GithubIcon} size={16} class="mr-2" />
				GitHub
			</Button>
		</div>
	</div>
</section>
