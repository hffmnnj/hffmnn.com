<script lang="ts">
	import { Button } from "$lib/components/ui/button";
	import { HugeiconsIcon } from "@hugeicons/svelte";
	import { ArrowRight01Icon, GithubIcon } from "@hugeicons/core-free-icons";

	const birthYear = 2004;
	const birthMonth = 3; // April (0-indexed)

	function getAge(): number {
		const today = new Date();
		let age = today.getFullYear() - birthYear;
		if (today.getMonth() < birthMonth) {
			age--;
		}
		return age;
	}

	const age = getAge();
</script>

<section class="min-h-[70vh] flex items-center justify-center px-6 pt-16">
	<div class="max-w-4xl text-center">
		<p class="text-muted-foreground mb-4 animate-fade-up">
			Hi, I'm <span class="text-white font-medium">James Hoffmann</span> · {age} y/o developer, sysadmin & privacy advocate
		</p>
		<h1 class="font-display text-5xl md:text-7xl font-bold mb-6 animate-fade-up delay-100">
			<span class="text-gradient">Building tools</span>
			<br />
			<span class="text-muted-foreground">for privacy & productivity</span>
		</h1>

		<p class="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed animate-fade-up delay-200">
			Creating elegant, privacy-respecting software.
			From desktop environments to AI-powered tools.
		</p>

		<div class="flex items-center justify-center gap-4 flex-wrap animate-fade-up delay-400">
			<Button href="/tools" class="glass-button px-6 py-3 rounded-xl h-auto">
				View Projects
				<span class="ml-2"><HugeiconsIcon icon={ArrowRight01Icon} size={16} /></span>
			</Button>
			<Button
				href="https://github.com/hffmnnj"
				variant="ghost"
				class="text-muted-foreground hover:text-white h-auto px-6 py-3"
			>
				<span class="mr-2"><HugeiconsIcon icon={GithubIcon} size={16} /></span>
				GitHub
			</Button>
		</div>
	</div>
</section>
