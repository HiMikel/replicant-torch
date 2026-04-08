# Eve Online — Comprehensive Gameplay Reference

> Research compiled for Replicant Torch design. Covers all major Eve Online systems in depth.
> Use alongside `GAMEPLAY_A.md` (adaptation notes) and `GAMEPLAY_E.md` (RTS design doc).

---

## Table of Contents

1. [What Makes Eve Online Unique](#1-what-makes-eve-online-unique)
2. [Core Gameplay Loop](#2-core-gameplay-loop)
3. [Space Regions and Security Status](#3-space-regions-and-security-status)
4. [Factions and Lore](#4-factions-and-lore)
5. [Character Skills and Progression](#5-character-skills-and-progression)
6. [Ship Classes and Combat Fitting](#6-ship-classes-and-combat-fitting)
7. [Combat Mechanics — PvE and PvP](#7-combat-mechanics--pve-and-pvp)
8. [Resource Gathering and Mining](#8-resource-gathering-and-mining)
9. [Economy and Market Systems](#9-economy-and-market-systems)
10. [Industry and Manufacturing](#10-industry-and-manufacturing)
11. [Corporation and Alliance System](#11-corporation-and-alliance-system)
12. [Sovereignty and Territory Control](#12-sovereignty-and-territory-control)
13. [Mission Types and PvE Content](#13-mission-types-and-pve-content)
14. [Exploration](#14-exploration)
15. [Wormhole Space (J-Space)](#15-wormhole-space-j-space)
16. [Abyssal Deadspace](#16-abyssal-deadspace)
17. [Criminal Mechanics, Piracy, and War](#17-criminal-mechanics-piracy-and-war)
18. [Monetization: Alpha, Omega, and PLEX](#18-monetization-alpha-omega-and-plex)

---

## 1. What Makes Eve Online Unique

Eve Online (launched 2003, developer CCP Games) is the defining example of a **sandbox MMO** and stands apart from almost every other space game on the following axes:

### Single-Shard Universe
All ~500,000 active players exist in one shared universe — New Eden — with roughly 7,800 star systems. There are no separate servers or shards. Every market transaction, war, and territorial shift happens in a single persistent world. This creates genuine scarcity, real politics, and emergent historical events.

### Player-Driven Everything
- **Economy**: Nearly every item in the game is manufactured by players from raw materials. NPC vendors sell only basic commodities and skillbooks. Prices are entirely supply-and-demand.
- **Content**: The most significant wars, empires, economic crashes, and political betrayals are player-created. CCP does not script the major narrative; they set rules and let it emerge.
- **Territory**: All null-security space is claimed, held, or fought over by player alliances — not NPC factions. A single alliance can control hundreds of star systems.

### Meaningful Loss
Ships, modules, and cargo are permanently destroyed when a player is killed. There is no "respawn your gear." Losing an expensive ship has real economic consequence. This creates genuine stakes and emotional investment absent in most MMOs.

### No Level Cap — Pure Skill Investment
There is no "level" in the traditional sense. Progress is measured in skill points trained over real time. A new player and a veteran fly the same ships; the veteran simply has more options and efficiency. Gear and strategy matter more than grinding hours of combat.

### Unforgiving Freedom
Actions forbidden in virtually every other MMO are permitted and even culturally celebrated in Eve: scamming players in chat, suicide-ganking freighters in "safe" space, infiltrating corporations to steal their assets, market manipulation, espionage. The game has one rule: if CCP's mechanics allow it and it doesn't violate the EULA, it is legal.

---

## 2. Core Gameplay Loop

Eve has no single gameplay loop — it is better described as a set of interlocking economic and military incentives. A typical player engages in one or more of the following career paths:

### Career Paths

| Path | Description | Entry Barrier |
|------|-------------|--------------|
| **Combat / Missions** | PvE security missions for NPC agents; scales from L1 (frigate) to L4 (battleship) | Very low |
| **Mining** | Extract ore from asteroids, refine and sell or manufacture | Very low |
| **Exploration** | Scan down cosmic signatures; loot relic/data sites; dive into wormholes | Low |
| **Trading** | Buy low, sell high across regional markets; station trading | Low |
| **Manufacturing** | Build ships, modules, ammunition from blueprints and raw materials | Medium |
| **Faction Warfare** | Join empire militias; capture low-sec systems in organized PvP | Medium |
| **Piracy / PvP** | Hunt other players for kills and loot; solo or gang | Medium |
| **Wormhole Life** | Live in disconnected J-Space; run high-value combat sites | High |
| **Null-sec Politics** | Join or found an alliance; claim and defend sovereignty | Very High |
| **Market/Industry Empire** | Operate manufacturing chains and trading empires at scale | High |

### The Macro Loop
1. Earn ISK through chosen activity
2. Buy/build better ships and equipment
3. Train skills to access better activities
4. Expand into more dangerous and profitable space
5. Join/form groups (corporations, alliances) to tackle larger objectives
6. Compete for territory, market share, and political influence

### What Drives Engagement
- **Skill queue anxiety** — Players always want to be training something useful, creating long-term planning investment.
- **Loss aversion** — Expensive ships create genuine stakes in every engagement.
- **Political intrigue** — Alliances rise and fall; large players become famous or infamous.
- **Emergent narrative** — The biggest wars produce real news coverage.

---

## 3. Space Regions and Security Status

New Eden is divided into approximately 7,800 star systems organized into regions and constellations. Each system has a **security status** from −1.0 to 1.0.

### Security Bands

| Band | Security Range | CONCORD? | PvP Rules | Resources | Notes |
|------|----------------|----------|-----------|-----------|-------|
| **High-Sec** | 0.5 – 1.0 | Yes (punitive) | Ganking possible but punished | Basic ores | Safe for new players |
| **Low-Sec** | 0.1 – 0.4 | No (sentry guns only) | Nearly open PvP | Better ores, moon mining | Faction Warfare zone |
| **Null-Sec (NPC)** | −1.0 – 0.0 | No | Open PvP | Best ores, combat sites | NPC pirate factions hold space |
| **Null-Sec (Sov)** | −1.0 – 0.0 | No | Open PvP | Best ores, alliance upgrades | Player alliances control space |
| **Wormhole Space** | −1.0 | No | Open PvP | Wormhole-exclusive ores, rare gas | No local intel; C1–C6 classes |
| **Pochven** | −1.0 | No | Open PvP | Triglavian resources | Torn-out systems; Triglavian content |

### Key Geographic Facts
- **Jita 4-4** (The Forge region) is the largest trade hub in New Eden — the economic center of the universe.
- **Amarr**, **Dodixie**, **Rens**, and **Hek** are secondary trade hubs in their respective regions.
- **Delve**, **Fountain**, **Querious** — historically the most contested null-sec regions.
- Null-sec is organized into **regions** (roughly 50–80 systems each), **constellations** (5–10 systems), and individual **star systems**.

### Local Chat and Intel
In K-space (known space), the **Local** chat channel shows every player in the system — a critical intelligence tool. In wormhole space and Pochven, players do NOT appear in Local unless they type in it — making stealth and ambush fundamental to those regions.

---

## 4. Factions and Lore

### The Four Dominant Empires

| Empire | Identity | Ship Style | Weapon System | Standing Allies |
|--------|----------|------------|---------------|-----------------|
| **Amarr Empire** | Feudal theocracy, slaveholders, largest empire | Armor tank, slow | Lasers (no ammo cost, capacitor hungry) | Khanid Kingdom |
| **Caldari State** | Mega-corporate state, collectivist capitalism | Shield tank, missile focus | Missiles (flexible range) + Railguns | None (rivals Gallente) |
| **Gallente Federation** | Liberal democracy, multi-racial, pleasure-focused | Armor tank, close range | Blasters (short range, high DPS) + Drones | Minmatar Republic |
| **Minmatar Republic** | Tribal confederation, formerly enslaved by Amarr | Speed/kite, versatile | Projectiles (no capacitor use, ammo types) | Gallente Federation |

### Faction Relationships
- **Amarr vs. Minmatar**: Historical enemies; Minmatar were enslaved by Amarr for centuries. Thousands of Minmatar remain enslaved.
- **Caldari vs. Gallente**: Former war; Caldari broke away from Gallente federation. Cold rivalry continues.
- **Gallente + Minmatar**: Allies; Gallente helped Minmatar rebellion.
- The **Ammatar Mandate** is a Minmatar tribe that collaborated with Amarr and now serves as an Amarr client state.
- The **Khanid Kingdom** broke from Amarr when a royal heir refused tradition; now a semi-autonomous Amarr ally.

### NPC Standings System
Every player character has a standing with each NPC faction (range: −10 to +10):
- **+5.0+**: Access to faction space without harassment; advanced mission agents
- **0 to −2.0**: Neutral; faction navy may demand payment or inspect
- **−5.0 or lower**: Faction navy actively hunts you in their space
- **Derived standings**: Improving standing with one faction can raise/lower standing with allied/enemy factions automatically

### Major Pirate Factions (NPC Antagonists)

| Faction | Region | Specialty |
|---------|--------|-----------|
| **Guristas Pirates** | Caldari null-sec | Missiles, electronic warfare |
| **Angel Cartel** | Minmatar null-sec | Speed, projectiles |
| **Serpentis** | Gallente null-sec | Armor, webs, drones |
| **Blood Raiders** | Amarr null-sec | Neuting (capacitor drain), armor |
| **Sansha's Nation** | Incursion events | Electronic warfare, fast tackle |
| **Triglavian Collective** | Pochven / Abyssal | Mutadaptive lasers (escalating DPS) |

---

## 5. Character Skills and Progression

### How the Skill System Works
Skills are the core progression mechanic in Eve Online. Unlike XP-based leveling, skills train in real time regardless of whether the player is logged in.

- **494 distinct skills** as of 2025 (Omega accounts); 172 available to Alpha (free) accounts
- Skills train passively in a queue; you can be offline and training continues
- Completing all skills would take over **24 years** of training time
- Skills are permanent once trained and cannot be destroyed (only extracted via skill injectors, a paid item)

### Skill Attributes
Each character has five attributes that determine how fast skills train:

| Attribute | Primary Skills |
|-----------|----------------|
| **Perception** | Gunnery, Missiles, Spaceship Command |
| **Willpower** | Armor, Shields |
| **Intelligence** | Science, Engineering, Electronics |
| **Memory** | Industry, Mechanics, Rigging |
| **Charisma** | Social, Corporation Management, Trade |

Training speed formula (Omega): `SP/min = Primary Attribute + (0.5 × Secondary Attribute)`

Default attributes are 20 each (Charisma: 19). With max implants (+5 each), a player gains ~45 SP/minute.

### Skill Levels
Each skill has 5 levels. The SP required per level follows a geometric progression — Level 5 requires as much SP as Levels 1–4 combined. Skill ranks multiply these requirements (Rank 1 = fast to train; Rank 14 = extremely slow).

### Skill Categories (23 total)

| Category | Example Skills |
|----------|----------------|
| **Spaceship Command** | Frigate, Cruiser, Battleship, Capital Ships |
| **Gunnery** | Small/Medium/Large Turrets, Weapon Upgrades, Trajectory Analysis |
| **Missiles** | Rockets, Cruise Missiles, Heavy Assault Missiles |
| **Drones** | Drone Interfacing, Fighters, Mining Drones |
| **Armor / Shields / Engineering** | Hull Upgrades, Shield Compensation, Power Grid Mgmt |
| **Navigation** | Warp Drive Operation, Jump Drive Calibration |
| **Science** | Research, Metallurgy, Astrogeology (mining) |
| **Industry** | Production Efficiency, Mass Production |
| **Electronic Systems** | Propulsion Jamming, Sensor Linking, ECM |
| **Trade** | Broker Relations, Margin Trading, Accounting |
| **Social** | Connections, Diplomacy, Criminal Connections |
| **Fleet Support** | Leadership, Wing Command, Information Warfare |

### "The Magic 14"
Fourteen skills benefit every ship and every playstyle. Veteran players recommend training all 14 to Level 4–5 before specializing:
- Capacitor Management, Capacitor Systems Operation
- CPU Management, Power Grid Management
- Thermodynamics, Hull Upgrades
- Mechanics, Shield Management, Shield Operation
- Navigation, Evasive Maneuvering, Warp Drive Operation
- Targeting, Long Range Targeting

### Enhancing Training Speed
- **Implants**: Neural attribute enhancers (+1 to +5) in dedicated implant slots
- **Neural Remaps**: Once per year, redistribute attribute points (useful for specialist training)
- **Cerebral Accelerators**: Temporary items granting +3 to +12 attribute bonuses (limited duration)
- **Skill Injectors**: Buy another player's extracted skill points; pay ISK, skip training time

### Alpha vs. Omega Accounts
| Feature | Alpha (Free) | Omega (Subscribed) |
|---------|-------------|-------------------|
| Skills available | 172 of 494 | All 494 |
| Max skill points | ~20.4M | Unlimited (604M+ possible) |
| Training speed | 0.5× | 1× |
| Ship access | Tech 1 up to Battlecruiser | All ships |
| Queue runs when offline | No (pauses at 5M SP) | Yes |

---

## 6. Ship Classes and Combat Fitting

### Ship Size Progression

Ships scale in a clear progression. Larger ships gain HP, slots, and damage but lose speed, agility, and ability to hit small fast targets.

| Class | Typical Role | Mass / Speed | PvE Use | PvP Use |
|-------|-------------|-------------|---------|---------|
| **Frigate** (T1) | Tackle, scout, fast DPS | Tiny / Very fast | L1 missions | Solo PvP, tackle fleets |
| **Destroyer** (T1) | Anti-frigate, small fleets | Small / Fast | L1–L2 missions | Roaming gangs |
| **Cruiser** (T1) | Versatile workhorse | Medium / Moderate | L2–L3 missions | Gang warfare |
| **Battlecruiser** (T1) | Heavy DPS, fleet anchor | Large / Slow | L3–L4 missions | Fleet doctrine ships |
| **Battleship** (T1) | Maximum sub-cap DPS/tank | Very large / Slow | L4 missions solo | Fleet warfare, blobs |
| **Capital: Carrier** | Fighter deployment, support | Massive / Jump drive | High-end anomalies | Anti-subcap, triage |
| **Capital: Dreadnought** | Structure and capital siege | Massive / Jump drive | None | Capital-on-capital |
| **Capital: Force Auxiliary** | Capital logistics | Massive / Jump drive | None | Triage/logistics in cap battles |
| **Supercapital: Supercarrier** | Heavy Fighter delivery | Enormous / Jump drive | None | Anti-capital warfare |
| **Supercapital: Titan** | Doomsday weapons, jump bridges | Colossal / Jump drive | None | Strategic warfare, fleet bridging |

### Technology Tiers

| Tier | Description | How Obtained |
|------|-------------|-------------|
| **Tech 1** | Baseline ships; affordable, versatile | NPC market or player manufacture |
| **Tech 2** | Specialized variants; significant bonuses to a narrow role | Player manufacture via Invention |
| **Tech 3 Strategic Cruiser** | Highly flexible; modular subsystems change role | Wormhole material manufacture |
| **Tech 3 Destroyer** | Versatile destroyer variants | Wormhole material manufacture |
| **Faction (Navy)** | Empire navy variants; enhanced T1 hull stats | LP stores or player market |
| **Faction (Pirate)** | Pirate-designed hulls; unique cross-faction bonuses | Exploration drops or player market |

### Ship Fitting System
Every ship has three categories of module slots and two fitting constraints:

**Module Slots:**
- **High Slots**: Weapons (turrets, missiles), mining lasers, remote repair, utility (cloaks, salvagers)
- **Mid Slots**: Shield tank modules, propulsion, electronic warfare, tackle (warp disruptors/scramblers)
- **Low Slots**: Armor tank, damage amplifiers, capacitor, cargo/speed enhancements
- **Rig Slots**: Permanent modifications (cannot be removed without destruction); amplify specific stats

**Fitting Constraints:**
- **Powergrid (PG)**: Hard power budget; large weapons and shield modules consume most
- **CPU**: Processing budget; electronic modules and certain rigs consume most

**Rigs**: Semi-permanent modules that occupy dedicated rig slots. Small/Medium/Large rigs for different ship sizes. Each rig has a **calibration cost** (the rig equivalent of fitting constraints). Once fitted, rigs are destroyed if removed.

### The Four Tank Types

| Tank | Approach | Modules Used | Ship Affinity |
|------|----------|--------------|---------------|
| **Shield Tank** | Absorb damage with shields; regen fast | Shield Extenders, Hardeners, Boosters | Caldari, Minmatar |
| **Armor Tank** | Absorb damage with armor plate/active reps | Armor Plates, Hardeners, Armor Reps | Amarr, Gallente |
| **Hull Tank** | Rare; use hull HP as buffer (fragile but cheap) | Bulkheads | Rare / niche |
| **Speed Tank** | Avoid being hit by staying fast or small sig | Afterburners, MWDs | Frigates, T3 Destroyers |

### Weapon Systems

| Weapon | Range | DPS Profile | Capacitor Use | Notes |
|--------|-------|-------------|--------------|-------|
| **Energy Turrets (Lasers)** | Long | High sustained | Very high | Amarr; ammo = free (crystals wear) |
| **Hybrid Turrets (Rails/Blasters)** | Medium / Short | Very high short-range | Moderate | Caldari/Gallente |
| **Projectile Turrets (Artillery/AC)** | Variable | Burst / sustained | None | Minmatar; ammo costs matter |
| **Missiles** | Variable by type | Flexible vs. sig/speed | Low | Caldari; bypass close-range penalty |
| **Drones** | Short-medium (auto) | Variable size | None | Gallente especially; autonomous |

---

## 7. Combat Mechanics — PvE and PvP

### Core Combat Loop
Combat is real-time, point-and-click targeting. There is no skill-shot aiming. Instead, **damage application** depends on:
- **Transversal velocity**: The perpendicular speed between attacker and target. High transversal = turrets miss.
- **Signature radius**: Larger targets are easier to hit. Small fast frigates are hard to hit with large guns.
- **Optimal and falloff ranges**: Turrets have optimal range (full damage) and falloff (declining damage). Missiles have max range cutoffs.
- **Tracking speed**: Turrets must "track" (rotate) fast enough to hit moving targets.

### Electronic Warfare (EWAR)
A major second-layer system that separates Eve from most space games:

| EWAR Type | Effect | Countered By |
|-----------|--------|-------------|
| **ECM (Jamming)** | Breaks target lock; target cannot lock anything | ECCM (sensor strength) |
| **Sensor Dampening** | Reduces target lock range or lock speed | Sensor Boosters |
| **Weapon Disruption** | Reduces turret optimal/falloff or missile range/flight time | Nothing direct |
| **Target Painting** | Increases target's signature radius (makes them easier to hit) | Nothing direct |
| **Stasis Webifier** | Reduces target's speed (massive PvP tool) | Nothing direct |
| **Warp Disruptor / Scrambler** | Prevents target from entering warp (essential PvP module) | Warp Core Stabilizers |
| **Neuting (Capacitor drain)** | Drains capacitor; disables shield boosters, prop mods, weapons | Capacitor Batteries |

### Overheating
Modules can be **overheated** (right-click or hotkey) to temporarily exceed their normal performance at the cost of heat damage accumulating on the module. Overheated modules eventually burn out (become unusable). Nanite Repair Paste can repair heat damage mid-combat. This adds a last-resort risk/reward mechanic.

### PvE Differences vs. PvP
| Aspect | PvE (NPCs) | PvP (Players) |
|--------|------------|---------------|
| Damage prediction | Predictable damage types per faction | Unpredictable |
| Tackle | NPCs rarely escape; warp disruptors optional | Warp disruption essential |
| Rep strategy | Active reps are efficient (predictable incoming) | Buffer tanks preferred |
| Propulsion | Afterburner preferred (cap efficient) | MWD preferred (raw speed) |
| Engagement choice | You always choose when to engage | Opponent may dictate terms |

### Capital Combat
Capital ships cannot use normal stargates — they travel via **jump drives** (consume liquid ozone; have cooldown range limits). Capital battles are strategic deployments, not casual roams. Key mechanics:
- **Cynosural fields (cynos)**: A ship deploys a "cyno beacon" to allow capitals to jump to that location. Killing the cyno prevents reinforcement.
- **Siege Module** (Dreadnoughts): Immobilizes the ship but multiplies DPS and local repair ability. Irreversible for 5 minutes.
- **Triage** (Force Auxiliaries): Immobilizes and turns the ship into a mobile logistics powerhouse.
- **Doomsday Devices** (Titans): Single-target or AoE superweapons with 10-minute cooldowns.
- **Jump Portal** (Titans): Allow entire subcapital fleets to teleport across the galaxy.

---

## 8. Resource Gathering and Mining

### Mining Overview
Mining is the primary resource extraction loop. It converts raw asteroid ore into minerals used for manufacturing. There are three distinct mining types:

### 1. Ore Mining (Asteroids)
- Ships with **mining lasers** or **strip miners** lock onto an asteroid and cycle the module
- Each cycle extracts a quantity of ore; ore is transferred to cargo hold
- Once hold is full, the player returns to a station or Orca/Rorqual fleet booster to deposit
- Ore must be **reprocessed (refined)** at a station to yield base minerals

**Ore Types by Security Zone:**

| Security | Ore Names | Primary Minerals |
|----------|-----------|-----------------|
| High-sec | Veldspar, Scordite, Pyroxeres, Plagioclase | Tritanium, Pyerite, Mexallon, Isogen |
| Low-sec | Omber, Kernite, Jaspet, Hemorphite, Hedbergite | Isogen, Nocxium, Zydrine |
| Null-sec | Arkonor, Bistot, Crokite, Spodumain, Gneiss, Dark Ochre, Mercoxit | Megacyte, Zydrine, Morphite |
| Triglavian (Pochven) | Bezdnacine, Rakovene, Talassonite | Triglavian-specific materials |
| Wormhole | Arkonor, Bistot, Gneiss, Kernite, Omber | Mix of null/low minerals |

**Mining Waste**: Since the Uprising expansion, mining has a small waste percentage (ore destroyed, not extracted). Higher-tier ships and skills reduce waste.

### 2. Ice Harvesting
- Uses **ice harvesting modules** (only one per ship; 50-second cycle time)
- Ice is found in **ice anomalies** in specific systems (replenish on a timer, not belt-based)
- Ice yields **ice products**: Heavy Water, Liquid Ozone, Helium Isotopes, Hydrogen Isotopes, Nitrogen Isotopes, Oxygen Isotopes, Strontium Clathrates
- Ice products are fuel for **Player Owned Structures (POS/Upwell)** and capital ship jump drives
- High ISK-per-volume ratio; ice anomalies are competitive and time-gated

### 3. Gas Cloud Harvesting
- Uses **gas cloud harvesters** fitted to Tech 1/2 frigates or dedicated ships
- Gas is found in:
  - **Nebula sites** in w-space (C1–C6) — high-value gases (Fullerenes) for Tech 3 manufacture
  - **Low/null-sec gas sites** — Booster gas (drug manufacturing)
  - **High-sec gas sites** — Low-value industrial gas
- Gas clouds defend themselves: "Sleepless Guardian" NPCs appear ~20 minutes after a player enters a site

### 4. Moon Mining
- Requires a **Refinery structure** anchored within 250 km of a moon in 0.5 sec space or lower
- Fitted with a **Moon Drill** module; operates on a configurable timer
- The Moon Drill fires a beam that extracts a "chunk" of the moon into space as a large asteroid-like object
- Players mine the chunk with mining barges/exhumers; chunk is finite (limited runs per extraction)
- Moon ore yields **moon materials** used primarily in Tech 2 component manufacturing
- Moon mineral types (R4–R64) determine value; rarer moons exist only in null/low-sec

### Mining Ships

| Tier | Ship | Notes |
|------|------|-------|
| Frigate | Venture | Beginner; free from career missions; 2 mining lasers; ore hold 5,000 m³ |
| Destroyer | Pioneer | Mid-tier step up; improved yield |
| Barge: Defense | Procurer | Highest tank; safest in contested space |
| Barge: Capacity | Retriever | Largest ore hold; best solo miner for high-sec |
| Barge: Yield | Covetor | Highest mining yield; low tank (needs fleet support) |
| Exhumer: Defense | Skiff | T2 Procurer; extreme tank; moon mining specialist |
| Exhumer: Capacity | Mackinaw | T2 Retriever; ice harvesting specialist |
| Exhumer: Yield | Hulk | T2 Covetor; maximum yield; fleet mining |
| Industrial Cmd | Porpoise | Small fleet booster; can compress ore; fits in wormholes |
| Industrial Cmd | Orca | Large fleet booster; drone mining; huge ore hold; industrial command bursts |
| Industrial Cmd | Rorqual | Capital; nullsec fleet booster; drone mining; jump drive; PANIC module (invincibility) |

### Mining Fleets
Typical mining fleet composition:
- **Miners**: Barges or exhumers providing primary yield
- **Fleet Booster**: Orca or Rorqual providing **Mining Foreman Command Bursts** (increase yield, reduce cycle time, increase drone mining)
- **Hauler**: Transports ore from jetcan or fleet booster hold to station
- **Combat Ships**: In dangerous space, a dedicated escort kills belt rats or scouts for hostiles

---

## 9. Economy and Market Systems

### ISK (Interstellar Kredits)
The primary in-game currency. Earned through:
- Mission rewards, bounties (killing NPCs)
- Selling ore, materials, and manufactured goods
- Trading on the market
- Providing services (hauling, PvP contracting)

ISK is printed into existence (faucets) and removed (sinks):
- **Faucets**: NPC bounties, mission rewards, insurance payouts
- **Sinks**: Transaction taxes, broker fees, manufacture costs, skill book NPC prices, structure fuel

CCP employs a full-time economist (Chief Economist) to analyze the Eve economy.

### The Player Market
- Eve's market is a **limit order book** — players post buy orders (bids) and sell orders (asks)
- Orders are **region-scoped** (you can only buy/sell in the same region without contract workarounds)
- Market fees: broker fee (based on standing/skill) + transaction tax
- Players with high social skills and good faction standing pay lower fees
- The market displays historical price data, volume, and allows charting

**Key economic locations:**
- **Jita 4-4 (The Forge)**: The main market hub; the economic capital of New Eden; most items are cheapest here due to volume
- **Amarr VIII**: Second largest market; Amarr space goods tend to be cheaper here
- **Dodixie** (Gallente), **Rens** and **Hek** (Minmatar): Regional secondary hubs

### Price Determination
Supply and demand are entirely player-driven. Prices fluctuate based on:
- **War**: Large wars consume enormous quantities of ships and ammunition; prices spike for relevant goods
- **Patch changes**: New expansions obsolete some items and make others suddenly desirable
- **Mining disruptions**: Ganking campaigns or alliances controlling key null-sec mining regions affect mineral supply
- **Manufacturing bottlenecks**: If a T2 component requires moon materials only found in one region, that material is expensive

### Station Trading
Players can camp a station and act as market makers:
- Post buy orders below market price; post sell orders above market price
- Profit is the **spread** between buy and sell
- No activity required except updating orders as the market moves
- Some traders make billions per day doing nothing but order updates; completely passive

### PLEX
PLEX (Pilot's License Extension) is an in-game item that can be:
- Traded on the player market for ISK (price fluctuates with supply/demand; roughly 4–6 billion ISK per PLEX as of 2025–2026)
- Redeemed for 30 days of Omega (subscription) time (500 PLEX = 30 days)
- Used in the New Eden Store for cosmetic items and services

This creates a direct link between real money and ISK: a player can buy PLEX with real money, sell it in-game for ISK, and effectively "buy" in-game progress. Conversely, a skilled player can earn enough ISK to fund their subscription entirely through gameplay.

### Loyalty Points (LP)
A secondary currency earned from NPC missions, faction warfare, and incursions:
- LP is faction-specific (Caldari Navy LP, Guristas LP, etc.)
- Spent at LP stores to buy faction ships, faction modules, implants, and skillbooks
- LP store items are then sold on the player market — converting LP to ISK
- Some items are LP-store exclusive, making running missions or FW valuable for item access

---

## 10. Industry and Manufacturing

### Overview
Industry is the manufacturing pillar of Eve's economy. Almost every ship, module, and consumable is player-manufactured from raw materials.

### Blueprint Originals (BPOs) vs. Blueprint Copies (BPCs)
| Type | Runs | Researchable? | How Obtained |
|------|------|---------------|-------------|
| **BPO** | Unlimited | Yes (ME/TE research) | NPC market (fixed price) |
| **BPC** | Limited (1–300 depending on type) | No | Copied from BPOs; looted from exploration; dropped by NPCs |

### Blueprint Research Stats
- **Material Efficiency (ME)**: 0–10%; reduces input materials required. ME10 = 10% less materials needed.
- **Time Efficiency (TE)**: 0–20%; reduces manufacturing time. TE20 = 20% faster builds.
- Research takes time (hours to months for large ships); done at industrial facilities.
- **Important rounding rule**: Material efficiency rounding is applied per job, not per run — running one job for 10 runs uses less total material than running 10 separate jobs of 1 run each.

### Manufacturing Process
1. **Acquire blueprint** (BPO from NPC market or BPC from copy/loot)
2. **Gather materials** (ore → refine → minerals; or buy minerals from market)
3. **Install manufacturing job** at an industrial facility (station or player structure)
4. **Pay job cost** (system cost index × material value × SCC surcharge; varies by system)
5. **Wait for job completion** (time scales with ship size; minutes for ammo, weeks for titans)
6. **Collect finished item**

### Tech 2 Invention
T2 items cannot be directly blueprinted from NPC-sold BPOs. They must be **invented**:
1. Obtain a T1 BPC of the corresponding item
2. Acquire 2 **Datacores** (faction/science skill specific; obtained from R&D agents or exploration)
3. Optionally add a **Decryptor** (changes success chance, ME, TE, run count)
4. Run an Invention job (time-based; success is probabilistic)
5. Base success: ~35–50% depending on ship size and skills
6. Success → receive T2 BPC with limited runs (1 run for ships; 10 runs for modules/ammo)
7. Use T2 BPC + advanced components (from moon materials) to manufacture the T2 item

### Tech 3 Manufacturing
Tech 3 ships (Strategic Cruisers, Destroyers) use a wholly different manufacturing chain:
- **Sleeper Components**: Dropped from Sleeper NPCs in wormhole sites
- **Ancient Relics**: Found via relic sites in wormholes (hacking minigame required)
- **Wormhole Gas**: Harvested from wormhole gas clouds
- Components are combined to make Tech 3 subsystems; subsystems are combined to assemble the hull
- T3 Strategic Cruisers are modular — 4 subsystem slots, each with 3 options, granting 81 possible configurations per ship

### Capital Ship Manufacturing
- Requires **Capital Ship Construction** skill (Rank 14 — extremely slow to train)
- Capital components are manufactured from advanced materials; assembled in lowsec or nullsec (cannot be assembled in highsec)
- Titan construction can take months and cost 100+ billion ISK in materials
- Often a group/alliance activity with dedicated industrial corps supplying components

### Reaction Chains
Many advanced materials require **reactions** — combining multiple inputs in a Refinery structure to produce outputs. Reactions are the industrial supply chain for:
- T2 components (from moon materials)
- Advanced polymers (from wormhole gas)
- Fuel blocks (for structure operation)
Reactions add industrial depth: large alliances run dedicated reaction chains to vertically integrate supply.

---

## 11. Corporation and Alliance System

### Corporations
The player guild/clan analog. All players start in NPC "rookie" corporations but can join or create player corporations at any time.

A corporation provides:
- **Shared wallet** with roles-based access (executor, accountant, director, member)
- **Shared hangars** with configurable access
- **Corporation chat channel**
- **Ability to declare war** on other corporations
- **Tax rate** on member PvE income (typically 0–15%)
- **Member roles** for managing fleets, structures, and diplomacy

Corporation management includes configurable roles (full member access, director, manager, etc.) with granular permissions. Corporations can own structures (Upwell Structures) in space.

### Alliances
Multiple corporations can form or join an **Alliance**:
- An alliance can hold sovereignty in null-sec space
- Alliances have an executor corporation that sets overall direction
- Inter-alliance diplomacy is player-managed — blue standings (allied), neutral, red (hostile)
- Large alliances may have hundreds of corporations and tens of thousands of members

### Notable Alliance Structures
Eve's political history is driven by coalitions of alliances. Famous examples:
- **Goonswarm Federation** (historically largest alliance, based in Delve null-sec)
- **Pandemic Horde** (large recruitment alliance)
- **Test Alliance Please Ignore** (TAPI)
- **Eve University** (the largest player-run educational institution)

### Blue Donuts and Political Meta
Large alliances form non-aggression pacts with neighbors, creating "blue donuts" where the map shows one contiguous block of allied null-sec space. This reduces conflict and is widely criticized as stagnation. "Content" in null-sec often requires deliberately breaking these pacts.

---

## 12. Sovereignty and Territory Control

### How Sovereignty Works
Sovereignty (Sov) is the ability of a player alliance to claim ownership of null-sec star systems. A claimed system provides:
- Right to install **Sovereignty Hub upgrades** (ore anomalies, combat site upgrades, jump bridges, cyno beacons, supercapital construction)
- Station ownership (docking rights controlled by the alliance)
- Political identity (alliance name on the in-game map)

### Key Structures
- **Sovereignty Hub (Sov Hub)**: The central structure of system control (replaced the old IHub + TCU system in Equinox, June 2024)
- **Upwell Structures (Citadels/Engineering Complexes/Refineries)**: Player-owned stations that can be anchored anywhere in null-sec (or low-sec/high-sec with restrictions)

### The Entosis Mechanic
Capturing or attacking sov structures requires the **Entosis Link** module:
- Fit to a ship; activates on the target structure
- Requires uncontested operation for a set duration
- Multiple Entosis Links on one target provide NO stacking bonus — one ship per structure
- If both attacker and defender activate links simultaneously, progress pauses
- Structures slowly regenerate "health" when not contested

### Capture Process
1. Activate Entosis Link on target Sov Hub → structure enters reinforcement
2. Two days later, **Command Nodes** spawn randomly across the constellation
3. Each node can be captured with an Entosis Link
4. Attackers need to capture 9+ nodes; defenders need 6+
5. Each captured node moves a progress bar 7%
6. The winner of the node game wins or defends the system

### Activity Defense Multiplier (ADM)
The ADM determines how long a sov structure's reinforcement timer is:

`Reinforcement time = 10 minutes × ADM`

ADM is composed of:
- **Strategic Index** (0–5): Set manually by alliance; higher = longer reinforcement
- **Military Index** (0–5): Driven by combat activity in the system (ratting)
- **Industrial Index** (0–5): Driven by mining activity in the system

Maximum ADM = 6× → 60-minute reinforcement window. Low ADM = vulnerable. Active systems are much harder to take.

### Sov Hub Upgrades (Post-Equinox 2024)
Upgrades now require **Power** (generated by the system's star), **Workforce** (harvested from planets via Orbital Skyhooks), and for some upgrades, **Reagents** (superionic ice, magmatic gas):

| Upgrade Category | Example Effects |
|-----------------|-----------------|
| **Strategic** | Jump bridges, cyno beacons, supercapital shipyards |
| **Industrial** | Guaranteed ore anomalies (7 mineral types; 3 tiers) |
| **Military** | Increased combat anomaly spawns |

---

## 13. Mission Types and PvE Content

### Security Missions (1–5)
The bread-and-butter PvE activity, especially for new players:

| Level | Ship Required | Location | Notable |
|-------|--------------|----------|---------|
| **L1** | Frigate | Highsec | Tutorial level; minimal rewards |
| **L2** | Cruiser | Highsec | Introduction to combat mechanics |
| **L3** | Battlecruiser | Highsec | Decent ISK/hour for newer players |
| **L4** | Battleship | Highsec | Primary solo PvE endgame; ~40–80M ISK/hr |
| **L5** | Fleet / Capital | Lowsec | Highest rewards; require group play |

Each level has three mission types: **combat** (kill NPCs), **courier** (transport cargo), **mining** (extract a specific ore type).

Mission rewards include ISK, Loyalty Points (LP), and faction standing gains/losses.

### Incursions
Large-scale, constellation-wide PvE events where Sansha's Nation invades. Require organized fleets of 10–40+ players:

| Site Type | Fleet Size | ISK/Hour |
|-----------|-----------|---------|
| **Vanguard** | 10 ships | ~80–100M ISK/hr/player |
| **Assault** | 20 ships | ~100–170M ISK/hr/player |
| **Headquarters (HQ)** | 40 ships | 300–500M+ ISK/hr/player |

Incursions apply constellation-wide debuffs (reduced resistances, weapon damage) that scale by proximity to the Sansha mothership. Killing the mothership ends the incursion and pays a large CONCORD LP bonus.

Key mechanics:
- Sansha NPCs use ECM, webs, neuts, and very fast tackle
- Ships must fit for Sansha-specific tank (Thermal/EM damage)
- Public incursion communities (Warp to Me, The Valhalla Project) provide organized fleet access
- Considered a primary ISK-making method for veteran players

### Abyssal Deadspace
A self-contained instanced PvE mode entered via **Filaments**:
- Filament types: Electrical, Firestorm, Exotic, Gamma, Dark; each applies unique weather bonuses and penalties
- Tiers 0–6 (Tranquil → Cataclysmic); higher tiers = better rewards, extreme difficulty
- **Timer**: 20 minutes to complete 3 sequential pockets or lose ship AND capsule
- Fleet sizes: Solo cruiser; 3-frigate fleet; 2-destroyer fleet
- Rewards: Mutaplasmids (randomize module stats), exclusive blueprint fragments, Abyssal modules
- Tiers 4–5 require Omega; running T4–T5 in high-sec grants a suspect flag on exit (any player can attack you)

**Mutaplasmids** are a major Abyssal-exclusive reward: apply to compatible modules to randomly alter stats (can make a module significantly better or significantly worse; results are permanent). Creates a market for "rolled modules" with desirable random stats.

### Wormhole Combat Sites
C1–C6 wormhole systems contain escalating combat sites run by AI factions (Sleepers, Drifters):

| Class | Difficulty | Rewards | Notable |
|-------|------------|---------|---------|
| C1–C2 | Easy | Low-medium | Safe for small groups |
| C3 | Medium | Medium | Group content; ~200M ISK/hr possible |
| C4 | Hard | High | C4 static connects to another C4; self-contained farming |
| C5 | Very Hard | Very High | Capital escalations; 1B ISK/hr possible for elite groups |
| C6 | Extreme | Highest | Only hardest content in the game; super-escalation fleets |

Sleeper NPCs are different from NPC pirates — they use full player-style electronic warfare, tackle, and repair. They are considered the hardest AI in the game.

### Anomalies and Combat Sites (Null/Low)
Regular combat sites spawn in null-sec and low-sec that any player can warp to without scanning:
- **Cosmic Anomalies**: Automatically visible in system scanner; combat sites with escalation potential
- **Escalations (DED Sites)**: Rarer, more valuable; require scanning to locate the final room; drop faction/deadspace modules worth hundreds of millions

### Faction Warfare (FW)
Militarized PvP-focused content in low-sec:
- Choose to enlist in one of two war pairs: Amarr vs. Minmatar; Caldari vs. Gallente
- Capture **Plexes** (small, medium, large complexes) in contested systems to earn Frontline points
- Capturing systems earns LP and shifts territorial control on the FW warzone map
- Cannot dock in enemy NPC stations; friendly-fire is disabled among militia members
- Provides regular, structured PvP action in defined locations (predictable fights)
- LP earned is faction-specific and can be converted to ISK via LP store items

---

## 14. Exploration

### The Scanning System
Exploration starts with a **Core Probe Launcher** fitted to a ship (almost always a frigate):
- Launch up to 8 **Core Scanner Probes** into space
- Position and resize probes in a 3D map view
- Scan down **Cosmic Signatures** — anonymous blips that require triangulation to identify and locate
- Each scan pass narrows the signature to a warpable point
- Skill: **Astrometrics** and its support skills determine scan strength and probe count

### Signature Types
| Type | Content | Access |
|------|---------|--------|
| **Wormhole** | Connection to another system (K or J space) | Warp to and jump through |
| **Relic Site** | Ancient structures with hackable containers | Hacking minigame |
| **Data Site** | Technology caches with hackable containers | Hacking minigame |
| **Combat Site** | NPC-guarded anomaly (escalation or DED site) | Clear NPCs |
| **Gas Cloud** | Harvestable gas for manufacturing | Gas harvester module |

### The Hacking Minigame
Relic and data sites use a **hacking minigame**:
- A grid of nodes is revealed by clicking (like Minesweeper)
- Goal: Find the core node while avoiding Defensive Subsystems (which fight back) and System Cores (which boost defenses)
- Utilities: Breach (force node open), Polymorphic Shield (block damage), Secondary Vector (attack defensive node)
- Failure destroys some loot; success opens the container for looting
- Skills: **Archaeology** (relics), **Hacking** (data sites) improve the minigame

### Exploration Profitability
- Null-sec relic sites are the most valuable: 50–200M ISK per site for skilled explorers
- High-sec exploration: Lower risk, much lower reward (~10–30M ISK/hr)
- Wormhole exploration: Highest ceiling; some Sleeper cache sites exceed 1B ISK value
- New players can start exploration within a few hours of account creation; low SP required

### Exploration Ships

| Ship | Notes |
|------|-------|
| **Heron** (Caldari frigate) | Best high-sec exploration starter |
| **Magnate** (Amarr) / **Probe** (Minmatar) / **Imicus** (Gallente) | Faction alternatives |
| **Astero** (SOE faction frigate) | Best T1-tier explorer; combat-capable; covert cloak |
| **Stratios** (SOE faction cruiser) | Expensive; strong exploration + combat hybrid |
| **Covert Ops frigates** (T2) | Bonused for scanning + fitting covert ops cloak (invulnerable while cloaked) |

---

## 15. Wormhole Space (J-Space)

### Overview
Wormhole space consists of approximately 2,600 systems organized into 6 classes (C1–C6). They are accessible only through wormhole connections that appear and disappear dynamically:
- Wormholes have a **mass limit** (caps how much ships can transit before it collapses)
- Wormholes have a **lifetime** (~24 hours typical)
- Each wormhole class has **static connections** (one guaranteed wormhole type always present) and random **wandering connections**

### Key Differences from K-Space
| Feature | K-Space | W-Space |
|---------|---------|---------|
| Local Chat intel | Shows all players in system | Only shows players who speak |
| CONCORD / Law | Present in highsec | None |
| Stargates | Yes | None; only wormhole jumps |
| Sovereignty | Alliance-based | Informal; whoever is strongest |
| Asset Safety | Yes (structures) | No — structures drop loot when destroyed |
| Standings | Visible | No automatic listing |

### Living in Wormholes
Many corporations "live" in wormhole space permanently, anchoring **Upwell Citadels** as their home base:
- Must be self-sufficient: no local market; all supplies must be shipped in or manufactured
- Corp must scout wormhole chain daily to map routes in/out
- **Eviction**: Other corps can assault a wormhole home and destroy the citadel, stranding residents
- Asset safety does NOT apply in wormholes — everything in the structure drops as loot when destroyed

### Wormhole Combat Content
- **Sleeper NPCs**: The hardest AI in Eve; use full EWAR, tackle, remote repair
- **Drifter NPCs**: Powerful roaming enemies; appear after Sleeper combat; Drifter battleships are extremely dangerous
- C5–C6 combat allows **capital escalations**: bring in carriers/dreadnoughts for vastly increased ISK per hour
- Wormhole PvP is highly valued among experienced players; fights are earned through scouting and ambush, not roaming known space

---

## 16. Abyssal Deadspace

### Access
Enter via **Filaments** — items activated while in normal space. The ship and fleet are pulled into an instanced 3-pocket chain for a maximum of 20 minutes:
- Exit via the deadspace beacon at the end of pocket 3, or
- Lose ship and capsule if the timer expires

### Filament Types and Weather

| Weather | Bonus | Penalty | Optimal Ship Style |
|---------|---------|---------|--------------------|
| **Electrical** | Capacitor regen | Shield HP | Armor/cap-heavy ships |
| **Firestorm** | Armor HP | Missile/turret tracking | Shield tanked fast ships |
| **Exotic** | Shield regen | Cap warfare resistance | Active shield ships |
| **Gamma** | Shield HP | Armor resistance | Shield tanked ships |
| **Dark** | Turret tracking | Capacitor recharge | Turret ships |
| **Bioluminescence** | Drone/fighter damage | — | Drone boats |

### Difficulty Tiers

| Tier | Name | Notes |
|------|------|-------|
| 0 | Tranquil | Tutorial difficulty |
| 1–2 | Calm / Agitated | Safe in high-sec; good for new pilots |
| 3 | Fierce | Moderate difficulty; reasonable ISK |
| 4 | Raging | Hard; gives suspect flag on high-sec exit |
| 5 | Chaotic | Very hard; high risk, high reward |
| 6 | Cataclysmic | Extreme; for top-tier fits only |

### Rewards
- **Mutaplasmids**: Apply to modules (turrets, prop mods, tank mods) to randomly reroll stats within a range
  - Abyssal modules with good random rolls sell for orders of magnitude more than base
  - Market exists for "traded Abyssal mods" with player-appraised rolls
- **Filaments** for deeper tiers (T4–T6 filaments drop inside lower-tier runs)
- **Exclusive blueprint fragments** for rare Tech 2 items
- ISK range: T1 = 30–60M ISK/hr; T4–T5 = 300M–1B+ ISK/hr (for optimized fits)

---

## 17. Criminal Mechanics, Piracy, and War

### Security Status (Player)
Every player character has a security status (−10.0 to +10.0):
- Positive: "Sec Status"; losing/maintaining good standing matters for market access
- At −2.0: Caldari Navy in Caldari space begins attacking
- At −5.0 (Outlaw): All faction navies attack on sight; gate guns attack in highsec; limited market access
- Increased by killing criminal/pirate NPCs; decreased by killing players in highsec without justification

### The CONCORD System
CONCORD (Consolidated Co-operation and Relations Command) is the highsec law enforcement NPC faction:
- **Punitive, not preventive**: CONCORD will always destroy an attacker in highsec — but the attack can happen first
- Response time varies: ~5 seconds in 1.0 sec systems; up to ~19 seconds in 0.5 sec systems
- CONCORD cannot be killed (infinite HP) — attempting to fight it is futile
- **Suicide Ganking**: Players use cheap, high-DPS ships to kill valuable targets before CONCORD arrives; accept their own ship's destruction as the cost of doing business

### Criminal Flags
| Flag | Cause | Consequence |
|------|-------|-------------|
| **Criminal Timer** | Unprovoked attack in highsec | CONCORD spawns and destroys you; any player may attack for free |
| **Suspect Timer** | Flagged aggression (looting another player's wreck, attacking without CONCORD trigger) | Any player may attack you; no CONCORD protection for them |
| **Kill Right** | Being a victim of unprovoked highsec attack | Victim (and optionally all players) may attack the criminal without CONCORD protection |

### War Declarations
Corporations can declare **war** on other corporations for a weekly ISK fee:
- During a war, all members of both corporations can fight in highsec without CONCORD interference
- Mutual wars (both sides pay) allow full combat anywhere
- War is a major mechanic for mercenary corporations (paid to war-dec targets) and highsec conflict

### Faction Warfare and Insurgencies
- **Militia warfare**: Join an empire's militia; fight for control of FW systems in lowsec
- **Insurgencies** (post-Havoc expansion, 2023): Join pirate factions (Guristas, Angels) to attack empire-controlled systems; creates a three-way conflict layer in lowsec

---

## 18. Monetization: Alpha, Omega, and PLEX

### Account States

| Feature | Alpha (Free) | Omega (Paid) |
|---------|-------------|-------------|
| Base access | Full game access | Full game access |
| Ship range | T1 frigates to battlecruisers | All ships including capitals |
| Skills | 172 of 494 | All 494 |
| Training speed | Half speed | Full speed |
| Offline training | Stops at 5M SP | Continuous |
| Market posting | Limited | Full |
| ISK cap per transaction | Some limits | None |

### PLEX
PLEX is a physical in-game item tradeable on the player market:
- 500 PLEX = 30 days Omega time
- Purchased with real money from CCP or traded for ISK in-game
- Creates an explicit real money ↔ ISK bridge without "pay to win" accusations (since PLEX is market-priced)
- Current (2025–2026) PLEX ISK value: approximately 3–6 billion ISK per PLEX unit

### Omega Subscription Price
- ~$15/month at monthly rate
- Significant discounts at 3, 6, 12 month tiers (~$12–13/month equivalent)
- Multi Character Training (MCT): Train a second/third character on the same account simultaneously for additional fee

### Skill Injectors
- **Large Skill Injectors**: Contain 500,000 SP (exact amount received decreases at higher total SP thresholds)
- **Small Skill Injectors**: 100,000 SP
- Obtained by extracting SP from your own character via Skill Extractors (purchasable from NPC store for PLEX)
- Tradeable on the player market — creates a real ISK value for accumulated skill points
- Enables "buying" a head start in skills; does not bypass game knowledge or practical experience

---

## Quick Reference: Key Numbers

| Metric | Value |
|--------|-------|
| Total star systems | ~7,800 in K-space + ~2,600 in J-space |
| Active concurrent players (peak) | ~25,000–35,000 (varies by content cycle) |
| Total skills | 494 (Omega); 172 (Alpha) |
| Time to train all skills | 24+ years |
| Largest wars | 6,000+ ships destroyed in single battles |
| Most expensive ship destroyed | Titans: 100B–400B ISK each |
| Monthly subscription | ~500 PLEX or $14.99 |
| ISK earned per hour (L4 missions) | 40–80M ISK |
| ISK earned per hour (incursion HQ) | 300–500M ISK |
| ISK earned per hour (C5 wormholes) | 500M–1B ISK |

---

## Sources

- [EVE University Wiki — Getting Started](https://wiki.eveuniversity.org/Getting_Started_in_EVE_Online)
- [EVE University Wiki — Mining](https://wiki.eveuniversity.org/Mining)
- [EVE University Wiki — Asteroids and Ore](https://wiki.eveuniversity.org/Asteroids_and_ore)
- [EVE University Wiki — Manufacturing](https://wiki.eveuniversity.org/Manufacturing)
- [EVE University Wiki — Invention](https://wiki.eveuniversity.org/Invention)
- [EVE University Wiki — Ships](https://wiki.eveuniversity.org/Ships)
- [EVE University Wiki — Ship Class Tactical Overview](https://wiki.eveuniversity.org/Ship_Class_Tactical_Overview)
- [EVE University Wiki — Fitting Ships](https://wiki.eveuniversity.org/Fitting_ships)
- [EVE University Wiki — Combat Primer for Complete Beginners](https://wiki.eveuniversity.org/Combat_Primer_for_Complete_Beginners)
- [EVE University Wiki — Sovereignty](https://wiki.eveuniversity.org/Sovereignty)
- [EVE University Wiki — Faction Warfare](https://wiki.eveuniversity.org/Faction_warfare)
- [EVE University Wiki — Factions](https://wiki.eveuniversity.org/Factions)
- [EVE University Wiki — NPC Standings](https://wiki.eveuniversity.org/NPC_standings)
- [EVE University Wiki — Skills and Learning](https://wiki.eveuniversity.org/Skills_and_learning)
- [EVE University Wiki — Incursions](https://wiki.eveuniversity.org/Incursions)
- [EVE University Wiki — Abyssal Deadspace](https://wiki.eveuniversity.org/Abyssal_Deadspace)
- [EVE University Wiki — Wormhole Space](https://wiki.eveuniversity.org/Wormhole_space)
- [EVE University Wiki — Living in Wormhole Space](https://wiki.eveuniversity.org/Living_in_Wormhole_Space)
- [EVE University Wiki — Security Status](https://wiki.eveuniversity.org/Security_status)
- [EVE University Wiki — Suicide Ganking](https://wiki.eveuniversity.org/Suicide_ganking)
- [EVE University Wiki — Relic and Data Sites](https://wiki.eveuniversity.org/Relic_and_data_sites)
- [EVE University Wiki — Trading](https://wiki.eveuniversity.org/Trading)
- [EVE University Wiki — Capital Ships](https://wiki.eveuniversity.org/Capital_ships)
- [Eve Online — Wikipedia](https://en.wikipedia.org/wiki/Eve_Online)
- [The Forbidden Comparison: EVE Against Conventional MMOs — INN](https://imperium.news/the-forbidden-comparison-eve-against-conventional-mmos/)
- [What is EVE Online? 25 veteran players define it — Just EVE Online](https://justabout.com/eve-online/39050/what-is-eve-online-25-veteran-players-creatively-define-the-iconic-space-mmo)
- [EVE Academy — Beginner's Guide](https://www.eveonline.com/eve-academy)
- [ISK Sink or ISK Faucet: The Economic Balance in EVE Online — FasterCapital](https://fastercapital.com/content/ISK-Sink-or-ISK-Faucet--The-Economic-Balance-in-EVE-Online.html)
- [EVE Online Sovereignty Updates — Equinox 2024](https://www.eveonline.com/news/view/equinox-update-sovereignty-transition)
- [How Tech 2 Blueprints Get Invented — Medium (Dunk Dinkle)](https://dunkdinkle.medium.com/how-tech-2-blueprints-get-invented-c950e9424bfc)
- [Navigating Null Sec, Low Sec, and Wormholes — Gold Eagle Corp](https://www.goldeaglecorp.com/post/navigating-the-depths-of-eve-online-a-comprehensive-guide-to-null-sec-low-sec-and-wormholes)
- [PLEX and Omega Price Changes — EVE Online](https://www.eveonline.com/news/view/plex-and-omega-price-changes)

---

*Research compiled: April 2026. Data current as of Catalyst expansion (November 2025).*
