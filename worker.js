// Cloudflare Worker: tiny CORS proxy for calendar ICS links.
// Only forwards to Google / Outlook calendar hosts, so it can't be used as an open proxy.
const ALLOWED = ['calendar.google.com', 'outlook.office365.com', 'outlook.live.com', 'outlook.office.com'];

export default {
  async fetch(request) {
    const cors = { 'Access-Control-Allow-Origin': '*', 'Access-Control-Allow-Methods': 'GET, OPTIONS' };
    if (request.method === 'OPTIONS') return new Response(null, { headers: cors });
    const target = new URL(request.url).searchParams.get('url');
    let u;
    try { u = new URL(target); } catch { return new Response('missing ?url=', { status: 400, headers: cors }); }
    if (u.protocol !== 'https:' || !ALLOWED.includes(u.hostname)) return new Response('host not allowed', { status: 403, headers: cors });
    const r = await fetch(u.toString(), { cf: { cacheTtl: 60 } });
    return new Response(r.body, { status: r.status, headers: { ...cors, 'Content-Type': 'text/calendar; charset=utf-8', 'Cache-Control': 'no-store' } });
  }
};
