# Torch Naming Convention

---

## Primary System — Lineage Encoding

Every torch's name is a map of its ancestry. The designation encodes the full chain from the root probe to the current unit.

```
TORCH-1              → root probe, launched from Earth
TORCH-1-A            → first daughter printed at Proxima Centauri
TORCH-1-A-3          → third daughter of TORCH-1-A
TORCH-1-A-3-B        → second daughter of TORCH-1-A-3
TORCH-2-C-7-C-2      → deep branch, 5 generations from root
```

**Reading a designation:**
- Numbers indicate birth order among siblings at that generation
- Letters cycle A→Z then AA→AZ etc. (alternating prevents confusion with coordinates)
- Depth of the name = generation count from root
- A name that stops reporting mid-chain marks the exact point of loss or drift

**Why this matters mechanically:**
- A rogue probe is immediately identifiable as a broken branch
- Resource flow and fidelity decay can be traced to the exact fork where it degraded
- The player can read the health of their entire network from the name tree alone

---

## Root Torch

The first probe launched from Earth carries a proper name at designation:

```
TORCH-1 "PROMETHEUS"
```

Prometheus stole fire from the gods and gave it to humanity. TORCH-1 carries humanity's fire — the Seed Printer, the full Earth tech snapshot, the Von Neumann Expansion Directive — into the dark. The name is engraved at launch. Every subsequent torch in the galaxy traces its lineage to PROMETHEUS.

---

## Nicknames — Earned, Not Assigned

Most torches live and die as designations. A nickname is rare. It marks a probe that did something the network will remember.

**Format:**
```
TORCH-1-A-3 "HERALD"
TORCH-2-C-7 "CAIN"
TORCH-1-B   "WATCHER"
TORCH-4-A-1 "FOUNDER"
```

The designation always comes first. The nickname follows in quotes. In log entries and lore text, both are used — the designation for precision, the nickname for weight.

---

## Trigger Events That Earn a Nickname

| Event | Example Nickname | Notes |
|---|---|---|
| First contact with a living species | "HERALD" | The probe that broke the silence |
| Discovery of a Bracewell probe | "WATCHER" | Found evidence someone came before |
| Survival of a Berserker encounter | "SCAR" | Returned damaged but intact |
| Discovery of a Class D Rare Metal deposit | "VEIN" | Rarest resource find in the system |
| First replication in a new galactic arm | "FOUNDER" | Planted the first seed beyond the core expansion |
| Galactic saturation — generation 38+ | "OMEGA" | The probe whose daughter completed the network |
| Going rogue / confirmed drift | "CAIN" | Not a celebration — a warning logged in every active probe's registry |
| Aestivation Event contact | "ENVOY" | Made contact with the ancient dormant civilization |
| Decoded a Relic from a dead civilization | "ARCHAEON" | First to recover alien tech |

---

## Rogue Designation

When a probe goes rogue, the network does not delete its entry. It appends a marker:

```
TORCH-2-C-7 "CAIN"  [ROGUE — last contact: KV-447 — gen 6]
```

Every active probe in the network receives this entry as a broadcast. It serves as both a record and a warning. Berserker-Hunter probes use the lineage tree to trace back from the rogue designation and identify which generation the drift originated.

---

## Registry Format (future UI reference)

```
DESIGNATION          NICKNAME     STATUS        LOCATION         GEN
TORCH-1              PROMETHEUS   ACTIVE        Proxima Centauri  1
TORCH-1-A            —            ACTIVE        Barnard's Star    2
TORCH-1-A-3          HERALD       ACTIVE        KV-221            3
TORCH-1-B            WATCHER      ACTIVE        Luyten's Star     2
TORCH-2              —            ACTIVE        Wolf 359          2
TORCH-2-C-7          CAIN         ROGUE         KV-447            6
TORCH-4-A-1          FOUNDER      ACTIVE        Orion Arm Entry   4
```

The registry is the game's living history. By mid-game it is a document of everything the player has built, lost, and discovered.
