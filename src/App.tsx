import { useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
import type { CSSProperties } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import MarqueeModule from 'react-fast-marquee';
import * as GitHubCalendarModule from 'react-github-calendar';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import ContactSection from './components/ContactSection';

import campusPreview from './assets/Screenshot from 2025-12-16 03-09-40.png';
import kopiPreview from './assets/AzkaSyS.jpeg';
import goAzkaPreview from './assets/AzkaExplore.jpeg';
import portfolioPreview from './assets/web-topup.jpeg';

gsap.registerPlugin(ScrollTrigger);
ScrollTrigger.config({ ignoreMobileResize: true });
ScrollTrigger.defaults({ invalidateOnRefresh: true });

/** SECTION TECH: off-white biar nggak nabrak */
const TECH_BG = '#f8fafc'; // slate-50

type Profile = {
  name: string;
  role: string;
  location: string;
  status: string;
};

type Project = {
  no: string;
  title: string;
  desc: string;
  tags: string[];
  url: string;
  previewStyle: string;
  previewImage?: string;
  previewLayout?: 'phone';

  role?: string;
  stack?: string[];
  impact?: string[];
};

type Tool = {
  name: string;
};

type JourneyItem = {
  yearRange: string;
  title: string;
  desc: string;
  tags: string[];
  side: 'left' | 'right';
};

type NavItem = {
  id: string;
  label: string;
};

type GithubStats = {
  name?: string;
  avatar_url?: string;
  html_url?: string;
  public_repos?: number;
  followers?: number;
  following?: number;
  totalStars?: number;
  topRepos?: { name: string; stars: number; url: string }[];
};

const PROFILE: Profile = {
  name: 'Azka Labib',
  role: 'Fullstack Developer',
  location: 'Lumajang, ID',
  status: 'Available for select work',
};

const PROJECTS: Project[] = [
  {
    no: '01',
    title: 'ITB WIGA Website Redesign',
    desc: 'Platform akademik modern dengan antarmuka yang bersih dan responsif. Mengutamakan kemudahan navigasi untuk menyajikan data universitas, fasilitas, dan pembaruan berita secara interaktif',
    tags: ['Education', 'CMS', 'UI/UX'],
    url: 'https://example.com',
    previewStyle: 'linear-gradient(135deg, #0f172a, #1e3a8a, #0b1220)',
    previewImage: campusPreview,
    role: 'Front-End & UI/UX Designer',
    stack: ['HTML', 'CSS', 'JavaScript'],
    impact: ['Sistem Navigasi Intuitif untuk berbagai demografi pengguna (dosen, mahasiswa, pengunjung).', 'Layout lebih konsisten', 'Responsivitas Penuh yang dioptimalkan untuk mobile dan desktop.'],
  },
  {
    no: '02',
    title: 'AZKAAA.SYS',
    desc: 'Dasbor sistem manajemen inventaris dan perdagangan canggih yang dirancang untuk presisi stok, transaksi e-commerce yang mulus, dan efisiensi maksimum dengan jaminan keamanan dan kecepatan.',
    tags: ['Brand', 'Ecommerce', 'Dashboard'],
    url: 'https://example.com',
    previewStyle: 'linear-gradient(135deg, #0b1120, #1d4ed8, #0f172a)',
    previewImage: kopiPreview,
    role: 'Fullstack',
    stack: ['React', 'Tailwind', 'PHP'],
    impact: ['Latensi Transaksi 0ms (Ultra-low Latency with 0ms Transaction Delay).', 'Modul Kontrol Inventaris, Perdagangan, dan Kontrol yang Terintegrasi.', 'Keamanan Data yang Terjamin (Guaranteed Data Security).'],
  },
  {
    no: '03',
    title: 'Azkatravel - Premium Trip Landing Page',
    desc: 'Platform eksplorasi destinasi wisata yang dirancang dengan antarmuka modern dan menenangkan. Menghadirkan informasi itinerary dan layanan konsultasi dalam tata letak yang bersih dan intuitif.  ',
    tags: ['Mobile', 'Product', 'App UI'],
    url: 'https://example.com',
    previewStyle: 'linear-gradient(135deg, #020617, #0f172a, #2563eb)',
    previewImage: goAzkaPreview,
    previewLayout: 'phone',
    role: 'Front-End Developer & UI Designer',
    stack: ['React', 'Tailwind', 'Framer'],
    impact: ['Implementasi image text-masking tingkat lanjut pada hero section.', 'Desain tata letak yang clean, modern, dan berfokus pada fotografi destinasi.', 'Penempatan tombol Call-to-Action CTA yang strategis untuk konversi Booking & Konsultasi.'],
  },
  {
    no: '04',
    title: 'Digital Game Top-Up Platform',
    desc: 'Platform top-up game dengan antarmuka super responsif, dirancang untuk transaksi kilat dan pengalaman gaming yang seamless',
    tags: ['E-COMMERCE', 'GAMING', 'Fullstack'],
    url: 'https://example.com',
    previewStyle: 'linear-gradient(135deg, #0b1120, #1f2937, #0b3b7a)',
    previewImage: portfolioPreview,
    role: 'UI/UX Design & Fullstack Development',
    stack: ['React', 'Tailwind', 'PHP'],
    impact: ['Pengelolaan data transaksi yang solid dan aman di sisi backend.', 'Navigasi dinamis dan smooth berbasis komponen React.', 'Desain visual yang menarik dan modern dengan fokus pada pengalaman pengguna.'],
  },
];

const TOOLS: Tool[] = [
  { name: 'React' },
  { name: 'Next.js' },
  { name: 'TypeScript' },
  { name: 'Tailwind' },
  { name: 'Node.js' },
  { name: 'Python' },
  { name: 'PHP' },
  { name: 'Kotlin' },
  { name: 'Git' },
  { name: 'Framer' },
  { name: 'GSAP' },
  { name: 'Vite' },
];

const TOOL_DETAILS: Record<string, string> = {
  React: 'Library',
  'Next.js': 'Framework',
  TypeScript: 'Language',
  Tailwind: 'Styling',
  'Node.js': 'Runtime',
  Python: 'Language',
  PHP: 'Language',
  Kotlin: 'Mobile',
  Git: 'Version Control',
  Framer: 'Motion',
  GSAP: 'Animation',
  Vite: 'Build',
};

const TOOL_ICONS: Record<string, string> = {
  React: 'https://cdn.simpleicons.org/react/64748b',
  'Next.js': 'https://cdn.simpleicons.org/nextdotjs/64748b',
  TypeScript: 'https://cdn.simpleicons.org/typescript/64748b',
  Tailwind: 'https://cdn.simpleicons.org/tailwindcss/64748b',
  'Node.js': 'https://cdn.simpleicons.org/nodedotjs/64748b',
  Python: 'https://cdn.simpleicons.org/python/64748b',
  PHP: 'https://cdn.simpleicons.org/php/64748b',
  Kotlin: 'https://cdn.simpleicons.org/kotlin/64748b',
  Git: 'https://cdn.simpleicons.org/git/64748b',
  Framer: 'https://cdn.simpleicons.org/framer/64748b',
  GSAP: 'https://cdn.simpleicons.org/greensock/64748b',
  Vite: 'https://cdn.simpleicons.org/vite/64748b',
};

const JOURNEY: JourneyItem[] = [
  {
    yearRange: '2024 - 2025',
    title: 'Front-End Explorer & System Enthusiast',
    desc: 'Memulai perjalanan di dunia web development dengan membangun fundamental UI yang solid. Di fase ini juga aktif mengeksplorasi sistem operasi, termasuk ricing UI pada environment Linux untuk melatih sense desain.',
    tags: ['HTML', 'CSS', 'JS', 'LINUX'],
    side: 'left',
  },
  {
    yearRange: '2025 - 2026',
    title: 'Front-End & Logic Foundation',
    desc: 'Masa di mana fokus utama adalah memperkuat fundamental web development. Banyak bereksperimen dengan struktur antarmuka, styling, dan mulai mengasah logika interaktivitas menggunakan JavaScript dan TypeScript untuk membangun fungsionalitas web yang lebih dinamis.',
    tags: ['JAVASCRIPT', 'TYPESCRIPT', 'CSS'],
    side: 'right',
  },
  {
    yearRange: 'Awal 2026',
    title: 'Fullstack Developer',
    desc: 'Mengembangkan keahlian ke level fullstack dengan membangun platform e-commerce (Top-Up Game). Fokus pada role-based authentication, database MySQL, dan styling efisien menggunakan framework modern.',
    tags: ['REACT', 'TAILWIND', 'MYSQL'],
    side: 'left',
  },
  {
    yearRange: '2026 - Sekarang',
    title: 'Cross-Platform Developer',
    desc: 'Memperluas jangkauan teknologi ke pengembangan aplikasi mobile dengan Flutter, termasuk eksperimen fitur overlay/floating bubble, serta memperdalam integrasi asinkron dengan Fetch API.',
    tags: ['FLUTTER', 'TYPESCRIPT', 'API'],
    side: 'right',
  },
];

const fadeStyle = (from: string, to: string) =>
  ({
    '--fade-from': from,
    '--fade-to': to,
  } as CSSProperties);

/**
 * BACKDROP BARU (langit hangat + gunung layered + forest silhouette).
 * Kamu boleh ubah warna di sini.
 */
const heroBackdropVars = {
  '--hero-hx': '0px',
  '--hero-hy': '0px',

  '--sky-top': '#637a82',
  '--sky-mid': '#7f9a9b',
  '--sky-horizon': '#d8b08a',

  '--mtn-far': '#2d7b8b',
  '--mtn-mid': '#246f81',
  '--mtn-mid2': '#1e6375',
  '--mtn-near': '#165567',

  '--forest-far': '#2f7f8f',
  '--forest-mid': '#1a5d6c',
  '--forest-near': '#0b2a33',
} as CSSProperties;

/** Pastikan false biar tidak ada overlay debug. */
const DEBUG_BACKDROP = false;

const HERO_WIDTH = 1600;
const HERO_HEIGHT = 900;

type Point = { x: number; y: number };
type TreePlacement = {
  x: number;
  y: number;
  scale: number;
  rotate: number;
  variant: string;
};

const clampValue = (value: number, min: number, max: number) => Math.min(max, Math.max(min, value));

const createSeededRandom = (seed: number) => {
  let state = seed % 2147483647;
  if (state <= 0) state += 2147483646;
  return () => {
    state = (state * 16807) % 2147483647;
    return (state - 1) / 2147483646;
  };
};

const smoothPoints = (points: Point[], iterations = 2) => {
  let result = points.map((point) => ({ ...point }));
  for (let i = 0; i < iterations; i += 1) {
    result = result.map((point, index) => {
      if (index === 0 || index === result.length - 1) return point;
      const prev = result[index - 1];
      const next = result[index + 1];
      return { x: point.x, y: (prev.y + point.y * 2 + next.y) / 4 };
    });
  }
  return result;
};

const generateRidgePoints = ({
  seed,
  width,
  minY,
  maxY,
  minStep,
  maxStep,
  plateauChance = 0.2,
  plateauVariance = 12,
  waveAmplitude = 0,
  waveFrequency = 1,
  wavePhase = 0,
}: {
  seed: number;
  width: number;
  minY: number;
  maxY: number;
  minStep: number;
  maxStep: number;
  plateauChance?: number;
  plateauVariance?: number;
  waveAmplitude?: number;
  waveFrequency?: number;
  wavePhase?: number;
}) => {
  const random = createSeededRandom(seed);
  const points: Point[] = [];
  let x = 0;
  let y = minY + random() * (maxY - minY);
  points.push({ x, y });

  while (x < width) {
    const step = minStep + random() * (maxStep - minStep);
    x = Math.min(width, x + step);
    if (random() < plateauChance) {
      y = clampValue(y + (random() - 0.5) * plateauVariance, minY, maxY);
    } else {
      y = minY + random() * (maxY - minY);
    }
    points.push({ x, y });
  }

  const withWave = points.map((point) => ({
    ...point,
    y: clampValue(
      point.y +
        Math.sin((point.x / width) * Math.PI * 2 * waveFrequency + wavePhase) * waveAmplitude,
      minY,
      maxY
    ),
  }));

  return smoothPoints(withWave, 2);
};

const buildSmoothPath = (points: Point[], width: number, height: number) => {
  if (points.length < 2) return '';
  let d = `M ${points[0].x} ${points[0].y}`;
  for (let i = 0; i < points.length - 1; i += 1) {
    const p0 = points[i - 1] ?? points[i];
    const p1 = points[i];
    const p2 = points[i + 1];
    const p3 = points[i + 2] ?? p2;
    const cp1x = p1.x + (p2.x - p0.x) / 6;
    const cp1y = p1.y + (p2.y - p0.y) / 6;
    const cp2x = p2.x - (p3.x - p1.x) / 6;
    const cp2y = p2.y - (p3.y - p1.y) / 6;
    d += ` C ${cp1x} ${cp1y} ${cp2x} ${cp2y} ${p2.x} ${p2.y}`;
  }
  d += ` L ${width} ${height} L 0 ${height} Z`;
  return d;
};

const PINE_VARIANTS = ['pine-a', 'pine-b', 'pine-c', 'pine-d', 'pine-e', 'pine-f'];

const createForestPlacements = ({
  seed,
  width,
  baseY,
  baseCount,
  clusterCount,
  clusterMin,
  clusterMax,
  clusterSpread,
  scaleMin,
  scaleMax,
  yJitter,
  rotationMax,
}: {
  seed: number;
  width: number;
  baseY: number;
  baseCount: number;
  clusterCount: number;
  clusterMin: number;
  clusterMax: number;
  clusterSpread: number;
  scaleMin: number;
  scaleMax: number;
  yJitter: number;
  rotationMax: number;
}) => {
  const random = createSeededRandom(seed);
  const placements: TreePlacement[] = [];
  const step = width / baseCount;

  const makeTree = (x: number) => ({
    x: clampValue(x, -60, width + 60),
    y: baseY + (random() - 0.5) * yJitter,
    scale: scaleMin + random() * (scaleMax - scaleMin),
    rotate: (random() * 2 - 1) * rotationMax,
    variant: PINE_VARIANTS[Math.floor(random() * PINE_VARIANTS.length)],
  });

  for (let i = 0; i < baseCount; i += 1) {
    const jitter = (random() - 0.5) * step * 1.2;
    placements.push(makeTree(i * step + jitter));
  }

  for (let cluster = 0; cluster < clusterCount; cluster += 1) {
    const center = random() * width;
    const count = clusterMin + Math.floor(random() * (clusterMax - clusterMin + 1));
    for (let j = 0; j < count; j += 1) {
      const offset = (random() - 0.5) * clusterSpread;
      placements.push(makeTree(center + offset));
    }
  }

  return placements.sort((a, b) => a.x - b.x);
};

/** GUNUNG: clean layered */
const mountainFarPath = buildSmoothPath(
  generateRidgePoints({
    seed: 1201,
    width: HERO_WIDTH,
    minY: 300,
    maxY: 395,
    minStep: 210,
    maxStep: 360,
    plateauChance: 0.35,
    plateauVariance: 10,
    waveAmplitude: 8,
    waveFrequency: 0.85,
    wavePhase: 0.6,
  }),
  HERO_WIDTH,
  HERO_HEIGHT
);

const mountainMidPath = buildSmoothPath(
  generateRidgePoints({
    seed: 2117,
    width: HERO_WIDTH,
    minY: 360,
    maxY: 510,
    minStep: 190,
    maxStep: 340,
    plateauChance: 0.28,
    plateauVariance: 14,
    waveAmplitude: 10,
    waveFrequency: 1.0,
    wavePhase: 1.1,
  }),
  HERO_WIDTH,
  HERO_HEIGHT
);

const mountainMid2Path = buildSmoothPath(
  generateRidgePoints({
    seed: 3191,
    width: HERO_WIDTH,
    minY: 405,
    maxY: 585,
    minStep: 175,
    maxStep: 320,
    plateauChance: 0.25,
    plateauVariance: 16,
    waveAmplitude: 12,
    waveFrequency: 1.1,
    wavePhase: 2.0,
  }),
  HERO_WIDTH,
  HERO_HEIGHT
);

const mountainNearPath = buildSmoothPath(
  generateRidgePoints({
    seed: 4703,
    width: HERO_WIDTH,
    minY: 500,
    maxY: 705,
    minStep: 160,
    maxStep: 300,
    plateauChance: 0.22,
    plateauVariance: 18,
    waveAmplitude: 14,
    waveFrequency: 1.2,
    wavePhase: 0.5,
  }),
  HERO_WIDTH,
  HERO_HEIGHT
);

/** FOREST: tambah far + density */
const forestFarFloorPath = buildSmoothPath(
  generateRidgePoints({
    seed: 3113,
    width: HERO_WIDTH,
    minY: 630,
    maxY: 700,
    minStep: 110,
    maxStep: 190,
    plateauChance: 0.4,
    plateauVariance: 10,
    waveAmplitude: 10,
    waveFrequency: 1.15,
    wavePhase: 0.7,
  }),
  HERO_WIDTH,
  HERO_HEIGHT
);

const forestMidFloorPath = buildSmoothPath(
  generateRidgePoints({
    seed: 4111,
    width: HERO_WIDTH,
    minY: 680,
    maxY: 750,
    minStep: 100,
    maxStep: 180,
    plateauChance: 0.4,
    plateauVariance: 10,
    waveAmplitude: 10,
    waveFrequency: 1.2,
    wavePhase: 0.8,
  }),
  HERO_WIDTH,
  HERO_HEIGHT
);

const forestNearFloorPath = buildSmoothPath(
  generateRidgePoints({
    seed: 5117,
    width: HERO_WIDTH,
    minY: 720,
    maxY: 820,
    minStep: 90,
    maxStep: 170,
    plateauChance: 0.35,
    plateauVariance: 12,
    waveAmplitude: 12,
    waveFrequency: 1.25,
    wavePhase: 1.4,
  }),
  HERO_WIDTH,
  HERO_HEIGHT
);

const forestFarPlacements = createForestPlacements({
  seed: 5201,
  width: HERO_WIDTH,
  baseY: 735,
  baseCount: 34,
  clusterCount: 4,
  clusterMin: 3,
  clusterMax: 5,
  clusterSpread: 140,
  scaleMin: 0.28,
  scaleMax: 0.55,
  yJitter: 44,
  rotationMax: 3,
});

const forestMidPlacements = createForestPlacements({
  seed: 6209,
  width: HERO_WIDTH,
  baseY: 790,
  baseCount: 46,
  clusterCount: 6,
  clusterMin: 4,
  clusterMax: 6,
  clusterSpread: 150,
  scaleMin: 0.55,
  scaleMax: 1.0,
  yJitter: 54,
  rotationMax: 3,
});

const forestNearPlacements = createForestPlacements({
  seed: 7229,
  width: HERO_WIDTH,
  baseY: 850,
  baseCount: 62,
  clusterCount: 8,
  clusterMin: 5,
  clusterMax: 7,
  clusterSpread: 165,
  scaleMin: 0.85,
  scaleMax: 1.55,
  yJitter: 66,
  rotationMax: 3,
});

/** PineDefs: siluet pine yang lebih alami */
const PineDefs = () => (
  <defs>
    <g id="pine-a" fill="currentColor">
      <rect x="-1.8" y="-18" width="3.6" height="18" rx="1" opacity="0.55" />
      <path d="M0 -112 C -14 -98 -20 -86 -10 -78 C -26 -70 -28 -52 -8 -46 C -26 -38 -26 -18 0 -10 C 26 -18 26 -38 8 -46 C 28 -52 26 -70 10 -78 C 20 -86 14 -98 0 -112 Z" />
      <path
        d="M0 -108 C -10 -96 -12 -86 -6 -80 C -18 -72 -18 -58 -6 -52 C -18 -44 -16 -28 0 -20 C 16 -28 18 -44 6 -52 C 18 -58 18 -72 6 -80 C 12 -86 10 -96 0 -108 Z"
        opacity="0.12"
      />
    </g>

    <g id="pine-b" fill="currentColor">
      <rect x="-2" y="-20" width="4" height="20" rx="1" opacity="0.55" />
      <path d="M0 -126 C -16 -112 -24 -96 -12 -88 C -32 -80 -34 -58 -10 -52 C -30 -44 -30 -18 0 -10 C 30 -18 30 -44 10 -52 C 34 -58 32 -80 12 -88 C 24 -96 16 -112 0 -126 Z" />
      <path
        d="M0 -120 C -10 -110 -14 -100 -8 -92 C -20 -84 -20 -66 -8 -60 C -20 -50 -18 -30 0 -24 C 18 -30 20 -50 8 -60 C 20 -66 20 -84 8 -92 C 14 -100 10 -110 0 -120 Z"
        opacity="0.12"
      />
    </g>

    <g id="pine-c" fill="currentColor">
      <rect x="-1.6" y="-16" width="3.2" height="16" rx="1" opacity="0.55" />
      <path d="M0 -104 C -12 -92 -16 -80 -8 -74 C -22 -66 -22 -50 -8 -44 C -22 -36 -20 -18 0 -12 C 20 -18 22 -36 8 -44 C 22 -50 22 -66 8 -74 C 16 -80 12 -92 0 -104 Z" />
      <path
        d="M0 -98 C -8 -90 -10 -82 -6 -76 C -16 -68 -16 -56 -6 -50 C -16 -40 -14 -26 0 -20 C 14 -26 16 -40 6 -50 C 16 -56 16 -68 6 -76 C 10 -82 8 -90 0 -98 Z"
        opacity="0.12"
      />
    </g>

    <g id="pine-d" fill="currentColor">
      <rect x="-2.2" y="-18" width="4.4" height="18" rx="1.1" opacity="0.55" />
      <path d="M0 -112 C -18 -100 -28 -84 -14 -76 C -36 -68 -38 -48 -12 -42 C -34 -34 -32 -12 0 -8 C 32 -12 34 -34 12 -42 C 38 -48 36 -68 14 -76 C 28 -84 18 -100 0 -112 Z" />
      <path
        d="M0 -106 C -12 -96 -18 -86 -10 -80 C -24 -72 -24 -58 -10 -52 C -22 -44 -20 -28 0 -22 C 20 -28 22 -44 10 -52 C 24 -58 24 -72 10 -80 C 18 -86 12 -96 0 -106 Z"
        opacity="0.12"
      />
    </g>

    <g id="pine-e" fill="currentColor">
      <rect x="-1.8" y="-18" width="3.6" height="18" rx="1" opacity="0.55" />
      <path d="M6 -108 C -8 -96 -14 -84 -6 -76 C -22 -68 -22 -52 -6 -46 C -22 -38 -20 -18 6 -12 C 24 -18 26 -38 10 -46 C 26 -52 26 -68 10 -76 C 18 -84 14 -96 6 -108 Z" />
      <path
        d="M6 -102 C -2 -94 -6 -86 -2 -80 C -14 -72 -14 -60 -2 -54 C -14 -44 -12 -30 6 -24 C 18 -30 20 -44 8 -54 C 20 -60 20 -72 8 -80 C 14 -86 10 -94 6 -102 Z"
        opacity="0.12"
      />
    </g>

    <g id="pine-f" fill="currentColor">
      <rect x="-2.1" y="-16" width="4.2" height="16" rx="1" opacity="0.55" />
      <path d="M0 -90 C -16 -80 -22 -68 -12 -62 C -28 -56 -30 -40 -10 -36 C -26 -30 -24 -14 0 -10 C 24 -14 26 -30 10 -36 C 30 -40 28 -56 12 -62 C 22 -68 16 -80 0 -90 Z" />
      <path
        d="M0 -86 C -10 -78 -14 -70 -8 -66 C -18 -60 -18 -50 -8 -46 C -16 -40 -14 -28 0 -24 C 14 -28 16 -40 8 -46 C 18 -50 18 -60 8 -66 C 14 -70 10 -78 0 -86 Z"
        opacity="0.12"
      />
    </g>
  </defs>
);

const NAV_ITEMS: NavItem[] = [
  { id: 'top', label: 'HOME' },
  { id: 'about', label: 'ABOUT' },
  { id: 'projects', label: 'PROJECTS' },
  { id: 'tech', label: 'TECH' },
  { id: 'journey', label: 'JOURNEY' },
  { id: 'github', label: 'GITHUB' },
  { id: 'contact', label: 'CONTACT' },
];

const MARQUEE_TEXT =
  'NEXT.JS / TYPESCRIPT / TAILWIND CSS / NODE.JS / PYTHON / PHP / KOTLIN / GIT / FRAMER MOTION / REACT.JS /';
const GITHUB_USERNAME = 'azka13labib-ops';

/** Marquee ESM/CJS safe (didefinisikan 1x saja) */
const Marquee =
  (MarqueeModule as any).default?.default ?? (MarqueeModule as any).default ?? (MarqueeModule as any);

/** GitHubCalendar ESM/CJS safe (fix error export default/named) */
const GitHubCalendar: any =
  (GitHubCalendarModule as any).default ?? (GitHubCalendarModule as any).GitHubCalendar;

const sumStars = (repos: any[]) => repos.reduce((acc, r) => acc + (Number(r?.stargazers_count) || 0), 0);

const usePrefersReducedMotion = () => {
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => setReducedMotion(media.matches);
    update();
    if (media.addEventListener) {
      media.addEventListener('change', update);
      return () => media.removeEventListener('change', update);
    }
    media.addListener(update);
    return () => media.removeListener(update);
  }, []);

  return reducedMotion;
};

const useSectionObserver = (ids: string[]) => {
  const [activeSection, setActiveSection] = useState(ids[0] ?? 'top');

  useEffect(() => {
    if (!ids.length) return;
    const elements = ids.map((id) => document.getElementById(id)).filter(Boolean) as HTMLElement[];

    if (!elements.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]) setActiveSection((visible[0].target as HTMLElement).id);
      },
      { rootMargin: '-35% 0px -55% 0px', threshold: [0.2, 0.45, 0.7] }
    );

    elements.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, [ids.join('|')]);

  return activeSection;
};

function MountainLoadingScreen({
  progress,
  prefersReducedMotion,
}: {
  progress: number;
  prefersReducedMotion: boolean;
}) {
  const loaderVars: CSSProperties = {
    ...heroBackdropVars,
    '--sky-top': '#0b1220',
    '--sky-mid': '#0f1a33',
    '--sky-horizon': '#1b2a4a',

    '--mtn-far': '#0e3550',
    '--mtn-mid': '#0b2f48',
    '--mtn-mid2': '#08283f',
    '--mtn-near': '#061f33',

    '--forest-far': '#0a2f3c',
    '--forest-mid': '#072530',
    '--forest-near': '#03121a',
  };

  return (
    <div className="fixed inset-0 z-[9999] overflow-hidden bg-[#0b1220] text-white">
      <HeroBackdrop styleOverride={loaderVars} className="opacity-100" />

      {/* cinematic overlay */}
      <div className="pointer-events-none absolute inset-0 z-[96] bg-[radial-gradient(120%_100%_at_50%_35%,rgba(0,0,0,0)_45%,rgba(0,0,0,0.70)_100%)]" />
      <div className="pointer-events-none absolute inset-0 z-[97] bg-[linear-gradient(180deg,rgba(0,0,0,0.55)_0%,rgba(0,0,0,0.10)_40%,rgba(0,0,0,0.75)_100%)]" />

      {/* content */}
      <div className="relative z-[110] mx-auto flex h-full w-full max-w-6xl flex-col justify-between px-6 py-10 md:py-12">
        <div className="flex items-end justify-between gap-6">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.4em] text-white/60">Initializing</p>
            <h2 className="mt-3 font-display text-4xl uppercase leading-[0.95] md:text-5xl">
              Azka Labib
              <span className="block text-white/25">Portfolio</span>
            </h2>
          </div>

          <div className="text-right">
            <p className="text-xs font-semibold uppercase tracking-[0.35em] text-white/60">Loading</p>
            <p className="mt-2 font-mono text-3xl leading-none">
              {String(Math.min(100, Math.max(0, progress))).padStart(3, '0')}%
            </p>
          </div>
        </div>

        <div className="w-full max-w-3xl">
          <div className="rounded-[2rem] border border-white/15 bg-white/5 p-5 backdrop-blur-sm md:p-6">
            <div className="flex items-center justify-between gap-4">
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-white/55">
                Layering mountains • Forest • Grain
              </p>
              <p className="hidden text-xs font-semibold uppercase tracking-[0.3em] text-white/45 sm:block">
                {prefersReducedMotion ? 'Reduced motion' : 'Motion enabled'}
              </p>
            </div>

            <div className="mt-5">
              <div className="h-3 overflow-hidden rounded-full bg-white/10">
                <div
                  className="h-full rounded-full bg-white/75 transition-[width] duration-200"
                  style={{ width: `${progress}%` }}
                />
                <div
                  className="loader-scan absolute -mt-3 h-3 w-28 opacity-70"
                  style={{
                    transform: `translateX(calc(${progress}% - 56px))`,
                    background:
                      'linear-gradient(90deg, rgba(255,255,255,0), rgba(255,255,255,.85), rgba(255,255,255,0))',
                    filter: 'blur(2px)',
                  }}
                />
              </div>

              <div className="mt-5 grid grid-cols-12 gap-2">
                {Array.from({ length: 36 }).map((_, i) => {
                  const on = i / 36 < progress / 100;
                  return (
                    <div
                      key={i}
                      className="h-2 rounded-sm bg-white/10"
                      style={{
                        opacity: on ? 0.85 : 0.22,
                        transition: 'opacity 180ms ease',
                      }}
                    />
                  );
                })}
              </div>

              <p className="mt-5 text-xs font-semibold uppercase tracking-[0.3em] text-white/45">
                Preparing sections • Type • Images
              </p>
            </div>
          </div>

          <p className="mt-6 text-xs font-semibold uppercase tracking-[0.35em] text-white/45">
            Please wait
          </p>
        </div>
      </div>

      <style>{`
        .loader-scan{
          animation: loaderScan 1.2s linear infinite;
        }
        @keyframes loaderScan{
          0%{ opacity: .25; }
          50%{ opacity: .75; }
          100%{ opacity: .25; }
        }
      `}</style>
    </div>
  );
}

type HeroBackdropProps = {
  styleOverride?: CSSProperties;
  className?: string;
};

const HeroBackdrop = ({ styleOverride, className }: HeroBackdropProps) => {
  const backdropStyle = { ...heroBackdropVars, ...(styleOverride ?? {}) } as CSSProperties;

  return (
    <div
      className={`hero-bg absolute inset-0 z-0 overflow-hidden pointer-events-none ${className ?? ''}`}
      style={backdropStyle}
      aria-hidden="true"
    >
      {/* SKY (z-0) */}
      <div
        className="absolute inset-0 z-[0] will-change-transform"
        style={{
          transform: 'translate3d(calc(var(--hero-hx) * 0.06), calc(var(--hero-hy) * 0.06), 0)',
          transition: 'transform 240ms ease-out',
        }}
      >
        <svg viewBox="0 0 1600 900" className="h-full w-full" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
          <defs>
            <linearGradient id="hero-sky-gradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="var(--sky-top)" />
              <stop offset="58%" stopColor="var(--sky-mid)" />
              <stop offset="100%" stopColor="var(--sky-horizon)" />
            </linearGradient>

            <radialGradient id="hero-sun-soft" gradientUnits="userSpaceOnUse" cx="820" cy="520" r="420">
              <stop offset="0%" stopColor="#f6e0bf" stopOpacity="0.22" />
              <stop offset="55%" stopColor="#f6e0bf" stopOpacity="0.12" />
              <stop offset="100%" stopColor="#f6e0bf" stopOpacity="0" />
            </radialGradient>

            <filter id="hero-soft-blur" x="-20%" y="-20%" width="140%" height="140%" colorInterpolationFilters="sRGB">
              <feGaussianBlur stdDeviation="12" />
            </filter>

            <filter id="hero-cloud-blur" x="-20%" y="-20%" width="140%" height="140%" colorInterpolationFilters="sRGB">
              <feGaussianBlur stdDeviation="9" />
            </filter>
          </defs>

          <rect width="1600" height="900" fill="url(#hero-sky-gradient)" />

          {/* Soft Sun glow (behind mountains) */}
          <g filter="url(#hero-soft-blur)">
            <circle cx="820" cy="520" r="420" fill="url(#hero-sun-soft)" />
          </g>

          {/* Cloud blobs */}
          <g filter="url(#hero-cloud-blur)" opacity="0.35">
            <ellipse cx="350" cy="470" rx="220" ry="46" fill="#f7f0e4" opacity="0.18" />
            <ellipse cx="610" cy="510" rx="280" ry="54" fill="#f7f0e4" opacity="0.14" />
            <ellipse cx="920" cy="485" rx="260" ry="50" fill="#f7f0e4" opacity="0.16" />
            <ellipse cx="1240" cy="520" rx="250" ry="48" fill="#f7f0e4" opacity="0.12" />
          </g>
        </svg>
      </div>

      {/* MOUNTAIN FAR (z-10) */}
      <div className="absolute inset-0 z-[10] will-change-transform" data-parallax data-speed="0.13" data-speed-x="0.06">
        <div
          className="absolute inset-0"
          style={{
            transform: 'translate3d(calc(var(--hero-hx) * 0.12), calc(var(--hero-hy) * 0.12), 0)',
            transition: 'transform 240ms ease-out',
          }}
        >
          <svg viewBox="0 0 1600 900" className="h-full w-full" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
            <defs>
              <linearGradient id="hero-mtn-far" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="var(--mtn-far)" stopOpacity="0.52" />
                <stop offset="100%" stopColor="var(--mtn-far)" stopOpacity="0.95" />
              </linearGradient>
              <filter
                id="hero-mtn-far-blur"
                x="-5%"
                y="-5%"
                width="110%"
                height="110%"
                colorInterpolationFilters="sRGB"
              >
                <feGaussianBlur stdDeviation="1.1" />
              </filter>
            </defs>
            <path d={mountainFarPath} fill="url(#hero-mtn-far)" filter="url(#hero-mtn-far-blur)" opacity="0.9" />
          </svg>
        </div>
      </div>

      {/* MOUNTAIN MID (z-20) */}
      <div className="absolute inset-0 z-[20] will-change-transform" data-parallax data-speed="0.2" data-speed-x="0.14">
        <div
          className="absolute inset-0"
          style={{
            transform: 'translate3d(calc(var(--hero-hx) * 0.18), calc(var(--hero-hy) * 0.18), 0)',
            transition: 'transform 240ms ease-out',
          }}
        >
          <svg viewBox="0 0 1600 900" className="h-full w-full" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
            <defs>
              <linearGradient id="hero-mtn-mid" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="var(--mtn-mid)" stopOpacity="0.75" />
                <stop offset="100%" stopColor="var(--mtn-mid)" stopOpacity="1" />
              </linearGradient>
            </defs>
            <path d={mountainMidPath} fill="url(#hero-mtn-mid)" />
          </svg>
        </div>
      </div>

      {/* MOUNTAIN MID 2 (z-30) */}
      <div className="absolute inset-0 z-[30] will-change-transform" data-parallax data-speed="0.24" data-speed-x="0.18">
        <div
          className="absolute inset-0"
          style={{
            transform: 'translate3d(calc(var(--hero-hx) * 0.22), calc(var(--hero-hy) * 0.22), 0)',
            transition: 'transform 240ms ease-out',
          }}
        >
          <svg viewBox="0 0 1600 900" className="h-full w-full" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
            <defs>
              <linearGradient id="hero-mtn-mid2" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="var(--mtn-mid2)" stopOpacity="0.82" />
                <stop offset="100%" stopColor="var(--mtn-mid2)" stopOpacity="1" />
              </linearGradient>
            </defs>
            <path d={mountainMid2Path} fill="url(#hero-mtn-mid2)" />
          </svg>
        </div>
      </div>

      {/* MOUNTAIN NEAR (z-40) */}
      <div className="absolute inset-0 z-[40] will-change-transform" data-parallax data-speed="0.3" data-speed-x="0.22">
        <div
          className="absolute inset-0"
          style={{
            transform: 'translate3d(calc(var(--hero-hx) * 0.28), calc(var(--hero-hy) * 0.28), 0)',
            transition: 'transform 240ms ease-out',
          }}
        >
          <svg viewBox="0 0 1600 900" className="h-full w-full" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
            <defs>
              <linearGradient id="hero-mtn-near" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="var(--mtn-near)" stopOpacity="0.88" />
                <stop offset="100%" stopColor="var(--mtn-near)" stopOpacity="1" />
              </linearGradient>
            </defs>
            <path d={mountainNearPath} fill="url(#hero-mtn-near)" />
          </svg>
        </div>
      </div>

      {/* HAZE (z-45) */}
      <div
        className="absolute inset-x-0 top-[44%] z-[45] h-[24%]"
        style={{
          background: 'linear-gradient(180deg, rgba(255, 248, 236, 0.18) 0%, rgba(255, 248, 236, 0) 100%)',
          filter: 'blur(14px)',
          transform: 'translate3d(calc(var(--hero-hx) * 0.10), calc(var(--hero-hy) * 0.10), 0)',
          transition: 'transform 240ms ease-out',
        }}
      />

      {/* FOREST FAR (z-50) */}
      <div className="absolute inset-0 z-[50] will-change-transform" data-parallax data-speed="0.34" data-speed-x="0.24">
        <div
          className="absolute inset-0"
          style={{
            transform: 'translate3d(calc(var(--hero-hx) * 0.34), calc(var(--hero-hy) * 0.34), 0)',
            transition: 'transform 240ms ease-out',
          }}
        >
          <svg viewBox="0 0 1600 900" className="h-full w-full" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
            <PineDefs />
            <defs>
              <filter
                id="hero-forest-far-blur"
                x="-10%"
                y="-10%"
                width="120%"
                height="120%"
                colorInterpolationFilters="sRGB"
              >
                <feGaussianBlur stdDeviation="1.1" />
              </filter>
            </defs>
            <g style={{ color: 'var(--forest-far)' }} opacity="0.7" filter="url(#hero-forest-far-blur)">
              <path d={forestFarFloorPath} fill="currentColor" opacity="0.55" />
              {forestFarPlacements.map((tree, index) => (
                <g
                  key={`forest-far-${index}`}
                  transform={`translate(${tree.x.toFixed(2)} ${tree.y.toFixed(2)})`}
                  opacity={0.55 + (index % 7) * 0.05}
                >
                  <g transform={`scale(${tree.scale.toFixed(3)}) rotate(${tree.rotate.toFixed(2)})`}>
                    <use href={`#${tree.variant}`} />
                  </g>
                </g>
              ))}
            </g>
          </svg>
        </div>
      </div>

      {/* FOREST MID (z-60) */}
      <div className="absolute inset-0 z-[60] will-change-transform" data-parallax data-speed="0.38" data-speed-x="0.28">
        <div
          className="absolute inset-0"
          style={{
            transform: 'translate3d(calc(var(--hero-hx) * 0.42), calc(var(--hero-hy) * 0.42), 0)',
            transition: 'transform 240ms ease-out',
          }}
        >
          <svg viewBox="0 0 1600 900" className="h-full w-full" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
            <PineDefs />
            <g style={{ color: 'var(--forest-mid)' }} opacity="0.85">
              <path d={forestMidFloorPath} fill="currentColor" opacity="0.7" />
              {forestMidPlacements.map((tree, index) => (
                <g
                  key={`forest-mid-${index}`}
                  transform={`translate(${tree.x.toFixed(2)} ${tree.y.toFixed(2)})`}
                  opacity={0.62 + (index % 9) * 0.04}
                >
                  <g transform={`scale(${tree.scale.toFixed(3)}) rotate(${tree.rotate.toFixed(2)})`}>
                    <use href={`#${tree.variant}`} />
                  </g>
                </g>
              ))}
            </g>
          </svg>
        </div>
      </div>

      {/* FOREST NEAR (z-70) */}
      <div className="absolute inset-0 z-[70] will-change-transform" data-parallax data-speed="0.46" data-speed-x="0.34">
        <div
          className="absolute inset-0"
          style={{
            transform: 'translate3d(calc(var(--hero-hx) * 0.55), calc(var(--hero-hy) * 0.55), 0)',
            transition: 'transform 240ms ease-out',
          }}
        >
          <svg viewBox="0 0 1600 900" className="h-full w-full" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
            <PineDefs />
            <g style={{ color: 'var(--forest-near)' }}>
              <path d={forestNearFloorPath} fill="currentColor" />
              {forestNearPlacements.map((tree, index) => (
                <g
                  key={`forest-near-${index}`}
                  transform={`translate(${tree.x.toFixed(2)} ${tree.y.toFixed(2)})`}
                  opacity={0.75 + (index % 11) * 0.02}
                >
                  <g transform={`scale(${tree.scale.toFixed(3)}) rotate(${tree.rotate.toFixed(2)})`}>
                    <use href={`#${tree.variant}`} />
                  </g>
                </g>
              ))}
            </g>
          </svg>
        </div>
      </div>

      {/* FOREST MIST (z-80) */}
      <div
        className="absolute inset-x-0 bottom-[18vh] z-[80] h-[16vh]"
        style={{
          background: 'linear-gradient(180deg, rgba(255, 248, 236, 0.12) 0%, rgba(255, 248, 236, 0) 100%)',
          filter: 'blur(7px)',
          transform: 'translate3d(calc(var(--hero-hx) * 0.12), calc(var(--hero-hy) * 0.12), 0)',
          transition: 'transform 240ms ease-out',
        }}
      />

      {/* VIGNETTE (z-90) */}
      <div
        className="absolute inset-0 z-[90]"
        style={{
          background: 'radial-gradient(120% 120% at 50% 45%, rgba(0, 0, 0, 0) 52%, rgba(0, 0, 0, 0.34) 100%)',
        }}
      />

      {/* GRAIN (z-95) */}
      <svg
        viewBox="0 0 1600 900"
        className="absolute inset-0 z-[95] h-full w-full opacity-[0.05] mix-blend-soft-light"
        preserveAspectRatio="xMidYMid slice"
        aria-hidden="true"
      >
        <defs>
          <filter id="hero-grain" x="0" y="0" width="100%" height="100%">
            <feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="1" seed="3" />
          </filter>
        </defs>
        <rect width="1600" height="900" filter="url(#hero-grain)" />
      </svg>

      {DEBUG_BACKDROP ? (
        <svg
          viewBox="0 0 1600 900"
          className="absolute inset-0 z-[99] h-full w-full"
          preserveAspectRatio="xMidYMid slice"
          aria-hidden="true"
        >
          <text
            x="24"
            y="872"
            fill="#ff00ff"
            fontSize="18"
            fontFamily="ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, Liberation Mono, Courier New, monospace"
          >
            DEBUG BACKDROP ACTIVE
          </text>
        </svg>
      ) : null}
    </div>
  );
};

function App() {
  const appRef = useRef<HTMLDivElement>(null);
  const sectionRefs = useRef<Record<string, HTMLElement | null>>({});
  const [activeProject, setActiveProject] = useState(0);
  const [marqueeActive, setMarqueeActive] = useState(false);
  const [showCalendarFallback, setShowCalendarFallback] = useState(false);
  const [githubStats, setGithubStats] = useState<GithubStats | null>(null);

  // LOADER (mountain)
  const [isBooting, setIsBooting] = useState(true);
  const [bootProgress, setBootProgress] = useState(0);

  const prefersReducedMotion = usePrefersReducedMotion();

  const sectionIds = useMemo(() => NAV_ITEMS.map((item) => item.id), []);
  const activeSection = useSectionObserver(sectionIds);
  const nameParts = PROFILE.name.split(' ');
  const heroLineOne = nameParts[0] ?? PROFILE.name;
  const heroLineTwo = nameParts.slice(1).join(' ') || PROFILE.name;

  const registerSection = (id: string) => (element: HTMLElement | null) => {
    sectionRefs.current[id] = element;
  };

  const handleScrollTo = (id: string | undefined) => {
    if (!id) return;
    const element = sectionRefs.current[id] ?? document.getElementById(id);
    if (!element) return;
    element.scrollIntoView({
      behavior: prefersReducedMotion ? 'auto' : 'smooth',
      block: 'start',
    });
  };

  // BOOT LOADER: minimum duration + wait for load/fonts (soft)
  useEffect(() => {
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const minDuration = 1400;
    const start = performance.now();

    let loadReady = false;
    let fontsReady = false;
    let raf = 0;
    let value = 0;

    const markLoadReady = () => {
      loadReady = true;
    };

    if (document.readyState === 'complete') loadReady = true;
    else window.addEventListener('load', markLoadReady, { once: true });

    const fonts = (document as any).fonts;
    if (fonts?.ready?.then) {
      fonts.ready
        .then(() => {
          fontsReady = true;
        })
        .catch(() => {
          fontsReady = true;
        });
    } else {
      fontsReady = true;
    }

    const done = (now: number) => loadReady && fontsReady && now - start >= minDuration;

    const tick = (t: number) => {
      const now = t;
      const elapsed = now - start;

      // naik ke 92% dulu, baru finish saat done
      const softTarget = Math.min(92, (elapsed / (minDuration * 1.1)) * 92);
      const target = done(now) ? 100 : softTarget;

      value = value + (target - value) * 0.075;
      const display = Math.round(value);

      setBootProgress(display);

      if (done(now) && display >= 99) {
        setBootProgress(100);
        window.setTimeout(() => setIsBooting(false), 300);
        return;
      }

      raf = window.requestAnimationFrame(tick);
    };

    raf = window.requestAnimationFrame(tick);

    return () => {
      window.cancelAnimationFrame(raf);
      window.removeEventListener('load', markLoadReady as any);
      document.body.style.overflow = prevOverflow;
      
    };
  }, []);

  /** Hover parallax HERO (ditunda sampai loader selesai) */
  useEffect(() => {
    if (isBooting) return;
    if (prefersReducedMotion) return;

    const topSection = sectionRefs.current['top'] ?? document.getElementById('top');
    if (!topSection) return;

    const bg = topSection.querySelector<HTMLElement>('.hero-bg');
    if (!bg) return;

    let raf = 0;
    let tx = 0;
    let ty = 0;

    const maxX = 26;
    const maxY = 18;

    const apply = () => {
      raf = 0;
      bg.style.setProperty('--hero-hx', `${tx.toFixed(2)}px`);
      bg.style.setProperty('--hero-hy', `${ty.toFixed(2)}px`);
    };

    const schedule = () => {
      if (raf) return;
      raf = window.requestAnimationFrame(apply);
    };

    const onMove = (e: PointerEvent) => {
      const rect = topSection.getBoundingClientRect();
      const nx = (e.clientX - rect.left) / rect.width;
      const ny = (e.clientY - rect.top) / rect.height;
      const dx = (nx - 0.5) * 2;
      const dy = (ny - 0.5) * 2;
      tx = dx * maxX;
      ty = dy * maxY;
      schedule();
    };

    const onLeave = () => {
      tx = 0;
      ty = 0;
      schedule();
    };

    topSection.addEventListener('pointermove', onMove, { passive: true });
    topSection.addEventListener('pointerleave', onLeave, { passive: true });

    return () => {
      topSection.removeEventListener('pointermove', onMove);
      topSection.removeEventListener('pointerleave', onLeave);
      if (raf) window.cancelAnimationFrame(raf);
    };
  }, [prefersReducedMotion, isBooting]);

  /** Fetch GitHub stats */
  useEffect(() => {
    const controller = new AbortController();

    (async () => {
      try {
        const [userRes, reposRes] = await Promise.all([
          fetch(`https://api.github.com/users/${GITHUB_USERNAME}`, {
            signal: controller.signal,
            headers: { Accept: 'application/vnd.github+json' },
          }),
          fetch(`https://api.github.com/users/${GITHUB_USERNAME}/repos?per_page=100&sort=updated`, {
            signal: controller.signal,
            headers: { Accept: 'application/vnd.github+json' },
          }),
        ]);

        if (!userRes.ok) throw new Error('GitHub user fetch failed');
        if (!reposRes.ok) throw new Error('GitHub repos fetch failed');

        const user = await userRes.json();
        const repos = await reposRes.json();

        const safeRepos = Array.isArray(repos) ? repos : [];
        const totalStars = sumStars(safeRepos);
        const topRepos = safeRepos
          .slice()
          .sort((a, b) => (b?.stargazers_count || 0) - (a?.stargazers_count || 0))
          .slice(0, 3)
          .map((r) => ({
            name: r?.name,
            stars: r?.stargazers_count || 0,
            url: r?.html_url,
          }));

        setGithubStats({
          name: user?.name,
          avatar_url: user?.avatar_url,
          html_url: user?.html_url,
          public_repos: user?.public_repos,
          followers: user?.followers,
          following: user?.following,
          totalStars,
          topRepos,
        });
      } catch {
        setGithubStats(null);
      }
    })();

    return () => controller.abort();
  }, []);

  useLayoutEffect(() => {
    if (isBooting) return;
    if (!appRef.current) return;

    const root = document.documentElement;
    const mm = gsap.matchMedia();

    root.style.setProperty('--page-bg', '#0b1220');
    setMarqueeActive(false);

    const ctx = gsap.context(() => {
      const createBgTransition = (
        trigger: string,
        color: string,
        leaveBackColor?: string,
        start: string = 'top 110%',
        end: string = 'top 50%'
      ) => {
        if (prefersReducedMotion) {
          ScrollTrigger.create({
            trigger,
            start,
            onEnter: () => gsap.to(root, { '--page-bg': color, duration: 0.35 }),
            onEnterBack: () => gsap.to(root, { '--page-bg': color, duration: 0.35 }),
            onLeaveBack: leaveBackColor ? () => gsap.to(root, { '--page-bg': leaveBackColor, duration: 0.35 }) : undefined,
          });
          return;
        }
        gsap
          .timeline({
            scrollTrigger: { trigger, start, end, scrub: 1.1 },
          })
          .to(root, { '--page-bg': color, ease: 'none' });
      };

      createBgTransition('#about', '#ffffff', '#0b1220');
      createBgTransition('#projects', '#070a10');
      createBgTransition('#tech', TECH_BG);
      createBgTransition('#journey', '#93c5fd');
      createBgTransition('#github', '#ffffff');

      const intro = gsap.timeline({
        defaults: { ease: 'power2.out', duration: 0.8 },
        onComplete: () => setMarqueeActive(true),
      });

      if (prefersReducedMotion) {
        intro
          .fromTo(
            ['.hero-title-main', '.hero-title-outline', '.hero-subtitle', '.hero-card', '.hero-marquee', '.nav-pill'],
            { opacity: 0 },
            { opacity: 1, duration: 0.5, stagger: 0.08, ease: 'power1.out' }
          )
          .add(() => setMarqueeActive(false));
      } else {
        intro
          .fromTo('.hero-title-main', { opacity: 0, y: 12, scale: 0.995 }, { opacity: 1, y: 0, scale: 1 })
          .fromTo('.hero-title-outline', { opacity: 0, y: 10, scale: 0.995 }, { opacity: 1, y: 0, scale: 1 }, '-=0.55')
          .fromTo('.hero-subtitle', { opacity: 0, y: 8 }, { opacity: 1, y: 0, stagger: 0.12 }, '-=0.45')
          .fromTo('.hero-card', { opacity: 0, y: 8 }, { opacity: 1, y: 0, stagger: 0.12 }, '-=0.3')
          .fromTo('.hero-marquee', { opacity: 0, y: 6 }, { opacity: 1, y: 0 }, '-=0.2')
          .fromTo('.nav-pill', { opacity: 0, y: -6 }, { opacity: 1, y: 0 }, '-=0.35');
      }

      gsap.to('.hero-fade', {
        opacity: prefersReducedMotion ? 0.4 : 0.2,
        y: prefersReducedMotion ? 0 : -20,
        ease: 'none',
        scrollTrigger: {
          trigger: '#about',
          start: 'top 90%',
          end: 'top 40%',
          scrub: 0.9,
        },
      });

      gsap.to('.hero-bg', {
        opacity: prefersReducedMotion ? 0.5 : 0,
        ease: 'none',
        scrollTrigger: {
          trigger: '#about',
          start: 'top 95%',
          end: 'top 40%',
          scrub: prefersReducedMotion ? false : 0.9,
        },
      });

      gsap.fromTo(
        '.about-title',
        { opacity: 0, y: prefersReducedMotion ? 0 : 14 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          ease: prefersReducedMotion ? 'power1.out' : 'power2.out',
          scrollTrigger: { trigger: '#about', start: 'top 70%' },
        }
      );

      if (!prefersReducedMotion) {
        gsap.to('.about-scroll', {
          y: 120,
          ease: 'none',
          scrollTrigger: {
            trigger: '#about',
            start: 'top 80%',
            end: 'bottom top',
            scrub: 0.9,
          },
        });
      }

      const sectionBodies = gsap.utils.toArray<HTMLElement>('[data-section-body]');
      sectionBodies.forEach((body) => {
        if (prefersReducedMotion) {
          gsap.fromTo(
            body,
            { opacity: 0 },
            {
              opacity: 1,
              duration: 0.4,
              ease: 'power1.out',
              scrollTrigger: { trigger: body, start: 'top 80%' },
            }
          );
          return;
        }
        gsap.fromTo(
          body,
          { opacity: 0.85, y: 24 },
          {
            opacity: 1,
            y: 0,
            ease: 'none',
            scrollTrigger: {
              trigger: body,
              start: 'top 80%',
              end: 'top 35%',
              scrub: 0.8,
            },
          }
        );
      });

      const ghostElements = gsap.utils.toArray<HTMLElement>('[data-ghost]');
      ghostElements.forEach((ghost) => {
        const section = ghost.closest('section') ?? ghost;
        if (prefersReducedMotion) {
          gsap.set(ghost, { opacity: 0.08 });
          return;
        }
        gsap.fromTo(
          ghost,
          { opacity: 0.04, y: 20 },
          {
            opacity: 0.12,
            y: -20,
            ease: 'none',
            scrollTrigger: {
              trigger: section,
              start: 'top bottom',
              end: 'bottom top',
              scrub: 0.6,
            },
          }
        );
      });

      if (!prefersReducedMotion) {
        gsap.to('.scroll-indicator', {
          y: 3,
          duration: 2,
          ease: 'sine.inOut',
          repeat: -1,
          yoyo: true,
        });
      }

      const revealContainers = gsap.utils.toArray<HTMLElement>('[data-reveal-container]');
      revealContainers.forEach((container) => {
        const items = container.querySelectorAll<HTMLElement>('[data-reveal]');
        if (!items.length) return;

        gsap.fromTo(
          items,
          {
            opacity: 0,
            y: prefersReducedMotion ? 0 : 14,
            x: prefersReducedMotion
              ? 0
              : (index, target) => {
                  const element = target as HTMLElement;
                  const direction = element.dataset.revealDir;
                  if (direction === 'left') return -14;
                  if (direction === 'right') return 14;
                  return 0;
                },
          },
          {
            opacity: 1,
            y: 0,
            x: 0,
            duration: prefersReducedMotion ? 0.45 : 0.65,
            ease: prefersReducedMotion ? 'power1.out' : 'power2.out',
            stagger: 0.12,
            scrollTrigger: { trigger: container, start: 'top 80%' },
          }
        );
      });

      const techItems = gsap.utils.toArray<HTMLElement>('.tech-item');
      if (techItems.length) {
        if (prefersReducedMotion) {
          gsap.set(techItems, { opacity: 1, y: 0 });
          gsap.set('.tech-line', { scaleX: 1 });
        } else {
          gsap.fromTo(
            techItems,
            { opacity: 0, y: 18 },
            {
              opacity: 1,
              y: 0,
              duration: 0.6,
              ease: 'power2.out',
              stagger: 0.08,
              scrollTrigger: { trigger: '#tech', start: 'top 70%' },
            }
          );
          gsap.fromTo(
            '.tech-line',
            { scaleX: 0, transformOrigin: 'left' },
            {
              scaleX: 1,
              duration: 0.6,
              ease: 'power2.out',
              stagger: 0.08,
              scrollTrigger: { trigger: '#tech', start: 'top 70%' },
            }
          );
        }
      }

      if (prefersReducedMotion) {
        gsap.to('.projects-wipe', {
          scaleY: 1,
          duration: 0.4,
          scrollTrigger: { trigger: '#projects', start: 'top 70%' },
        });
      } else {
        gsap.fromTo(
          '.projects-wipe',
          { scaleY: 0 },
          {
            scaleY: 1,
            ease: 'none',
            scrollTrigger: {
              trigger: '#projects',
              start: 'top 90%',
              end: 'top 25%',
              scrub: 0.9,
            },
          }
        );
      }

      const projectItems = gsap.utils.toArray<HTMLElement>('[data-project-item]');
      projectItems.forEach((item) => {
        const index = Number(item.dataset.projectIndex ?? '0');
        ScrollTrigger.create({
          trigger: item,
          start: 'top 60%',
          end: 'bottom 40%',
          onEnter: () => setActiveProject(index),
          onEnterBack: () => setActiveProject(index),
        });
      });

      if (!prefersReducedMotion) {
        const floaters = gsap.utils.toArray<HTMLElement>('[data-float]');
        floaters.forEach((el, index) => {
          const floatValue = Number(el.dataset.float ?? '14') * 0.5;
          const rotateValue = Number(el.dataset.rotate ?? '0') * 0.5;
          gsap.to(el, {
            y: -floatValue,
            rotate: rotateValue + 6,
            duration: 5.6 + index * 0.4,
            ease: 'sine.inOut',
            repeat: -1,
            yoyo: true,
          });
        });

        const drifters = gsap.utils.toArray<HTMLElement>('[data-drift]');
        drifters.forEach((el, index) => {
          const driftValue = Number(el.dataset.drift ?? '10') * 0.5;
          const hasParallax = el.hasAttribute('data-parallax');
          const driftVars = {
            x: driftValue * 0.2,
            ...(hasParallax ? {} : { y: -driftValue * 0.6 }),
            duration: 7.5 + index * 0.6,
            ease: 'sine.inOut',
            repeat: -1,
            yoyo: true,
            delay: index * 0.3,
          };
          gsap.to(el, driftVars);
        });
      }

      if (!prefersReducedMotion) {
        mm.add('(min-width: 1024px)', () => {
          const parallaxItems = gsap.utils.toArray<HTMLElement>('[data-parallax]');
          parallaxItems.forEach((layer) => {
            const speed = Number(layer.dataset.speed ?? '0.2');
            const speedX = Number(layer.dataset.speedX ?? '0');
            const trigger = layer.closest('section') ?? layer;
            gsap.to(layer, {
              y: speed * -70,
              x: speedX * -40,
              ease: 'none',
              scrollTrigger: {
                trigger,
                start: 'top bottom',
                end: 'bottom top',
                scrub: 1,
              },
            });
          });
        });
      }

      if (prefersReducedMotion) {
        gsap.set('.timeline-line', { scaleY: 1 });
      } else {
        gsap.fromTo(
          '.timeline-line',
          { scaleY: 0 },
          {
            scaleY: 1,
            ease: 'none',
            scrollTrigger: {
              trigger: '#journey',
              start: 'top 70%',
              end: 'bottom 30%',
              scrub: 1,
            },
          }
        );
      }

      if (!prefersReducedMotion) {
        gsap.to('.airplane', {
          x: 90,
          y: -22,
          ease: 'none',
          scrollTrigger: {
            trigger: '#journey',
            start: 'top 80%',
            end: 'bottom 20%',
            scrub: 0.9,
          },
        });
      }

      gsap.fromTo(
        '.github-panel',
        { opacity: 0, y: prefersReducedMotion ? 0 : 24 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          ease: prefersReducedMotion ? 'power1.out' : 'power3.out',
          scrollTrigger: { trigger: '#github', start: 'top 75%' },
        }
      );
    }, appRef);

    const refresh = () => ScrollTrigger.refresh();
    const rafId = window.requestAnimationFrame(refresh);
    window.addEventListener('load', refresh);
    if ((document as any).fonts?.ready) {
      (document as any).fonts.ready.then(refresh).catch(() => {});
    }

    return () => {
      window.removeEventListener('load', refresh);
      window.cancelAnimationFrame(rafId);
      mm.revert();
      ctx.revert();
    };
  }, [prefersReducedMotion, isBooting]);

  /** Calendar fallback detection (tidak muncul duluan) */
  useEffect(() => {
    let attempts = 0;
    const interval = window.setInterval(() => {
      attempts += 1;
      const calendar = appRef.current?.querySelector('.github-calendar svg');
      if (calendar) {
        setShowCalendarFallback(false);
        window.clearInterval(interval);
      }
      if (attempts > 6) {
        setShowCalendarFallback(true);
        window.clearInterval(interval);
      }
    }, 700);

    return () => window.clearInterval(interval);
  }, []);

  const activeIndex = Math.max(0, sectionIds.indexOf(activeSection));

  return (
    <div ref={appRef} className="text-slate-900">
      <AnimatePresence>
        {isBooting ? (
          <motion.div
            key="mountain-loader"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.55, ease: 'easeOut' }}
          >
            <MountainLoadingScreen progress={bootProgress} prefersReducedMotion={prefersReducedMotion} />
          </motion.div>
        ) : null}
      </AnimatePresence>

      <nav
        aria-label="Primary"
        className="nav-pill fixed left-1/2 bottom-5 z-50 w-[92%] max-w-4xl -translate-x-1/2 rounded-full border border-white/60 bg-white/80 px-3 py-2 shadow-[0_18px_45px_rgba(15,23,42,0.18)] backdrop-blur-sm md:bottom-auto md:top-6 md:w-fit md:px-4"
      >
        <div className="flex items-center justify-between gap-2 md:gap-3">
          {NAV_ITEMS.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <motion.a
                key={item.id}
                href={`#${item.id}`}
                onClick={(event) => {
                  event.preventDefault();
                  handleScrollTo(item.id);
                }}
                whileHover={prefersReducedMotion ? undefined : { y: -2 }}
                whileTap={prefersReducedMotion ? undefined : { scale: 0.98 }}
                aria-current={isActive ? 'page' : undefined}
                className={`relative rounded-full px-3 py-2 text-[0.7rem] font-semibold tracking-[0.25em] transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400 md:text-[0.72rem] ${
                  isActive ? 'text-slate-900' : 'text-slate-500 hover:text-slate-900'
                }`}
              >
                <span className="relative z-10">{item.label}</span>
                <span
                  className={`absolute inset-x-3 -bottom-0.5 h-px bg-slate-900 transition-opacity ${
                    isActive ? 'opacity-100' : 'opacity-0'
                  }`}
                />
              </motion.a>
            );
          })}
        </div>
      </nav>

      <div className="fixed right-5 top-1/2 z-40 hidden -translate-y-1/2 flex-col gap-3 md:flex">
        <motion.button
          type="button"
          whileHover={prefersReducedMotion || activeIndex === 0 ? undefined : { scale: 1.05 }}
          whileTap={prefersReducedMotion ? undefined : { scale: 0.97 }}
          onClick={() => handleScrollTo(sectionIds[activeIndex - 1])}
          disabled={activeIndex === 0}
          className={`flex h-11 w-11 items-center justify-center rounded-full border border-slate-200 bg-white shadow-sm transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400 ${
            activeIndex === 0 ? 'cursor-not-allowed text-slate-300' : 'text-slate-700 hover:-translate-y-0.5'
          }`}
          aria-label="Scroll to previous section"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path
              d="M12 5l-6 6m6-6l6 6"
              stroke="currentColor"
              strokeWidth="1.7"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </motion.button>

        <motion.button
          type="button"
          whileHover={prefersReducedMotion || activeIndex === sectionIds.length - 1 ? undefined : { scale: 1.05 }}
          whileTap={prefersReducedMotion ? undefined : { scale: 0.97 }}
          onClick={() => handleScrollTo(sectionIds[activeIndex + 1])}
          disabled={activeIndex === sectionIds.length - 1}
          className={`flex h-11 w-11 items-center justify-center rounded-full border border-slate-200 bg-white shadow-sm transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400 ${
            activeIndex === sectionIds.length - 1
              ? 'cursor-not-allowed text-slate-300'
              : 'text-slate-700 hover:translate-y-0.5'
          }`}
          aria-label="Scroll to next section"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path
              d="M12 19l6-6m-6 6l-6-6"
              stroke="currentColor"
              strokeWidth="1.7"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </motion.button>
      </div>

      <main>
        {/* TOP */}
        <section
          id="top"
          ref={registerSection('top')}
          className="relative min-h-screen scroll-mt-24 overflow-hidden bg-[var(--page-bg)]"
        >
          <HeroBackdrop />

          <div className="relative z-10 mx-auto flex min-h-screen w-full max-w-6xl flex-col justify-center px-6 pb-24 pt-28 md:pt-36">
            <div className="hero-fade">
              <p className="hero-subtitle mb-4 text-xs font-semibold uppercase tracking-[0.5em] text-slate-600">
                {PROFILE.role}
              </p>

              <h1 className="font-display text-5xl uppercase leading-[0.9] text-slate-900 sm:text-6xl md:text-7xl">
                <span className="hero-title-main block">{heroLineOne}</span>
                <span className="hero-title-outline block text-stroke">{heroLineTwo}</span>
              </h1>

              <p className="hero-subtitle mt-6 max-w-xl text-base text-slate-600 md:text-lg">
                Crafting editorial-grade web experiences with layered motion, tactile micro-interactions, and a human-centered narrative.
              </p>

              <div className="mt-10 grid gap-4 md:grid-cols-3">
                {[
                  { label: 'Location', value: PROFILE.location },
                  { label: 'Current Role', value: PROFILE.role },
                  { label: 'Status', value: PROFILE.status },
                ].map((item) => (
                  <motion.div
                    key={item.label}
                    whileHover={prefersReducedMotion ? undefined : { y: -6 }}
                    whileTap={prefersReducedMotion ? undefined : { scale: 0.99 }}
                    className="hero-card rounded-2xl border border-white/70 bg-white/80 p-5 shadow-[0_20px_40px_rgba(15,23,42,0.12)] backdrop-blur-sm transition hover:border-white hover:brightness-105"
                  >
                    <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-500">{item.label}</p>
                    <p className="mt-2 text-sm font-semibold text-slate-800">{item.value}</p>
                  </motion.div>
                ))}
              </div>

              <div className="hero-marquee mt-10 rounded-full border border-white/60 bg-white/70 px-4 py-3">
                <Marquee
                  speed={prefersReducedMotion ? 0 : 40}
                  play={!prefersReducedMotion && marqueeActive}
                  gradient={false}
                  className="text-xs font-semibold uppercase tracking-[0.4em] text-slate-600"
                >
                  <span className="mx-6">{MARQUEE_TEXT}</span>
                  <span className="mx-6">{MARQUEE_TEXT}</span>
                </Marquee>
              </div>
            </div>
          </div>
        </section>

        {/* ABOUT */}
        <section
          id="about"
          ref={registerSection('about')}
          className="relative min-h-[80vh] scroll-mt-24 bg-white py-28 sm:min-h-[85vh] sm:py-32 lg:min-h-[90vh] lg:py-36"
        >
          <div
            className="section-fade-bottom pointer-events-none absolute inset-x-0 bottom-0 h-[22vh] sm:h-[28vh]"
            style={fadeStyle('#ffffff', '#070a10')}
            aria-hidden="true"
          />

          <div className="pointer-events-none absolute inset-0">
            <div className="mx-auto w-full max-w-6xl px-6">
              <div
                className="about-ghost ghost-text absolute -top-6 left-0 text-[18vw] uppercase tracking-[0.2em] text-slate-900"
                data-ghost
              >
                About Me
              </div>
            </div>
            <div className="absolute bottom-16 right-16 h-12 w-12 rotate-6 border-2 border-sky-400/50" />
          </div>

          <div
            className="relative z-10 mx-auto w-full max-w-6xl overflow-hidden px-6 pb-24 sm:pb-28 lg:pb-32"
            data-reveal-container
            data-section-body
          >
            <div className="about-scroll">
              <div className="grid gap-12 md:grid-cols-[1.1fr_0.9fr] md:items-start">
                <div className="space-y-6">
                  <p
                    className="text-xs font-semibold uppercase tracking-[0.4em] text-slate-400"
                    data-reveal
                    data-reveal-dir="left"
                  >
                    /// About
                  </p>

                  <h2
                    className="about-title text-6xl font-display uppercase leading-none text-slate-900 md:text-7xl"
                    data-reveal
                    data-reveal-dir="left"
                  >
                    Passionate
                  </h2>

                  <p className="max-w-2xl text-base text-slate-600 md:text-lg" data-reveal data-reveal-dir="left">
                    Hai, aku <span className="font-semibold text-slate-900">{PROFILE.name}</span>. Aku fokus membangun UI
                    yang rapi, cepat, dan enak dipakai—dengan motion halus, whitespace yang “bernapas”, dan detail
                    mikro-interaksi yang terasa natural.
                  </p>

                  <div className="mt-2 grid gap-3 sm:grid-cols-2" data-reveal data-reveal-dir="left">
                    {[
                      { k: 'Fokus', v: 'Motion ringan + layout editorial' },
                      { k: 'Kekuatan', v: 'Design system, aksesibilitas, performa' },
                      { k: 'Suka', v: 'Website produk, landing, dashboard' },
                      { k: 'Target', v: 'UI yang konsisten & scalable' },
                    ].map((it) => (
                      <div key={it.k} className="rounded-2xl border border-slate-200 bg-white/70 p-4">
                        <p className="text-[0.65rem] font-semibold uppercase tracking-[0.3em] text-slate-400">{it.k}</p>
                        <p className="mt-1 text-sm font-semibold text-slate-800">{it.v}</p>
                      </div>
                    ))}
                  </div>

                  <motion.button
                    type="button"
                    onClick={() => handleScrollTo('projects')}
                    whileHover={prefersReducedMotion ? undefined : { x: 6 }}
                    whileTap={prefersReducedMotion ? undefined : { scale: 0.98 }}
                    className="group inline-flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.3em] text-slate-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400"
                    data-reveal
                    data-reveal-dir="left"
                  >
                    <span className="relative">
                      Lihat Projects
                      <span className="absolute left-0 -bottom-1 h-px w-0 bg-slate-700 transition-all group-hover:w-full" />
                    </span>
                    <span className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-slate-200">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                        <path
                          d="M5 12h14m0 0l-5-5m5 5l-5 5"
                          stroke="currentColor"
                          strokeWidth="1.7"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </span>
                  </motion.button>
                </div>

                <div className="flex flex-col gap-3 md:items-end md:text-right">
                  <p
                    className="text-xs font-semibold uppercase tracking-[0.4em] text-slate-400"
                    data-reveal
                    data-reveal-dir="right"
                  >
                    /// Projects
                  </p>
                  <p
                    className="text-2xl font-display uppercase leading-tight text-slate-700 md:text-3xl"
                    data-reveal
                    data-reveal-dir="right"
                  >
                    Scroll untuk
                    <br />
                    Explore
                  </p>
                  <span
                    className="scroll-indicator inline-flex h-10 w-10 items-center justify-center text-slate-500"
                    data-reveal
                    data-reveal-dir="right"
                  >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                      <path
                        d="M12 5v14m0 0l-5-5m5 5l5-5"
                        stroke="currentColor"
                        strokeWidth="1.7"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="pointer-events-none absolute inset-0">
            <div className="absolute right-10 top-10 h-24 w-24 rounded-2xl border border-slate-200" data-float data-rotate="3" />
            <div className="absolute left-16 bottom-16 h-20 w-20 rounded-2xl border border-slate-200" data-float data-rotate="-4" />
            <div
              className="absolute right-24 bottom-24 hidden h-16 w-16 rounded-2xl border border-slate-200 md:block"
              data-float
              data-rotate="6"
            />
          </div>
        </section>

        {/* PROJECTS */}
        <section
          id="projects"
          ref={registerSection('projects')}
          className="relative scroll-mt-24 bg-[#070a10] py-24 text-white sm:py-28"
        >
          <div className="projects-wipe absolute inset-0 origin-top scale-y-0 bg-slate-950" />
          <div className="pointer-events-none absolute inset-0">
            <div className="mx-auto w-full max-w-6xl px-6">
              <div className="ghost-text absolute -top-8 left-0 text-[16vw] uppercase tracking-[0.2em] text-white/5" data-ghost>
                Projects
              </div>
            </div>
          </div>

          <div className="relative z-10 mx-auto w-full max-w-6xl px-6" data-section-body>
            <div className="mb-14 flex flex-col gap-4 md:flex-row md:items-end md:justify-between" data-reveal-container>
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.4em] text-slate-400" data-reveal>
                  Selected Work
                </p>
                <h2 className="mt-3 text-4xl font-display uppercase md:text-5xl" data-reveal>
                  Projects
                </h2>
              </div>
              <p className="max-w-md text-sm text-slate-300" data-reveal>
                Pilihan project dengan storytelling, motion yang halus, dan UI system yang rapi.
              </p>
            </div>

            <div className="projects-stage space-y-12 lg:space-y-16">
              {PROJECTS.map((project, index) => {
                const isActive = index === activeProject;
                const isRight = index % 2 === 1;
                const isPhoneLayout = project.previewLayout === 'phone';
                const previewAlignment = isPhoneLayout
                  ? isRight
                    ? 'lg:ml-auto lg:mr-0'
                    : 'lg:ml-0 lg:mr-auto'
                  : isRight
                  ? 'lg:ml-auto'
                  : '';

                const previewBackground = project.previewImage
                  ? `linear-gradient(135deg, rgba(2, 6, 23, 0.2), rgba(2, 6, 23, 0.7)), url(${project.previewImage}) ${
                      isPhoneLayout ? 'center top' : 'center'
                    } / cover no-repeat`
                  : project.previewStyle;

                return (
                  <motion.article
                    key={project.title}
                    data-project-item
                    data-project-index={index}
                    onMouseEnter={() => setActiveProject(index)}
                    onFocusCapture={() => setActiveProject(index)}
                    whileHover={prefersReducedMotion ? undefined : { y: -4, scale: 1.01 }}
                    className={`flex flex-col gap-5 lg:w-[72%] ${
                      isRight ? 'lg:ml-auto lg:items-end lg:text-right' : 'lg:items-start'
                    }`}
                    data-reveal-container
                  >
                    <div className="w-full" data-reveal data-reveal-dir={isRight ? 'right' : 'left'}>
                      <div
                        className={`flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.35em] text-slate-400 ${
                          isRight ? 'lg:flex-row-reverse' : ''
                        }`}
                      >
                        <span className="text-sky-300">{project.no}</span>
                        <span className="h-px flex-1 bg-white/10" />
                      </div>

                      <h3 className="mt-3 text-2xl font-semibold text-white">{project.title}</h3>
                      <p className="mt-2 text-sm text-slate-300">{project.desc}</p>

                      <div className={`mt-4 flex flex-wrap gap-2 ${isRight ? 'lg:justify-end' : ''}`}>
                        {project.tags.map((tag) => (
                          <span
                            key={tag}
                            className={`rounded-full border px-3 py-1 text-[0.7rem] font-semibold uppercase tracking-[0.2em] transition ${
                              isActive ? 'border-white/40 text-white' : 'border-white/10 text-slate-400'
                            }`}
                          >
                            {tag}
                          </span>
                        ))}
                      </div>

                      {(project.role || project.stack?.length || project.impact?.length) && (
                        <div className={`mt-4 grid gap-3 text-xs text-slate-300 ${isRight ? 'lg:justify-items-end' : ''}`}>
                          {project.role && (
                            <div className="flex flex-wrap items-center gap-2">
                              <span className="font-semibold uppercase tracking-[0.25em] text-slate-400">Role</span>
                              <span className="text-slate-200">{project.role}</span>
                            </div>
                          )}

                          {!!project.stack?.length && (
                            <div className="flex flex-wrap items-center gap-2">
                              <span className="font-semibold uppercase tracking-[0.25em] text-slate-400">Stack</span>
                              <span className="text-slate-200">{project.stack.join(' / ')}</span>
                            </div>
                          )}

                          {!!project.impact?.length && (
                            <div className="space-y-1">
                              <span className="font-semibold uppercase tracking-[0.25em] text-slate-400">Highlights</span>
                              <div className="flex flex-col gap-1">
                                {project.impact.slice(0, 3).map((t) => (
                                  <span key={t} className="text-slate-200">
                                    {t}
                                  </span>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                      )}
                    </div>

                    <div
                      className={`preview-panel relative w-full overflow-hidden border transition duration-500 ${
                        isPhoneLayout
                          ? 'mx-auto max-w-[480px] aspect-[16/9] rounded-[2.75rem] bg-slate-950/90 shadow-[0_40px_80px_rgba(2,6,23,0.65)] sm:max-w-[560px] lg:max-w-[680px]'
                          : 'h-[250px] rounded-[2.5rem] shadow-[0_30px_65px_rgba(15,23,42,0.6)] sm:h-[300px] lg:h-[380px]'
                      } ${previewAlignment} ${
                        isActive
                          ? isPhoneLayout
                            ? 'border-white/30 ring-1 ring-white/10'
                            : 'border-white/30 shadow-[0_28px_55px_rgba(59,130,246,0.25)]'
                          : 'border-white/10'
                      }`}
                      data-reveal
                      data-reveal-dir={isRight ? 'left' : 'right'}
                    >
                      {isPhoneLayout ? (
                        <>
                          <div className="absolute inset-3 overflow-hidden rounded-[2rem]">
                            <div className="absolute inset-0" style={{ background: previewBackground }} />
                          </div>
                          <div className="absolute left-1/2 top-3 h-2 w-20 -translate-x-1/2 rounded-full bg-slate-900/90 ring-1 ring-white/10" />
                        </>
                      ) : (
                        <div className="absolute inset-0" style={{ background: previewBackground }} />
                      )}
                    </div>

                    <div className={`flex ${isRight ? 'lg:justify-end' : ''}`} data-reveal data-reveal-dir={isRight ? 'left' : 'right'}>
                      <a
                        href={project.url}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.3em] text-slate-300 transition hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400"
                      >
                        View Project
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                          <path
                            d="M7 17L17 7m0 0h-7m7 0v7"
                            stroke="currentColor"
                            strokeWidth="1.7"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </a>
                    </div>
                  </motion.article>
                );
              })}
            </div>
          </div>
        </section>

        {/* TECH */}
        <section
          id="tech"
          ref={registerSection('tech')}
          className="relative min-h-[100vh] scroll-mt-24 bg-[#f8fafc] py-32 sm:py-36 lg:py-40"
        >
          <div
            className="section-fade-top pointer-events-none absolute inset-x-0 top-0 h-[22vh] sm:h-[28vh]"
            style={fadeStyle('#070a10', TECH_BG)}
            aria-hidden="true"
          />

          <div className="pointer-events-none absolute inset-0 z-[1]">
            <div className="mx-auto w-full max-w-6xl px-6">
              <div className="ghost-text absolute -top-8 left-0 text-[16vw] uppercase tracking-[0.2em] text-slate-900/5" data-ghost>
                Tools
              </div>
            </div>
          </div>

          <div
            className="relative z-10 mx-auto grid w-full max-w-6xl gap-12 px-6 lg:grid-cols-[0.75fr_1fr]"
            data-reveal-container
            data-section-body
          >
            <div className="pt-10 sm:pt-14 lg:pt-20">
              <p className="text-xs font-semibold uppercase tracking-[0.4em] text-slate-400" data-reveal>
                /// Toolkit
              </p>
              <h2 className="mt-3 text-6xl font-display font-bold uppercase leading-[0.92] text-slate-900 md:text-7xl lg:text-[6rem]">
                <span className="block" data-reveal>
                  Tech
                </span>
                <span className="block text-slate-300" data-reveal>
                  Stack
                </span>
              </h2>
              <p className="mt-6 max-w-md text-sm text-slate-600" data-reveal>
                Koleksi teknologi yang aku pakai untuk membangun pengalaman digital yang robust, scalable, dan nyaman dipakai.
              </p>
            </div>

            <div className="mt-4 grid gap-x-10 gap-y-6 sm:grid-cols-2 lg:grid-cols-3">
              {TOOLS.map((tool) => {
                const detail = TOOL_DETAILS[tool.name] ?? 'Toolkit';
                const icon = TOOL_ICONS[tool.name];

                return (
                  <div key={tool.name} className="tech-item group flex flex-col gap-3 border-b border-slate-300/40 pb-5">
                    <div className="flex items-center gap-3">
                      {icon ? (
                        <img src={icon} alt={`${tool.name} logo`} className="h-5 w-5" loading="lazy" decoding="async" />
                      ) : (
                        <span className="inline-block h-2 w-2 rounded-full bg-slate-300" />
                      )}
                      <span className="tech-line inline-block h-px w-10 bg-slate-300/60" />
                    </div>
                    <p className="text-sm font-semibold text-slate-900">{tool.name}</p>
                    <p className="text-[0.65rem] font-semibold uppercase tracking-[0.3em] text-slate-500">{detail}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* JOURNEY */}
        <section
          id="journey"
          ref={registerSection('journey')}
          className="relative scroll-mt-24 overflow-hidden bg-[#93c5fd] py-24 sm:py-28"
        >
          <div
            className="section-fade-top pointer-events-none absolute inset-x-0 top-0 h-[22vh] sm:h-[28vh]"
            style={fadeStyle(TECH_BG, '#93c5fd')}
            aria-hidden="true"
          />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.25),transparent_70%)]" />

          <div className="absolute inset-0">
            <div className="absolute left-10 top-16 h-20 w-40 rounded-full bg-white/50" />
            <div className="absolute right-20 top-24 h-16 w-32 rounded-full bg-white/40" />
            <div className="absolute left-1/2 top-10 h-14 w-28 -translate-x-1/2 rounded-full bg-white/40" />
            <div className="absolute bottom-24 left-16 h-10 w-24 rounded-full bg-white/35" />
          </div>

          <div className="pointer-events-none absolute inset-0">
            <div className="mx-auto w-full max-w-6xl px-6">
              <div className="ghost-text absolute -top-6 left-0 text-[16vw] uppercase tracking-[0.2em] text-slate-900/10" data-ghost>
                Journey
              </div>
            </div>
          </div>

          <div className="relative z-10 mx-auto w-full max-w-6xl px-6" data-section-body>
            <div className="mb-12 flex flex-col gap-4" data-reveal-container>
              <p className="text-xs font-semibold uppercase tracking-[0.4em] text-slate-600" data-reveal>
                Timeline
              </p>
              <h2 className="text-4xl font-display uppercase text-slate-900 md:text-5xl" data-reveal>
                Journey
              </h2>
              <p className="max-w-xl text-sm text-slate-700" data-reveal>
                Timeline singkat perjalanan skill, eksperimen, dan momen yang membentuk gaya visual.
              </p>
            </div>

            <div className="relative">
              <div className="absolute left-1/2 top-0 hidden h-full w-px -translate-x-1/2 bg-white/60 lg:block" />
              <div className="timeline-line absolute left-1/2 top-0 hidden h-full w-px -translate-x-1/2 bg-slate-900/70 lg:block" />

              <div className="space-y-14">
                {JOURNEY.map((item, index) => {
                  const isLeft = item.side === 'left';
                  return (
                    <div
                      key={item.title}
                      className="relative grid gap-6 lg:grid-cols-[1fr_80px_1fr] lg:items-center"
                      data-reveal-container
                    >
                      <motion.div
                        data-reveal
                        data-reveal-dir={isLeft ? 'left' : 'right'}
                        className={`rounded-[2.5rem] border border-white/70 bg-white/90 p-6 shadow-[0_16px_35px_rgba(15,23,42,0.12)] ${
                          isLeft ? 'lg:col-start-1' : 'lg:col-start-3'
                        }`}
                      >
                        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-500">{item.yearRange}</p>
                        <h3 className="mt-2 text-lg font-semibold text-slate-900">{item.title}</h3>
                        <p className="mt-2 text-sm text-slate-600">{item.desc}</p>
                        <div className="mt-4 flex flex-wrap gap-2">
                          {item.tags.map((tag) => (
                            <span
                              key={tag}
                              className="rounded-full border border-slate-200 px-3 py-1 text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-slate-600"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </motion.div>

                      <div className="hidden items-center justify-center lg:flex">
                        <span className="flex h-5 w-5 items-center justify-center rounded-full border border-sky-400 bg-white shadow-[0_0_0_6px_rgba(125,211,252,0.2)]" />
                      </div>

                      <div className={`hidden lg:flex ${isLeft ? 'lg:col-start-3' : 'lg:col-start-1'}`} />
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="pointer-events-none absolute right-8 top-6 hidden lg:block">
              <svg width="180" height="120" viewBox="0 0 180 120" fill="none" aria-hidden="true">
                <path
                  d="M10 100C40 40 120 20 170 90"
                  stroke="rgba(148,163,184,0.7)"
                  strokeDasharray="6 8"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
              </svg>

              <div className="airplane absolute left-[62px] top-[46px]">
                <svg width="26" height="26" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path
                    d="M12 4l3.5 7.5L22 12l-6.5 1.5L12 21l-3.5-7.5L2 12l6.5-0.5L12 4z"
                    stroke="rgba(30,41,59,0.8)"
                    strokeWidth="1.4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
            </div>
          </div>
        </section>

        {/* GITHUB */}
        <section id="github" ref={registerSection('github')} className="relative scroll-mt-24 bg-white py-24 sm:py-28">
          <div
            className="section-fade-top pointer-events-none absolute inset-x-0 top-0 h-[22vh] sm:h-[28vh]"
            style={fadeStyle('#93c5fd', '#ffffff')}
            aria-hidden="true"
          />
          <div className="pointer-events-none absolute inset-0">
            <div className="mx-auto w-full max-w-6xl px-6">
              <div className="ghost-text absolute -top-6 left-0 text-[16vw] uppercase tracking-[0.2em] text-slate-900/5" data-ghost>
                GitHub
              </div>
            </div>
          </div>

          <div className="relative z-10 mx-auto w-full max-w-6xl px-6" data-section-body>
            <div className="grid gap-12 lg:grid-cols-[0.45fr_0.55fr] lg:items-start">
              <div data-reveal-container>
                <p className="text-xs font-semibold uppercase tracking-[0.4em] text-slate-500" data-reveal>
                  Contribution
                </p>
                <div className="mt-4 flex items-center gap-3" data-reveal>
                  <span className="flex h-11 w-11 items-center justify-center rounded-full border border-slate-200">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                      <path
                        d="M9 19c-4 1.5-4-2-6-2m12 6v-3.5c0-1 .1-1.9-.5-2.7 2.2-.2 4.5-1.1 4.5-5a4 4 0 0 0-1.1-2.8 3.7 3.7 0 0 0-.1-2.8s-.9-.3-2.9 1.1a10 10 0 0 0-5.2 0c-2-1.4-2.9-1.1-2.9-1.1a3.7 3.7 0 0 0-.1 2.8A4 4 0 0 0 5 11c0 3.9 2.3 4.8 4.5 5-.4.4-.5 1-.5 1.7V22"
                        stroke="currentColor"
                        strokeWidth="1.6"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </span>
                  <h2 className="text-4xl font-display uppercase text-slate-900">GitHub</h2>
                </div>

                <h3 className="mt-2 text-4xl font-display uppercase text-stroke" data-reveal>
                  Activity
                </h3>
                <p className="mt-4 max-w-sm text-sm text-slate-600" data-reveal>
                  Kontribusi terbaru dan ritme build dari project yang lagi dikerjakan.
                </p>
              </div>

              <div data-reveal-container>
                <div
                  className="github-calendar github-panel rounded-[2rem] border border-slate-200 bg-white p-6 shadow-[0_18px_40px_rgba(15,23,42,0.12)]"
                  data-reveal
                >
                  <div className="flex items-center gap-4 border-b border-slate-200 pb-4">
                    <div className="flex h-12 w-12 items-center justify-center overflow-hidden rounded-full border border-slate-200 bg-slate-900 text-xs font-semibold uppercase tracking-[0.2em] text-white">
                      {githubStats?.avatar_url ? (
                        <img
                          src={githubStats.avatar_url}
                          alt={`${GITHUB_USERNAME} avatar`}
                          className="h-full w-full object-cover"
                          loading="lazy"
                          decoding="async"
                        />
                      ) : (
                        GITHUB_USERNAME.slice(0, 2).toUpperCase()
                      )}
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-slate-900">{GITHUB_USERNAME}</p>
                      <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-400">Contribution Map</p>
                    </div>
                  </div>

                  {githubStats && (
                    <div className="mt-4 grid gap-3 sm:grid-cols-3">
                      {[
                        { k: 'Repos', v: githubStats.public_repos ?? '-' },
                        { k: 'Followers', v: githubStats.followers ?? '-' },
                        { k: 'Stars', v: githubStats.totalStars ?? '-' },
                      ].map((it) => (
                        <div key={it.k} className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                          <p className="text-[0.65rem] font-semibold uppercase tracking-[0.3em] text-slate-400">{it.k}</p>
                          <p className="mt-1 text-sm font-semibold text-slate-900">{it.v}</p>
                        </div>
                      ))}
                    </div>
                  )}

                  <div className="mt-5 overflow-x-auto">
                    <GitHubCalendar
                      username={GITHUB_USERNAME}
                      blockSize={10}
                      blockMargin={4}
                      fontSize={12}
                      colorScheme="light"
                      theme={{
                        light: ['#ebedf0', '#9be9a8', '#40c463', '#30a14e', '#216e39'],
                        dark: ['#161b22', '#0e4429', '#006d32', '#26a641', '#39d353'],
                      }}
                    />
                  </div>

                  {showCalendarFallback && (
                    <div className="mt-6 rounded-2xl border border-slate-200 bg-slate-50 p-4">
                      <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-500">Fallback Activity Grid</p>
                      <div className="mt-4 grid grid-cols-14 gap-2">
                        {Array.from({ length: 84 }).map((_, index) => (
                          <div key={index} className="h-3 w-3 rounded-sm bg-slate-200" />
                        ))}
                      </div>
                    </div>
                  )}

                  {githubStats?.html_url && (
                    <a
                      href={githubStats.html_url}
                      target="_blank"
                      rel="noreferrer"
                      className="mt-4 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.3em] text-slate-600 hover:text-slate-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400"
                    >
                      Open Profile <span aria-hidden="true">→</span>
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="pointer-events-none absolute inset-0">
            <div className="absolute left-10 top-20 h-12 w-12 -rotate-12 rounded-xl border border-slate-200" data-float data-rotate="-6" />
            <div className="absolute right-14 top-28 h-10 w-10 rotate-6 rounded-xl border border-slate-200" data-float data-rotate="4" />
          </div>
        </section>

        <ContactSection registerSection={registerSection} prefersReducedMotion={prefersReducedMotion} />
      </main>
    </div>
  );
}

export default App;
