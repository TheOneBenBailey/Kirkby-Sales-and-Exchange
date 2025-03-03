<script>
    import {page} from "$app/stores";

    export let logo;

    /** @type {boolean} */
    export let open;

    let currentPage = $page.route.id;

</script>

<div class:!translate-x-0={open} class="w-full h-screen lg:hidden fixed top-0 left-0 z-[102] flex bg-slate-700 text-white flex translate-x-full transition-transform ease-in-out bg-gradient-to-r from-kse-dark to-kse-light">
    <div class="bg-gradient-to-t from-kse-darker to-kse-light w-4"></div>
    <div class="py-5 px-10 flex-1 uppercase tracking-wide text-2xl gap-10 flex flex-col font-bold">
        <img src="{logo}" class="max-h-12 mb-5 mr-auto">
        <a class="mb-2 block {currentPage === '/(pages)/' ? 'text-yellow-400' : ''}" href="./schedule" target="_self">{currentPage === '/(pages)/' ? '⇨ ' : ''}Home</a>
        <a class="mb-2 block {currentPage === '/(pages)/about' ? 'text-yellow-400' : ''}" href="./#qualify-online" target="_self">{currentPage === '/(pages)/about' ? '⇨ ' : ''}About</a>
        <a class="mb-2 block {currentPage === '/(pages)/events' ? 'text-yellow-400' : ''}" href="./your-stay" target="_self">{currentPage === '/(pages)/events' ? '⇨ ' : ''}Events</a>
        <a class="mb-2 block {currentPage === '/(pages)/contact' ? 'text-yellow-400' : ''}" href="./promotions" target="_self">{currentPage === '/(pages)/contact' ? '⇨ ' : ''}Contact Us</a>
    </div>

</div>