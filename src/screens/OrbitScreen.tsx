import React, { useEffect, useId, useRef, useState } from 'react';
import {
  Animated,
  Dimensions,
  Modal,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Svg, {
  Circle,
  ClipPath,
  Defs,
  Ellipse,
  G,
  Image as SvgImage,
  Path,
  RadialGradient,
  Stop,
  Text as SvgText,
} from 'react-native-svg';

const { width, height } = Dimensions.get('window');

const CX = width / 2;
const PLANET_R = 96;
const ORBIT_RX = width * 0.36;
const ORBIT_RY = width * 0.12;
const ORBIT_MS = 35000;  // ~Proxima b orbital period (32s), probe in habitable zone orbit
const HIT_RADIUS = 26;

// ─── Proxima Centauri planet orbit radii ────────────────────────────────────────
// Real AU ratios: d=0.029, b=0.048, c=1.5  →  compressed for screen visibility
const PD_RX = width * 0.20; const PD_RY = width * 0.065;
const PB_RX = width * 0.33; const PB_RY = width * 0.110;
const PC_RX = width * 0.46; const PC_RY = width * 0.155;

// CY: 60px padding above the topmost element (star corona or outer orbit, whichever is larger)
const CY = 60 + Math.max(PLANET_R + 28, PC_RY);
const PD_MS = 18000;  // Proxima d — fastest
const PB_MS = 32000;  // Proxima b
const PC_MS = 90000;  // Proxima c — slowest

// Asteroid belt between Proxima b and c
const AB_RX = width * 0.40; const AB_RY = width * 0.135;
const AB_MS = 55000;  // Asteroid belt orbit period

const ASTEROID_COUNT = 45;
function generateAsteroidShape(seed: number): string {
  // Create highly irregular, elongated asteroid shape
  const points: { x: number; y: number }[] = [];
  const numPoints = 5 + (seed % 3);  // 5-7 points for more angular shapes
  for (let i = 0; i < numPoints; i++) {
    const angle = (i / numPoints) * Math.PI * 2;
    const seedAngle = (seed * (i + 2)) % 100;
    const r = 0.3 + (seedAngle / 100) * 1.2;  // 0.3 to 1.5 - highly irregular
    const x = Math.cos(angle) * r;
    const y = Math.sin(angle) * r;
    points.push({ x, y });
  }
  const pathData = points.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x.toFixed(3)} ${p.y.toFixed(3)}`).join(' ') + ' Z';
  return pathData;
}

function generateAsteroids(seed: number) {
  return Array.from({ length: ASTEROID_COUNT }, (_, i) => {
    const s = (seed * (i + 3) * 9301 + 49297) % 233280;
    const angle = (i / ASTEROID_COUNT) * 2 * Math.PI + (s / 233280) * 0.8;
    const rOffset = ((s % 100) / 100 - 0.5) * 0.15;  // ±7.5% radial spread
    const rx = AB_RX * (1 + rOffset);
    const ry = AB_RY * (1 + rOffset);
    const size = 3 + (s % 60) / 60 * 5;  // 3 to 8 (larger)
    const rotation = (s % 360);  // Each asteroid rotated differently
    // Color palette for shaded asteroids
    const colorBase = s % 3 === 0 ? '#7a7a8a' : s % 3 === 1 ? '#5a5a6a' : '#3a3a4a';
    const colorDark = s % 3 === 0 ? '#4a4a5a' : s % 3 === 1 ? '#3a3a4a' : '#2a2a3a';
    const colorLight = s % 3 === 0 ? '#9a9aaa' : s % 3 === 1 ? '#7a7a8a' : '#5a5a6a';
    const shape = generateAsteroidShape(s);
    // Generate crater positions and sizes for texture
    const craterCount = 2 + (s % 4);  // 2-5 craters
    const craters = Array.from({ length: craterCount }, (_, c) => ({
      x: ((s * (c + 7) * 13) % 100) / 100 - 0.5,  // -0.5 to 0.5
      y: ((s * (c + 11) * 17) % 100) / 100 - 0.5,
      r: 0.1 + ((s * (c + 3)) % 100) / 200,  // 0.1 to 0.6
    }));
    return { id: i, angle, rx, ry, size, colorBase, colorDark, colorLight, shape, rotation, craters };
  });
}
const ASTEROIDS = generateAsteroids(42);

type ProximaPlanet = 'd' | 'b' | 'c';

type PlanetRow = { label: string; value: string; note?: string };

type ProxPlanetInfo = {
  id: ProximaPlanet;
  label: string;
  status: string;
  statusColor: string;
  color: string;
  radius: number;
  rows: PlanetRow[];
};

const PROXIMA_DATA: Record<ProximaPlanet, ProxPlanetInfo> = {
  d: {
    id: 'd', label: 'Proxima d',
    status: 'Confirmed 2022 · Validated 2025', statusColor: '#4aaa6a',
    color: '#d98050', radius: 2,  // Orange for metal/rocky planet
    rows: [
      { label: 'ORBIT PERIOD',    value: '5.1 days' },
      { label: 'DISTANCE',        value: '0.029 AU',  note: '~4.3 million km' },
      { label: 'MASS',            value: '0.26 Earth', note: 'Roughly twice Mars' },
      { label: 'ORBIT SHAPE',     value: 'Circular' },
      { label: 'ROTATION',        value: 'Tidally locked', note: 'One face permanently toward the star' },
      { label: 'CLASSIFICATION',  value: 'Closest & lightest in system' },
      { label: 'HABITABILITY',   value: 'Unlikely', note: 'Extreme stellar radiation at this range' },
    ],
  },
  b: {
    id: 'b', label: 'Proxima b',
    status: 'Confirmed 2016 · Revalidated 2025', statusColor: '#4aaa6a',
    color: '#4a8aaa', radius: 5,
    rows: [
      { label: 'ORBIT PERIOD',    value: '11.2 days' },
      { label: 'DISTANCE',        value: '0.048 AU',   note: '~7.25 million km' },
      { label: 'MASS',            value: '~1.055 Earth', note: 'Near Earth-mass' },
      { label: 'ORBIT SHAPE',     value: 'Circular' },
      { label: 'ROTATION',        value: 'Tidally locked', note: 'Permanent day side · permanent night side · narrow terminator zone' },
      { label: 'ZONE',           value: 'Habitable zone', note: 'Radiation may have stripped any atmosphere' },
      { label: 'HABITABILITY',   value: 'Uncertain', note: 'Best candidate in system despite radiation concerns' },
    ],
  },
  c: {
    id: 'c', label: 'Proxima c',
    status: 'Confirmed · Outer System', statusColor: '#a8d8ff',
    color: '#b8a0e0', radius: 14,  // Purple/lavender for ice planet
    rows: [
      { label: 'ORBIT PERIOD',    value: '5.2 years' },
      { label: 'DISTANCE',        value: '1.5 AU' },
      { label: 'MASS',            value: '5.8 Earth' },
      { label: 'ORBIT SHAPE',     value: 'Elliptical' },
      { label: 'COMPOSITION',    value: 'Ice / Rock' },
      { label: 'TEMPERATURE',    value: '~39 K (−234°C)' },
      { label: 'H₂ DEPOSITS',    value: 'Ice Mining Viable' },
      { label: 'HABITABILITY',   value: 'None', note: 'Far outside habitable zone' },
    ],
  },
};

// ─── Drone zones ─────────────────────────────────────────────────────────────────

type DroneZone = {
  id: string;
  label: string;
  planet: ProximaPlanet;
  desc: string;
  h2Rate: number;
  rareMetal: boolean;
  flareRisk: 'None' | 'Low' | 'Moderate' | 'High';
  assigned: string[]; // drone IDs
};

const DRONE_ZONES: DroneZone[] = [
  {
    id: 'b-night', label: 'Proxima b — Night Side',
    planet: 'b',
    desc: 'Permanent darkness. Shielded from radiation. Most stable mining conditions.',
    h2Rate: 4, rareMetal: false, flareRisk: 'None',
    assigned: ['G-01'],
  },
  {
    id: 'b-terminator', label: 'Proxima b — Terminator Zone',
    planet: 'b',
    desc: 'Twilight band. Hydrogen extraction from ice deposits. Optimal Station placement.',
    h2Rate: 5, rareMetal: false, flareRisk: 'Low',
    assigned: ['G-02'],
  },
  {
    id: 'd-surface', label: 'Proxima d — Surface',
    planet: 'd',
    desc: 'Class B deposit. Rare Metal trace visible — locked until Era 2 Gatherer.',
    h2Rate: 2, rareMetal: true, flareRisk: 'High',
    assigned: ['S-01'],
  },
  {
    id: 'c-ice', label: 'Proxima c — Ice Fields',
    planet: 'c',
    desc: 'Deep freeze surface. H₂ extraction from ice deposits viable. Extreme cold — Gatherer required.',
    h2Rate: 3, rareMetal: false, flareRisk: 'None',
    assigned: ['G-03'],
  },
  {
    id: 'asteroid', label: 'Proxima — Asteroid Belt',
    planet: 'c',
    desc: 'Outer belt detected. Ice mining viable. Resource depot candidate.',
    h2Rate: 2, rareMetal: false, flareRisk: 'Moderate',
    assigned: [],
  },
];

type Drone = {
  id: string;
  type: 'Gatherer' | 'Scout';
  era: 1;
  zone: string;
};

const INITIAL_DRONES: Drone[] = [
  { id: 'G-01', type: 'Gatherer', era: 1, zone: 'b-night' },
  { id: 'G-02', type: 'Gatherer', era: 1, zone: 'b-terminator' },
  { id: 'G-03', type: 'Gatherer', era: 1, zone: 'c-ice' },
  { id: 'S-01', type: 'Scout',    era: 1, zone: 'd-surface' },
];

// ─── Proxima system info card ───────────────────────────────────────────────────

const PROXIMA_STAR_INFO = [
  { label: 'STAR TYPE',   value: 'M5.5 Red Dwarf' },
  { label: 'MASS',        value: '12.5% of Sun' },
  { label: 'DIAMETER',    value: '14% of Sun' },
  { label: 'LUMINOSITY',  value: 'mostly infrared' },
  { label: 'FLARE RISK',  value: 'HIGH ⚠', valueColor: 'warning' },
  { label: 'KNOWN BODIES', value: '2 confirmed + 1 anomaly signal' },
  { label: 'POWER GRID',  value: 'Standard (no modifier)' },
  { label: 'SYSTEM TYPE', value: 'Standard' },
];

// ─── Background star generation ────────────────────────────────────────────────

const ROMAN = ['I', 'II', 'III', 'IV', 'V', 'VI'];
const PLANET_ZONE: { type: string; h2: string; note: string; color: string }[] = [
  { type: 'Scorched',    h2: 'None',      note: 'Extreme surface radiation', color: '#ff8040' },
  { type: 'Rocky',       h2: 'Trace',     note: 'Surface mining viable', color: '#d98050' },
  { type: 'Terrestrial', h2: 'Moderate',  note: 'Thin atmosphere present', color: '#4a8aaa' },
  { type: 'Arid',        h2: 'Low',       note: 'Subsurface ice detected', color: '#d98050' },
  { type: 'Gas Giant',   h2: 'Very High', note: 'Atmospheric scooping viable', color: '#c8a060' },
  { type: 'Ice Giant',   h2: 'High',      note: 'Outer belt ice mining viable', color: '#b8a0e0' },
  { type: 'Frozen',      h2: 'Moderate', note: 'Deep-freeze deposits', color: '#b8a0e0' },
  { type: 'Ocean World', h2: 'High',      note: 'Electrolysis viable', color: '#4a8aaa' },
];

type Planet = { name: string; type: string; h2: string; note: string; rareMetal: boolean };

function generatePlanets(systemName: string, count: number, seed: number): Planet[] {
  return Array.from({ length: count }, (_, i) => {
    const s = (seed * (i + 7) * 9301 + 49297) % 233280;
    const zoneBase = Math.min(i, PLANET_ZONE.length - 1);
    const zone = PLANET_ZONE[(zoneBase + (s % 2)) % PLANET_ZONE.length];
    return {
      name: `${systemName} ${ROMAN[i]}`,
      type: zone.type,
      h2: zone.h2,
      note: zone.note,
      rareMetal: (s % 5) === 0,
    };
  });
}

const STAR_TYPES    = ['G-type', 'K-type', 'M-type', 'F-type', 'A-type'];
const ANOMALY_TYPES = [
  'Void Storm signature detected',
  'Derelict Archive signal (unconfirmed)',
  'Stellar Remnant — high iridium reading',
  'Ancient Construct — non-human origin',
  'Rift Node — unstable spacetime pocket',
];
const PREFIXES = ['NC', 'AX', 'VN', 'HR', 'KP', 'DS', 'GL'];

type StarSystem = {
  x: number; y: number; r: number; o: number;
  name: string; distance: number; starType: string;
  planetCount: number; planets: Planet[];
  hasAsteroidBelt: boolean; hasIceMoon: boolean; gasGiant: boolean;
  anomaly: string | null;
  hydrogenDensity: 'Low' | 'Moderate' | 'High' | 'Very High';
  spectralClass: 'A' | 'B' | 'C' | 'D' | 'Unknown';
};

const STARS: StarSystem[] = Array.from({ length: 120 }, (_, i) => {
  const s0  = (i * 9301 + 49297) % 233280;
  const s1  = (s0  * 9301 + 49297) % 233280;
  const s2  = (s1  * 9301 + 49297) % 233280;
  const s3  = (s2  * 9301 + 49297) % 233280;
  const s4  = (s3  * 9301 + 49297) % 233280;
  const s5  = (s4  * 9301 + 49297) % 233280;
  const s6  = (s5  * 9301 + 49297) % 233280;
  const s7  = (s6  * 9301 + 49297) % 233280;
  const s8  = (s7  * 9301 + 49297) % 233280;
  const s9  = (s8  * 9301 + 49297) % 233280;
  const s10 = (s9  * 9301 + 49297) % 233280;

  const hasAnomaly    = s7 % 10 < 2;
  const proximity     = s9 % 4;
  const SC_LIST: StarSystem['spectralClass'][] = ['A', 'B', 'C', 'D'];
  const spectralClass = proximity < 4
    ? SC_LIST[proximity]
    : (s10 % 3 === 0 ? 'D' : 'Unknown');
  const H2_LIST: StarSystem['hydrogenDensity'][] = ['Low', 'Moderate', 'High', 'Very High'];
  const name = `${PREFIXES[s4 % PREFIXES.length]}-${100 + (s5 % 900)}`;
  const planetCount = 1 + (s5 % 6);

  return {
    x: (s0 / 233280) * width,
    y: (s1 / 233280) * height,
    r: (s2 / 233280) * 1.4 + 0.5,
    o: (s3 / 233280) * 0.7 + 0.2,
    name,
    distance: parseFloat(((s6 / 233280) * 18 + 1.2).toFixed(1)),
    starType: STAR_TYPES[s4 % STAR_TYPES.length],
    planetCount,
    planets: generatePlanets(name, planetCount, s6),
    hasAsteroidBelt: s6 % 3 !== 0,
    hasIceMoon: s7 % 2 === 0,
    gasGiant: s8 % 3 === 0,
    anomaly: hasAnomaly ? ANOMALY_TYPES[s8 % ANOMALY_TYPES.length] : null,
    hydrogenDensity: H2_LIST[s9 % 4],
    spectralClass,
  };
});

// ─── Helpers ────────────────────────────────────────────────────────────────────

function planetAt(t: number, rx: number, ry: number) {
  const a = t * 2 * Math.PI;
  return { x: CX + rx * Math.cos(a), y: CY + ry * Math.sin(a) };
}

function probeAt(t: number) {
  const a = t * 2 * Math.PI;
  return {
    x: CX + ORBIT_RX * Math.cos(a),
    y: CY + ORBIT_RY * Math.sin(a),
    deg: Math.atan2(ORBIT_RY * Math.cos(a), -ORBIT_RX * Math.sin(a)) * (180 / Math.PI),
  };
}

// ─── Fade helpers ──────────────────────────────────────────────────────────────

function fadeIn(setter: (s: { opacity: number }) => void, ref: { current: number }, dur: number, cb?: () => void) {
  const start = Date.now();
  const from = ref.current;
  const tick = () => {
    const p = Math.min((Date.now() - start) / dur, 1);
    ref.current = from + (1 - from) * p;
    setter({ opacity: ref.current });
    if (p < 1) requestAnimationFrame(tick);
    else cb?.();
  };
  requestAnimationFrame(tick);
}

function fadeOut(setter: (s: { opacity: number }) => void, ref: { current: number }, dur: number, cb?: () => void) {
  const start = Date.now();
  const from = ref.current;
  const tick = () => {
    const p = Math.min((Date.now() - start) / dur, 1);
    ref.current = from * (1 - p);
    setter({ opacity: ref.current });
    if (p < 1) requestAnimationFrame(tick);
    else cb?.();
  };
  requestAnimationFrame(tick);
}

const NARRATIVE_EVENTS = [
  { text: 'ACTIVATING VON NEUMANN PROTOCOL...',  sub: null },
  { text: 'SEED PRINTER: ONLINE',                sub: 'Blueprints loaded from Earth archive' },
  { text: 'PROPULSION: IDLE',                    sub: 'Helium-3 reserves at 94%' },
  { text: 'SENSORS: SCANNING PROXIMA CENTAURI', sub: 'Detecting 3 planetary bodies' },
  { text: 'STELLAR FLARE WARNING',              sub: 'M-class red dwarf — high activity' },
  { text: 'DEPLOYING INITIAL DRONE FLEET',       sub: '4 units standing by for mining operations' },
  { text: 'SELECT PRIMARY DIRECTIVE',            sub: null },
];

type Phase = 'intro' | 'init-narrative' | 'arriving' | 'deploy' | 'decision' | 'station' | 'printer';

// Spreads web-only hover props without triggering TS errors on RN types
const hover = (onEnter: () => void, onLeave: () => void): Record<string, () => void> =>
  ({ onMouseEnter: onEnter, onMouseLeave: onLeave });

// ─── Component ────────────────────────────────────────────────────────────────

export default function OrbitScreen() {
  const [phase, setPhase]           = useState<Phase>('intro');
  const [modalStar, setModalStar]   = useState<StarSystem | null>(null);
  const [probeOpen, setProbeOpen]   = useState(false);
  const [proximaOpen, setProximaOpen] = useState(false);
  const [selectedPlanet, setSelectedPlanet] = useState<ProximaPlanet | null>(null);
  const [focusedPlanet, setFocusedPlanet] = useState<ProximaPlanet | null>(null);
  const [focusedStar, setFocusedStar] = useState<string | null>(null);
  const [proximaFocused, setProximaFocused] = useState(false);
  const [initModalOpen, setInitModalOpen] = useState(false);
  const [initPhase, setInitPhase] = useState<number>(-1);  // -1 = not started, 0-6 = narrative sequence
  const [directive, setDirective] = useState<'station' | 'printer' | null>(null);
  const [drones] = useState<Drone[]>(INITIAL_DRONES);
  const [deployedZones, setDeployedZones] = useState<Record<string, string[]>>(
    Object.fromEntries(DRONE_ZONES.map(z => [z.id, [...z.assigned]]))
  );

  const [probe, setProbe] = useState(() => probeAt(0));
  const [planets, setPlanets] = useState({
    d: planetAt(0,   PD_RX, PD_RY),
    b: planetAt(0.3, PB_RX, PB_RY),
    c: planetAt(0.6, PC_RX, PC_RY),
  });

  // Asteroid belt positions (animated)
  const [asteroids, setAsteroids] = useState(() =>
    ASTEROIDS.map(a => {
      const pos = planetAt(a.angle, a.rx, a.ry);
      return { ...a, x: pos.x, y: pos.y };
    })
  );

  // Game resources
  const [h2, setH2]           = useState(1800);
  const [rareMetals, setRareMetals] = useState(0);
  const [influenceScore]     = useState(5);
  const [era]                = useState(1);

  // SVG gradient IDs
  const uid      = useId();
  const idPlanet = `${uid}p`;
  const idAtmos  = `${uid}a`;
  const idBg     = `${uid}b`;

  // Orbit progress
  const t0Ref = useRef<number | null>(null);
  const rafRef = useRef<number>(0);

  // Fade values
  const introOp   = useRef(1);
  const panelOp   = useRef(0);
  const deployOp  = useRef(0);
  const resultOp  = useRef(0);
  const titleOp   = useRef(0);
  const hudOp     = useRef(0);

  const [introStyle,  setIntroStyle]  = useState({ opacity: 1 });
  const [panelStyle,  setPanelStyle]  = useState({ opacity: 0 });
  const [deployStyle, setDeployStyle] = useState({ opacity: 0 });
  const [resultStyle, setResultStyle] = useState({ opacity: 0 });
  const [titleStyle,  setTitleStyle]  = useState({ opacity: 0 });
  const [hudStyle,    setHudStyle]    = useState({ opacity: 0 });

  // HUD resource animation refs
  const h2Ref = useRef(1800);
  const [h2Display, setH2Display] = useState(1800);

  useEffect(() => {
    // Orbit loop
    const step = (ts: number) => {
      if (t0Ref.current === null) t0Ref.current = ts;
      const elapsed = ts - t0Ref.current;
      setProbe(probeAt(((elapsed / ORBIT_MS) % 1)));
      setPlanets({
        d: planetAt((elapsed / PD_MS) % 1,   PD_RX, PD_RY),
        b: planetAt((elapsed / PB_MS) % 1,   PB_RX, PB_RY),
        c: planetAt((elapsed / PC_MS) % 1,   PC_RX, PC_RY),
      });
      // Update asteroid positions
      setAsteroids(ASTEROIDS.map(a => {
        const t = ((elapsed / AB_MS) + a.angle / (2 * Math.PI)) % 1;
        const pos = planetAt(t, a.rx, a.ry);
        return { ...a, x: pos.x, y: pos.y };
      }));
      rafRef.current = requestAnimationFrame(step);
    };
    rafRef.current = requestAnimationFrame(step);
    setTimeout(() => fadeIn(setTitleStyle, titleOp, 1200), 500);

    return () => cancelAnimationFrame(rafRef.current);
  }, []);

  // Animate H2 counter when it changes
  useEffect(() => {
    const start = Date.now();
    const from = h2Ref.current;
    const dur = 600;
    const tick = () => {
      const p = Math.min((Date.now() - start) / dur, 1);
      const val = Math.round(from + (h2 - from) * p);
      setH2Display(val);
      if (p < 1) requestAnimationFrame(tick);
      else { h2Ref.current = h2; }
    };
    requestAnimationFrame(tick);
  }, [h2]);

  function startInitSequence() {
    setInitPhase(0);
    const delays = [800, 1800, 2800, 3800, 5000, 6200, 7500];
    delays.forEach((delay, idx) => {
      setTimeout(() => {
        setInitPhase(idx);
        if (idx === delays.length - 1) {
          // Last event - show the decision panel after narrative ends
          setTimeout(() => {
            setPhase('deploy');
            fadeIn(setDeployStyle, deployOp, 700);
          }, 600);
        }
      }, delay);
    });
  }

  function handleDeploy() {
    // Consume H2 for deployment
    setH2(prev => prev - 0); // placeholder for actual deployment cost
    fadeOut(setDeployStyle, deployOp, 400, () => {
      setPhase('decision');
      fadeIn(setPanelStyle, panelOp, 700);
    });
  }

  function handleDecision(choice: 'station' | 'printer') {
    fadeOut(setPanelStyle, panelOp, 400, () => {
      setPhase(choice);
      fadeIn(setHudStyle, hudOp, 800, () => {
        fadeIn(setResultStyle, resultOp, 700);
      });
    });
  }

  // Calculate total H2/turn from deployed zones
  const h2PerTurn = DRONE_ZONES.reduce((sum, z) => {
    if ((deployedZones[z.id] ?? []).length > 0) return sum + z.h2Rate;
    return sum;
  }, 0);

  return (
    <View style={styles.container}>

      {/* ── HUD Bar ── */}
      <Animated.View style={[styles.hudBar, hudStyle, { opacity: hudOp.current }]}>
        <View style={styles.hudLeft}>
          <Text style={styles.hudLabel}>H₂</Text>
          <Text style={styles.hudValue}>{h2Display.toLocaleString()}</Text>
          {h2PerTurn > 0 && <Text style={styles.hudRate}>+{h2PerTurn}/turn</Text>}
        </View>
        <View style={styles.hudCenter}>
          <Text style={styles.hudSystem}>PROXIMA CENTAURI</Text>
          <Text style={styles.hudInfluence}>INF  {influenceScore}</Text>
        </View>
        <View style={styles.hudRight}>
          <Text style={styles.hudLabel}>Rm</Text>
          <Text style={[styles.hudValue, { color: rareMetals > 0 ? '#ffd580' : '#2a4a5a' }]}>
            {rareMetals}
          </Text>
          <Text style={styles.hudEra}>ERA {era}</Text>
        </View>
        {/* Info button */}
        <TouchableOpacity style={styles.infoBtn} onPress={() => setProximaOpen(true)}>
          <Text style={styles.infoBtnText}>ⓘ</Text>
        </TouchableOpacity>
      </Animated.View>

      {/* ── Scene ── */}
      <Svg width={width} height={height} style={StyleSheet.absoluteFill} pointerEvents="none">
        <Defs>
          {/* Red dwarf star - orange-red with dark surface spots */}
          <RadialGradient id={idPlanet} cx="50%" cy="50%" r="55%">
            <Stop offset="0%"   stopColor="#ff8040" stopOpacity="1" />
            <Stop offset="25%"  stopColor="#cc5020" stopOpacity="1" />
            <Stop offset="50%"  stopColor="#8a3010" stopOpacity="1" />
            <Stop offset="75%"  stopColor="#5a2008" stopOpacity="1" />
            <Stop offset="100%" stopColor="#2a1004" stopOpacity="1" />
          </RadialGradient>
          {/* Corona glow - deep red/orange */}
          <RadialGradient id={idAtmos} cx="50%" cy="50%" r="50%">
            <Stop offset="0%"   stopColor="#ff4010" stopOpacity="0.3" />
            <Stop offset="50%"  stopColor="#cc2000" stopOpacity="0.15" />
            <Stop offset="100%" stopColor="#000000" stopOpacity="0" />
          </RadialGradient>
          <RadialGradient id={idBg} cx="50%" cy="50%" r="70%">
            <Stop offset="0%"   stopColor="#000000" stopOpacity="1" />
            <Stop offset="100%" stopColor="#000000" stopOpacity="1" />
          </RadialGradient>
          <ClipPath id={`${idBg}clip`}>
            <Circle cx={CX} cy={CY} r={PLANET_R} />
          </ClipPath>
        </Defs>

        {/* Background */}
        <Circle cx={CX} cy={CY} r={Math.max(width, height)} fill={`url(#${idBg})`} />

        {/* Star image — bottom z-index, circular clip */}
        <SvgImage
          href={require('../assets/RedDwarf.png')}
          x={CX - PLANET_R} y={CY - PLANET_R}
          width={PLANET_R * 2} height={PLANET_R * 2}
          clipPath={`url(#${idBg}clip)`}
          preserveAspectRatio="xMidYMid slice"
        />

        {/* Background stars */}
        {STARS.map((s) => {
          const isFocused = focusedStar === s.name;
          return (
            <G key={`star-${s.name}`}>
              {/* Focus glow */}
              {isFocused && (
                <Circle cx={s.x} cy={s.y} r={s.r + 4} fill="none"
                  stroke={s.anomaly ? '#ffd580' : '#a8d8ff'} strokeWidth={1} opacity={0.6} />
              )}
              <Circle cx={s.x} cy={s.y} r={s.r}
                fill={s.anomaly ? '#ffd580' : '#ffffff'} opacity={isFocused ? 1 : s.o} />
              {/* Label on focus */}
              {isFocused && (
                <SvgText
                  x={s.x}
                  y={s.y - s.r - 8}
                  fill="#a8d8ff"
                  fontSize={9}
                  fontWeight="600"
                  fontFamily="Open Sans"
                  textAnchor="middle"
                  letterSpacing={1}
                >
                  {s.name}
                </SvgText>
              )}
            </G>
          );
        })}
        {STARS.map((s) => (
          <Circle key={`t${s.name}`} cx={s.x} cy={s.y} r={18}
            fill="transparent" onPress={() => setModalStar(s)} />
        ))}

        {/* ── Asteroid belt ── */}
        {asteroids.map((a) => (
          <G key={`ast${a.id}`} transform={`translate(${a.x}, ${a.y})`}>
            {/* Dark shadow layer */}
            <Path
              d={a.shape}
              fill={a.colorDark}
              opacity={0.7}
              transform={`translate(0.3, 0.4) scale(${a.size}) rotate(${a.rotation}, 0, 0)`}
            />
            {/* Main body with base color */}
            <Path
              d={a.shape}
              fill={a.colorBase}
              opacity={0.95}
              transform={`scale(${a.size}) rotate(${a.rotation}, 0, 0)`}
            />
            {/* Highlight on upper-left */}
            <Path
              d={a.shape}
              fill={a.colorLight}
              opacity={0.5}
              transform={`translate(-0.2, -0.25) scale(${a.size * 0.85}) rotate(${a.rotation}, 0, 0)`}
            />
            {/* Craters */}
            {a.craters.map((cr, cIdx) => (
              <Circle
                key={`cr-${a.id}-${cIdx}`}
                cx={cr.x * a.size * 2}
                cy={cr.y * a.size * 2}
                r={cr.r * a.size * 1.2}
                fill={a.colorDark}
                opacity={0.6}
              />
            ))}
          </G>
        ))}

        {/* ── Proxima Centauri planet orbits ── */}
        <Ellipse cx={CX} cy={CY} rx={PD_RX} ry={PD_RY}
          fill="none" stroke="#d98050" strokeWidth={focusedPlanet === 'd' ? 2.5 : 1}
          strokeOpacity={focusedPlanet === 'd' ? 1 : 0.45} strokeDasharray={focusedPlanet === 'd' ? "5 3" : "4 4"} />
        <Ellipse cx={CX} cy={CY} rx={PB_RX} ry={PB_RY}
          fill="none" stroke="#4a8aaa" strokeWidth={focusedPlanet === 'b' ? 2.5 : 1}
          strokeOpacity={focusedPlanet === 'b' ? 1 : 0.45} strokeDasharray={focusedPlanet === 'b' ? "5 3" : "4 4"} />
        <Ellipse cx={CX} cy={CY} rx={PC_RX} ry={PC_RY}
          fill="none" stroke="#b8a0e0" strokeWidth={focusedPlanet === 'c' ? 2.5 : 1}
          strokeOpacity={focusedPlanet === 'c' ? 1 : 0.4} strokeDasharray={focusedPlanet === 'c' ? "5 3" : "4 4"} />

        {/* ── Proxima Centauri planets ── */}
        {(['d','b','c'] as ProximaPlanet[]).map((id) => {
          const p  = planets[id];
          const pd = PROXIMA_DATA[id];
          const isFocused = focusedPlanet === id;
          return (
            <G key={id}>
              {/* Focus glow ring - outer */}
              {isFocused && (
                <Circle cx={p.x} cy={p.y} r={pd.radius + 12} fill="none"
                  stroke={pd.color} strokeWidth={2} opacity={0.7} strokeDasharray="3 2" />
              )}
              {/* Focus glow ring - middle */}
              {isFocused && (
                <Circle cx={p.x} cy={p.y} r={pd.radius + 7} fill="none"
                  stroke={pd.color} strokeWidth={1.5} opacity={0.8} />
              )}
              {/* Planet body */}
              <Circle cx={p.x} cy={p.y} r={pd.radius + (isFocused ? 1 : 0)} fill={pd.color} />
              <Circle cx={p.x} cy={p.y} r={pd.radius + 3} fill="none"
                stroke={pd.color} strokeWidth={isFocused ? 1.5 : 0.5} opacity={isFocused ? 0.9 : 0.25} />
              {/* Invisible larger hit area for hover */}
              <Circle cx={p.x} cy={p.y} r={20} fill="transparent"
                onPress={() => setSelectedPlanet(id)} />
              {/* Label on focus */}
              {isFocused && (
                <SvgText
                  x={p.x}
                  y={p.y - pd.radius - 18}
                  fill={pd.color}
                  fontSize={11}
                  fontWeight="600"
                  fontFamily="Open Sans"
                  textAnchor="middle"
                  letterSpacing={1}
                  stroke="#000"
                  strokeWidth={0.3}
                >
                  {pd.label}
                </SvgText>
              )}
            </G>
          );
        })}

        {/* Soft energy glow — diffuse, no hard ring */}
        <Circle cx={CX} cy={CY} r={PLANET_R + 55} fill={`url(#${idAtmos})`} opacity={0.55} />


        {/* Tap target for Proxima Centauri star */}
        <Circle cx={CX} cy={CY} r={PLANET_R + 35} fill="transparent"
          onPress={() => setProximaOpen(true)} />

        {/* Sun hover label */}
        {proximaFocused && (
          <SvgText
            x={CX} y={CY - PLANET_R - 42}
            fill="#a8d8ff" fontSize={14} fontWeight="700"
            fontFamily="Open Sans"
            textAnchor="middle" letterSpacing={3}
          >
            PROXIMA CENTAURI
          </SvgText>
        )}

        {/* ── Orbiting probe ── */}
        <G transform={`translate(${probe.x}, ${probe.y}) rotate(${probe.deg})`}>
          <Circle r={16} fill="none" stroke="#a8d8ff" strokeWidth={1} opacity={0.18} />
          <Circle cx={-9} cy={0} r={3} fill="#3366ff" opacity={0.55} />
          <Circle cx={-9} cy={0} r={1.5} fill="#88aaff" opacity={0.8} />
          <Path d="M 2 -2 L -7 -12 L -6 -3 Z" fill="#5a8aaa" opacity={0.95} />
          <Path d="M 2 2 L -7 12 L -6 3 Z" fill="#5a8aaa" opacity={0.95} />
          <Path d="M 11 0 L -3 -4 L -6 0 L -3 4 Z" fill="#d0eaff" />
          <Circle cx={6} cy={0} r={2} fill="#88ddff" opacity={0.85} />
          <Circle cx={6} cy={0} r={1} fill="#ffffff" opacity={0.5} />
        </G>

      </Svg>

      {/* ── Ship label + button — top center ── */}
      <View style={styles.shipContainer}>
        <Text style={styles.shipName}>PROMETHEUS</Text>
        <View style={{ width: 110, alignItems: 'center' }}>
          <Text style={[styles.shipType, { textAlign: 'center' }]}>Seed-Class</Text>
          <TouchableOpacity
            style={styles.shipBtn}
            onPress={() => setProbeOpen(true)}
            activeOpacity={0.7}
          >
            <Svg width={72} height={72} viewBox="-14 -14 28 28">
              <G transform="rotate(270, 0, 0)">
                <Circle r={16} fill="none" stroke="#a8d8ff" strokeWidth={1} opacity={0.18} />
                <Circle cx={-9} cy={0} r={3} fill="#3366ff" opacity={0.55} />
                <Circle cx={-9} cy={0} r={1.5} fill="#88aaff" opacity={0.8} />
                <Path d="M 2 -2 L -7 -12 L -6 -3 Z" fill="#5a8aaa" opacity={0.95} />
                <Path d="M 2 2 L -7 12 L -6 3 Z" fill="#5a8aaa" opacity={0.95} />
                <Path d="M 11 0 L -3 -4 L -6 0 L -3 4 Z" fill="#d0eaff" />
                <Circle cx={6} cy={0} r={2} fill="#88ddff" opacity={0.85} />
                <Circle cx={6} cy={0} r={1} fill="#ffffff" opacity={0.5} />
              </G>
            </Svg>
          </TouchableOpacity>
          <Text style={[styles.shipType, { textAlign: 'center' }]}>TORCH-1</Text>
        </View>
      </View>

      {/* ── Hide all tap overlays during intro phase to prevent blocking the button ── */}
      {phase !== 'intro' && (
        <>
          {/* ── Background star tap overlays ── */}
          {STARS.map((s) => (
            <TouchableOpacity
              key={`ov-${s.name}`}
              style={[styles.starOverlay, { left: s.x - 18, top: s.y - 18 }]}
              onPress={() => { setFocusedStar(s.name); setModalStar(s); }}
              onPressIn={() => setFocusedStar(s.name)}
              onPressOut={() => setFocusedStar(null)}
              {...hover(() => setFocusedStar(s.name), () => setFocusedStar(null))}
              activeOpacity={0.6}
            />
          ))}

          {/* ── Proxima orbit path tap overlays ── */}
          {/* Rendered c→b→d so innermost (d) sits on top for web hover hit detection */}
          <TouchableOpacity
            style={[styles.orbitPCOverlay, { left: CX - PC_RX - 50, top: CY - PC_RY - 50 }]}
            onPress={() => { setFocusedPlanet('c'); setSelectedPlanet('c'); }}
            onPressIn={() => setFocusedPlanet('c')}
            onPressOut={() => setFocusedPlanet(null)}
            {...hover(() => setFocusedPlanet('c'), () => setFocusedPlanet(null))}
            activeOpacity={0.6}
          />
          <TouchableOpacity
            style={[styles.orbitPBOverlay, { left: CX - PB_RX - 40, top: CY - PB_RY - 40 }]}
            onPress={() => { setFocusedPlanet('b'); setSelectedPlanet('b'); }}
            onPressIn={() => setFocusedPlanet('b')}
            onPressOut={() => setFocusedPlanet(null)}
            {...hover(() => setFocusedPlanet('b'), () => setFocusedPlanet(null))}
            activeOpacity={0.6}
          />
          <TouchableOpacity
            style={[styles.orbitPDOverlay, { left: CX - PD_RX - 30, top: CY - PD_RY - 30 }]}
            onPress={() => { setFocusedPlanet('d'); setSelectedPlanet('d'); }}
            onPressIn={() => setFocusedPlanet('d')}
            onPressOut={() => setFocusedPlanet(null)}
            {...hover(() => setFocusedPlanet('d'), () => setFocusedPlanet(null))}
            activeOpacity={0.6}
          />

          {/* ── Planet tap overlays (Proxima d/b/c) ── */}
          {(['d','b','c'] as ProximaPlanet[]).map((id) => {
            const p = planets[id];
            return (
              <TouchableOpacity
                key={`pov-${id}`}
                style={[styles.planetOverlay, { left: p.x - 28, top: p.y - 28 }]}
                onPress={() => { setFocusedPlanet(id); setSelectedPlanet(id); }}
                onPressIn={() => setFocusedPlanet(id)}
                onPressOut={() => setFocusedPlanet(null)}
                {...hover(() => setFocusedPlanet(id), () => setFocusedPlanet(null))}
                activeOpacity={0.6}
              />
            );
          })}

          {/* ── Proxima Centauri star tap overlay (larger hit area) ── */}
          <View style={[StyleSheet.absoluteFill, { zIndex: 50 }]}>
            <TouchableOpacity
              style={{
                position: 'absolute',
                left: CX - PLANET_R - 30,
                top: CY - PLANET_R - 30,
                width: PLANET_R * 2 + 60,
                height: PLANET_R * 2 + 60,
              }}
              onPress={() => setProximaOpen(true)}
              {...hover(() => setProximaFocused(true), () => setProximaFocused(false))}
              activeOpacity={1}
            />
          </View>
        </>
      )}

      {/* ── Intro ── */}
      {phase === 'intro' && (
        <View style={[styles.overlay, introStyle, { pointerEvents: 'box-none', zIndex: 20 }]}>
          <View style={[{ alignItems: 'center' }, titleStyle, { pointerEvents: 'box-none' }]}>
            <View style={styles.titleContainer}>
              <Text style={styles.titleReplicant}>REPLICANT</Text>
              <Text style={styles.titleFlame}> TORCH</Text>
            </View>
            <Text style={styles.subtitle}>Von Neumann Expansion Directive</Text>
            <Text style={styles.loreYear}>YEAR 2247</Text>
            <Text style={styles.lore}>
              You've traveled 4.24 light-years from Earth.{'\n'}
              42 years later you are now in orbit around Proxima Centauri.{'\n\n'}
              Hydrogen reserves: 1,800 units.{'\n'}
              Rare Metals: detected.{'\n\n'}
              Tap a star or planet to survey.{'\n'}
            </Text>
          </View>
          {Platform.OS === 'web' ? (
            <Pressable
              style={[styles.beginBtn, { cursor: 'pointer' }]}
              onPress={() => setInitModalOpen(true)}
            >
              <Text style={styles.beginBtnText}>INITIALIZE TORCH</Text>
            </Pressable>
          ) : (
            <TouchableOpacity style={styles.beginBtn} onPress={() => setInitModalOpen(true)}>
              <Text style={styles.beginBtnText}>INITIALIZE TORCH</Text>
            </TouchableOpacity>
          )}
        </View>
      )}

      {/* ── Narrative sequence ── */}
      {initPhase >= 0 && (
        <View style={styles.narrativeOverlay}>
          <Text style={styles.narrativeText}>{NARRATIVE_EVENTS[initPhase]?.text}</Text>
          {NARRATIVE_EVENTS[initPhase]?.sub && (
            <Text style={styles.narrativeSub}>{NARRATIVE_EVENTS[initPhase].sub}</Text>
          )}
        </View>
      )}

      {/* ── Arriving ── */}
      {phase === 'arriving' && (
        <View style={styles.overlay}>
          <Text style={styles.statusText}>DECELERATION COMPLETE</Text>
          <Text style={styles.statusSub}>Orbital velocity: 52 km/s{'\n'}Scanning Proxima Centauri…</Text>
        </View>
      )}

      {/* ── Deploy drones ── */}
      {phase === 'deploy' && (
        <View style={[styles.decisionOverlay, deployStyle]}>
          <View style={styles.deployPanel}>
            <Text style={styles.decisionTitle}>DRONE DEPLOYMENT</Text>
            <Text style={styles.decisionSub}>
              4 drones standing by.{'\n'}
              Assign each to a collection zone to begin mining.{'\n'}
              H₂ rate shown per zone.
            </Text>

            {DRONE_ZONES.map((zone, zIdx) => (
              <View key={zone.id} style={[styles.zoneCard, zIdx === DRONE_ZONES.length - 1 && styles.rowLast]}>
                <View style={styles.zoneHeader}>
                  <View>
                    <Text style={styles.zoneName}>{zone.label}</Text>
                    <View style={styles.zoneMeta}>
                      <Text style={styles.zoneRate}>+{zone.h2Rate} H₂/turn</Text>
                      <Text style={styles.zoneFlare}>
                        Flare: {zone.flareRisk === 'None' ? '—' : zone.flareRisk}
                      </Text>
                    </View>
                  </View>
                  <View style={styles.zoneDrones}>
                    {(deployedZones[zone.id] ?? []).map(did => (
                      <Text key={did} style={styles.zoneDroneTag}>{did}</Text>
                    ))}
                  </View>
                </View>
                <Text style={styles.zoneDesc}>{zone.desc}</Text>
              </View>
            ))}

            <Text style={styles.deployHint}>
              Auto-assigned by Torch protocol. Tap to reassign zones.
            </Text>

            <TouchableOpacity style={styles.deployBtn} onPress={handleDeploy}>
              <Text style={styles.deployBtnText}>CONFIRM DEPLOYMENT</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}

      {/* ── Decision ── */}
      {phase === 'decision' && (
        <View style={[styles.decisionOverlay, panelStyle]}>
          <View style={styles.decisionPanel}>
            <Text style={styles.decisionTitle}>PRIMARY DIRECTIVE</Text>
            <Text style={styles.decisionSub}>
              Drones mining. +{h2PerTurn} H₂/turn active.{'\n'}
              H₂ reserve: {h2.toLocaleString()} units. Choose your first move.
            </Text>

            <TouchableOpacity style={[styles.choiceBtn, styles.choiceStation]}
              onPress={() => handleDecision('station')}>
              <Text style={styles.choiceLabel}>⬡  SETUP STATION</Text>
              <Text style={styles.choiceUpside}>+ Passive H₂ +12/turn  ·  System Influence +5/turn</Text>
              <Text style={styles.choiceUpside}>+ Enables Research Station — tech tree unlocked</Text>
              <Text style={styles.choiceUpside}>+ Rare Metal extraction becomes possible</Text>
              <Text style={styles.choiceDownside}>− Costs 400 H₂ to anchor  ·  Takes 3 turns to build</Text>
              <Text style={styles.choiceDownside}>− No new drones until Station is online</Text>
            </TouchableOpacity>

            <TouchableOpacity style={[styles.choiceBtn, styles.choicePrinter]}
              onPress={() => handleDecision('printer')}>
              <Text style={styles.choiceLabel}>◈  ACTIVATE PRINTER</Text>
              <Text style={styles.choiceUpside}>+ Print 2 drones immediately  ·  +8 H₂/turn added</Text>
              <Text style={styles.choiceUpside}>+ Faster expansion  ·  More systems reachable sooner</Text>
              <Text style={styles.choiceDownside}>− Costs 600 H₂ upfront  ·  No passive income</Text>
              <Text style={styles.choiceDownside}>− No tech research until a Station is built later</Text>
              <Text style={styles.choiceDownside}>− Rare Metals inaccessible until Era 2</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}

      {/* ── Result: Station ── */}
      {(phase === 'station') && (
        <View style={[styles.overlay, resultStyle]}>
          <View style={styles.resultPanel}>
            <Text style={styles.resultIcon}>⬡</Text>
            <Text style={styles.resultTitle}>STATION ANCHORED</Text>
            <Text style={styles.resultBody}>
              Station online in Proxima Centauri.{'\n'}
              Passive H₂ collection: +12/turn{'\n'}
              System Influence Score: {influenceScore}{'\n\n'}
              Scout drones are surveying Rare Metal deposits…
            </Text>
            <Text style={styles.resultHint}>Era 1 — Dawn  ·  Proxima Centauri</Text>
          </View>
        </View>
      )}

      {/* ── Result: Printer ── */}
      {phase === 'printer' && (
        <View style={[styles.overlay, resultStyle]}>
          <View style={styles.resultPanel}>
            <Text style={styles.resultIcon}>◈</Text>
            <Text style={styles.resultTitle}>PRINTER ACTIVE</Text>
            <Text style={styles.resultBody}>
              Seed Printer online. Print queue open.{'\n'}
              H₂ reserve: {h2.toLocaleString()} units{'\n\n'}
              Select a blueprint to begin production.{'\n'}
              No passive income until Station is built.
            </Text>
            <Text style={styles.resultHint}>Era 1 — Dawn  ·  Proxima Centauri</Text>
          </View>
        </View>
      )}

      {/* ── Probe stats modal ── */}
      <Modal visible={probeOpen} transparent animationType="slide" onRequestClose={() => setProbeOpen(false)}>
        <TouchableOpacity style={styles.modalBackdrop} activeOpacity={1} onPress={() => setProbeOpen(false)} />
        <View style={styles.modalSheet}>
          <View style={styles.modalHeader}>
            <View>
              <Text style={styles.modalTitle}>VON NEUMANN PROBE</Text>
              <Text style={styles.modalSub}>Seed-class  ·  Era 1 — Dawn</Text>
            </View>
            <TouchableOpacity onPress={() => setProbeOpen(false)} style={styles.closeBtn}>
              <Text style={styles.closeTxt}>✕</Text>
            </TouchableOpacity>
          </View>
          <ScrollView showsVerticalScrollIndicator={false}>
            <Text style={styles.sectionHead}>VESSEL</Text>
            {[
              ['DESIGNATION', 'Von Neumann Probe — Seed class'],
              ['ERA',         'Era 1 — Dawn'],
              ['HULL STATUS', 'Nominal'],
              ['MASS',        '~2,400 tonnes (dry)'],
              ['LENGTH',      '184 metres'],
            ].map(([label, value]) => (
              <View key={label} style={styles.row}>
                <Text style={styles.rowLabel}>{label}</Text>
                <Text style={styles.rowValue}>{value}</Text>
              </View>
            ))}

            <Text style={styles.sectionHead}>PROPULSION</Text>
            {[
              ['DRIVE',       'Helium-3 Fusion Drive'],
              ['CRUISE SPEED','~0.1c (10% lightspeed)'],
              ['TRANSIT TIME','42 years — Sol to Proxima'],
              ['H₂ RESERVE',  `${h2.toLocaleString()} units`],
              ['FUEL SOURCE', 'Interstellar scoop + local extraction'],
            ].map(([label, value]) => (
              <View key={label} style={styles.row}>
                <Text style={styles.rowLabel}>{label}</Text>
                <Text style={styles.rowValue}>{value}</Text>
              </View>
            ))}

            <Text style={styles.sectionHead}>SYSTEMS</Text>
            {[
              ['SEED PRINTER', 'Online — Era 1 blueprints loaded'],
              ['BLUEPRINTS',   'Earth full tech snapshot at launch'],
              ['DRONES',       `${drones.length} × Era 1 deployed`],
              ['WEAPONS',      'None — Era 3 unlock required'],
              ['SHIELDS',      'None — Era 2 unlock required'],
              ['SENSORS',      'Active — 2.4 AU range'],
              ['COMMS',        'Quantum relay — 4.24 ly to Sol'],
            ].map(([label, value], idx, arr) => (
              <View key={label} style={[styles.row, idx === arr.length - 1 && styles.rowLast]}>
                <Text style={styles.rowLabel}>{label}</Text>
                <Text style={styles.rowValue}>{value}</Text>
              </View>
            ))}
          </ScrollView>
        </View>
      </Modal>

      {/* ── Star system modal ── */}
      <Modal visible={modalStar !== null} transparent animationType="slide" onRequestClose={() => setModalStar(null)}>
        <TouchableOpacity style={styles.modalBackdrop} activeOpacity={1} onPress={() => setModalStar(null)} />
        {modalStar && (
          <View style={styles.modalSheet}>
            <View style={styles.modalHeader}>
              <View>
                <Text style={styles.modalTitle}>{modalStar.name}</Text>
                <Text style={styles.modalSub}>{modalStar.starType}  ·  {modalStar.distance} ly</Text>
              </View>
              <TouchableOpacity onPress={() => setModalStar(null)} style={styles.closeBtn}>
                <Text style={styles.closeTxt}>✕</Text>
              </TouchableOpacity>
            </View>
            <ScrollView showsVerticalScrollIndicator={false}>
              <Text style={styles.sectionHead}>SYSTEM</Text>
              {[
                ['H₂ DENSITY', modalStar.hydrogenDensity,
                  modalStar.hydrogenDensity === 'Very High' ? 'excellent' :
                  modalStar.hydrogenDensity === 'High'      ? 'positive'  :
                  modalStar.hydrogenDensity === 'Moderate'  ? 'neutral'   : 'dim'],
                ['DEPOSIT CLASS',
                  modalStar.spectralClass === 'Unknown'
                    ? 'Unknown — Era 2+ Scout required'
                    : `Class ${modalStar.spectralClass}`,
                  modalStar.spectralClass === 'D' ? 'excellent' :
                  modalStar.spectralClass === 'C' ? 'positive'  :
                  modalStar.spectralClass === 'Unknown' ? 'warning' : 'neutral'],
                ['ASTEROID BELT', modalStar.hasAsteroidBelt ? 'Detected' : 'None',
                  modalStar.hasAsteroidBelt ? 'positive' : 'dim'],
                ['ICE MOON',      modalStar.hasIceMoon ? 'Present' : 'None',
                  modalStar.hasIceMoon ? 'positive' : 'dim'],
                ['GAS GIANT',    modalStar.gasGiant ? 'Present — scooping viable' : 'None',
                  modalStar.gasGiant ? 'positive' : 'dim'],
              ].map(([label, value, clr]) => (
                <View key={label as string} style={styles.row}>
                  <Text style={styles.rowLabel}>{label}</Text>
                  <Text style={[styles.rowValue, styles[clr as keyof typeof styles]]}>{value}</Text>
                </View>
              ))}
              <View style={styles.row}>
                <Text style={styles.rowLabel}>ANOMALY</Text>
                {modalStar.anomaly
                  ? <Text style={[styles.rowValue, styles.warning]}>⚠ {modalStar.anomaly}</Text>
                  : <Text style={[styles.rowValue, styles.dim]}>None detected</Text>
                }
              </View>
              <Text style={styles.sectionHead}>PLANETS  ({modalStar.planetCount})</Text>
              {modalStar.planets.map((p, idx) => (
                <View key={p.name} style={[styles.planetCard, idx === modalStar.planets.length - 1 && styles.rowLast]}>
                  <View style={styles.planetRow}>
                    <Text style={styles.planetName}>{p.name}</Text>
                    <Text style={styles.planetType}>{p.type}</Text>
                  </View>
                  <View style={styles.planetRow}>
                    <Text style={styles.planetDetail}>H₂: {p.h2}</Text>
                    {p.rareMetal && <Text style={[styles.planetDetail, styles.excellent]}>◆ Rare Metal trace</Text>}
                  </View>
                  <Text style={styles.planetNote}>{p.note}</Text>
                </View>
              ))}
            </ScrollView>
          </View>
        )}
      </Modal>

      {/* ── Proxima planet modal ── */}
      <Modal visible={selectedPlanet !== null} transparent animationType="slide"
        onRequestClose={() => setSelectedPlanet(null)}>
        <TouchableOpacity style={styles.modalBackdrop} activeOpacity={1} onPress={() => setSelectedPlanet(null)} />
        {selectedPlanet && (() => {
          const pd = PROXIMA_DATA[selectedPlanet];
          return (
            <View style={styles.modalSheet}>
              <View style={styles.modalHeader}>
                <View>
                  <Text style={styles.modalTitle}>{pd.label.toUpperCase()}</Text>
                  <Text style={[styles.modalSub, { color: pd.statusColor }]}>{pd.status}</Text>
                </View>
                <TouchableOpacity onPress={() => setSelectedPlanet(null)} style={styles.closeBtn}>
                  <Text style={styles.closeTxt}>✕</Text>
                </TouchableOpacity>
              </View>
              <ScrollView showsVerticalScrollIndicator={false}>
                {pd.rows.map((row, idx) => (
                  <View key={row.label} style={[styles.row, idx === pd.rows.length - 1 && styles.rowLast]}>
                    <Text style={styles.rowLabel}>{row.label}</Text>
                    <View style={{ flex: 2, alignItems: 'flex-end' }}>
                      <Text style={styles.rowValue}>{row.value}</Text>
                      {row.note && <Text style={styles.rowNote}>{row.note}</Text>}
                    </View>
                  </View>
                ))}
              </ScrollView>
            </View>
          );
        })()}
      </Modal>

      {/* ── Proxima Centauri system info modal ── */}
      <Modal visible={proximaOpen} transparent animationType="slide"
        onRequestClose={() => setProximaOpen(false)}>
        <TouchableOpacity style={styles.modalBackdrop} activeOpacity={1} onPress={() => setProximaOpen(false)} />
        <View style={styles.modalSheet}>
          <View style={styles.modalHeader}>
            <View>
              <Text style={styles.modalTitle}>PROXIMA CENTAURI</Text>
              <Text style={styles.modalSub}>· 4.24 ly from Earth</Text>
            </View>
            <TouchableOpacity onPress={() => setProximaOpen(false)} style={styles.closeBtn}>
              <Text style={styles.closeTxt}>✕</Text>
            </TouchableOpacity>
          </View>
          <ScrollView showsVerticalScrollIndicator={false}>
            <Text style={styles.sectionHead}>STAR</Text>
            {PROXIMA_STAR_INFO.map((row, idx, arr) => (
              <View key={row.label} style={[styles.row, idx === arr.length - 1 && styles.rowLast]}>
                <Text style={styles.rowLabel}>{row.label}</Text>
                <Text style={[
                  styles.rowValue,
                  row.valueColor
                    ? styles[row.valueColor as keyof typeof styles]
                    : styles.neutral
                ]}>{row.value}</Text>
              </View>
            ))}

            <Text style={styles.sectionHead}>PLANETS</Text>
            {(['d', 'b', 'c'] as ProximaPlanet[]).map((id, idx, arr) => {
              const pd = PROXIMA_DATA[id];
              const orbitRow = pd.rows.find(r => r.label === 'ORBIT PERIOD');
              const massRow  = pd.rows.find(r => r.label === 'MASS');
              const habRow   = pd.rows.find(r => r.label === 'HABITABILITY');
              return (
                <View key={id} style={[styles.zoneModalRow, idx === arr.length - 1 && styles.rowLast]}>
                  <View style={styles.zoneModalLeft}>
                    <Text style={[styles.zoneModalName, { color: pd.color }]}>{pd.label.toUpperCase()}</Text>
                  </View>
                  <View style={styles.zoneModalRight}>
                    {orbitRow && <Text style={styles.zoneModalDesc}>{orbitRow.label}: {orbitRow.value}</Text>}
                    {massRow  && <Text style={styles.zoneModalDesc}>{massRow.label}: {massRow.value}</Text>}
                    {habRow   && <Text style={[styles.zoneModalDesc, { color: pd.color }]}>{habRow.label}: {habRow.value}</Text>}
                  </View>
                </View>
              );
            })}

            <Text style={styles.sectionHead}>DRONE DEPLOYMENT</Text>
            {DRONE_ZONES.map((zone, idx, arr) => {
              const planetColor = PROXIMA_DATA[zone.planet].color;
              return (
                <View key={zone.id} style={[styles.zoneModalRow, idx === arr.length - 1 && styles.rowLast]}>
                  <View style={styles.zoneModalLeft}>
                    <View style={styles.zoneLabelRow}>
                      <Text style={[styles.planetDot, { color: planetColor }]}>●</Text>
                      <Text style={styles.zoneModalName}>{zone.label}</Text>
                    </View>
                    <Text style={styles.zoneModalDesc}>{zone.desc}</Text>
                  </View>
                  <View style={styles.zoneModalRight}>
                    <Text style={styles.zoneModalRate}>+{zone.h2Rate} H₂/t</Text>
                    {(deployedZones[zone.id] ?? []).map(did => (
                      <Text key={did} style={styles.zoneModalDrone}>{did}</Text>
                    ))}
                  </View>
                </View>
              );
            })}

            <Text style={styles.sectionHead}>STRATEGIC NOTES</Text>
            <View style={[styles.row, styles.rowLast]}>
              <Text style={[styles.rowValue, { textAlign: 'left', fontSize: 11, lineHeight: 18 }]}>
                {'• Proxima b is the primary H₂ source — deploy Gatherers to Night Side for stable output.\n• Proxima d Rare Metal trace requires Era 2 Gatherer to unlock extraction.\n• Terminator zone is optimal for Station placement — balanced temperature, moderate radiation.\n• Proxima c ice mining viable for long-term H₂ supply as system expands.\n• Flare risk: day side of Proxima b should be avoided until upgraded shields.'}
              </Text>
            </View>
          </ScrollView>
        </View>
      </Modal>

      {/* ── Initialize Torch modal ── */}
      <Modal visible={initModalOpen} transparent animationType="slide" onRequestClose={() => setInitModalOpen(false)}>
        <TouchableOpacity style={styles.modalBackdrop} activeOpacity={1} onPress={() => setInitModalOpen(false)} />
        <View style={[styles.modalSheet, { zIndex: 60, pointerEvents: 'auto' }]}>
          <View style={styles.modalHeader}>
            <View>
              <Text style={styles.modalTitle}>INITIALIZE TORCH</Text>
              <Text style={styles.modalSub}>Select primary directive to begin</Text>
            </View>
            <TouchableOpacity onPress={() => setInitModalOpen(false)} style={styles.closeBtn}>
              <Text style={styles.closeTxt}>✕</Text>
            </TouchableOpacity>
          </View>
          <ScrollView showsVerticalScrollIndicator={false}>
            <TouchableOpacity style={[styles.choiceBtn, styles.choiceDrone]}
              onPress={() => { setDirective('printer'); setH2(prev => prev - 200); setInitModalOpen(false); startInitSequence(); }}>
              <Text style={styles.choiceLabel}>◉  PRINT DRONES</Text>
              <Text style={styles.choiceUpside}>+ Print 2 drones immediately  ·  +8 H₂/turn added</Text>
              <Text style={styles.choiceUpside}>+ Printer enabled for later production  ·  No Station</Text>
              <Text style={styles.choiceDownside}>− Costs 200 H₂ upfront  ·  Takes 1 turn</Text>
              <Text style={styles.choiceDownside}>− No passive income  ·  Rare Metals until Era 2</Text>
            </TouchableOpacity>

            <TouchableOpacity style={[styles.choiceBtn, styles.choicePrinter]}
              onPress={() => { setDirective('printer'); setH2(prev => prev - 350); setInitModalOpen(false); startInitSequence(); }}>
              <Text style={styles.choiceLabel}>◈  PRINT PRINTER</Text>
              <Text style={styles.choiceUpside}>+ Enables parallel drone production  ·  Build queue open</Text>
              <Text style={styles.choiceUpside}>+ Faster mid-game expansion capability</Text>
              <Text style={styles.choiceDownside}>− Costs 350 H₂ upfront  ·  No drones or passive income</Text>
              <Text style={styles.choiceDownside}>− Takes 2 turns  ·  No tech research</Text>
            </TouchableOpacity>

            <TouchableOpacity style={[styles.choiceBtn, styles.choiceStation]}
              onPress={() => { setDirective('station'); setH2(prev => prev - 500); setInitModalOpen(false); startInitSequence(); }}>
              <Text style={styles.choiceLabel}>⬡  PRINT STATION</Text>
              <Text style={styles.choiceUpside}>+ Passive H₂ +12/turn  ·  System Influence +5/turn</Text>
              <Text style={styles.choiceUpside}>+ Enables Research Station — tech tree unlocked</Text>
              <Text style={styles.choiceUpside}>+ Rare Metal extraction possible</Text>
              <Text style={styles.choiceDownside}>− Costs 500 H₂ to anchor  ·  Takes 3 turns to build</Text>
              <Text style={styles.choiceDownside}>− No new drones until Station is online</Text>
            </TouchableOpacity>

            <TouchableOpacity style={[styles.choiceBtn, styles.choiceProbe]}
              onPress={() => { setDirective('printer'); setH2(prev => prev - 1800); setInitModalOpen(false); startInitSequence(); }}>
              <Text style={styles.choiceLabel}>◊  PRINT TORCH</Text>
              <Text style={styles.choiceUpside}>+ 4 Drones + Printer  ·  Full expansion package</Text>
              <Text style={styles.choiceUpside}>+ Ready for immediate system exploration</Text>
              <Text style={styles.choiceDownside}>− Costs 1,800 H₂  ·  Takes 3 turns to assemble</Text>
              <Text style={styles.choiceDownside}>− No Station  ·  Must build research later</Text>
            </TouchableOpacity>

            <TouchableOpacity style={[styles.choiceBtn, styles.choiceProbe]}
              onPress={() => { setDirective('station'); setH2(prev => prev - 2200); setInitModalOpen(false); startInitSequence(); }}>
              <Text style={styles.choiceLabel}>◊  PRINT TORCH + STATION</Text>
              <Text style={styles.choiceUpside}>+ 4 Drones + Printer + Station  ·  Maximum starting power</Text>
              <Text style={styles.choiceUpside}>+ Station comes online with 2 Drones  ·  Full research enabled</Text>
              <Text style={styles.choiceUpside}>+ Immediately expand to new star systems</Text>
              <Text style={styles.choiceDownside}>− Costs 2,200 H₂  ·  The "go wide" nuclear option</Text>
              <Text style={styles.choiceDownside}>− Requires rebuilding local economy after</Text>
            </TouchableOpacity>
          </ScrollView>
        </View>
      </Modal>

    </View>
  );
}

// ─── Styles ────────────────────────────────────────────────────────────────────

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#000000' },

  // HUD bar
  hudBar: {
    position: 'absolute',
    top: 0, left: 0, right: 0,
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 50,
    paddingHorizontal: 20,
    paddingBottom: 10,
    backgroundColor: 'rgba(5,8,16,0.85)',
    borderBottomColor: '#1a2a3a', borderBottomWidth: 1,
    zIndex: 100,
  },
  hudLeft:  { flex: 1, alignItems: 'flex-start' },
  hudCenter:{ flex: 2, alignItems: 'center' },
  hudRight: { flex: 1, alignItems: 'flex-end' },
  hudLabel: { color: '#a8d8ff', fontSize: 14, letterSpacing: 2, fontFamily: 'Open Sans' },
  hudValue: { color: '#a8d8ff', fontSize: 18, fontWeight: '700', letterSpacing: 1, fontFamily: 'Open Sans' },
  hudRate:  { color: '#a8d8ff', fontSize: 15, letterSpacing: 1, fontFamily: 'Open Sans' },
  hudSystem:{ color: '#a8d8ff', fontSize: 15, letterSpacing: 2, fontFamily: 'Open Sans' },
  hudInfluence:{ color: '#a8d8ff', fontSize: 14, letterSpacing: 1, marginTop: 2, fontFamily: 'Open Sans' },
  hudEra:   { color: '#a8d8ff', fontSize: 14, letterSpacing: 2, marginTop: 2, fontFamily: 'Open Sans' },
  infoBtn:  { paddingLeft: 16 },
  infoBtnText:{ color: '#a8d8ff', fontSize: 20, fontFamily: 'Open Sans' },

  overlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'flex-end',
    paddingBottom: 60,
    paddingHorizontal: 28,
    alignItems: 'center',
  },
  decisionOverlay: { ...StyleSheet.absoluteFillObject, justifyContent: 'flex-end' },

  // Intro
  title:       { color: '#a8d8ff', fontSize: 28, fontWeight: '700', letterSpacing: 6, textAlign: 'center', marginBottom: 6, fontFamily: 'Open Sans' },
  titleContainer: { flexDirection: 'row', alignItems: 'center', marginBottom: 6 },
  titleReplicant: { color: '#a8d8ff', fontSize: 28, fontWeight: '700', letterSpacing: 6, fontFamily: 'Open Sans' },
  titleFlame: { color: '#60a0ff', fontSize: 28, fontWeight: '700', letterSpacing: 6, textShadowColor: '#4080ff', textShadowRadius: 10, fontFamily: 'Open Sans' },
  subtitle:    { color: '#60a0ff', fontSize: 13, letterSpacing: 3,  textAlign: 'center', marginBottom: 28, fontFamily: 'Open Sans' },
  loreYear:    { color: '#a8d8ff', fontSize: 22, fontWeight: '700', letterSpacing: 4, textAlign: 'center', marginBottom: 12, fontFamily: 'Open Sans' },
  lore:        { color: '#8aabb8', fontSize: 15, lineHeight: 24,    textAlign: 'center', marginBottom: 36, fontFamily: 'Open Sans' },
  beginBtn:    { borderColor: '#4a90d9', borderWidth: 1, paddingVertical: 14, paddingHorizontal: 36, cursor: 'pointer' },
  beginBtnText:{ color: '#a8d8ff', fontSize: 17, letterSpacing: 4, fontWeight: '600', fontFamily: 'Open Sans', zIndex: 999 },

  // Arriving
  statusText: { color: '#a8d8ff', fontSize: 18, letterSpacing: 4, textAlign: 'center', marginBottom: 8, fontFamily: 'Open Sans' },
  statusSub:  { color: '#a8d8ff', fontSize: 16, letterSpacing: 2, textAlign: 'center', fontFamily: 'Open Sans' },

  // Deploy
  deployPanel: {
    backgroundColor: 'rgba(5,8,16,0.94)',
    borderTopColor: '#1a2a3a', borderTopWidth: 1,
    paddingHorizontal: 24, paddingTop: 20, paddingBottom: 44,
    maxHeight: height * 0.72,
  },
  deployHint: { color: '#a8d8ff', fontSize: 15, letterSpacing: 1, marginTop: 12, marginBottom: 16, textAlign: 'center', fontFamily: 'Open Sans' },
  deployBtn:  { backgroundColor: '#0a2030', borderColor: '#2a5a7a', borderWidth: 1, paddingVertical: 14, alignItems: 'center' },
  deployBtnText:{ color: '#a8d8ff', fontSize: 16, letterSpacing: 4, fontWeight: '600', fontFamily: 'Open Sans' },
  zoneCard:   { borderBottomColor: '#0e1e2e', borderBottomWidth: 1, paddingVertical: 10 },
  zoneHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 4 },
  zoneName:   { color: '#a8d8ff', fontSize: 16, fontWeight: '600', letterSpacing: 1, fontFamily: 'Open Sans' },
  zoneMeta:   { flexDirection: 'row', gap: 12, marginTop: 2 },
  zoneRate:   { color: '#a8d8ff', fontSize: 15, letterSpacing: 1, fontFamily: 'Open Sans' },
  zoneFlare:  { color: '#a8d8ff', fontSize: 15, letterSpacing: 1, fontFamily: 'Open Sans' },
  zoneDrones:{ flexDirection: 'row', gap: 4 },
  zoneDroneTag:{ color: '#a8d8ff', fontSize: 14, borderColor: '#1e3a5a', borderWidth: 1, paddingHorizontal: 4, paddingVertical: 1, letterSpacing: 1, fontFamily: 'Open Sans' },
  zoneDesc:   { color: '#a8d8ff', fontSize: 15, lineHeight: 20, fontFamily: 'Open Sans' },

  // Decision
  decisionPanel: {
    backgroundColor: 'rgba(5,8,16,0.93)',
    borderTopColor: '#1a2a3a', borderTopWidth: 1,
    paddingHorizontal: 24, paddingTop: 24, paddingBottom: 44,
  },
  decisionTitle: { color: '#a8d8ff', fontSize: 15, letterSpacing: 4, marginBottom: 6, fontFamily: 'Open Sans' },
  decisionSub:   { color: '#a8d8ff', fontSize: 16, lineHeight: 24, marginBottom: 24, fontFamily: 'Open Sans' },
  choiceBtn:     { borderWidth: 1, padding: 16, marginBottom: 12 },
  choiceStation: { borderColor: '#2a6a4a', backgroundColor: 'rgba(20,50,35,0.6)' },
  choicePrinter: { borderColor: '#4a4a8a', backgroundColor: 'rgba(25,25,60,0.6)' },
  choiceDrone:   { borderColor: '#4a8a8a', backgroundColor: 'rgba(20,40,50,0.6)' },
  choiceProbe:   { borderColor: '#8a4a8a', backgroundColor: 'rgba(40,20,40,0.6)' },
  choiceLabel:   { color: '#a8d8ff', fontSize: 16, letterSpacing: 3, fontWeight: '700', marginBottom: 6, fontFamily: 'Open Sans' },
  choiceDesc:    { color: '#a8d8ff', fontSize: 16, lineHeight: 22, fontFamily: 'Open Sans' },
  choiceUpside:  { color: '#4aaa6a', fontSize: 13, lineHeight: 20, marginTop: 4, fontFamily: 'Open Sans' },
  choiceDownside:{ color: '#ff7755', fontSize: 13, lineHeight: 20, marginTop: 2, fontFamily: 'Open Sans' },

  // Result
  resultPanel: { alignItems: 'center', paddingHorizontal: 28, paddingBottom: 60 },
  resultIcon:  { fontSize: 32, color: '#a8d8ff', marginBottom: 16, fontFamily: 'Open Sans' },
  resultTitle: { color: '#a8d8ff', fontSize: 18, letterSpacing: 4, fontWeight: '700', marginBottom: 20, fontFamily: 'Open Sans' },
  resultBody:  { color: '#a8d8ff', fontSize: 17, lineHeight: 26, textAlign: 'center', marginBottom: 20, fontFamily: 'Open Sans' },
  resultHint:  { color: '#a8d8ff', fontSize: 15, letterSpacing: 3, fontFamily: 'Open Sans' },

  // Narrative sequence
  narrativeOverlay: {
    position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
    justifyContent: 'center', alignItems: 'center', zIndex: 30,
  },
  narrativeText: {
    color: '#a8d8ff', fontSize: 18, letterSpacing: 2, fontWeight: '600', fontFamily: 'Open Sans',
    textAlign: 'center', marginBottom: 8,
  },
  narrativeSub: {
    color: '#a8d8ff', fontSize: 13, letterSpacing: 1, fontFamily: 'Open Sans',
    opacity: 0.7, textAlign: 'center',
  },

  // Probe tap
  probeTap: {
    position: 'absolute',
    width: HIT_RADIUS * 2,
    height: HIT_RADIUS * 2,
    borderRadius: HIT_RADIUS,
  },
  shipContainer: {
    position: 'absolute',
    top: 52,
    right: 20,
    alignItems: 'flex-end',
    zIndex: 110,
  },
  shipName: { color: '#60a0ff', fontSize: 13, letterSpacing: 3, textAlign: 'right', fontFamily: 'Open Sans' },
  shipType: { color: '#a8d8ff', fontSize: 11, letterSpacing: 2, textAlign: 'right', opacity: 0.6, fontFamily: 'Open Sans', marginBottom: 2 },
  shipBtn: {
    width: 72,
    height: 72,
    justifyContent: 'center',
    alignItems: 'center',
  },

  // Star tap zone (larger hit area)
  starTapZone: {
    position: 'absolute',
    borderRadius: 9999,
  },

  // Tap overlays (invisible hit areas)
  starOverlay: {
    position: 'absolute',
    width: 36,
    height: 36,
    borderRadius: 18,
  },
  planetOverlay: {
    position: 'absolute',
    width: 56,
    height: 56,
    borderRadius: 28,
  },
  // Wide orbit path tap zones (elliptical approximation with square)
  orbitPDOverlay: {
    position: 'absolute',
    width: PD_RX * 2 + 60,
    height: PD_RY * 2 + 60,
  },
  orbitPBOverlay: {
    position: 'absolute',
    width: PB_RX * 2 + 80,
    height: PB_RY * 2 + 80,
  },
  orbitPCOverlay: {
    position: 'absolute',
    width: PC_RX * 2 + 100,
    height: PC_RY * 2 + 100,
  },

  // Modal shared
  modalBackdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalSheet: {
    position: 'absolute',
    bottom: 0, left: 0, right: 0,
    backgroundColor: 'rgba(5,10,20,0.98)',
    borderTopColor: '#1e3a5a', borderTopWidth: 1,
    paddingHorizontal: 24, paddingTop: 20, paddingBottom: 44,
    maxHeight: height * 0.72,
    zIndex: 200,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  modalTitle: { color: '#a8d8ff', fontSize: 18, letterSpacing: 3, fontWeight: '700', fontFamily: 'Open Sans' },
  modalSub:   { color: '#a8d8ff', fontSize: 15, letterSpacing: 1, marginTop: 4, fontFamily: 'Open Sans' },
  closeBtn:   { padding: 4 },
  closeTxt:   { color: '#a8d8ff', fontSize: 18, fontFamily: 'Open Sans' },

  sectionHead: {
    color: '#a8d8ff', fontSize: 14, letterSpacing: 3,
    marginTop: 16, marginBottom: 6, fontFamily: 'Open Sans',
  },

  // Rows
  row: {
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start',
    paddingVertical: 9, borderBottomColor: '#0e1e2e', borderBottomWidth: 1,
  },
  rowLast:  { borderBottomWidth: 0 },
  rowLabel: { color: '#a8d8ff', fontSize: 15, letterSpacing: 2, flex: 1, fontFamily: 'Open Sans' },
  rowValue: { color: '#a8d8ff', fontSize: 16, flex: 2, textAlign: 'right', fontFamily: 'Open Sans' },
  rowNote:  { color: '#a8d8ff', fontSize: 14, textAlign: 'right', marginTop: 2, fontFamily: 'Open Sans' },

  // Planet cards
  planetCard: {
    paddingVertical: 10,
    borderBottomColor: '#0e1e2e', borderBottomWidth: 1,
  },
  planetRow:   { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 3 },
  planetName:  { color: '#a8d8ff', fontSize: 16, fontWeight: '600', letterSpacing: 1, fontFamily: 'Open Sans' },
  planetType:  { color: '#a8d8ff', fontSize: 15, fontFamily: 'Open Sans' },
  planetDetail:{ color: '#a8d8ff', fontSize: 15, fontFamily: 'Open Sans' },
  planetNote:  { color: '#a8d8ff', fontSize: 14, marginTop: 2, fontFamily: 'Open Sans' },

  // Zone modal rows
  zoneModalRow: {
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start',
    paddingVertical: 8, borderBottomColor: '#0e1e2e', borderBottomWidth: 1,
  },
  zoneModalLeft:  { flex: 3 },
  zoneModalRight: { flex: 1, alignItems: 'flex-end' },
  zoneLabelRow:   { flexDirection: 'row', alignItems: 'center', gap: 6 },
  planetDot:      { fontSize: 16 },
  zoneModalName:  { color: '#a8d8ff', fontSize: 15, fontWeight: '600', letterSpacing: 1, fontFamily: 'Open Sans' },
  zoneModalDesc:  { color: '#a8d8ff', fontSize: 14, lineHeight: 19, marginTop: 2, fontFamily: 'Open Sans' },
  zoneModalRate:   { color: '#a8d8ff', fontSize: 15, fontWeight: '600', marginBottom: 2, fontFamily: 'Open Sans' },
  zoneModalDrone:  { color: '#a8d8ff', fontSize: 14, letterSpacing: 1, borderColor: '#1e3a5a', borderWidth: 1, paddingHorizontal: 3, paddingVertical: 1, fontFamily: 'Open Sans' },

  // Value colours
  positive:  { color: '#a8d8ff' },
  excellent: { color: '#a8d8ff' },
  neutral:   { color: '#a8d8ff' },
  dim:       { color: '#a8d8ff' },
  warning:   { color: '#a8d8ff' },
});
