<script lang="ts">
	interface Props {
		reason: 'mobile' | 'webgl';
	}
	let { reason }: Props = $props();
</script>

<div class="museum-fallback" role="alert">
	<div class="museum-fallback__inner">
		<p class="museum-fallback__label">Notice</p>
		<h1 class="museum-fallback__title">
			{#if reason === 'mobile'}
				The museum requires<br />a desktop browser.
			{:else}
				WebGL 2.0 is required<br />to enter the museum.
			{/if}
		</h1>
		<p class="museum-fallback__desc">
			{#if reason === 'mobile'}
				First-person navigation needs a mouse and keyboard.<br />
				Visit on a desktop to experience the full museum.
			{:else}
				Your browser or device doesn't support WebGL 2.0.<br />
				Try Chrome, Firefox, or Edge on a modern machine.
			{/if}
		</p>
		<a class="museum-fallback__link" href="/classic">View classic portfolio →</a>
	</div>
</div>

<style>
	.museum-fallback {
		position: absolute;
		inset: 0;
		background: #080808;
		display: flex;
		align-items: center;
		justify-content: center;
		z-index: 200;
		font-family: 'Newsreader Variable', serif;
		color: #e8e0d0;
	}

	.museum-fallback__inner {
		max-width: 420px;
		padding: 0 2rem;
		text-align: center;
	}

	.museum-fallback__label {
		font-family: 'Geist Mono Variable', monospace;
		font-size: 0.65rem;
		letter-spacing: 0.25em;
		text-transform: uppercase;
		opacity: 0.35;
		margin: 0 0 1.25rem;
	}

	.museum-fallback__title {
		font-family: 'Fraunces Variable', serif;
		font-size: 2rem;
		font-weight: 700;
		letter-spacing: -0.03em;
		line-height: 1.15;
		margin: 0 0 1.25rem;
	}

	.museum-fallback__desc {
		font-size: 0.95rem;
		line-height: 1.65;
		opacity: 0.55;
		margin: 0 0 2rem;
	}

	.museum-fallback__link {
		font-family: 'Geist Mono Variable', monospace;
		font-size: 0.75rem;
		letter-spacing: 0.12em;
		text-transform: uppercase;
		color: #e8e0d0;
		text-decoration: none;
		border-bottom: 1px solid rgba(232, 224, 208, 0.4);
		padding-bottom: 0.1rem;
		transition: border-color 0.2s;
	}

	.museum-fallback__link:hover,
	.museum-fallback__link:focus-visible {
		border-color: #e8e0d0;
	}
</style>
