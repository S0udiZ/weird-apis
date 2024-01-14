<script lang="ts">
	import '../app.pcss';
	import { ModeWatcher, setMode, resetMode } from 'mode-watcher';
	import { Button } from '$lib/components/ui/button';
	import * as DropdownMenu from '$lib/components/ui/dropdown-menu';
	import { Sun, Moon } from 'lucide-svelte';
	let terms: string[] = ['recent', 'popular', 'random'];
	let selectedTerm: string = 'recent';
	let newTerm: string = 'recent';

	function animateTerm(s: string) {
		if (s !== newTerm) {
			newTerm = s;
			const el:NodeListOf<HTMLSpanElement> = document.querySelectorAll('.selectedTermElement');
			if (el) {
				el.forEach((e) => {
					e.animate(
					[
						{
							transform: 'translateY(0)',
						},
						{
							transform: 'translateY(-100%)',
						}
					],
					{
						duration: 500,
						easing: 'ease-in-out',
						fill: 'none'
					}
				);
				});
				setTimeout(() => {
					selectedTerm = s;
				}, 250);
			}
		}
	}
</script>

<ModeWatcher />
<main class="h-dvh w-dvw overflow-hidden">
	<header
		class="flex h-32 w-full items-center justify-between rounded-br-[3rem] bg-foreground px-8"
	>
		<a href="/">
			<h1 class="text-5xl font-bold text-background">Weird API's</h1>
		</a>
		<DropdownMenu.Root>
			<DropdownMenu.Trigger asChild let:builder>
				<Button builders={[builder]} variant="outline" size="icon" class="relative size-14">
					<Sun class="size-1/2 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
					<Moon
						class="absolute size-1/2 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100"
					/>
					<span class="sr-only">Toggle theme</span>
				</Button>
			</DropdownMenu.Trigger>
			<DropdownMenu.Content align="end">
				<DropdownMenu.Item on:click={() => setMode('light')}>Light</DropdownMenu.Item>
				<DropdownMenu.Item on:click={() => setMode('dark')}>Dark</DropdownMenu.Item>
				<DropdownMenu.Item on:click={() => resetMode()}>System</DropdownMenu.Item>
			</DropdownMenu.Content>
		</DropdownMenu.Root>
	</header>
	<div class="relative h-full w-64 border-t-4 border-card bg-foreground">
		<div
			class="absolute -right-24 -top-1 size-24 border-t-4 border-card bg-foreground"
			aria-hidden="true"
		/>
		<div
			class="absolute -right-[calc(50%-8px)] -top-3 size-32 rounded-tl-[65px] border-l-8 border-t-8 border-foreground bg-background"
			aria-hidden="true"
		/>
		<div class="my-6">
			<h2 class="text-center text-xl font-extrabold text-background">
				Most
				<DropdownMenu.Root>
					<DropdownMenu.Trigger asChild let:builder>
						<Button
							builders={[builder]}
							class="w-fit h-5 overflow-hidden p-0 text-xl after:content-['_◀'] data-[state=open]:after:content-['_▼'] relative font-bold text-background rounded-none"
						>
							<span class="selectedTermElement"
								>{selectedTerm}</span
							>
							<span class="absolute -bottom-7 left-0 selectedTermElement">
								{newTerm}
							</span>
						</Button>
					</DropdownMenu.Trigger>
					<DropdownMenu.Content align="end">
						{#each terms as term}
							<DropdownMenu.Item on:click={() => animateTerm(term)}>{term}</DropdownMenu.Item>
						{/each}
					</DropdownMenu.Content>
				</DropdownMenu.Root>
				API's
			</h2>
			<ul class="text-center text-3xl text-background">
				<li>TODO</li>
			</ul>
		</div>
	</div>
	<slot />
</main>

<style>
	h1 {
		text-shadow: 0 0 0.5rem hsl(var(--background));
	}
	h1:hover {
		animation: textShadowRainbow 3s infinite;
	}

	@keyframes textShadowRainbow {
		0% {
			text-shadow: 0 0 0.5rem rgb(255, 0, 0);
		}
		10% {
			text-shadow: 0 0 0.5rem rgb(255, 128, 0);
		}
		20% {
			text-shadow: 0 0 0.5rem rgb(255, 255, 0);
		}
		30% {
			text-shadow: 0 0 0.5rem rgb(128, 255, 0);
		}
		40% {
			text-shadow: 0 0 0.5rem rgb(0, 255, 0);
		}
		50% {
			text-shadow: 0 0 0.5rem rgb(0, 255, 128);
		}
		60% {
			text-shadow: 0 0 0.5rem rgb(0, 255, 255);
		}
		70% {
			text-shadow: 0 0 0.5rem rgb(0, 128, 255);
		}
		80% {
			text-shadow: 0 0 0.5rem rgb(0, 0, 255);
		}
		90% {
			text-shadow: 0 0 0.5rem rgb(128, 0, 255);
		}
		100% {
			text-shadow: 0 0 0.5rem rgb(255, 0, 0);
		}
	}
</style>
