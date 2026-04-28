<script lang="ts">
	import SocialLinks from "./SocialLinks.svelte";

	const year = new Date().getFullYear();
</script>

<footer class="border-t-2 border-ink mt-24 bg-paper">
	<div class="max-w-2xl mx-auto px-6 py-16 md:py-24 text-center">
		<!-- Ornamental top rule -->
		<div class="ornament-break mb-10" aria-hidden="true">
			<span class="editorial-mono text-xs text-ink-faint" style="letter-spacing: 0.2em;"
				>&#10022;</span
			>
		</div>

		<!-- Colophon label -->
		<p class="editorial-mono text-xs text-ink-faint mb-4" style="letter-spacing: 0.2em;">
			COLOPHON &nbsp;&middot;&nbsp; VOL. I &nbsp;&middot;&nbsp; ISSUE 04
		</p>

		<!-- Large nameplate -->
		<a
			href="/"
			class="block font-display fraunces-hover text-6xl md:text-8xl font-bold tracking-[-0.03em] text-ink hover:text-accent transition-colors leading-none mb-8"
		>
			hffmnn
		</a>

		<!-- Dotted ornamental rule -->
		<div class="ornament-break mb-8" aria-hidden="true">
			<span class="editorial-mono text-xs text-ink-faint" style="letter-spacing: 0.2em;"
				>&#10022;</span
			>
		</div>

		<!-- Type credits -->
		<p class="editorial-byline text-sm text-ink-soft mb-2">
			Typeset in Fraunces and Newsreader. Shipped with SvelteKit. Written by hand from the desert.
		</p>
		<p
			class="editorial-mono text-xs text-ink-faint mb-10"
			style="letter-spacing: 0.1em;"
		>
			PHOENIX, ARIZONA &nbsp;&middot;&nbsp; &copy; {year} HFFMNN
		</p>

		<!-- Social links -->
		<SocialLinks class="justify-center" />
	</div>
</footer>
