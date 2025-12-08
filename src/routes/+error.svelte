<script lang="ts">
	import { page } from "$app/state";
	import { Button } from "$lib/components/ui/button";
	import { HugeiconsIcon } from "@hugeicons/svelte";
	import { Home01Icon, ArrowLeft01Icon } from "@hugeicons/core-free-icons";

	const statusCode = $derived(page.status);
	const message = $derived(page.error?.message ?? "Page not found");
</script>

<svelte:head>
	<title>Page Not Found - hffmnn</title>
	<meta name="description" content="The page you're looking for doesn't exist. Return to hffmnn.com to explore privacy-focused tools and projects." />
	<meta name="robots" content="noindex, nofollow" />

	<!-- Open Graph -->
	<meta property="og:title" content="Page Not Found - hffmnn" />
	<meta property="og:description" content="The page you're looking for doesn't exist." />
	<meta property="og:url" content="https://hffmnn.com" />
	<meta property="og:type" content="website" />
	<meta property="og:image" content="https://hffmnn.com/og-image.png" />

	<!-- Twitter -->
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:title" content="Page Not Found - hffmnn" />
	<meta name="twitter:description" content="The page you're looking for doesn't exist." />
</svelte:head>

<div class="pt-24 pb-16 px-6 min-h-[80vh] flex items-center justify-center">
	<div class="max-w-md mx-auto text-center animate-fade-up">
		<div class="mb-8">
			<span class="font-display text-8xl font-bold text-white/10">{statusCode}</span>
		</div>

		<h1 class="font-display text-3xl md:text-4xl font-bold mb-4">
			Page Not Found
		</h1>

		<p class="text-muted-foreground mb-8">
			{message}. The page you're looking for might have been moved or doesn't exist.
		</p>

		<div class="flex flex-wrap justify-center gap-4">
			<Button href="/" class="glass-button">
				<span class="mr-2"><HugeiconsIcon icon={Home01Icon} size={16} /></span>
				Go Home
			</Button>
			<Button href="/tools" variant="ghost" class="text-muted-foreground hover:text-white">
				<span class="mr-2"><HugeiconsIcon icon={ArrowLeft01Icon} size={16} /></span>
				View Tools
			</Button>
		</div>
	</div>
</div>
