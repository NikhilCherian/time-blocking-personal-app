# Time Blocks

A one-page time-blocking view of today's Google Calendar: a timeline with a "now" line, a big countdown ring for the current block, and what's next. Installable on Android via "Add to Home screen".

## Files

| File | What it is |
|---|---|
| `index.html` | The whole app |
| `ical.min.js` | Calendar file reader (ical.js 1.5.0, MPL-2.0), bundled so the app works offline |
| `manifest.webmanifest`, `sw.js`, `icon*.png`, `icon.svg` | Make it installable and work offline |
| `worker.js` | Tiny Cloudflare Worker that lets the browser read your Google Calendar link |

## Setup (about 10 minutes, one time)

1. **Get your calendar link.** Google Calendar on a computer → Settings → click your calendar on the left → "Integrate calendar" → copy **Secret address in iCal format**. Treat it like a password.
2. **Create the proxy** (Google blocks browsers from reading that link directly). Sign up free at dash.cloudflare.com → Workers & Pages → Create → "Hello World" worker → Edit code → paste `worker.js` → Deploy. Copy its URL (like `https://timeblock-proxy.<you>.workers.dev`).
3. **Host the app.** Put every file except `worker.js` and `README.md` in a GitHub repo and turn on GitHub Pages (Settings → Pages → Deploy from branch `main`). The calendar link is never in the files, so a public repo is fine.
4. **On your phone**, open the Pages URL in Chrome → ⚙️ → paste the calendar link and the proxy URL → Save. Then Chrome menu → **Add to Home screen**.

Tip: you can also set it up in one tap by opening
`https://<your-pages-url>/#ics=<calendar link, URL-encoded>&proxy=<proxy URL>`
on the phone. The app saves both and removes them from the address bar.

## Notes

- Refreshes every 5 minutes; keeps the last good copy if offline.
- Gaps of 10+ minutes show as dashed "Free time".
- Colors come from the event title, so "Gym" is always the same color.
- The 5-minute buzz/notification only fires while the app is open (Android doesn't let web apps run timers in the background). "Keep screen on" in settings helps if you use the phone as a desk display.
- Outlook later: add its ICS link as a second line in settings; the proxy already allows Outlook hosts.
