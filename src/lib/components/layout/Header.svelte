<script lang="ts">
	import { page } from "$app/state";
	import { afterNavigate } from "$app/navigation";
	import { cn } from "$lib/utils/cn";
	import { socials } from "$lib/data/socials";
	import { browser } from "$app/environment";
	import { HugeiconsIcon, Home01Icon, CodeIcon, HeartCheckIcon } from "$lib/icons";

	let isMenuOpen = $state(false);

	// My timezone (Phoenix, AZ — MST, no DST)
	const MY_TZ = "America/Phoenix";

	// Ordinal suffix — 1ST, 2ND, 3RD, 4TH …
	function ordinal(n: number): string {
		const s = ["TH", "ST", "ND", "RD"];
		const v = n % 100;
		return n + (s[(v - 20) % 10] ?? s[v] ?? s[0]);
	}

	function formatDate(): string {
		const now = new Date();
		const day   = now.getDate();
		const month = now.toLocaleString("en-US", { month: "long" }).toUpperCase();
		const year  = now.getFullYear();
		return `${ordinal(day)} OF ${month} · ${year}`;
	}

	function formatTzLine(): string {
		const now = new Date();

		const myTime = new Intl.DateTimeFormat("en-US", {
			timeZone: MY_TZ,
			hour: "numeric",
			minute: "2-digit",
			hour12: true,
		}).format(now);

		if (!browser) return `PHX ${myTime}`;

		const myOffset   = getOffsetMinutes(MY_TZ, now);
		const userOffset = -now.getTimezoneOffset();
		const diff       = userOffset - myOffset;

		if (diff === 0) return `PHX ${myTime}`;

		const sign       = diff > 0 ? "+" : "−";
		const absDiff    = Math.abs(diff);
		const hours      = Math.floor(absDiff / 60);
		const mins       = absDiff % 60;
		const offsetStr  = mins === 0 ? `${hours}h` : `${hours}h${mins}m`;

		return `PHX ${myTime} · YOU ${sign}${offsetStr}`;
	}

	function getOffsetMinutes(tz: string, date: Date): number {
		const utcDate = new Date(date.toLocaleString("en-US", { timeZone: "UTC" }));
		const tzDate  = new Date(date.toLocaleString("en-US", { timeZone: tz }));
		return (tzDate.getTime() - utcDate.getTime()) / 60000;
	}

	let dateStr = $state(formatDate());
	let tzLine  = $state(formatTzLine());

	if (browser) {
		setInterval(() => {
			dateStr = formatDate();
			tzLine  = formatTzLine();
		}, 60_000);
	}

	afterNavigate(() => { isMenuOpen = false; });
</script>

<header class="sticky top-0 z-50 bg-paper border-b-2 border-ink">
	<div class="max-w-6xl mx-auto px-6">
		<!-- Top row: nameplate + full date -->
		<div class="flex items-baseline justify-between py-4 md:py-5">
			<a
				href="/"
				class="font-display fraunces-hover text-3xl md:text-4xl lg:text-5xl font-bold tracking-[-0.03em] text-ink hover:text-accent transition-colors"
			>
				hffmnn
			</a>
			<div class="hidden sm:flex items-center gap-3">
				<span class="w-px h-3 bg-rule-strong opacity-60" aria-hidden="true"></span>
				<span class="editorial-mono text-xs text-ink-faint">
					{dateStr}
				</span>
			</div>
		</div>

		<!-- Bottom row: timezone + nav -->
		<div class="flex items-center justify-between py-2 border-t border-rule">
			<span class="editorial-mono text-xs text-ink-faint">
				{tzLine}
			</span>

			<!-- Desktop nav -->
			<nav class="hidden md:flex items-center gap-6 text-sm">
				<a
					href="/"
					class={cn(
						"editorial-link inline-flex items-center gap-1.5",
						page.url.pathname === "/" && "text-ink font-medium nav-active",
					)}
				>
					<HugeiconsIcon icon={Home01Icon} size={14} strokeWidth={1.5} />
					Home
				</a>
				<a
					href="/tools"
					class={cn(
						"editorial-link inline-flex items-center gap-1.5",
						page.url.pathname.startsWith("/tools") && "text-ink font-medium nav-active",
					)}
				>
					<HugeiconsIcon icon={CodeIcon} size={14} strokeWidth={1.5} />
					Tools
				</a>
				<a
					href="/venture"
					class={cn(
						"editorial-link inline-flex items-center gap-1.5",
						page.url.pathname === "/venture" && "text-ink font-medium nav-active",
					)}
				>
					<HugeiconsIcon icon={HeartCheckIcon} size={14} strokeWidth={1.5} />
					Pulsyn
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
				<a href="/" class="editorial-link inline-flex items-center gap-2 py-1">
					<HugeiconsIcon icon={Home01Icon} size={14} strokeWidth={1.5} />
					Home
				</a>
				<a href="/tools" class="editorial-link inline-flex items-center gap-2 py-1">
					<HugeiconsIcon icon={CodeIcon} size={14} strokeWidth={1.5} />
					Tools
				</a>
				<a href="/venture" class="editorial-link inline-flex items-center gap-2 py-1">
					<HugeiconsIcon icon={HeartCheckIcon} size={14} strokeWidth={1.5} />
					Pulsyn
				</a>
				<div class="border-t border-rule pt-3 mt-1 flex items-center gap-4">
					<a href={socials.github.url} target="_blank" rel="noopener noreferrer" class="editorial-link">
						{socials.github.label}
					</a>
					<a href={socials.x.url} target="_blank" rel="noopener noreferrer" class="editorial-link">
						{socials.x.label}
					</a>
				</div>
			</div>
		</div>
	{/if}
</header>
