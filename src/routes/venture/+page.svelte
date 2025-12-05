<script lang="ts">
	import { Badge } from "$lib/components/ui/badge";
	import { Button } from "$lib/components/ui/button";
	import { HugeiconsIcon } from "@hugeicons/svelte";
	import {
		ArrowRight01Icon,
		Award01Icon,
		LockIcon,
		FlashIcon,
		WaterEnergyIcon,
		Analytics01Icon,
		HeartCheckIcon,
		DollarCircleIcon,
		Shield01Icon,
		Tick01Icon
	} from "@hugeicons/core-free-icons";

	const features = [
		{
			icon: Award01Icon,
			title: "Premium Quality",
			description: "Titanium construction with medical-grade materials for all-day comfort"
		},
		{
			icon: FlashIcon,
			title: "Up to 60-Day Battery",
			description: "Up to 60-day battery with charging case (7 days per charge)"
		},
		{
			icon: WaterEnergyIcon,
			title: "5ATM Waterproofing",
			description: "Swim, shower, and sweat worry-free with full water resistance"
		},
		{
			icon: LockIcon,
			title: "Encrypted & Private",
			description: "Your health data stays secure with end-to-end encryption"
		},
		{
			icon: Analytics01Icon,
			title: "Clinical-Grade Sensors",
			description: "Advanced optical sensors deliver medical-grade accuracy"
		},
		{
			icon: HeartCheckIcon,
			title: "1-Year Warranty",
			description: "Free 1-year warranty on all pre-orders, backed by our guarantee"
		}
	];

	const valueProps = [
		{
			icon: DollarCircleIcon,
			title: "Fair Pricing",
			callout: "Early Bird: $149",
			points: [
				"Save $200+ vs $349-499 competitors",
				"No subscription required for core features",
				"Everything competitors offer without monthly fees"
			]
		},
		{
			icon: LockIcon,
			title: "Privacy First",
			callout: "Finland-Hosted",
			points: [
				"No government partnerships or defense contractors",
				"Your data is never sold or shared with third parties",
				"World-class EU privacy laws with GDPR protection"
			]
		},
		{
			icon: Shield01Icon,
			title: "Full Control",
			callout: "Founder-Owned",
			points: [
				"Direct decision-making, no intermediaries",
				"Bootstrapped and user-funded",
				"No insurance company data sharing"
			]
		}
	];
</script>

<svelte:head>
	<title>Venture - Pulsyn Smart Ring | hffmnn</title>
	<meta name="description" content="Pulsyn - Building a premium smart ring that makes health tracking accessible. Clinical-grade sensors at half the price." />

	<!-- Open Graph -->
	<meta property="og:title" content="Pulsyn Smart Ring | hffmnn" />
	<meta property="og:description" content="Building a premium smart ring that makes health tracking accessible. Clinical-grade sensors at half the price." />
	<meta property="og:url" content="https://hffmnn.com/venture" />

	<!-- Twitter -->
	<meta name="twitter:title" content="Pulsyn Smart Ring | hffmnn" />
	<meta name="twitter:description" content="Premium smart ring with clinical-grade sensors at half the price." />
</svelte:head>

<div class="pt-24 pb-16 px-6">
	<div class="max-w-5xl mx-auto">
		<div class="text-center mb-16 animate-fade-up">
			<Badge variant="secondary" class="bg-pulsyn/10 border-pulsyn/20 text-pulsyn mb-6">
				Current Venture
			</Badge>
			<h1 class="font-display text-4xl md:text-6xl font-bold mb-6">
				Pulsyn
			</h1>
			<p class="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto mb-4">
				Premium Smart Ring. Half the Price.
			</p>
			<p class="text-muted-foreground max-w-2xl mx-auto mb-8">
				Track sleep, fitness, and recovery with clinical-grade sensors for $149 — save $200+ vs. Oura Ring.
				All essential health tracking included free forever.
			</p>
			<div class="flex flex-wrap justify-center gap-4 mb-12">
				<Button
					href="https://getpulsyn.com"
					target="_blank"
					rel="noopener noreferrer"
					class="glass-button px-6 py-3 rounded-xl h-auto"
				>
					Visit getpulsyn.com
					<HugeiconsIcon icon={ArrowRight01Icon} size={16} class="ml-2" />
				</Button>
				<Button
					href="https://getpulsyn.com/pricing"
					target="_blank"
					rel="noopener noreferrer"
					variant="ghost"
					class="text-pulsyn hover:opacity-80 h-auto px-6 py-3"
				>
					Pre-order for $149
				</Button>
			</div>

			<div class="flex justify-center animate-fade-scale delay-200">
				<picture>
					<source srcset="/images/rings1.webp" type="image/webp" />
					<img
						src="/images/rings1.png"
						alt="Pulsyn Smart Ring - Available in Gold, Black, and Silver"
						class="w-full max-w-lg h-auto drop-shadow-2xl"
						width="512"
						height="512"
					/>
				</picture>
			</div>
		</div>

		<!-- Features Grid -->
		<section class="mb-20">
			<h2 class="font-display text-2xl md:text-3xl font-bold text-center mb-4 animate-fade-up">
				Built for Precision
			</h2>
			<p class="text-muted-foreground text-center mb-12 max-w-2xl mx-auto animate-fade-up delay-100">
				Every detail engineered for accuracy, durability, and comfort.
			</p>
			<div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
				{#each features as feature, i}
					<div class="glass-card p-6 animate-fade-up" style="animation-delay: {(i + 2) * 100}ms">
						<div class="w-12 h-12 rounded-xl bg-pulsyn/10 border border-pulsyn/20 flex items-center justify-center mb-4">
							<HugeiconsIcon icon={feature.icon} size={24} class="text-pulsyn" />
						</div>
						<h3 class="font-display text-lg font-semibold mb-2">{feature.title}</h3>
						<p class="text-sm text-muted-foreground">{feature.description}</p>
					</div>
				{/each}
			</div>
		</section>

		<!-- Why Pulsyn -->
		<section class="mb-20">
			<h2 class="font-display text-2xl md:text-3xl font-bold text-center mb-4 animate-fade-up">
				Why Choose Pulsyn?
			</h2>
			<p class="text-muted-foreground text-center mb-12 max-w-2xl mx-auto animate-fade-up delay-100">
				From founders frustrated by $400+ smart rings and privacy concerns.
			</p>
			<div class="grid md:grid-cols-3 gap-6">
				{#each valueProps as prop, i}
					<div class="glass-card p-8 animate-fade-up" style="animation-delay: {(i + 2) * 100}ms">
						<div class="w-14 h-14 rounded-xl bg-white/5 flex items-center justify-center mb-4">
							<HugeiconsIcon icon={prop.icon} size={28} class="text-white/70" />
						</div>
						<h3 class="font-display text-xl font-semibold mb-2">{prop.title}</h3>
						<Badge variant="secondary" class="bg-pulsyn/10 border-pulsyn/20 text-pulsyn mb-4">
							{prop.callout}
						</Badge>
						<ul class="space-y-3">
							{#each prop.points as point}
								<li class="flex items-start gap-2 text-sm text-muted-foreground">
									<HugeiconsIcon icon={Tick01Icon} size={16} class="text-pulsyn mt-0.5 shrink-0" />
									<span>{point}</span>
								</li>
							{/each}
						</ul>
					</div>
				{/each}
			</div>
		</section>

		<!-- Phoenix Note -->
		<section class="mb-16">
			<div class="glass-card p-8 text-center animate-fade-up">
				<p class="text-muted-foreground">
					<strong class="text-white">Made in America:</strong> Designed, assembled, packaged, and shipped from Phoenix, Arizona.
				</p>
				<p class="text-xs text-muted-foreground/60 mt-3">
					Ring hardware crafted by expert manufacturing partners with 8+ years of wearable technology expertise.
				</p>
			</div>
		</section>

		<section class="text-center">
			<div class="inline-flex flex-col items-center gap-6 p-8 glass-card animate-fade-scale">
				<div class="flex flex-col items-center gap-2">
					<span class="text-sm text-pulsyn font-medium">Starting at</span>
					<span class="font-display text-5xl font-bold text-white">$149</span>
					<span class="text-xs text-muted-foreground">No subscription required</span>
				</div>
				<Button
					href="https://getpulsyn.com/pricing"
					target="_blank"
					rel="noopener noreferrer"
					class="px-8 py-4 rounded-xl bg-pulsyn/15 border border-pulsyn/30 text-pulsyn font-medium hover:bg-pulsyn/25 hover:border-pulsyn/50 transition-all duration-300 h-auto"
				>
					Pre-order Now
					<HugeiconsIcon icon={ArrowRight01Icon} size={16} class="ml-2" />
				</Button>
			</div>
		</section>
	</div>
</div>
