<script lang="ts">
	import { Kicker, DropCap } from "$lib/components/editorial";

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

<section class="pt-12 md:pt-20 pb-16 md:pb-24 px-6">
	<div class="max-w-5xl mx-auto">
		<Kicker label="FEATURE  ·  PORTFOLIO  ·  ISSUE 04" showRule={true} />

		<div class="animate-fade-up">
			<p class="editorial-byline text-sm mb-6">
				By <span class="text-ink not-italic font-medium">James Hoffmann</span> &nbsp;·&nbsp; {age} y/o developer, sysadmin &amp; privacy advocate
			</p>

			<h1
				class="font-display text-4xl md:text-6xl lg:text-7xl font-semibold tracking-[-0.02em] text-ink leading-[1.05] max-w-4xl mb-10"
			>
				Building tools for privacy &amp; productivity.
			</h1>
		</div>

		<div class="md:columns-2 gap-10 max-w-4xl animate-fade-up delay-100">
			<DropCap>
				<p class="font-body text-lg md:text-xl leading-[1.6] text-ink-soft mb-4">
					Creating elegant, privacy-respecting software. From desktop environments to AI-powered tools, every project is built with attention to detail and a commitment to user sovereignty.
				</p>
			</DropCap>

			<p class="font-body text-base md:text-lg leading-[1.6] text-ink-soft">
				Currently building Pulsyn, a premium smart ring that makes health tracking accessible at half the cost. Previously, open-source tools for SEO analysis, multi-LLM council discussions, and a privacy-first Linux desktop environment.
			</p>
		</div>

		<div
			class="mt-12 flex flex-wrap items-center gap-x-8 gap-y-3 text-sm font-medium animate-fade-up delay-200"
		>
			<a href="/tools" class="editorial-link inline-flex items-center gap-2">
				View Projects <span aria-hidden="true">&rarr;</span>
			</a>
			<a
				href="https://github.com/hffmnnj"
				target="_blank"
				rel="noopener noreferrer"
				class="editorial-link inline-flex items-center gap-2 text-ink-soft hover:text-ink"
			>
				GitHub
			</a>
		</div>
	</div>
</section>
