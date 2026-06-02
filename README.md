# AONE Web

Static marketing site for The Art of Network Engineering.

## Commands

```
npm install
npm run dev          # http://192.168.1.200:3000
npm run build        # static export to out/
npm test
```

Episode data is fetched from Buzzsprout RSS at build time. To refresh after publishing a new episode, re-run `npm run build`.

See `docs/superpowers/specs/` for the design spec and `docs/superpowers/plans/` for the implementation plan.
