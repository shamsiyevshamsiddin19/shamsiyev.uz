// Cloudflare Pages Function: /api/track
// Receives the visit beacon from the static site (same-origin, always stable),
// enriches it with the visitor's real IP + country (available at the CF edge),
// and forwards it to the analytics server. If the server's address ever
// changes, update ONE Pages env var (TRACK_UPSTREAM) — the site never changes.
//
// Upstream is the Hetzner server's static IP (plain HTTP — this fetch runs
// server-to-server on Cloudflare's edge, not in the visitor's browser, so
// there's no mixed-content/CORS restriction). nginx's default site (any
// Host header) proxies /site/track to subtitr-bot's own admin app, which
// records the visit into PostgreSQL (see web/site_analytics.py).
const DEFAULT_UPSTREAM = "http://178.104.25.218";

export async function onRequestPost(context) {
    const { request, env } = context;
    const upstream = ((env && env.TRACK_UPSTREAM) || DEFAULT_UPSTREAM).replace(/\/+$/, "");

    let body = "{}";
    try { body = await request.text(); } catch (_) {}

    const cf = request.cf || {};
    const ip = request.headers.get("CF-Connecting-IP") || "";
    const country = cf.country || request.headers.get("CF-IPCountry") || "";
    const city = cf.city || "";
    const region = cf.region || "";
    const org = cf.asOrganization || "";

    // Forward in the background so the visitor's request returns instantly.
    context.waitUntil((async () => {
        try {
            await fetch(upstream + "/site/track", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "User-Agent": request.headers.get("User-Agent") || "",
                    "X-Visitor-Ip": ip,
                    "X-Visitor-Country": country,
                    "X-Visitor-City": city,
                    "X-Visitor-Region": region,
                    "X-Visitor-Org": org,
                    "Origin": "https://shamsiyev.uz",
                },
                body,
            });
        } catch (_) {}
    })());

    return new Response(null, { status: 204 });
}

export function onRequestOptions() {
    return new Response(null, { status: 204 });
}
