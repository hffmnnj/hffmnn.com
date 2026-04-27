<script lang="ts">
	import SocialLinks from "./SocialLinks.svelte";

	const currentYear = new Date().getFullYear();
</script>

<footer class="border-t border-rule-strong mt-24 py-12 bg-paper">
	<div class="max-w-6xl mx-auto px-6">
		<div class="grid md:grid-cols-3 gap-8 text-sm items-start">
			<div class="md:col-span-2 space-y-2">
				<p class="editorial-byline">
					Set in Fraunces and Newsreader. Pressed in Phoenix.
				</p>
				<p class="editorial-mono text-xs text-ink-faint">
					&copy; {currentYear} hffmnn. All rights reserved.
				</p>
			</div>

			<SocialLinks class="flex md:justify-end gap-6" />
		</div>
	</div>
</footer>
