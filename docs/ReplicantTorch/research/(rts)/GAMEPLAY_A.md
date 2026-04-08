# Replicant Torch - MMO Mechanics Research

## Overview

Research into Eve Online's core gameplay systems and how they can be adapted for Replicant Torch. Eve Online is one of the most mechanically deep space MMOs ever built. Where it fits our Von Neumann probe concept, we borrow. Where it doesn't, we skip.

---

## Eve Online Systems Analyzed

### 1. Blueprint System

**How Eve does it:**
Every manufactured item requires a Blueprint Original (BPO) or Blueprint Copy (BPC) before it can be built. BPOs give unlimited production runs and can be researched to improve efficiency. BPCs are limited-run copies. Blueprints have two research stats:
- **ME (Material Efficiency)** — reduces required input materials (up to 10% reduction)
- **PE (Production Efficiency)** — reduces build time

Higher-tier Tech 2 and Tech 3 items cannot be directly blueprinted — they require **Invention**, a probabilistic process that converts a T1 BPC into a T2 BPC using datacores and optional decryptors.

**Adaptation for Replicant Torch:**
The Printer mechanic maps naturally. Instead of printing anything you can afford, each Printer requires the appropriate blueprint:

- **Seed Printer** comes pre-loaded with base blueprints: Seed Printer (self), Torch (base spec), Era 1 Probe
- Higher-tier blueprints (Era 2+ probes, Stations, upgraded Printers) are acquired by:
  - Researching them at a Research Station (costs Gold)
  - Discovering them through exploration (Scout probes scanning deep-space anomalies)
- Blueprint ME research maps to the existing **Resource Efficiency** tech upgrade
- Blueprint PE research maps to the existing **Print Speed** tech upgrades

**Priority: High** — strengthens the Printer as a strategic object, adds exploration incentive

---

### 2. Mining Waste & Finite Resource Nodes

**How Eve does it:**
Asteroids are finite — they deplete as they are mined. Each mining cycle has a probability of generating "mining waste" (ore turned to space dust), which is reduced by better ships and skills. When asteroids in a belt are exhausted, miners must move to a new belt or system.

**Adaptation for Replicant Torch:**
Resource nodes (Asteroids, Ice Moons, Nebula Clouds) are finite per star system. Each gather cycle has a base waste percentage:

| Probe Type | Base Waste | With Cargo Expansion I | With Cargo Expansion II |
|------------|------------|------------------------|--------------------------|
| Era 1 Probe | 15% | 10% | 6% |
| Era 2 Probe | 10% | 7% | 4% |
| Era 3 Probe | 6% | 4% | 2% |
| Era 4 Probe | 3% | 2% | 1% |

Depleted systems naturally push the Torch to expand — a perfect Von Neumann dynamic. It also adds urgency to the "Setup Station vs Activate Printer" decision: a Station yields passive income, but the system's nodes won't last forever.

**Priority: Medium** — adds depth without complexity; reinforces the expansion loop

---

### 3. System Sovereignty

**How Eve does it:**
Alliances claim sovereignty over null-sec star systems using the **Entosis Link** module. Sovereignty must be actively maintained — systems can be attacked by placing Entosis Links on sovereignty structures. Defense requires splitting fleets across multiple "command nodes" in a constellation. Lost sovereignty removes all defensive bonuses and passive income.

**Adaptation for Replicant Torch:**
Star systems have an **Influence Score** (0–100) controlled by the player:

- Influence grows passively while probes/stations are present (+X per turn based on probe count)
- Influence decays when the system is abandoned (-Y per turn)
- A Station anchored in a system locks in a minimum influence floor (prevents full decay)
- Low influence = reduced passive resource income from the Station
- **Contested systems** (multiplayer): enemy probes deploy an Anchor Beacon to begin reducing your influence; defending requires maintaining probe presence

This transforms the "SETUP STATION" decision into an ongoing commitment, not a one-time action.

**Single-player version:** Influence acts as a "system health" score. Neglected systems slowly lose productivity, forcing the AI to make tradeoff decisions about where to focus fleet presence.

**Priority: High** — gives the Station mechanic long-term strategic weight

---

### 4. Fleet Roles / Probe Specialization

**How Eve does it:**
Every fleet has four core roles:
- **Damage Dealers (DD)** — primary offensive firepower
- **Tackle/Scout** — fast ships that catch and hold targets; scouts reveal information
- **Logistics** — remote repair and energy transfer; keep other ships alive
- **EWAR (Electronic Warfare)** — target jamming, sensor dampening, weapon disruption

Specialized ships exist for each role. A fleet without logistics dies fast; a fleet without tackle can't hold targets.

**Adaptation for Replicant Torch:**
Probes are assigned a **Role** on deployment, which determines their active bonuses and behaviors:

| Role | Bonus | Required Upgrade | Description |
|------|-------|-----------------|-------------|
| **Gatherer** | +25% resource yield, access to mining nodes | None (base role) | Default probe role; mines and transports resources |
| **Scout** | +50% sensor range, reveals system anomalies | Sensor Suite | Fast probes that map unexplored systems and find blueprints |
| **Fighter** | Combat Systems active, +20% damage | Combat Systems I | Escorts fleets, attacks enemy probes/stations |
| **Logistics** | Repairs nearby probes, -10% travel waste | Speed Drive I | Keeps probe fleets operational on long missions |

Roles are soft-assigned — a probe can be reassigned, but there is a cooldown/cost. This maps directly onto the existing tech upgrade system without requiring new object types.

**Priority: High** — low complexity, high strategic value, works with existing upgrade system

---

### 5. Security Zone Tiers (Proximity Rating)

**How Eve does it:**
Star systems have a security status from 1.0 (fully patrolled high-sec) to 0.0 (lawless null-sec). High-sec: safe, low resources. Low-sec: moderate risk, better resources. Null-sec: maximum risk, maximum reward. The risk/reward gradient drives expansion.

**Adaptation for Replicant Torch:**
Star systems have a **Proximity Rating** from 0–3:

| Rating | Zone | Resource Yield | Risk Level | Notes |
|--------|------|---------------|------------|-------|
| 0 | Core | Low | None | Starting systems; safe, tutorial-level |
| 1 | Mid-rim | Moderate | Low | Occasional hostile probes (NPC AI) |
| 2 | Outer rim | High | Medium | Hostile probe patrols; contested systems |
| 3 | Deep space | Very High | Extreme | Rare resources (Metals, Gold); Era 4 content |

Deep space systems are required to gather the Metals and Gold needed for Era 3–4 tech upgrades, naturally incentivizing dangerous expansion.

**Priority: Medium** — simple map layer that drives the exploration/risk loop

---

### 6. Tech 2 Invention (Probabilistic Research)

**How Eve does it:**
Tech 2 blueprints cannot be purchased — they must be "invented." The invention process:
1. Use a T1 BPC + 2 datacores + optional decryptor
2. Run an invention job (time-based)
3. Result is probabilistic — base chance ~35–45%, improved by skills and decryptors
4. Success produces a T2 BPC with limited runs; failure consumes the inputs

**Adaptation for Replicant Torch:**
Era 3–4 blueprint research uses **Invention** at a Research Station:

- Requires: Gold + Metals + an existing lower-tier blueprint + Research Station Tier 2+
- Time-based job (N turns)
- Base success chance: 60% (Research Station Tier 2) / 75% (Tier 3)
- Failure: materials consumed, must retry
- Success: blueprint unlocked permanently (like a BPO)

Keeps high-end tech expensive and meaningful. Prevents players from simply "buying" all upgrades with Gold.

**Priority: Low** — adds depth at Era 3–4 but complex to balance; implement after core is working

---

## What We Are NOT Taking from Eve

| Eve Mechanic | Why We're Skipping |
|-------------|-------------------|
| Real-time passive skill training | Doesn't fit the probe/era gate design; too MMO-specific |
| Player-driven market economy | Single-player focused; no player-to-player trading |
| CONCORD (NPC space police) | No analog in Von Neumann probe setting |
| Wormhole mechanics | Interesting but scope-heavy; revisit post-launch |
| Planetary interaction (PI) | Probe gathering already covers this ground |
| Ship insurance | No persistent economy to make insurance meaningful |

---

## Integration Priority Summary

| Mechanic | Priority | Fits Existing Design? | Complexity |
|----------|----------|-----------------------|------------|
| Blueprint system | High | Extends Printer mechanic | Medium |
| Fleet roles (probe specialization) | High | Extends probe tech upgrades | Low |
| System sovereignty/influence | High | Extends Station mechanic | Medium |
| Security zone tiers (Proximity Rating) | Medium | New map layer | Low |
| Mining waste / finite resource nodes | Medium | Extends resource gathering | Medium |
| Invention (probabilistic research) | Low | Extends Research Station | High |

---

Sources:
- [EVE University Wiki — Mining](https://wiki.eveuniversity.org/Mining)
- [EVE University Wiki — Manufacturing](https://wiki.eveuniversity.org/Manufacturing)
- [EVE University Wiki — Blueprints](https://wiki.eveuniversity.org/Blueprints)
- [EVE University Wiki — Sovereignty](https://wiki.eveuniversity.org/Sovereignty)
- [EVE University Wiki — Getting Started](https://wiki.eveuniversity.org/Getting_Started_in_EVE_Online)
- [EVE Online — From Extraction to Production](https://www.eveonline.com/news/view/from-extraction-to-production)
- [EVE Online — Industry Overview](https://www.eveonline.com/news/view/eve-industry-all-you-want-to-know)

---

Research compiled: April 2026
