# warframe-event-status-cli
A cli tool to fetch and display current in-game status of warframe inside of the terminal, I built this cli tool because I spend most of the time inside the terminal, and it feels cumbersome to keep on looking up when or what is currently happening in warframe (mostly for eidolon hunts) on a separate browser.

```
$ npm install -g warframe-event-status-cli
$ wf
╭─────────── Fdiaz ───────────╮
│                             │
│                             │
│                             │
│                             │
│  Warframe Event Status CLI  │
│                             │
│                             │
│                             │
│                             │
╰─────────────────────────────╯
? Pick an event … 
▸ cetus (eidolon-hunts)
  archon
  sortie
  cambion-drift
  Void trader
  Vault trader
  Orb vallis
✔ Pick an event · cetus (eidolon-hunts)
✔ Pick a language · en
{ eventType: 'cetusCycle', language: 'en' }
✔ Current Status
┌────────────┬───────────────────────────┐
│ expiry     │ Aug 23, 2023, 11:50:00 AM │
├────────────┼───────────────────────────┤
│ activation │ Aug 23, 2023, 10:10:00 AM │
├────────────┼───────────────────────────┤
│ timeLeft   │ 30m 7s                    │
├────────────┼───────────────────────────┤
│ state      │ day                       │
└────────────┴───────────────────────────┘
```
