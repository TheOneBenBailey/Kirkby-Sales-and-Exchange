<script>
    import NavDraw from "$lib/header/NavDraw.svelte";
    /** @type {boolean} */
    export let open;
    export let logo;

    // /** @type {number} */
    let scrollY;
    $: scrolled = scrollY > 100;
</script>

<svelte:window bind:scrollY />

<NavDraw {logo} open={open}/>

<div class="fixed right-0 top-1 z-[103] w-20 h-14 pl-8 flex items-center lg:hidden">
    <button
            aria-label="nav"
            on:click={() => (open = !open)}
            class="flex h-6 w-6 cursor-pointer items-center"
    >
        <div class="space-y-1 text-white">
            <span class="hamburger-item {open ? 'translate-y-[4px] rotate-45' : ''}"></span>
            <span class="hamburger-item {open ? '!h-0' : ''}"></span>
            <span class="hamburger-item {open ? '-translate-y-[3px] -rotate-45' : ''}"></span>
        </div>
    </button>
</div>

<div class="flex items-center p-4 lg:hidden fixed z-[100] bg-gradient-to-b from-black w-full" class:scrolled>
    <a href="/">
        <img src={logo} alt="DTD LIve" class="object-cover max-h-12 shadowed" />
    </a>
</div>

<style lang="postcss">
    .hamburger-item {
        @apply block h-[3px] w-6 origin-center rounded-full transition-transform ease-in-out bg-white;
    }

    .scrolled {
        @apply bg-gradient-to-tr from-kse-dark/75 to-kse-light/75 shadow-lg backdrop-blur-md border-none duration-200;
    }
</style>