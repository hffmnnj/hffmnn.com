<script lang="ts">
	import { Kicker, DropCap } from "$lib/components/editorial";
</script>

<section
	id="about-section"
	class="section-counter py-20 md:py-28 px-6 border-t border-rule"
	data-n="02"
>
	<div class="max-w-6xl mx-auto">
		<Kicker label="ABOUT" showRule={true} />

		<div class="grid md:grid-cols-12 gap-10 md:gap-16 mt-10">
			<!-- Left: lede + pull quote (7 cols) -->
			<div class="md:col-span-7 animate-fade-up">
				<DropCap>
					<p
						class="font-body text-xl md:text-2xl leading-[1.55] text-ink mb-8"
						style="text-wrap: pretty;"
					>
						I build software that starts with privacy and ends with delight. Every tool is a small act of resistance against surveillance capitalism.
					</p>
				</DropCap>

				<blockquote class="pullquote">
					<p>Software should respect the person using it &mdash; full stop.</p>
				</blockquote>

				<p class="font-body text-base text-ink-soft leading-[1.65] mt-6">
					Open source, always. The code is available, the decisions are auditable, and the direction is user-funded.
				</p>
			</div>

			<!-- Right: three sub-briefs (5 cols) -->
			<div class="md:col-span-5 animate-fade-up delay-200 flex flex-col gap-8 md:gap-10">
				<div class="border-l-2 border-accent pl-5">
					<h3 class="font-display fraunces-hover text-xl md:text-2xl font-semibold text-ink mb-3">
						Privacy First
					</h3>
					<p class="font-body text-sm md:text-base text-ink-soft leading-[1.65]">
						Every tool I build starts with privacy as a core principle, not an afterthought.
					</p>
				</div>

				<div class="border-l-2 border-rule pl-5">
					<h3 class="font-display fraunces-hover text-xl md:text-2xl font-semibold text-ink mb-3">
						Open Source
					</h3>
					<p class="font-body text-sm md:text-base text-ink-soft leading-[1.65]">
						Transparency and collaboration drive better software. All my projects are open source.
					</p>
				</div>

				<div class="border-l-2 border-rule pl-5">
					<h3 class="font-display fraunces-hover text-xl md:text-2xl font-semibold text-ink mb-3">
						Delightful UX
					</h3>
					<p class="font-body text-sm md:text-base text-ink-soft leading-[1.65]">
						Software should be beautiful and functional. Great design enhances productivity.
					</p>
				</div>
			</div>
		</div>
	</div>
</section>
