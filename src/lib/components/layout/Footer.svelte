<script lang="ts">
	import SocialLinks from "./SocialLinks.svelte";
</script>

<footer class="border-t border-white/5 py-12 mt-auto">
	<div class="max-w-6xl mx-auto px-6">
		<div class="flex flex-col md:flex-row items-center justify-between gap-6">
			<div class="flex flex-col items-center md:items-start gap-2">
				<span class="font-display text-lg font-semibold">hffmnn</span>
				<span class="text-sm text-muted-foreground">
					Building privacy-focused tools
				</span>
			</div>

			<SocialLinks />

			<div class="text-sm text-muted-foreground">
				&copy; {new Date().getFullYear()} hffmnn. All rights reserved.
			</div>
		</div>
	</div>
</footer>
