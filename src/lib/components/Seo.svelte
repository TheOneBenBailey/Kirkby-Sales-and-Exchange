<script>
    import ogImageFile from "$lib/images/og.jpg";
    export let title = "Kirkby Sales and Exchange";
    export let description = "MPP returns to the sandy beaches of Cyprus in 2025, taking place at the all-inclusive 5* Merit Royal Diamond Hotel and Spa.";
    export let ogImage = ogImageFile;
    export let url = "https://kirkbysalesandexchange.com/";
    export let type = "website"; // Can be "article", "website", etc.
</script>

<svelte:head>
    <title>{title}</title>
    <meta name="description" content={description} />
    <meta property="og:title" content={title} />
    <meta property="og:description" content={description} />
    <meta property="og:image" content={ogImage} />
    <meta property="og:image:width" content="1200" />
    <meta property="og:image:height" content="630" />
    <meta property="og:type" content={type} />
    <meta property="og:url" content={url} />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content={title} />
    <meta name="twitter:description" content={description} />
    <meta name="twitter:image" content={ogImage} />
</svelte:head>
