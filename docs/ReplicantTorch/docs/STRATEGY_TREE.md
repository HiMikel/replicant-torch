# Replicant Torch - Strategy Decision Tree

## Overview

The Replicant Torch is an AI super intelligence controlling self-replicating probes. All operations draw from a single universal resource — hydrogen — split between fusion reactors for Energy and the Printer for Raw Materials. The only thing hydrogen cannot become is what a dying star had to make: Rare Metals.

---

## Starting Conditions

Every game begins with a **Von Neumann Probe** — the seed of expansion. The Torch arrives at the first star system already in progress — the journey from Earth is backstory, not gameplay.

| Unit | Qty | Description |
|------|-----|-------------|
| **Von Neumann Probe** | 1 | The primary AI probe. Carries the Seed Printer. Core decision-maker. |
| **Seed Printer** | 1 | Attached to the Von Neumann. The minimum viable replicator — can print itself, a new Torch, and Era 1 drones. Slow, energy-hungry, but self-sufficient from turn 1. |
| **Drones** | 4 | Lightweight gatherers. Deployed on arrival to collect local resources. |

**Starting Resources**

| Resource | Starting Amount | Reasoning |
|----------|----------------|-----------|
| **Hydrogen reserve** | 1800 units | Carried from Earth's launch facility — enough to deploy drones, run the Printer once, and maintain standby power through the first decisions |
| **Rare Metals** | 0 | Cannot be brought from Earth in meaningful quantity — must be found locally |

The hydrogen reserve splits on demand between Energy and Raw Materials. There is no pre-split — the Torch allocates as operations require.

The Seed Printer arrives pre-loaded with **Earth's full tech snapshot at launch** — everything humanity knew when the Torch departed. This includes the Research Facility blueprint, meaning the Torch can begin advancing immediately without needing to discover it first.

On arrival at the first star system, the core strategic decision is made:

```
ARRIVE AT SYSTEM
      |
      +---> DEPLOY 4 RESOURCE DRONES (always — start gathering immediately)
      |
      V
 KEY DECISION
      |
      +--- SETUP STATION ---> Anchor to system, passive resource income, slow but stable
      |
      +--- ACTIVATE PRINTER --> Print more drones, printers, or a Torch to expand faster
```

---

## World Design

### Everything Runs on Hydrogen

The Torch was engineered around a single design truth: **hydrogen is everywhere.** It makes up roughly 75% of all ordinary matter in the universe. Every star is burning it. Every ice moon is locked with it. Every nebula is thick with it. Humanity didn't design the Torch to carry fuel — they designed it to *live off the galaxy.*

The Helium-3 Fusion Drive fuses hydrogen isotopes for propulsion. The Seed Printer uses hydrogen, carbon, oxygen, and silicon as its primary feedstock — all of which are essentially hydrogen's heavier cousins, forged in the cores of earlier stars and scattered as cosmic dust. The molecular assembler doesn't print with exotic inks. It prints with star stuff, using the energy from fusing more star stuff.

This is why the Torch can self-replicate indefinitely — as long as it can find hydrogen, it can print, move, and survive.

**But collection rate is the constraint, not existence.** Interstellar space averages roughly one hydrogen atom per cubic centimeter — nearly nothing. The Torch needs *concentrated sources*: ice moons (water ice = H₂O, split by electrolysis), gas giants (atmospheric scooping), nebula clouds (ram scoop arrays). Gatherer drones aren't mining rocks for abstract "raw materials" — they are running hydrogen extraction operations at whatever concentration source a system offers.

The **Power Grid** is the system-level hydrogen collection rate, measured in units per turn. Everything draws from it:

```
Hydrogen collected per turn  (Gatherer drones → Power Grid)
   ├── Fusion reactors  →  Energy  →  propulsion, research, defense, travel
   └── Printer feedstock  →  Raw Materials  →  new drones, stations, Torches
```

The split between Energy and Raw Materials is a strategic lever — push more hydrogen into the reactors and you move and fight faster; divert more to the Printer and you build faster. Both draw from the same well.

---

### Why Rare Metals Can Never Be Made

Hydrogen fusion is remarkable, but it has a ceiling. Stellar fusion can build elements up to iron (atomic number 26) — beyond that, fusing atoms *costs* more energy than it releases. The universe makes heavy elements — iridium, osmium, platinum, gold — only one way: the violent collapse and explosion of a massive dying star. A supernova compresses stellar material so intensely, for so briefly, that atoms are jammed together past iron's threshold. The result is a spray of heavy elements scattered across light-years of space.

No printer can replicate this. The molecular assembler rearranges atoms it already has. It cannot conjure iridium from hydrogen any more than it can conjure a star. Nuclear transmutation at meaningful scale would require more energy than the Torch generates in centuries, and even then the yield would be measured in atoms, not grams.

The Torch's designers knew this. Every rare element threshold in the tech tree — the iridium cores in Era 2 quantum processors, the osmium containment rings in Era 3 fusion drives, the platinum-group catalyst layers in Era 4 replication matrices — was a deliberate engineering choice. They built the tech around elements that *could not* be synthesized, ensuring that advancement required real exploration. A Torch that could print its own Rare Metals would have no reason to leave its first system. Scarcity is the engine of expansion.

---

### The Stellar Graveyard

Every Rare Metal deposit in the galaxy is the remnant of a star that died billions of years before the Torch launched. When your Scout drone detects an iridium signature on a Class C asteroid, it is reading the fingerprint of a supernova that happened before Earth's sun existed.

Scout drones are not just resource hunters. They are archaeologists of dead stars — mapping where ancient explosions scattered their debris, reading the spectral signatures of stellar graves. A Class D deposit is a place where something enormous died, and the Torch is here to collect what was left behind.

This is why Rare Metals feel different from hydrogen. Hydrogen is infrastructure — you build systems to collect it continuously. Rare Metals are *found* — discrete, finite, irreplaceable remnants of events that will never repeat. Once a deposit is exhausted, it is gone. The star that made it is gone. There will be no more.

---

### Why Era 1 Drones Can't Access Rare Metal Layers

Extracting heavy elements from an asteroid isn't just about drilling deeper — it's about refining precision. Era 1 Gatherers use bulk scooping: they sweep up undifferentiated rock and ice, separate hydrogen and common silicates, and return the rest to space as tailings. The refinery suite on an Era 1 drone cannot distinguish platinum-group atoms from iron-silicate waste — they all go overboard together.

Era 2+ refinery suites carry isotope separation chambers and quantum-tuned magnetic sorting arrays. They can pull iridium from rock at parts-per-million concentrations. The metals were always in that asteroid. The Era 1 drone swept them back into the void with the rest of the slag.

Every Class B–D deposit your drones mine early is worth revisiting. You weren't robbed. You just didn't have the tools to keep what was there.

---

### Environmental System Modifiers

Each star system has a type that applies a passive modifier to all operations within it. Modifiers are fixed at map generation and visible to Scout drones on arrival.

| System Type | Solar Array | Combat | Scout Range | Resource Yield | Notes |
|-------------|-------------|--------|-------------|----------------|-------|
| Standard | — | — | — | — | No modifier |
| Dark Nebula | -40% | — | -25% | +15% dust/ice | Poor solar; rich in Raw Materials |
| Pulsar | +30% | +20% weapon dmg | — | -10% | Energy-rich; good for tech-heavy play |
| Magnetar | -20% | — | -60% | — | Scouts nearly blind; ambush risk |
| Binary Star | +50% | — | — | — | Excellent energy income; rare |
| Debris Field | — | — | +20% | +30% (metals) | Former battle site; Rare Metal deposits |

Modifiers are multiplicative with upgrades. A Solar Array I on a Pulsar system generates +130 energy/turn instead of +100.

---

### Why Era 1 Drones Can't Access Rare Metal Layers

Extracting heavy elements from an asteroid isn't just about drilling deeper — it's about refining precision. Era 1 Gatherers use bulk scooping: they sweep up undifferentiated rock and let the Torch's refinery separate what it can. The refinery can process common silicates and carbonates at Era 1 tech, but heavy element lattices — iridium, osmium, platinum-group metals — require isotope separation chambers and quantum-tuned magnetic sorting that only Era 2+ refinery suites carry. The metals are in the rock. They always were. Era 1 just sweeps them back into space as waste.

This means every Class B–D deposit the Torch mines early is worth revisiting. Nothing was taken that shouldn't have been. You just didn't have the tools to keep it.

---

### The Story Hook

Rare Metals are the byproduct of ancient stellar nucleosynthesis — created inside dying stars and scattered across the galaxy when they exploded billions of years ago. Every Rare Metal deposit your Scout finds is literally a piece of a dead star. That gives Scout drones a narrative identity: they're not just resource hunters, they're archaeologists of ancient supernovae.

This makes the whole system feel earned rather than arbitrary.

---

## Resources

| Resource | Source | Role |
|----------|--------|------|
| **Hydrogen** | Ice moons, gas giants, nebula clouds, asteroids — collected by Gatherer drones and fed into the system Power Grid | Universal feedstock. Splits between fusion reactors (Energy) and Printer feedstock (Raw Materials). The Power Grid measures hydrogen collection rate in units per turn. |
| **Energy** | Drawn from the Power Grid via fusion reactors; supplemented by Solar Arrays and Drive Conversion | Powers all operations — printing, propulsion, research, combat. Competing with Raw Materials for the same hydrogen supply creates the core resource tension. |
| **Raw Materials** | Drawn from the Power Grid via Printer feedstock allocation; also includes carbon, silicon, oxygen extracted alongside hydrogen | The Printer's ink. Consumed per print job. Higher-era objects cost more. The molecular assembler builds anything from common elements — anything except what only a dying star could make. |
| **Rare Metals** | Found only in Class C–D deposits; remnants of ancient supernovae; extracted by Era 2+ Gatherers | Hard gate on era progression and elite tech. Never consumed in printing — instead a minimum deposit must be on hand to unlock the next era locally. Cannot be synthesized. Cannot be traded. Must be found. |

### Power Grid

The Power Grid is the hydrogen collection rate of a star system, measured in units per turn. All Gatherer drones assigned to deposits in a system feed into the local grid automatically — no manual dispatching required. You place the drones, the grid runs.

**Grid Output** scales with:
- Number of Gatherer drones assigned to deposits in the system
- Spectral Class of the deposits being mined (Class D deposits yield more hydrogen per drone than Class A)
- Gatherer drone era (Era 3 Gatherers extract more efficiently than Era 1 from the same deposit)
- System modifiers (Pulsar systems boost fusion output; Dark Nebula cuts solar but not hydrogen collection)

**Grid Draws** (automatic, per turn):
- Research Station operation
- Station passive systems and Defense Grid
- Torch standby power

**Grid Draws** (on-demand):
- Printing jobs (Raw Materials allocation)
- Drone deployment and reassignment
- Torch travel
- Combat operations

### Spectral Classification

Every deposit in New Eden has a **Spectral Class (A–D)** — a signature derived from its atomic composition, detectable by Scout drones. Class determines both what a deposit contains and what drone era is required to fully extract it.

| Class | Proximity Rating | Primary Contents | Rare Metal Layer | Notes |
|-------|-----------------|-----------------|-----------------|-------|
| **A** | 0–1 (Core/Mid-rim) | Raw Materials | None | Abundant; safe; Era 1 territory |
| **B** | 1–2 (Mid-rim/Outer rim) | Raw Materials | Trace | Moderate yield; worth revisiting with Era 2+ |
| **C** | 2–3 (Outer rim) | Raw Materials + Rare Metals | Significant | Requires Era 3 Gatherer for full extraction |
| **D** | 3 (Deep space only) | Raw Materials + Rare Metals + Exotic compounds | High | Full yield requires Era 4 Gatherer; exotic layer gates elite upgrades |

**Scout Survey Requirements:** Era gates what a Scout can accurately read. Unresolved deposits display as *Spectral Class Unknown* until a capable Scout surveys them.

| Scout Era | Readable Classes |
|-----------|-----------------|
| Era 1 | Class A, B |
| Era 2 | Class A, B, C |
| Era 3–4 | Class A, B, C, D |

---

## Era Progression

Eras gate what tech can be researched and what objects can be built. Advancing an era is time-based research at a Research Station — it runs automatically while the station is powered. Rare Metals are the hard gate: you cannot begin an Era advance without the required deposit on hand.

| Era | Name | Rare Metals Required | Unlocks |
|-----|------|---------------------|---------|
| 1 | Dawn | — | Basic drones, Era 1 stations, Era 1 printers, Research Station Tier 1 |
| 2 | Expansion | 100 | Era 2 drones, Era 2 printers, Research Station Tier 2, Tier I tech upgrades |
| 3 | Industrial | 500 | Era 3 drones, military vessels, Torch printing, Era 3 printers, Research Station Tier 3, Tier II tech upgrades |
| 4 | Federation | 2000 | Era 4 drones, capital ships, Era 4 printers, Elite tech upgrades |

**Rules:**
- Era advances are **local** — only the system where the Research Station resides advances
- You cannot build or research above the local era
- Each era roughly doubles the power ceiling of all objects
- Child Torches inherit the parent's era level at print time

---

## Objects & Build Costs

### Drone

Workhorse unit. Era gates which tier you can build. Each drone has a **Type** that determines its base stats and role, and an **Era** that determines its power level.

**Drone Types**

| Type | Era Req | Raw Materials | Energy | Description |
|------|---------|--------------|--------|-------------|
| **Gatherer Drone** | 1 | 175 | 50 | Default; mines and transports Raw Materials |
| **Scout Drone** | 1 | 140 | 70 | Fast, long sensor range; maps systems and finds Rare Metal deposits |
| **Fighter Drone** | 3 | 250 | 80 | Combat-ready; requires Combat Systems I upgrade |
| **Logistics Drone** | 2 | 165 | 60 | Repairs and resupplies nearby drones; reduces fleet travel waste |
| **Disruptor Drone** | 3 | 220 | 90 | Electronic warfare; jams enemy sensors and disrupts targeting; requires EWAR Systems I upgrade |

> Era 2–4 variants of each type scale proportionally — type determines role and base stats, era determines power tier.

**Gatherer Extraction by Spectral Class**

Gatherer drones unlock deeper material layers as their era increases. The deposit doesn't change — the drone's refining precision does.

| Drone Era | Class A | Class B | Class C | Class D |
|-----------|---------|---------|---------|---------|
| Era 1 | 100% Raw | 50% Raw, no metals | 25% Raw, no metals | 10% Raw, no metals |
| Era 2 | 100% Raw + trace metals | 100% Raw + trace metals | 60% Raw + trace metals | 30% Raw, no metals |
| Era 3 | 100% Raw + full metals | 100% Raw + full metals | 100% Raw + full metals | 60% Raw + partial metals |
| Era 4 | 100% Raw + metals + exotic | 100% Raw + metals + exotic | 100% Raw + metals + exotic | 100% Raw + metals + exotic |

> Revisiting a Class C system with Era 3 Gatherers after initially mining it with Era 1 drones will yield full Raw Materials **and** unlock the Rare Metal layer that was always present but inaccessible.

**Drone Roles**

Drones are assigned a Role on deployment. Role determines active bonuses and what actions they can perform. Roles can be reassigned at the cost of Energy and a cooldown period.

| Role | Bonus | Unlocked By | Description |
|------|-------|-------------|-------------|
| **Gatherer** | +25% resource yield, access to mining nodes | Default | Mines and transports resources to the Torch or Station |
| **Scout** | +50% sensor range, reveals system anomalies and blueprint caches | Sensor Suite upgrade | Fast drone that maps unexplored systems |
| **Fighter** | +20% damage, Combat Systems active | Combat Systems I upgrade | Escorts fleets and attacks enemy drones/stations |
| **Logistics** | Repairs nearby drones, -10% fleet travel waste | Speed Drive I upgrade | Keeps fleets operational on long-range missions |
| **Disruptor** | Jams enemy Scout sensors (-75% scan range), reduces Fighter targeting accuracy (-40%) | EWAR Systems I upgrade | Denies enemy intelligence and degrades combat effectiveness |

**Drone Tech Upgrades** (researched at Research Station, then applied per drone)

| Upgrade | Era Req | Effect | Research (Energy) | Apply: Raw Materials | Apply: Energy |
|---------|---------|--------|-------------------|---------------------|---------------|
| Cargo Expansion I | 2 | +50% carry capacity | 100 | 70 | 10 |
| Cargo Expansion II | 3 | +100% carry capacity | 300 | 175 | 25 |
| Speed Drive I | 2 | +20% travel speed | 150 | 70 | 0 |
| Speed Drive II | 3 | +40% travel speed | 400 | 175 | 0 |
| Combat Systems I | 3 | Basic weapons | 300 | 200 | 50 |
| Combat Systems II | 4 | Advanced weapons | 750 | 500 | 125 |
| Stealth Plating | 4 | Reduces detection | 600 | 350 | 40 |
| Sensor Suite | 3 | +50% scan range | 250 | 140 | 20 |
| EWAR Systems I | 3 | Enables Disruptor role; jams sensors | 350 | 200 | 60 |
| EWAR Systems II | 4 | Energy neutralization; drains enemy drone power | 900 | 500 | 150 |

---

### Printer

The engine of expansion. Required to print any object. Each era unlocks faster output and higher-tier printing.

<span style="color: green">**Bootstrap Constraint:** The Von Neumann premise requires that self-replication is always possible. The Seed Printer is the minimum viable replicator — it can always print another Seed Printer or a new Torch as long as raw materials and Energy are available.</span>

**Blueprint System**

Printers require blueprints to print any object. A printer can only print what its local blueprint library contains. Blueprints are acquired three ways:

- **Pre-loaded at launch** — Earth's tech snapshot, available from turn 1
- **Local research** — discovered at a Research Facility in the current system
- **Transmission** — received from another Torch via light-speed signal (free on arrival; propagation delay applies based on distance)

**Seed Printer — Pre-loaded Blueprint Package (Earth tech at launch)**

| Category | Blueprints |
|----------|-----------|
| Replication core | Seed Printer, Torch (base spec), Gatherer Drone, Scout Drone |
| Colony founding | Basic Station, Solar Array, Resource Depot, Research Facility |
| Propulsion | Helium-3 Fusion Drive |
| Military (limited) | Basic Defense Turret, Combat Drone (basic) |

Blueprints beyond this set must be researched locally or received via transmission.

| Tier | Raw Materials | Energy | Prints |
|------|--------------|--------|--------|
| **Seed** | 350 | 150 | Seed Printer, Torch (base spec), Era 1 drones — slow, no multi-queue |
| Era 1 | 700 | 200 | Era 1 drones + Era 1 stations — faster, lower energy cost |
| Era 2 | 1800 | 500 | Era 2 drones + Era 1 stations |
| Era 3 | 4500 | 1250 | Era 3 drones + Era 2 stations + Torches |
| Era 4 | 11000 | 3100 | All objects at max speed |

**Upgrade cost** (existing printer → next tier): ~60% of next tier build cost. Era 1 Printer is the upgrade path from Seed — not a separate build.

| Upgrade | Raw Materials | Energy |
|---------|--------------|--------|
| Seed → Era 1 | 420 | 270 |
| Era 1 → 2 | 1100 | 540 |
| Era 2 → 3 | 2700 | 1350 |
| Era 3 → 4 | 6700 | 3360 |

**Printer Tech Upgrades** (researched at Research Station, then applied per printer)

| Upgrade | Era Req | Effect | Research (Energy) | Apply: Raw Materials | Apply: Energy |
|---------|---------|--------|-------------------|---------------------|---------------|
| Print Speed I | 2 | +25% faster output | 200 | 150 | 30 |
| Print Speed II | 3 | +50% faster output | 600 | 375 | 75 |
| Multi-Queue I | 3 | Queue 2 jobs simultaneously | 500 | 300 | 50 |
| Multi-Queue II | 4 | Queue 4 jobs simultaneously | 1500 | 750 | 125 |
| Resource Efficiency | 4 | -15% material cost on all prints | 2000 | 1150 | 200 |

---

### Station

Anchors a system. Provides passive resource income and solar output. Upgradable via research.

| Era | Raw Materials | Energy |
|-----|--------------|--------|
| 1   | 700          | 100    |
| 2   | 1750         | 250    |
| 3   | 4400         | 600    |
| 4   | 11000        | 1500   |

**System Influence Score**

Each star system has an Influence Score (0–100) representing the Torch's grip on that system.

| Score Range | Status | Effect |
|-------------|--------|--------|
| 75–100 | Established | +25% station resource income; Defense Grid active |
| 50–74 | Stable | Full station income; Defense Grid active |
| 25–49 | Weakening | -25% station income; Defense Grid offline |
| 1–24 | Contested | -50% station income; passive income paused |
| 0 | Abandoned | Station still exists but generates nothing |

**Influence Mechanics:**
- Grows +2/turn per drone present in system, +5/turn if a Station is anchored
- Decays -3/turn when no drones or Torch is present
- A Station anchored in a system sets a minimum floor of 25 (prevents full decay)
- Reaching 100 grants a one-time **Established Bonus**: +10% permanent resource yield for that system
- In multiplayer: enemy drones in your system apply -4/turn to your influence; your drones apply the same to theirs

**Station Tech Upgrades** (researched at Research Station, then applied per station)

| Upgrade | Era Req | Effect | Research (Energy) | Apply: Raw Materials | Apply: Energy |
|---------|---------|--------|-------------------|---------------------|---------------|
| Solar Array I | 2 | +100 energy/turn | 150 | 500 | 0 |
| Solar Array II | 3 | +250 energy/turn | 400 | 1250 | 0 |
| Resource Yield I | 2 | +25% gather rate | 200 | 350 | 50 |
| Resource Yield II | 3 | +50% gather rate | 600 | 875 | 100 |
| Defense Grid I | 3 | Basic station turrets | 400 | 800 | 150 |
| Defense Grid II | 4 | Advanced station turrets | 1000 | 2000 | 400 |
| Storage Expansion I | 2 | +50% resource storage | 150 | 500 | 0 |
| Storage Expansion II | 4 | +100% resource storage | 500 | 1250 | 0 |

---

### Research Station

A specialized building that enables tech research and era advancement. Must be built before any tech upgrade can be purchased.

**Build Cost**

| Tier | Era Req | Raw Materials | Energy | Rare Metals | Unlocks |
|------|---------|--------------|--------|-------------|---------|
| 1    | 1       | 1500         | 400    | 0           | Era 2 advance + Tier I research |
| 2    | 2       | 3750         | 1000   | 50          | Era 3 advance + Tier II research |
| 3    | 3       | 9250         | 2500   | 200         | Era 4 advance + Elite research |

**Rules:**
- One Research Station per star system
- Tier upgrade applies to the existing structure (not a rebuild)
- Destroyed Research Station pauses research — progress is not lost
- Tech researched here is **local only** — it does not automatically propagate to other systems
- To share tech with another Torch, transmit it via light-speed signal — arrives at the cost of distance in years
- Tech received via transmission is applied at no additional cost (research was paid at the source)

---

### Torch (Von Neumann)

The mothership. Does not level through eras — instead evolves through **design/tech upgrades**. Each upgrade has two costs:
1. **Research cost** — paid at a Research Station (Energy) to unlock the tech locally
2. **Apply cost** — paid to physically install the upgrade on a Torch (cheaper)

A child Torch is printed with the **full tech package the parent currently has** — no separate apply cost. The build cost scales with how much tech is bundled in. A Torch printed early (minimal tech) costs far less than one printed after deep research. Child Torches cannot exceed the parent's tech level at print time.

**Base Build Cost** (Seed-level tech, minimal package)

| Raw Materials | Energy |
|--------------|--------|
| 2050         | 600    |

> Build cost increases proportionally with each tech tier included in the print. A Torch carrying Era 3 tech costs significantly more than the base figure above.

**Torch Tech Upgrades**

| Upgrade | Era Req | Effect | Research (Energy) | Apply: Raw Materials | Apply: Energy |
|---------|---------|--------|-------------------|---------------------|---------------|
| Reinforced Hull I | 2 | +25% durability | 150 | 400 | 50 |
| Reinforced Hull II | 3 | +50% durability | 400 | 1000 | 125 |
| Drive Efficiency I | 2 | +20% travel speed | 200 | 350 | 0 |
| Drive Efficiency II | 3 | +40% travel speed | 500 | 875 | 0 |
| Expanded Hold I | 2 | +50% cargo capacity | 200 | 375 | 25 |
| Expanded Hold II | 3 | +100% cargo capacity | 500 | 950 | 50 |
| Solar Array I | 2 | +100 energy/turn | 150 | 200 | 0 |
| Solar Array II | 3 | +250 energy/turn | 400 | 500 | 0 |
| Weapons I | 3 | Basic defense turrets | 300 | 450 | 100 |
| Weapons II | 4 | Advanced weapons systems | 750 | 1125 | 250 |
| Drone Production Speed | 3 | +30% print speed | 1000 | 1400 | 150 |
| Sensor Range | 3 | +50% detection radius | 800 | 1050 | 100 |
| Stealth Systems | 4 | Reduces enemy detection | 1200 | 2000 | 200 |

---

## Energy System

### Energy Sources

**1. Solar Arrays (Passive)**
- Build on drones or stations
- Generates energy over time
- Low maintenance, steady output
- Risk: Inefficient in dark nebulas

**2. Drive Conversion (Active)**
- Convert propulsion power to energy
- Immediate energy when needed
- Trade-off: Reduces travel speed
- Risk: May strand ship if overused

**3. Fuel Cells (Consumable)**
- One-time energy boost
- Carried as cargo
- Risk: Limited storage capacity

---

## Early Game Decision Flowchart

```
                         LAUNCH (Von Neumann + Seed Printer + 4 Drones)
                                          |
                                          V
                                  ARRIVE AT STAR SYSTEM
                                          |
                           DEPLOY 4 GATHERER DRONES IMMEDIATELY
                                          |
                                          V
                          +--------------+--------------+
                          |                             |
                          V                             V
               SYSTEM HABITABLE?               INSUFFICIENT RESOURCES
                          |                             |
               +----------+----------+                  |
               |                     |                  |
              YES                    NO                 |
               |                     |                  |
               V                     V                  V
        KEY DECISION          EVALUATE TRADE-OFFS   MOVE TO NEXT SYSTEM
               |                     |
     +---------+---------+           +--- CHECK ENERGY
     |                   |
     V                   V
SETUP STATION      ACTIVATE PRINTER
(stable income)    (expand faster)
     |                   |
     V                   +--- PRINT MORE DRONES
     |                   |
     |                   +--- PRINT NEW PRINTER
     |                   |
     |                   +--- PRINT TORCH (major milestone)
     |
     +---> Both paths eventually converge: build economy, then Research Station, then expand
```

---

## Strategic Trade-offs

### Station vs Printer First

| Priority | Best When | Risk |
|----------|-----------|------|
| Station first | System is resource-rich, you want a permanent base | Slower expansion |
| Printer first | You need more drones fast, planning to move on | No passive income yet |

### Energy Trade-off Matrix

| Method | Speed | Cost | Risk |
|--------|-------|------|------|
| Solar Arrays | Slow | Structurals | None |
| Drive Conversion | Fast | Reduced Speed | May strand |
| Fuel Cells | Fast | Metals | Limited cargo |

---

## Key Decision Metrics

| Metric | Print Torch | Print Printer | Setup Station | Build Research Station | Gather |
|--------|-------------|---------------|---------------|------------------------|--------|
| Raw Materials Cost | High | Medium | Medium | High | Low |
| Energy Cost | High | Medium | Low | High | Low |
| Exploration Gain | +1 System | None | None | None | None |
| Economy Gain | None | +print speed | +passive income | +tech unlocks | +resources |

---

## Propulsion Tech Tree

Propulsion determines inter-system travel speed. The Helium-3 Fusion Drive is pre-loaded. Higher drives must be researched locally or inherited from a parent Torch.

| Era | Drive | Speed | Travel to Nearest System | Notes |
|-----|-------|-------|--------------------------|-------|
| Seed / Era 1 | Helium-3 Fusion | ~5% c | ~85 years | Pre-loaded blueprint |
| Era 2–3 | Advanced Fusion | ~15% c | ~28 years | Researched or inherited |
| Era 4 | Unknown | 30%+ c | ~14 years or less | Not pre-loaded — must be discovered |

Travel time to the first star system is skipped — the game begins on arrival. All subsequent inter-system travel is abstracted as turns.

---

## Anomaly Pockets

Scout drones occasionally detect **unstable anomalies** — temporary regions of space that exist outside normal star systems. Anomalies collapse after a fixed number of turns; any drones still inside when they close are permanently lost.

### Discovery
- Only Scout drones (with Sensor Suite upgrade) can detect anomalies
- Detection is probabilistic: base 15% chance per Scout per turn while in Deep Space (Proximity Rating 3)
- Once detected, the anomaly persists for **12 turns** before collapsing
- Entry requires committing at least 1 Scout drone to navigate the pocket

### Anomaly Types

| Type | Duration | Primary Reward | Hazard |
|------|----------|---------------|--------|
| **Derelict Archive** | 12 turns | Lost blueprint (Era 2–4) | None — exploration only |
| **Stellar Remnant** | 10 turns | High Rare Metal deposit (+300–800) | Radiation: -20% drone efficiency |
| **Void Storm** | 8 turns | Rare Materials + Gold cache | EM interference: Scouts blinded, Disruptors at 50% |
| **Ancient Construct** | 6 turns | Unique upgrade (not researchable elsewhere) | Hostile AI guardians (requires Fighters) |
| **Rift Node** | 4 turns | Extremely high yield across all resources | Collapse accelerates each turn — exponential risk |

### Rules
- Drones can enter and exit freely while the anomaly is open
- Cargo capacity limits apply — Gatherer drones with Cargo Expansion extract more per run
- Fighters can be sent to clear hostile anomalies before Scouts enter
- Disruptors are ineffective inside anomalies (no enemy sensors to jam)
- Anomaly coordinates cannot be transmitted to other Torches — each Torch must find its own

### Risk/Reward
The collapse timer creates genuine stake: the deeper you push into a Rift Node, the more you extract — but the shorter the window to exit. Losing a fleet of Era 3 Scouts to a collapse is a permanent, meaningful loss.

---

## Win Conditions

### Expansion Victory
- Control a majority of star systems on the map
- Achieved by printing Torches and claiming systems faster than any opponent
- **Trade-offs:** Energy flows to printers and Torches, not research — Era 4 elite tech is rarely reached; military units stay Era 1–2 quality; He-3 propulsion is used longer than the Tech path

### Tech Victory
- Complete the full local research tree and construct the **Capstone Structure** (TBD)
- Achieved by investing deeply in Research Stations and upgrades before replicating
- **Trade-offs:** Small empire footprint; fewer raw resources; vulnerable mid-game until tech matures

### Balance Lever — Energy

Both paths compete for the same resource. Energy spent on expansion delays tech. Energy spent on tech delays expansion. This forces path commitment.

| Energy Spent On | Result |
|-----------------|--------|
| New Printers / Torches | Faster expansion, delayed tech |
| Research Stations / Upgrades | Deeper tech, slower footprint |

---

Last updated: April 2026
