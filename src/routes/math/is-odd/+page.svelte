<script lang="ts">
	import { page } from '$app/stores';
	let data = "";
	let number = 0;
	async function get() {
		const res = await fetch(`/api/math/is-odd?number=${number}`);
		data = await res.json();
	}
</script>

<div>
	<h2>Is Odd</h2>
    <p>
        This is a simple API that returns whether a number is odd or not.
        <br>
        To use it, simply append a number to the end of the URL, and it will return either <code class="text-neutral-500">true</code> or <code class="text-neutral-500">false</code>.
    </p>
	<code class="api-route">{$page.url.origin}/api{$page.route.id}?number=</code>
	<input type="number" class="rounded-lg border p-3 w-20" bind:value={number} />
	<button class="rounded-lg border p-3" on:click={get}>Get</button>
	<pre class="min-h-32 max-w-96 border p-2">{data}</pre>
</div>
