<script lang="ts">
	import { page } from "$app/state";
	import { afterNavigate } from "$app/navigation";
	import { cn } from "$lib/utils/cn";

	let isMenuOpen = $state(false);

	let date = $state(
		new Intl.DateTimeFormat("en-US", { month: "long", year: "numeric" })
			.format(new Date())
			.toUpperCase(),
	);

	// Close menu on navigation
	afterNavigate(() => {
		isMenuOpen = false;
	});
</script>

<header class="sticky top-0 z-50 bg-paper border-b border-ink">
	<div class="max-w-6xl mx-auto px-6">
		<!-- Top row: nameplate + dateline -->
		<div class="flex items-baseline justify-between py-4">
			<a
				href="/"
				class="font-display text-2xl md:text-3xl font-bold tracking-[-0.02em] text-ink hover:text-accent transition-colors"
			>
				hffmnn
			</a>
			<span class="hidden sm:block editorial-mono text-xs text-ink-faint">
				PHOENIX, AZ &nbsp;·&nbsp; {date}
			</span>
		</div>

		<!-- Bottom row: vol/issue + nav -->
		<div class="flex items-center justify-between py-2 border-t border-rule">
			<span class="editorial-mono text-xs text-ink-faint">
				VOL. I &nbsp;·&nbsp; ISSUE 04
			</span>

			<!-- Desktop nav -->
			<nav class="hidden md:flex items-center gap-6 text-sm">
				<a
					href="/"
					class={cn("editorial-link", page.url.pathname === "/" && "text-ink font-medium")}
				>
					Home
				</a>
				<a
					href="/tools"
					class={cn(
						"editorial-link",
						page.url.pathname.startsWith("/tools") && "text-ink font-medium",
					)}
				>
					Tools
				</a>
				<a
					href="/venture"
					class={cn(
						"editorial-link",
						page.url.pathname === "/venture" && "text-ink font-medium",
					)}
				>
					Venture
				</a>
			</nav>

			<!-- Mobile toggle -->
			<button
				class="md:hidden editorial-mono text-xs text-ink-soft hover:text-ink"
				onclick={() => (isMenuOpen = !isMenuOpen)}
				aria-expanded={isMenuOpen}
				aria-label={isMenuOpen ? "Close menu" : "Open menu"}
			>
				{isMenuOpen ? "CLOSE" : "MENU"}
			</button>
		</div>
	</div>

	{#if isMenuOpen}
		<div class="md:hidden bg-paper border-t border-rule animate-fade-in">
			<div class="max-w-6xl mx-auto px-6 py-4 flex flex-col gap-3 text-sm">
				<a href="/" class="editorial-link py-1">Home</a>
				<a href="/tools" class="editorial-link py-1">Tools</a>
				<a href="/venture" class="editorial-link py-1">Venture</a>
				<div class="border-t border-rule pt-3 mt-1">
					<a
						href="https://github.com/hffmnnj"
						target="_blank"
						rel="noopener noreferrer"
						class="editorial-link"
					>
						GitHub
					</a>
				</div>
			</div>
		</div>
	{/if}
</header>
