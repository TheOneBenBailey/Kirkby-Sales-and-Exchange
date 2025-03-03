<script>
	import '../app.css';
    import Header from "$lib/header/Header.svelte";
    import Footer from "$lib/footer/Footer.svelte";
    let openNav = false;
    import {page} from "$app/stores";
</script>

<main>
    <Header bind:open={openNav} />
    <slot />
    <Footer />
</main>