<script>
    import { page } from "$app/stores";
    import logo from "$lib/images/logos/logo-light.svg";
    import MobileHeader from "$lib/header/MobileHeader.svelte";

    /** @type {boolean} */
    export let open;

    /** @type { Array<NavItem> }*/
    // /** @type {number} */
    let scrollY;
    $: scrolled = scrollY > 100;
    $: scrolledLogo = scrollY > 100;

    let currentPage = $page.route.id;

</script>

<svelte:window bind:scrollY />

<header>
    <MobileHeader bind:open {logo} />

<nav class="fixed lg:flex z-50 w-full h-[100px] md:h-[135px] flex items-center duration-200 hidden font-500 shadowed bg-gradient-to-b from-mpp-dark/75" class:scrolled>
    <div class="flex md:gap-10 h-full m-auto uppercase text-white">
        <div class="h-full flex items-center pl-5 pr-5">
            <a data-dropdown-delay=150 target="_self" class="menuItem {currentPage === '/(pages)/schedule' ? 'text-yellow-400 font-bold' : ''}" href="/schedule">Schedule</a>
            <a data-dropdown-delay=150 target="_self" class="menuItem {currentPage === '/(pages)/qualify-online' ? 'text-yellow-400 font-bold' : ''}" href="/qualify-online">Qualify Online</a>
        </div>
        <div class="my-auto"><a href="../.." target="_self"><img src="{logo}" class="h-[60px] md:h-[80px] duration-200" class:scrolledLogo alt="DTD Live"></a></div>
        <div class="h-full flex items-center pl-5 pr-5">
            <a data-dropdown-delay=150 target="_self" class="menuItem {currentPage === '/(pages)/your-stay' ? 'text-yellow-400 font-bold' : ''}" href="/your-stay">Your Stay</a>
            <a data-dropdown-delay=150 target="_self" class="menuItem {currentPage === '/(pages)/promotions' ? 'text-yellow-400 font-bold' : ''}" href="/promotions">Promotions</a>
        </div>
    </div>
</nav>
</header>

<style lang="postcss">
    .scrolled {
        @apply bg-gradient-to-b from-mpp-dark/75 to-mpp-light/75 shadow-lg backdrop-blur-md border-none duration-200 h-[80px] md:h-[100px];
    }

    .scrolledLogo {
        @apply h-[30px] md:h-[50px];
    }

    .menuItem {
        @apply px-5 border-b-2 border-transparent;
    }

    .menuItem:hover {
        @apply border-b-2 border-white duration-200;
    }
</style>