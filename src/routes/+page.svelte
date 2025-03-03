<script>
    import Seo from "$lib/components/Seo.svelte";

    export let data;

    const pageTitle = "Kirkby Sales and Exchange";
    const pageDescription = "MPP returns to the sandy beaches of Cyprus in 2025, taking place at the all-inclusive 5* Merit Royal Diamond Hotel and Spa.";
    const currentUrl = "https://https://medpokerparty.com/" + data.slug;
</script>

<svelte:head>
    <title>{pageTitle}</title>
</svelte:head>

<Seo {pageTitle} {pageDescription} url={currentUrl} type="article" />

HOME