<script>
	import "../app.css";
	import favicon from '$lib/assets/favicon.svg';

	let { children } = $props();
</script>

<svelte:head>
	<title>JSON Builder</title>
	<link rel="icon" href="{favicon}" />
	<meta name="description" content="A powerful JSON object builder with live preview" />
</svelte:head>

<svelte:element this={"html"} class="dark">
	<div class="min-h-screen bg-gray-900 text-white">
		{@render children?.()}
	</div>
</svelte:element>
