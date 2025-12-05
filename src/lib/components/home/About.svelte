<script lang="ts">
	import { HugeiconsIcon } from "@hugeicons/svelte";
	import { Shield01Icon, SparklesIcon, ComputerTerminal01Icon } from "@hugeicons/core-free-icons";
</script>

<section class="py-16 px-6">
	<div class="max-w-6xl mx-auto">
		<div class="text-center mb-16 animate-fade-up">
			<h2 class="font-display text-3xl md:text-4xl font-bold mb-4">
				About Me
			</h2>
			<p class="text-lg text-muted-foreground max-w-2xl mx-auto">
				Passionate about building software that respects users and sparks joy.
			</p>
		</div>

		<div class="grid md:grid-cols-3 gap-8">
			<div class="glass-card p-8 text-center animate-fade-up delay-100">
				<div class="icon-box mx-auto mb-4">
					<HugeiconsIcon icon={Shield01Icon} size={24} class="text-white/70" />
				</div>
				<h3 class="font-display text-xl font-semibold mb-2">Privacy First</h3>
				<p class="text-muted-foreground text-sm leading-relaxed">
					Every tool I build starts with privacy as a core principle, not an afterthought.
				</p>
			</div>

			<div class="glass-card p-8 text-center animate-fade-up delay-200">
				<div class="icon-box mx-auto mb-4">
					<HugeiconsIcon icon={ComputerTerminal01Icon} size={24} class="text-white/70" />
				</div>
				<h3 class="font-display text-xl font-semibold mb-2">Open Source</h3>
				<p class="text-muted-foreground text-sm leading-relaxed">
					Transparency and collaboration drive better software. All my projects are open source.
				</p>
			</div>

			<div class="glass-card p-8 text-center animate-fade-up delay-300">
				<div class="icon-box mx-auto mb-4">
					<HugeiconsIcon icon={SparklesIcon} size={24} class="text-white/70" />
				</div>
				<h3 class="font-display text-xl font-semibold mb-2">Delightful UX</h3>
				<p class="text-muted-foreground text-sm leading-relaxed">
					Software should be beautiful and functional. Great design enhances productivity.
				</p>
			</div>
		</div>
	</div>
</section>
