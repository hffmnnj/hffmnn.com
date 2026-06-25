<script lang="ts">
	interface Props {
		/** Loading progress, 0–100. */
		progress: number;
		/** Called once the tear-open animation has finished. */
		onComplete: () => void;
	}

	let { progress, onComplete }: Props = $props();

	let phase: 'loading' | 'tearing' | 'done' = $state('loading');
	let tearStarted = $state(false);

	// Trigger the tear once progress reaches 100. Guard with tearStarted so
	// the effect can't re-enter if progress is re-assigned 100 repeatedly.
	$effect(() => {
		if (progress >= 100 && phase === 'loading' && !tearStarted) {
			tearStarted = true;
			phase = 'tearing';
			const timer = setTimeout(() => {
				phase = 'done';
				onComplete();
			}, 1000); // matches the slide transition duration + a beat
			return () => clearTimeout(timer);
		}
	});

	const year = new Date().getFullYear();
	const clamped = $derived(Math.max(0, Math.min(100, progress)));
</script>

{#if phase !== 'done'}
	<div
		class="loading-screen"
		class:tearing={phase === 'tearing'}
		role="status"
		aria-live="polite"
		aria-label={clamped < 100
			? `Loading the Museum of James, ${Math.round(clamped)} percent`
			: 'Collection ready'}
	>
		<div class="ticket">
			<div class="ticket__top" class:slide-up={phase === 'tearing'}>
				<div class="ticket__stub">No. {year}</div>
				<div class="ticket__venue">The Museum<br />of James</div>
				<div class="ticket__admission">General Admission</div>
			</div>

			<div class="ticket__perforation" aria-hidden="true">
				<span class="ticket__notch ticket__notch--left"></span>
				<span class="ticket__perf-line"></span>
				<span class="ticket__scissors">&#9986;</span>
				<span class="ticket__perf-line"></span>
				<span class="ticket__notch ticket__notch--right"></span>
			</div>

			<div class="ticket__bottom" class:slide-down={phase === 'tearing'}>
				<div class="ticket__progress-bar">
					<div class="ticket__progress-fill" style="width: {clamped}%"></div>
				</div>
				<div class="ticket__status">
					{#if clamped < 100}
						Loading collection&hellip; {Math.round(clamped)}%
					{:else}
						Collection ready
					{/if}
				</div>
				<div class="ticket__date">Est. {year} &middot; Admit One</div>
			</div>
		</div>
	</div>
{/if}

<style>
	.loading-screen {
		position: absolute;
		inset: 0;
		background: #080808;
		display: flex;
		align-items: center;
		justify-content: center;
		z-index: 100;
		transition: opacity 0.5s ease 0.4s;
	}

	/* The frame behind the ticket fades as the halves separate so the
	   canvas underneath is revealed cleanly. */
	.loading-screen.tearing {
		opacity: 0;
		pointer-events: none;
	}

	.ticket {
		width: 340px;
		max-width: calc(100vw - 3rem);
		background: #f5f0e8;
		color: #1a1a1a;
		/* No clip on the container so the two halves can slide free of it. */
		filter: drop-shadow(0 0 60px rgba(255, 240, 200, 0.1));
	}

	.ticket__top {
		padding: 2.25rem 2rem 1.5rem;
		text-align: center;
		background: #f5f0e8;
		transition: transform 0.9s cubic-bezier(0.45, 0, 0.15, 1);
	}

	.ticket__top.slide-up {
		transform: translateY(-130%);
	}

	.ticket__stub {
		font-family: 'Geist Mono Variable', monospace;
		font-size: 0.58rem;
		letter-spacing: 0.22em;
		text-transform: uppercase;
		opacity: 0.4;
		margin-bottom: 1.1rem;
	}

	.ticket__venue {
		font-family: 'Fraunces Variable', serif;
		font-size: 1.85rem;
		font-weight: 600;
		letter-spacing: -0.03em;
		line-height: 1;
		margin-bottom: 0.85rem;
	}

	.ticket__admission {
		font-family: 'Geist Mono Variable', monospace;
		font-size: 0.62rem;
		letter-spacing: 0.28em;
		text-transform: uppercase;
		opacity: 0.5;
	}

	.ticket__perforation {
		display: flex;
		align-items: center;
		gap: 0.5rem;
		padding: 0 0.25rem;
		position: relative;
		/* Sits between the two halves; pinned to neither so it disappears
		   visually behind them during the tear. */
		height: 0;
		overflow: visible;
		z-index: 0;
	}

	.ticket__perf-line {
		flex: 1;
		border-top: 2px dashed rgba(26, 26, 26, 0.28);
	}

	.ticket__scissors {
		font-size: 0.85rem;
		opacity: 0.45;
		line-height: 1;
	}

	/* Semicircular notches punched into the ticket edges at the perforation,
	   the classic torn-ticket silhouette. */
	.ticket__notch {
		width: 14px;
		height: 14px;
		border-radius: 50%;
		background: #080808;
		flex-shrink: 0;
	}

	.ticket__notch--left {
		margin-left: -7px;
	}

	.ticket__notch--right {
		margin-right: -7px;
	}

	.ticket__bottom {
		position: relative;
		z-index: 1;
		padding: 1.75rem 2rem 2.25rem;
		background: #f5f0e8;
		transition: transform 0.9s cubic-bezier(0.45, 0, 0.15, 1);
	}

	.ticket__bottom.slide-down {
		transform: translateY(130%);
	}

	.ticket__progress-bar {
		height: 2px;
		background: rgba(26, 26, 26, 0.15);
		margin-bottom: 1rem;
		overflow: hidden;
	}

	.ticket__progress-fill {
		height: 100%;
		background: #1a1a1a;
		transition: width 0.3s ease;
	}

	.ticket__status {
		font-family: 'Geist Mono Variable', monospace;
		font-size: 0.62rem;
		letter-spacing: 0.12em;
		opacity: 0.55;
		text-align: center;
		text-transform: uppercase;
		margin-bottom: 0.9rem;
	}

	.ticket__date {
		font-family: 'Geist Mono Variable', monospace;
		font-size: 0.55rem;
		letter-spacing: 0.18em;
		text-transform: uppercase;
		opacity: 0.35;
		text-align: center;
	}

	@media (prefers-reduced-motion: reduce) {
		.loading-screen,
		.ticket__top,
		.ticket__bottom,
		.ticket__progress-fill {
			transition-duration: 0.01ms;
		}
	}
</style>
