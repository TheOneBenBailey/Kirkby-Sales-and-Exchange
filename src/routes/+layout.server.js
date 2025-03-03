/** @type {import('../../../../../.svelte-kit/types/src/routes').LayoutLoad} */
export async function load({ params, fetch }) {
    return {
        data: {
            slug: `${params.slug}`
        }
    };
}
