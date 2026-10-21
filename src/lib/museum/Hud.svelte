<script lang="ts">
	import type { RoomId } from '$lib/museum/types.js';

	interface Props {
		roomLabel: string;
		keyCount: number; // 0-5
		hasAllKeys: boolean;
		currentRoom?: RoomId | null; // kept for potential future use
	}

	let { roomLabel, keyCount, hasAllKeys }: Props = $props();
</script>

<div class="hud" aria-hidden="true">
	<!-- Room label: top-left -->
	<div class="hud__room">
		{#if roomLabel}
			{#key roomLabel}
				<span class="hud__room-label">{roomLabel}</span>
			{/key}
		{/if}
	</div>

	<!-- Center crosshair -->
	<div class="hud__crosshair">
		<div class="hud__dot"></div>
	</div>

	<!-- Key ring: bottom-left -->
	<div class="hud__keys" title="{keyCount}/5 keys collected">
		{#each { length: 5 } as _, i (i)}
			<div
				class="hud__key"
				class:hud__key--collected={i < keyCount}
				class:hud__key--final={hasAllKeys && i === 4}
			></div>
		{/each}
		<span class="hud__keys-label">
			{#if hasAllKeys}
				All keys found
			{:else}
				{keyCount}/5 keys
			{/if}
		</span>
	</div>
</div>

<style>
	.hud {
		position: absolute;
		inset: 0;
		pointer-events: none;
		z-index: 10;
	}

	/* Room label — top-left */
	.hud__room {
		position: absolute;
		top: 1.5rem;
		left: 1.75rem;
	}

	.hud__room-label {
		display: inline-block;
		font-family: 'Geist Mono Variable', monospace;
		font-size: 0.65rem;
		letter-spacing: 0.18em;
		text-transform: uppercase;
		color: rgba(232, 224, 208, 0.45);
		animation: fadeIn 0.4s ease;
	}

	/* Crosshair — dead center */
	.hud__crosshair {
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
	}

	.hud__dot {
		width: 4px;
		height: 4px;
		background: rgba(232, 224, 208, 0.6);
		border-radius: 50%;
		box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.4);
	}

	/* Key ring — bottom-left */
	.hud__keys {
		position: absolute;
		bottom: 1.75rem;
		left: 1.75rem;
		display: flex;
		align-items: center;
		gap: 0.5rem;
	}

	.hud__key {
		width: 8px;
		height: 8px;
		border-radius: 50%;
		border: 1px solid rgba(180, 140, 255, 0.4);
		background: transparent;
		transition:
			background 0.3s,
			border-color 0.3s,
			box-shadow 0.3s;
	}

	.hud__key--collected {
		background: rgba(180, 140, 255, 0.7);
		border-color: rgba(180, 140, 255, 0.8);
		box-shadow: 0 0 6px rgba(180, 140, 255, 0.4);
	}

	.hud__key--final {
		background: rgba(255, 200, 100, 0.9);
		border-color: rgba(255, 200, 100, 1);
		box-shadow: 0 0 10px rgba(255, 200, 100, 0.6);
		animation: pulse 1.5s ease-in-out infinite;
	}

	.hud__keys-label {
		font-family: 'Geist Mono Variable', monospace;
		font-size: 0.6rem;
		letter-spacing: 0.12em;
		color: rgba(232, 224, 208, 0.35);
		margin-left: 0.25rem;
	}

	@keyframes fadeIn {
		from {
			opacity: 0;
			transform: translateY(-4px);
		}
		to {
			opacity: 1;
			transform: translateY(0);
		}
	}

	@keyframes pulse {
		0%,
		100% {
			box-shadow: 0 0 10px rgba(255, 200, 100, 0.6);
		}
		50% {
			box-shadow: 0 0 18px rgba(255, 200, 100, 0.9);
		}
	}

	@media (prefers-reduced-motion: reduce) {
		.hud__room-label {
			animation: none;
		}
		.hud__key--final {
			animation: none;
		}
	}
</style>
