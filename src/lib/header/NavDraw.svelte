<script>
    import {page} from "$app/stores";

    export let logo;

    /** @type {boolean} */
    export let open;

    let currentPage = $page.route.id;

</script>

<div class:!translate-x-0={open} class="w-full h-screen lg:hidden fixed top-0 left-0 z-[102] flex bg-slare-700 text-white flex translate-x-full transition-transform ease-in-out bg-gradient-to-r from-mpp-dark to-mpp-light">
    <div class="bg-gradient-to-t from-blue-700 via-blue-400' to-blue-400 w-4"></div>
    <div class="py-5 px-10 flex-1 uppercase tracking-wide text-2xl gap-10 flex flex-col font-bold">
        <img src="{logo}" class="max-h-12 mb-5 mr-auto">
        <a class="mb-2 block {currentPage === '/(pages)/schedule' ? 'text-yellow-400' : ''}" href="./schedule" target="_self">{currentPage === '/(pages)/schedule' ? '⇨ ' : ''}Schedule</a>
        <a class="mb-2 block {currentPage === '/(pages)/qualify-online' ? 'text-yellow-400' : ''}" href="#qualify-online" target="_self">{currentPage === '/(pages)/qualify-online' ? '⇨ ' : ''}Qualify Online</a>
        <a class="mb-2 block {currentPage === '/(pages)/your-stay' ? 'text-yellow-400' : ''}" href="./your-stay" target="_self">{currentPage === '/(pages)/your-stay' ? '⇨ ' : ''}Your stay</a>
        <a class="mb-2 block {currentPage === '/(pages)/promotions' ? 'text-yellow-400' : ''}" href="./promotions" target="_self">{currentPage === '/(pages)/promotions' ? '⇨ ' : ''}Promotions</a>
    </div>

</div>