---
title: "What is BGP?"
slug: "what-is-bgp"
publishedAt: "2025-09-10"
excerpt: "TL;DR"
author: "The AONE Team"
coverImage: "/blog-images/what-is-bgp.jpg"
---

TL;DR

BGP wins in modern networks because it scales policy, not topology. Use communities to encode intent once and enforce it at the right boundaries; use iBGP with route reflection to distribute reachability cleanly; and reserve **l**ocal-pref as your go-to knob for deterministic traffic engineering. For overlapping IPs (hello, mergers), communities plus a staged renumber/NAT plan beats endless prefix lists—and IPv6 is your friend for building a unique management plane.

---

### Why BGP, Really?

On the latest AONE episode, [Kevin Myers](https://www.linkedin.com/in/ipv6-kevin-myers/) broke it all down for us. BGP succeeded EGP to connect autonomous systems and grew into the Internet’s policy backbone. Unlike IGPs (OSPF/IS-IS/EIGRP) that compute topology with shortest-paths and require consistent LSDBs, BGP doesn’t care how you reach a peer—only that you can, and it gives operators rich levers to prefer, suppress, or steer routes.

That difference is the secret sauce:

- IGPs: Everyone in the area learns the same LSDB. Outbound filtering breaks the model.
- BGP: Encodes intent as attributes and tags. Inbound/outbound control is expected.

It’s why BGP evolved from “the Internet protocol” into the universal glue for WANs, data centers, and SD-WAN overlays.

---

### The Power Move: BGP Communities

Stop maintaining sprawling, divergent prefix lists. Tag intent at the origin and enforce it at the edges.

### Types of Communities

- **Well-known:** e.g., no-export
- **Standard:** ASN:NN (two-byte format)
- **Large:** Four-byte ASN support (ASN:VALUE:VALUE)
- **Extended:** Multi-field tuples, great for SD-WAN signals like SLA state

### Pattern

1. Match prefix → set community at origin.
2. Enforce policy at WAN/DC borders.

### Why it scales

- Fewer choke points to edit policy
- Safer delegation (junior engineers can apply changes predictably)
- Cleaner configs vs. sprawling route-maps
- Easy observability: filter the BGP table by community and instantly see what’s left to fix

---

### Real-World Example: Overlapping IPs in a Merger

Two companies both run 10.10.10.0/24. You need connectivity without carnage.

**Community-based pattern:**

- Tag each company’s routes with a company community plus an overlap tag.
- Suppress overlapped routes at intercompany borders.
- Renumber or NAT gradually, while IPv6 provides a unique management plane going forward.

**Benefits**:

- Safe interim connectivity
- Live inventory of overlapped routes (watch the count shrink as you fix them)
- No nightly battles with diverging prefix-lists

---

### EBGP vs iBGP: What’s the Difference?

- **eBGP:** Between ASNs; next-hop is rewritten; AS-path visible; own-AS loops dropped (unless explicitly allowed for special cases).
- **iBGP:** Within one ASN; the split-horizon rule means a router won’t re-advertise routes learned from one iBGP peer to another.

### Scaling iBGP

- Everyone peers with everyone. Works, but explodes in config overhead. Some providers automate this today.
- **Route reflectors (RRs):** Designate a few routers as RRs. Clients peer only to RRs, which “reflect” routes. This is the common enterprise pattern.

---

### The Attributes That Actually Matter

BGP has plenty of nerd knobs, but in daily ops, three stand out:

- **LOCAL\_PREF:** Your main lever for deterministic path selection.
- **AS-PATH / MED / weight:** Secondary tools, useful but less commonly relied on.

Keep it simple: reserve local-pref tiers (e.g., 300/200/100) for A/B/C path preferences, then layer on other attributes as needed.

---

### SD-WAN and BGP

Many SD-WAN designs run BGP under the hood. Extended communities often convey SLA state from spokes to hubs (e.g., “in-SLA” vs “out-of-SLA”), enabling policy-driven return-path control without brittle ACL gymnastics.

---

### Why Not Just Redistribute into an IGP?

Legacy designs pushed BGP-learned routes into OSPF or EIGRP. That doesn’t scale in a world of multi-DC, multi-cloud, and overlays.

As path diversity grows, IGPs buckle under policy complexity. BGP is the right tool: keep external reachability in BGP and distribute with iBGP, not by flooding the IGP with external specifics.

---

### Practical Starter Patterns

- **Community schema:** Define a simple, documented map:
- **Border enforcement:** On WAN/DC edge routers, match communities to permit/deny/prefer.
- **Default knobs:** Use local-pref tiers (e.g., 300/200/100) to encode A/B/C path preferences; reserve MED/AS-path tweaks for inter-AS cases.
- **iBGP design:** Two route reflectors per domain; keep configs boring and repeatable.
- **Ops hygiene:** Always verify whether communities pass across peerings; many providers strip or re-mark.

---

### The Perennial Debate: Is BGP a Routing Protocol or an Application?

You’ll hear both takes. What matters operationally: BGP is a policy distribution mechanism for reachability. Treat it as your intent bus—encode context once (communities/attributes), then enforce predictably at the right boundaries.

---

### Key Takeaways

- Use **communities** to encode policy; enforce at few strategic points.
- Prefer **local-pref** as your first-line traffic-engineering control.
- Scale iBGP with **route reflectors** (or automate full-mesh if you’re brave).
- Handle **overlaps** with communities + staged renumber/NAT; adopt IPv6 for a unique management plane.
- Expect providers to **strip/rewrite communities**; design accordingly.

---

### Join the conversation

You can listen to or watch the episode at the links below, and if you love this episode, let us know! Want more deep-dive protocol episodes (BGP in data centers, EVPN, MPLS, IS-IS)? Tell us. We’ll bring [Kevin Myers](https://www.linkedin.com/in/ipv6-kevin-myers/) back—with labs.

Listen:

<https://www.buzzsprout.com/2127872/episodes/17794831>

Watch:

<https://youtu.be/PyHAW7ZRjpw>
