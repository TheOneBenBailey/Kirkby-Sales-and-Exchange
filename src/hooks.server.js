export async function handle({ event, resolve }) {
    const host = event.url.host;

    // Check if the request is coming from www.DOMAIN.COM
    if (host.startsWith('www.')) {
        const newHost = host.replace('www.', '');
        return new Response(null, {
            status: 308, // Permanent redirect
            headers: { Location: `https://${newHost}${event.url.pathname}${event.url.search}` }
        });
    }

    return resolve(event);
}
