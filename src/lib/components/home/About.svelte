<script lang="ts">
	import { Kicker } from "$lib/components/editorial";
</script>

<section class="py-16 md:py-20 px-6 border-t border-rule">
	<div class="max-w-6xl mx-auto">
		<Kicker label="ABOUT" showRule={true} />

		<h2 class="font-display text-3xl md:text-4xl font-semibold tracking-[-0.01em] text-ink mb-10 animate-fade-up">
			About Me
		</h2>

		<div class="grid md:grid-cols-3 md:divide-x md:divide-rule animate-fade-up delay-100">
			<div class="md:px-8 md:first:pl-0 mb-8 md:mb-0">
				<h3 class="font-display text-xl md:text-2xl font-semibold text-ink mb-3">
					Privacy First
				</h3>
				<p class="font-body text-base text-ink-soft leading-[1.6]">
					Every tool I build starts with privacy as a core principle, not an afterthought.
				</p>
			</div>

			<div class="md:px-8 mb-8 md:mb-0">
				<h3 class="font-display text-xl md:text-2xl font-semibold text-ink mb-3">
					Open Source
				</h3>
				<p class="font-body text-base text-ink-soft leading-[1.6]">
					Transparency and collaboration drive better software. All my projects are open source.
				</p>
			</div>

			<div class="md:px-8 md:last:pr-0">
				<h3 class="font-display text-xl md:text-2xl font-semibold text-ink mb-3">
					Delightful UX
				</h3>
				<p class="font-body text-base text-ink-soft leading-[1.6]">
					Software should be beautiful and functional. Great design enhances productivity.
				</p>
			</div>
		</div>
	</div>
</section>
