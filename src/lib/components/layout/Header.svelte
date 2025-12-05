<script lang="ts">
	import { page } from "$app/state";
	import { cn } from "$lib/utils/cn";
	import { HugeiconsIcon } from "@hugeicons/svelte";
	import { GithubIcon } from "@hugeicons/core-free-icons";
</script>

<header class="fixed top-0 w-full z-50">
	<div class="glass border-b border-white/5">
		<nav class="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
		<a href="/" class="font-display text-xl font-bold hover:opacity-80 transition-opacity">
			hffmnn
		</a>

		<div class="flex items-center gap-8">
			<a href="/" class={cn("nav-link", page.url.pathname === "/" && "text-white")}>
				Home
			</a>
			<a href="/tools" class={cn("nav-link", page.url.pathname === "/tools" && "text-white")}>
				Tools
			</a>
			<a href="/venture" class={cn("nav-link", page.url.pathname === "/venture" && "text-white")}>
				Venture
			</a>
			<a
				href="https://github.com/hffmnnj"
				target="_blank"
				rel="noopener noreferrer"
				class="icon-link"
				aria-label="GitHub"
			>
				<HugeiconsIcon icon={GithubIcon} size={20} />
			</a>
		</div>
	</nav>
	</div>
	<!-- Fade gradient for content scrolling behind -->
	<div class="h-8 bg-gradient-to-b from-black/60 to-transparent pointer-events-none"></div>
</header>
