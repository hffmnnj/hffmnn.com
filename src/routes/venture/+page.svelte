<script lang="ts">
	import { Kicker, IssueTag, Byline } from "$lib/components/editorial";
	import { Badge } from "$lib/components/ui/badge";

	const features = [
		{
			title: "Premium Quality",
			description: "Titanium construction with medical-grade materials for all-day comfort"
		},
		{
			title: "Up to 60-Day Battery",
			description: "Up to 60-day battery with charging case (7 days per charge)"
		},
		{
			title: "5ATM Waterproofing",
			description: "Swim, shower, and sweat worry-free with full water resistance"
		},
	{
		title: "Encrypted & Private",
		description: "SQLCipher AES-256 and local-first storage. Your data never leaves the device unencrypted."
	},
		{
			title: "Clinical-Grade Sensors",
			description: "Advanced optical sensors deliver medical-grade accuracy"
		},
		{
			title: "1-Year Warranty",
			description: "Free 1-year warranty on all pre-orders, backed by our guarantee"
		}
	];

	const valueProps = [
		{
			title: "Fair Pricing",
			callout: "Reserve for $10",
			points: [
				"Ships at $160, retail price is $200",
				"No subscription required for core features",
				"Everything competitors offer without monthly fees"
			]
		},
		{
			title: "Privacy First",
			callout: "Finland-Hosted",
			points: [
				"No government partnerships or defense contractors",
				"Your data is never sold or shared with third parties",
				"Strong EU privacy laws with full GDPR protection"
			]
		},
		{
			title: "Full Control",
			callout: "Founder-Owned",
			points: [
				"Direct decision-making, no intermediaries",
				"Bootstrapped and user-funded",
				"No insurance company data sharing"
			]
		}
	];

	const productSchema = {
		"@context": "https://schema.org",
		"@type": "Product",
		name: "Pulsyn Smart Ring",
		description:
			"Premium smart ring with clinical-grade sensors for health tracking at half the price of competitors",
		url: "https://hffmnn.com/venture",
		brand: {
			"@type": "Brand",
			name: "Pulsyn"
		},
		category: "Wearable Electronics",
		offers: {
			"@type": "Offer",
			price: "160",
			priceCurrency: "USD",
			availability: "https://schema.org/PreOrder",
			url: "https://getpulsyn.com/pricing"
		},
		manufacturer: {
			"@type": "Organization",
			name: "Pulsyn",
			address: {
				"@type": "PostalAddress",
				addressLocality: "Phoenix",
				addressRegion: "AZ",
				addressCountry: "US"
			}
		}
	};
</script>

<svelte:head>
	<title>Pulsyn Rune 1 — James Hoffmann</title>
	<meta name="description" content="Pulsyn Rune 1. A smart ring with on-device AI health intelligence built by James Hoffmann from Phoenix, AZ. Reserve for $10, ships at $160, retail $200." />

	<!-- Open Graph -->
	<meta property="og:title" content="Pulsyn Rune 1 — James Hoffmann" />
	<meta property="og:description" content="A smart ring with on-device AI health intelligence. Reserve for $10, ships at $160, no subscription." />
	<meta property="og:url" content="https://hffmnn.com/venture" />

	<!-- Twitter -->
	<meta name="twitter:title" content="Pulsyn Rune 1 — James Hoffmann" />
	<meta name="twitter:description" content="A smart ring with on-device AI health intelligence. Reserve for $10, ships at $160." />

	<!-- JSON-LD Structured Data -->
	{@html `<script type="application/ld+json">${JSON.stringify(productSchema)}</script>`}
</svelte:head>

<div class="px-6 py-12 md:py-16">
	<div class="max-w-5xl mx-auto">
		<!-- Lede -->
		<header class="mb-12 md:mb-16 animate-fade-up">
			<Kicker label="DEPARTMENT  ·  VENTURE  ·  ISSUE 04" showRule={true} />
			<IssueTag type="current" value="VENTURE" accent={true} class="mb-4" />

			<h1 class="font-display text-5xl md:text-7xl font-semibold tracking-[-0.02em] text-ink mb-4 leading-[1.0]">
				Pulsyn
			</h1>
			<p class="font-display text-xl md:text-3xl text-ink-soft max-w-3xl mb-4 leading-[1.2]">
				Premium Smart Ring. Half the Price.
			</p>
		<p class="font-body text-base md:text-lg text-ink-soft max-w-2xl leading-[1.6] mb-6">
			PPG, SpO2, skin temperature, accelerometer. On-device AI analysis. Ships at $160, retail $200. Reserve for $10 now.
		</p>
			<Byline author="James Hoffmann" location="Phoenix, AZ" class="text-xs mb-8" />

			<div class="flex flex-wrap items-center gap-x-8 gap-y-3 text-sm font-medium">
				<a
					href="https://getpulsyn.com"
					target="_blank"
					rel="noopener noreferrer"
					class="inline-flex items-center gap-2 px-5 py-2.5 bg-ink text-paper rounded-sm hover:bg-ink/90 transition-colors"
				>
					Reserve for $10 <span aria-hidden="true">&rarr;</span>
				</a>
				<a
					href="https://getpulsyn.com"
					target="_blank"
					rel="noopener noreferrer"
					class="editorial-link text-accent hover:text-accent/80 inline-flex items-center gap-2"
				>
					Visit getpulsyn.com
				</a>
			</div>
		</header>

		<!-- Hero image — full-bleed editorial, no padding -->
		<div class="my-12 md:my-16 overflow-hidden border border-rule animate-fade-up delay-100" style="max-height: 520px;">
			<picture>
				<source srcset="/images/pulsyn_table.webp" type="image/webp" />
				<img
					src="/images/pulsyn_table.png"
					alt="Pulsyn Rune 1 smart ring on a surface"
					class="w-full h-full object-cover object-center"
					width="1200"
					height="800"
				/>
			</picture>
		</div>

		<!-- Features -->
		<section class="my-16 md:my-20">
			<Kicker label="ENGINEERING" showRule={true} />
			<h2 class="font-display text-3xl md:text-4xl font-semibold tracking-[-0.02em] text-ink mb-3">
				Built for Precision
			</h2>
			<p class="font-body text-base text-ink-soft max-w-2xl mb-10 leading-[1.6]">
				Every detail engineered for accuracy, durability, and comfort.
			</p>

			<div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-8">
				{#each features as feature, i (feature.title)}
					<div class="border-t border-ink pt-4 animate-fade-up" style="animation-delay: {(i + 1) * 80}ms">
						<span class="editorial-mono text-xs text-ink-faint mb-2 block">{String(i + 1).padStart(2, "0")}</span>
						<h3 class="font-display text-lg font-semibold text-ink mb-2">{feature.title}</h3>
						<p class="font-body text-sm text-ink-soft leading-[1.6]">{feature.description}</p>
					</div>
				{/each}
			</div>
		</section>

		<!-- Why Pulsyn -->
		<section class="my-16 md:my-20 pt-12 border-t border-rule-strong">
			<Kicker label="POSITIONING" showRule={true} />
			<h2 class="font-display text-3xl md:text-4xl font-semibold tracking-[-0.02em] text-ink mb-3">
				The Tradeoffs Are Obvious
			</h2>
			<p class="font-body text-base text-ink-soft max-w-2xl mb-10 leading-[1.6]">
				One founder, one product, no VC money.
			</p>

			<div class="grid md:grid-cols-3 gap-0 md:divide-x md:divide-rule border border-rule">
				{#each valueProps as prop, i (prop.title)}
					<div class="p-6 md:p-8 animate-fade-up" style="animation-delay: {(i + 1) * 100}ms">
						<h3 class="font-display text-xl font-semibold text-ink mb-3">{prop.title}</h3>
						<Badge variant="accent" class="mb-5">{prop.callout}</Badge>
						<ul class="space-y-3">
							{#each prop.points as point (point)}
								<li class="flex items-start gap-3 text-sm text-ink-soft leading-[1.6]">
									<span class="w-1.5 h-1.5 rounded-full bg-accent mt-2 shrink-0" aria-hidden="true"></span>
									<span>{point}</span>
								</li>
							{/each}
						</ul>
					</div>
				{/each}
			</div>
		</section>

		<!-- Phoenix note -->
		<section class="my-16 md:my-20">
			<div class="border-t border-b border-rule py-8 md:py-12 text-center animate-fade-up">
				<p class="font-body text-base md:text-lg text-ink leading-[1.6] max-w-2xl mx-auto">
					<strong class="font-display font-semibold">Made in America:</strong> Designed, assembled, packaged, and shipped from Phoenix, Arizona.
				</p>
				<p class="editorial-byline text-xs mt-3 max-w-xl mx-auto">
					Hardware manufactured by partners with 8+ years building wearables.
				</p>
			</div>
		</section>

		<!-- Bottom CTA -->
		<section class="my-16 md:my-20 text-center">
			<Kicker label="ORDER" showRule={true} class="text-center" />
			<div class="inline-flex flex-col sm:flex-row items-center gap-4 sm:gap-10 px-8 sm:px-12 py-8 border border-ink animate-fade-up">
				<div class="flex flex-col items-center sm:items-start gap-1 text-center sm:text-left">
					<span class="editorial-mono text-xs text-ink-faint">Reserve for</span>
					<span class="font-display text-5xl sm:text-6xl font-bold text-ink">$10</span>
					<span class="editorial-byline text-xs">Ships at $160 &middot; Retail $200 &middot; No subscription</span>
				</div>
				<a
					href="https://getpulsyn.com"
					target="_blank"
					rel="noopener noreferrer"
					class="inline-flex items-center gap-2 px-8 py-4 bg-accent text-paper rounded-sm font-medium hover:bg-accent/90 transition-colors"
				>
					Reserve at getpulsyn.com <span aria-hidden="true">&rarr;</span>
				</a>
			</div>
		</section>
	</div>
</div>
