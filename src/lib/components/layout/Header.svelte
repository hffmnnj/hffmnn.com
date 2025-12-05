<script lang="ts">
	import { page } from "$app/state";
	import { afterNavigate } from "$app/navigation";
	import { cn } from "$lib/utils/cn";
	import { HugeiconsIcon } from "@hugeicons/svelte";
	import { GithubIcon, Menu01Icon, Cancel01Icon } from "@hugeicons/core-free-icons";

	let isMenuOpen = $state(false);

	// Close menu on navigation
	afterNavigate(() => {
		isMenuOpen = false;
	});
</script>

<header class="fixed top-0 w-full z-50">
	<div class="glass border-b border-white/5">
		<nav class="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
			<a href="/" class="font-display text-xl font-bold hover:opacity-80 transition-opacity">
				hffmnn
			</a>

			<!-- Desktop navigation -->
			<div class="hidden md:flex items-center gap-8">
				<a href="/" class={cn("nav-link", page.url.pathname === "/" && "text-white")}>
					Home
				</a>
				<a href="/tools" class={cn("nav-link", page.url.pathname.startsWith("/tools") && "text-white")}>
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

			<!-- Mobile hamburger button -->
			<button
				class="md:hidden p-2 -mr-2 text-muted-foreground hover:text-white transition-colors"
				onclick={() => isMenuOpen = !isMenuOpen}
				aria-label={isMenuOpen ? "Close menu" : "Open menu"}
				aria-expanded={isMenuOpen}
			>
				<HugeiconsIcon icon={isMenuOpen ? Cancel01Icon : Menu01Icon} size={24} />
			</button>
		</nav>
	</div>

	<!-- Mobile menu -->
	{#if isMenuOpen}
		<div class="md:hidden glass border-b border-white/5 animate-fade-in" style="animation-duration: 150ms;">
			<div class="flex flex-col px-6 py-4 gap-4">
				<a
					href="/"
					class={cn("nav-link text-base py-2", page.url.pathname === "/" && "text-white")}
				>
					Home
				</a>
				<a
					href="/tools"
					class={cn("nav-link text-base py-2", page.url.pathname.startsWith("/tools") && "text-white")}
				>
					Tools
				</a>
				<a
					href="/venture"
					class={cn("nav-link text-base py-2", page.url.pathname === "/venture" && "text-white")}
				>
					Venture
				</a>
				<div class="border-t border-white/10 my-2"></div>
				<a
					href="https://github.com/hffmnnj"
					target="_blank"
					rel="noopener noreferrer"
					class="nav-link text-base py-2 flex items-center gap-2"
				>
					<HugeiconsIcon icon={GithubIcon} size={20} />
					GitHub
				</a>
			</div>
		</div>
	{/if}

	<!-- Fade gradient for content scrolling behind -->
	<div class="h-8 bg-gradient-to-b from-black/60 to-transparent pointer-events-none"></div>
</header>
