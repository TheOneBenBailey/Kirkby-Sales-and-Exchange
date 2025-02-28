<script>
    import '../app.css';
    import Header from "$lib/header/Header.svelte";
    let openNav = false;
    import {page} from "$app/stores";
</script>

<main>
    <Header bind:open={openNav} />
    <slot />
</main>