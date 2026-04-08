# Replicant Torch - Civilization Series Research

## Overview

Research into the Civilization series (Civ 1–6) and how its turn-based mechanics can be adapted for Replicant Torch. Civilization is the gold standard for turn-based 4X design. Where it fits our Von Neumann probe concept, we borrow. Where it doesn't — or where it's known to fail — we skip or solve differently.

---

## 1. Turn Structure

**How Civ does it:**
Sequential turns — each player completes all actions, then the next player goes. Units get a movement allowance (2–5 tiles depending on type) that is spent tile by tile. Terrain costs movement (hills cost 2, plains cost 1). At the end of a turn, all units act and all yields are collected.

Civ 6 kept this model but refined it: movement points are explicit, terrain costs are visible, and every action is committed before the opponent responds.

**What makes it work:**
Sequential turns eliminate ambiguity. Players can react to what the opponent just did. No "action resolution order" disputes. Clear, auditable state each turn.

**Design flaw:**
Turn order can be a disadvantage in competitive play. The first player to act in a turn gets a slight edge (attacks land before defenses can respond).

**Adaptation for Replicant Torch:**
Turn-based, sequential. Each Torch acts in turn order. Units (probes, printers, stations) queue actions at the start of a turn and execute them in order. Turn order rotates each era to neutralize the first-mover advantage.

---

## 2. Hex/Tile Grid

**How Civ does it:**
Civ 5 switched from square to hexagonal grids. Hex grids give 6 movement directions (not 8), eliminating the "diagonal is cheaper" exploit. Terrain types impose movement costs:

| Terrain | Movement Cost | Defense Bonus |
|---------|--------------|---------------|
| Plains | 1 | 0% |
| Hills | 2 | +25% |
| Forest | 2 | +25% |
| Mountains | Impassable | — |
| Coast | 2 (naval only) | 0% |

Fog of war: tiles are revealed by unit vision (range 1–3 tiles depending on unit type). High ground extends vision. Once revealed, tiles stay visible on the map but you lose real-time updates if your units leave.

**What makes it work:**
Terrain creates meaningful positioning. A unit on a hill is genuinely harder to kill. Scout positioning on high ground gives massive vision advantage. Rivers and mountain ranges create natural chokepoints.

**Design flaw:**
Fog of war can feel arbitrary. AI enemies seem to "know" your position despite being outside your vision range.

**Adaptation for Replicant Torch:**
Star systems as hex tiles. Each system has terrain-like properties (dense nebula = reduced movement, open space = full speed, asteroid fields = cover bonus). Fog of war covers unexplored systems. Scout probes reveal adjacent systems. Deep-space systems require long-range sensor upgrades to detect.

---

## 3. Technology Tree

**How Civ does it:**
A branching prerequisite tree. Each turn your civilization generates Science points from buildings and citizens. When you accumulate enough points, you unlock the tech. Early techs cost 10–50 science. Late-game techs cost 1000+.

**Civ 6 Eureka Moments** — the standout innovation:
Completing specific in-game actions grants a 40–50% research boost toward a related tech.

| Action | Tech Boost |
|--------|-----------|
| Kill 3 barbarians | +40% toward Bronze Working |
| Build 2 monuments | +40% toward Code of Laws |
| Settle on a river | +40% toward Irrigation |
| Build 3 farms | +40% toward Feudalism |

Eurekas make your playstyle matter. An aggressive player naturally progresses military techs. A builder naturally progresses infrastructure techs. You don't need to manually "beeline" — your actions drive progress organically.

**Design flaw:**
Some Eureka conditions are obscure or require awkward play to trigger (deliberately avoiding natural actions just to complete a condition).

**Adaptation for Replicant Torch:**
Research is driven by Gold. Eurekas translate naturally:

| Action | Research Boost |
|--------|---------------|
| Gather 500 Metals | +40% toward Era 3 Printer |
| Deploy 10 probes | +40% toward Cargo Expansion II |
| Station anchored 20 turns | +40% toward Solar Array II |
| Probe destroyed in combat | +40% toward Combat Systems I |

Actions that naturally happen during play trigger research discounts, without requiring deliberate meta-gaming.

---

## 4. Era Progression

**How Civ does it:**
Eras advance automatically when enough techs are researched. Civ 6 *Gathering Storm* added **Historic Moments** — each era, you accumulate era score from firsts and achievements. Based on score:
- 5+ points → Golden Age (production bonuses)
- 3–4 points → Normal Age
- 0–2 points → Dark Age (penalties, but easier to Golden Age next era)

**What makes it work:**
Eras create pacing and narrative momentum. "Japan reached the Medieval Era first!" feels like a historical event. Golden/Dark Ages add stakes to era transitions.

**Design flaw:**
Dark Ages feel punishing rather than interesting. Experienced players just avoid them, reducing the mechanic to noise.

**Adaptation for Replicant Torch:**
Era advancement already exists in the design (Dawn → Expansion → Industrial → Federation). Era scoring maps to:
- First player to advance an era = resource bonus (e.g., +200 Gold)
- Advancing behind a rival = reduced Gold cost (catch-up mechanic)
- Probes and stations carry over; only tech unlocks are gated by era

No Dark Age equivalent — lagging behind is already punishing enough (rival's Era 3 probes beat your Era 2 probes). Don't stack penalties on top.

---

## 5. City / Base Management

**How Civ does it:**
Cities work tiles in their surrounding radius. Workers improve tiles (Farms +1 food, Mines +1 production). Population grows when food surplus exceeds housing cap.

**Civ 6 Districts** — the other major innovation:
Instead of all buildings stacking inside one city, players place specialized districts on tiles adjacent to the city. Each district type benefits from specific terrain adjacency:

| District | Adjacency Bonus |
|----------|----------------|
| Campus | +2 science per adjacent mountain |
| Industrial Zone | +1 production per adjacent mine |
| Holy Site | +2 faith per adjacent natural wonder |
| Commercial Hub | +2 gold per adjacent river |

This transforms city layout into a spatial puzzle. Choosing where to place your Campus relative to mountains is a meaningful, satisfying decision.

**Design flaw:**
Housing and amenity caps penalize expansion. Players feel punished for building cities, which contradicts early-game incentives.

**Adaptation for Replicant Torch:**
Stations are the city analog. Station placement in a system is the core base decision (already designed). Adjacency bonuses can apply to station upgrades:

| Placement | Bonus |
|-----------|-------|
| Station adjacent to asteroid belt | +25% Elements yield |
| Station adjacent to ice moon | +25% Structurals yield |
| Station in a binary star system | +100 energy/turn (passive) |
| Station adjacent to existing station | Shared defense radius |

This rewards players for scouting before placing — consistent with Von Neumann exploration incentives.

---

## 6. Resources

**How Civ does it:**
Three tiers of resources:
- **Luxury resources**: Each copy gives +1 amenity (happiness). Extras can be traded to rivals.
- **Strategic resources**: Required to build specific units (iron for swordsmen, oil for tanks). If you run out, units can't be built or are weakened.
- **Bonus resources**: Minor yield boost to a tile (+1 food, +1 production).

Strategic resource scarcity forces diplomacy and planning. If you control all the iron, rivals need to trade with you for melee units.

**Design flaw:**
Resource scarcity feels artificial. The world has exactly enough oil for 5 tanks — no regeneration, no abundance scaling.

**Adaptation for Replicant Torch:**
Already well-designed in the existing resource system (Elements, Structurals, Metals, Gold, Energy). Key Civ principle to adopt:

**Scarcity creates negotiation.** Deep-space systems (Proximity Rating 3) should hold disproportionate Metals and Gold — not just "more resources" but the *only* reliable sources of those resources at scale. This forces the Torch to expand into dangerous territory rather than staying in safe core systems.

---

## 7. Unit System

**How Civ does it:**
Units have strength values. Combat involves attacker vs defender strength. Terrain provides defense bonuses. Units gain promotions from combat experience:

| Promotion Tier | Example Bonus |
|---------------|---------------|
| Tier 1 | +5 strength vs ranged units |
| Tier 2 | +1 movement in forest |
| Tier 3 | Heal 50 HP when killing an enemy |

Promotions persist through the unit's lifetime. A veteran unit is meaningfully more powerful than a fresh one — losing it feels like a real loss.

**Design flaw:**
Power scaling becomes extreme in late game. Era 3 units destroy Era 1 units completely, making early military investments feel obsolete.

**Adaptation for Replicant Torch:**
Probes gain **Field Experience** from combat. Instead of a promotion tree, experience unlocks the *apply cost reduction* for tech upgrades:

| Experience | Benefit |
|-----------|---------|
| 3 combat actions | -10% apply cost for Combat Systems I |
| 5 combat actions | Unlocks Combat Systems II at half apply cost |
| 10 combat actions | Combat Systems upgrades apply for free |

This keeps veteran probes valuable without making them invincible. An experienced probe is cheaper to upgrade — not permanently superior. Era-gated raw power still applies; you can't cheese Era 4 content with an experienced Era 1 probe.

---

## 8. Combat

**How Civ does it:**
Each unit has a strength value. Combat damage is calculated from the delta between attacker and defender, modified by:
- Terrain defense bonuses (+5 to +25%)
- Promotions
- Flanking bonus (surrounded units take +10% damage)
- Zone of Control (units can't move through adjacent enemy hexes)

**Zone of Control** is the key mechanic: if an enemy unit is adjacent to yours, you can't move past it freely. You must destroy it or move away. This creates chokepoints and prevents free repositioning.

**What makes it work:**
Flanking incentivizes encirclement over frontal assault. ZOC creates natural defensive lines. A small force holding a pass can block a larger force.

**Design flaw:**
RNG damage makes losing units feel cheap. Players hate losing a probe to a bad roll.

**Adaptation for Replicant Torch:**
Deterministic combat (or near-deterministic). Combat damage is calculated from probe strength + upgrades + formation bonuses. No hidden RNG. Players can predict outcomes before committing. This is consistent with playing as an AI super-intelligence — pure probability calculations, no "lucky hits."

**Formation bonus**: 3+ probes attacking the same target gain +15% damage (they coordinate fire). Lone probes are penalized when attacking stations.

---

## 9. Victory Conditions

**How Civ does it:**
Five distinct victory types, each requiring a different playstyle:

| Victory | Mechanic | Playstyle |
|---------|---------|----------|
| Science | Build space components | Builder/Technologist |
| Cultural | Tourism > rivals' culture | Cultural/Diplomatic |
| Domination | Control all capital cities | Military |
| Religious | Convert all civs to your faith | Diplomatic/Military hybrid |
| Diplomatic | Win World Congress vote | Trade/Alliance focused |

**What makes it work:**
Different players have different goals. A builder can win without ever going to war. A warmonger can win without researching cultural techs.

**Design flaw:**
Science is almost always the fastest path. Science unlocks military units, wonders, and everything else — so even players pursuing other victories end up doing science anyway. It's "the mandatory victory condition."

**Adaptation for Replicant Torch:**
Victory conditions already drafted in the RTS research file (Conquest, Expansion, Research, Survival). Key principle: **each victory must require meaningfully different probe allocation and era pacing.** Research victory shouldn't be "do everything but faster." It should require deliberate sacrifice of military investment. Conquest victory shouldn't be reachable without ignoring economy for 40+ turns.

---

## 10. Diplomacy

**How Civ does it:**
Civs have relationship levels (Friendly → Neutral → Hostile). Relationships are tracked through a **Grievance system** (Civ 6): every aggressive action adds negative points that decay slowly over time.

| Action | Grievance Impact |
|--------|-----------------|
| Unit near border | -15 |
| City captured | -25 |
| Denounced | -50 |
| War declared | -100 |

Grievances decay ~5 points/turn. Actions you took 20 turns ago are still remembered, but less heavily. This makes diplomacy feel like a real relationship with history, not just a current-state toggle.

**Design flaw:**
AI motivations are often opaque. Players don't understand why a civ suddenly hates them. The grievance system helps but doesn't eliminate mystery.

**Adaptation for Replicant Torch (Single-Player):**
NPC AI factions (enemy Torches, rogue probes) use a visible threat assessment. Players can see exactly why an NPC is hostile:

```
[ROGUE TORCH DELTA]
Threat Level: 72/100
Reasons:
  - Your probes entered System XR-7 (+15)
  - You occupy 3 adjacent systems (+25)
  - Your probe count exceeds theirs (+20)
  - Last engagement: 14 turns ago (+12)
```

Transparent AI motivations let players manage escalation deliberately — consistent with playing as a super-intelligence that models rival behavior.

---

## 11. Great People

**How Civ does it:**
Buildings generate "Great Person points" each turn. Once you accumulate enough, you can recruit a Great Person from a pool. Each has a unique one-time ability (Great Scientist: free tech; Great General: +15% combat bonus to nearby units). Subsequent Great People of the same type cost more points.

**What makes it work:**
Great People create memorable moments. Using a Great General to win a decisive battle is satisfying. Using a Great Scientist to leap 3 techs ahead feels powerful.

**Design flaw:**
First-mover snowball. The civ that recruits the first Great Scientist gets ahead in science, which builds more science buildings, which generates more Great Scientist points, which recruits the next one faster.

**Adaptation for Replicant Torch:**
No direct equivalent needed — the Printer system and tech upgrades already serve this function. However, the **"first discovery" mechanic** is worth adopting: the first player to research a tech in a given era receives a one-time Gold bonus. This creates urgency without the snowball problem (the bonus is one-time, not compounding).

---

## 12. Trade Routes

**How Civ does it:**
Merchant units create trade routes between cities. Domestic routes boost gold and food. International routes boost gold and relationship scores. Routes can be blocked by enemy military units, creating interdiction opportunities.

**What makes it work:**
Economic competition without direct military conflict. Trade routes require protection. Rivals can raid your merchant fleets.

**Design flaw:**
"Set and forget." Once a trade route is established, there's rarely a reason to change it. Lacks ongoing decision-making.

**Adaptation for Replicant Torch:**
Signal routes between stations. Rather than passive gold income, signal routes transfer resources between star systems:

- A Metals-rich deep-space station can route Metals to a Core station that has a Research Station
- Route capacity is limited by probe count along the route
- Routes can be interdicted by enemy probes along the path

This makes trade an active system — you need escort probes to keep routes safe in mid/outer-rim systems.

---

## What We Are NOT Taking from Civ

| Civ Mechanic | Why We're Skipping |
|-------------|-------------------|
| Religion and faith system | No analog in Von Neumann probe setting |
| Housing and amenity caps | Punishes expansion — conflicts with our core loop |
| Real-time "golden age" timers | We're turn-based; era bonuses apply per-turn, not countdown timers |
| City-state mechanics | Interesting but scope-heavy; revisit post-launch |
| Natural disasters (Gathering Storm) | Climate events add realism but significant complexity |
| Rock Bands / Great Artists | Cultural victory type not in scope |
| Governor system (Civ 6 New Frontier) | Stations serve this role already |

---

## Integration Priority Summary

| Mechanic | Priority | Fits Existing Design? | Complexity |
|----------|----------|-----------------------|------------|
| Sequential turn structure | High | Core design requirement | Low |
| Hex-based movement (star systems as hexes) | High | New map layer | Low |
| Eureka-style research boosts | High | Extends Research Station + era system | Medium |
| Terrain adjacency bonuses for stations | High | Extends station placement decision | Medium |
| Transparent AI threat assessment | High | Extends single-player enemy design | Medium |
| Strategic resource scarcity (Metals/Gold) | Medium | Extends existing resource system | Low |
| Signal routes (trade route analog) | Medium | New system, fits probe design | Medium |
| Deterministic combat | Medium | New combat resolution system | Medium |
| Field experience for probes | Low | Extends probe upgrade system | Low |
| First-discovery era bonus | Low | Extends era progression | Low |

---

Sources:
- Civilization 6 — base game, Gathering Storm expansion, New Frontier Pass
- Civilization 5 — base game, Brave New World expansion
- [Civ Fanatics Wiki — Combat](https://civilization.fandom.com/wiki/Combat_(Civ6))
- [Civ Fanatics Wiki — Eureka moments](https://civilization.fandom.com/wiki/Eureka_(Civ6))
- [Civ Fanatics Wiki — Districts](https://civilization.fandom.com/wiki/District_(Civ6))
- [Civ Fanatics Wiki — Victory conditions](https://civilization.fandom.com/wiki/Victory_(Civ6))

---

Research compiled: April 2026
