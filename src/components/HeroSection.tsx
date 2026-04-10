import { motion } from 'framer-motion';
import type { ComponentType } from 'react';
import MarqueeModule from 'react-fast-marquee';
import type { Profile, RegisterSection } from '../types';

const Marquee =
  (MarqueeModule as unknown as { default?: ComponentType<any> }).default ??
  (MarqueeModule as unknown as ComponentType<any>);

type HeroSectionProps = {
  registerSection: RegisterSection;
  heroLineOne: string;
  heroLineTwo: string;
  reduceMotion: boolean;
  prefersReducedMotion: boolean;
  profile: Profile;
  marqueeText: string;
};

export default function HeroSection({
  registerSection,
  heroLineOne,
  heroLineTwo,
  reduceMotion,
  prefersReducedMotion,
  profile,
  marqueeText,
}: HeroSectionProps) {
  return (
    <section
      id="top"
      ref={registerSection('top')}
      className="relative min-h-screen scroll-mt-24 overflow-hidden bg-gradient-to-b from-slate-100 via-white to-sky-50"
    >
      {/* Layers: sky + mountains */}
      <div className="pointer-events-none absolute inset-0">
        {/* Optional soft sky glow (biar lebih hidup tapi tetap bukan pink) */}
        <div className="absolute inset-0 bg-[radial-gradient(1000px_500px_at_50%_10%,rgba(59,130,246,0.10),transparent_60%)]" />

        <div
          className="absolute inset-x-0 bottom-0 h-[70vh]"
          data-parallax
          data-speed="0.15"
        >
          <svg
            viewBox="0 0 1440 640"
            className="h-full w-full"
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            <path
              d="M0,500L180,420L360,460L540,400L720,450L900,420L1080,470L1260,430L1440,480L1440,640L0,640Z"
              fill="#e2e8f0"
            />
          </svg>
        </div>

        <div
          className="absolute inset-x-0 bottom-0 h-[65vh]"
          data-parallax
          data-speed="0.25"
        >
          <svg
            viewBox="0 0 1440 640"
            className="h-full w-full"
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            <path
              d="M0,520L160,450L320,500L480,420L640,480L800,440L960,500L1120,450L1280,520L1440,480L1440,640L0,640Z"
              fill="#cbd5e1"
            />
          </svg>
        </div>

        <div
          className="absolute inset-x-0 bottom-0 h-[58vh]"
          data-parallax
          data-speed="0.35"
        >
          <svg
            viewBox="0 0 1440 640"
            className="h-full w-full"
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            <path
              d="M0,540L160,470L320,520L480,460L640,520L800,480L960,520L1120,500L1280,540L1440,520L1440,640L0,640Z"
              fill="#94a3b8"
            />
          </svg>
        </div>

        <div
          className="absolute inset-x-0 bottom-0 h-[48vh]"
          data-parallax
          data-speed="0.45"
        >
          <svg
            viewBox="0 0 1440 640"
            className="h-full w-full"
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            <path
              d="M0,560L150,520L300,560L450,510L600,550L750,520L900,560L1050,540L1200,560L1350,540L1440,560L1440,640L0,640Z"
              fill="#64748b"
            />
          </svg>
        </div>

        {/* Ground / foreground */}
        <div
          className="absolute inset-x-0 bottom-0 h-[28vh]"
          data-parallax
          data-speed="0.6"
        >
          <svg
            viewBox="0 0 1440 320"
            className="h-full w-full"
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            <path
              d="M0,200L120,180L240,210L360,170L480,220L600,190L720,210L840,180L960,220L1080,190L1200,210L1320,180L1440,200L1440,320L0,320Z"
              fill="#0f172a"
            />
          </svg>
        </div>
      </div>

      {/* Big background word */}
      <div className="absolute inset-0">
        <div className="container relative mx-auto px-6 pt-32 md:pt-36">
          <div className="pointer-events-none absolute left-1/2 top-16 w-full -translate-x-1/2 text-center text-[14vw] font-display uppercase tracking-[0.12em] text-slate-900/20 md:top-20 md:text-[12vw]">
            Portfolio
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container relative mx-auto flex min-h-screen flex-col justify-center px-4 pb-16 pt-24 md:px-6 md:pb-24 md:pt-36">
        <div className="max-w-4xl">
          <p className="hero-subtitle mb-4 text-xs font-semibold uppercase tracking-[0.5em] text-slate-600">
            {profile.role}
          </p>

          <h1 className="font-display text-4xl uppercase leading-[0.9] text-slate-900 sm:text-5xl md:text-7xl">
            <span className="hero-title-line block">{heroLineOne}</span>
            <span className="hero-title-line block text-stroke">
              {heroLineTwo}
            </span>
          </h1>

          <p className="hero-subtitle mt-6 max-w-xl text-base text-slate-600 md:text-lg">
            Crafting editorial-grade web experiences with sharp type, layered
            motion, and human-centered interactions.
          </p>
        </div>

        <div className="mt-8 md:mt-10 grid gap-4 md:grid-cols-3">
          {[
            { label: 'Location', value: profile.location },
            { label: 'Current Role', value: profile.role },
            { label: 'Status', value: profile.status },
          ].map((item) => (
            <motion.div
              key={item.label}
              whileHover={prefersReducedMotion ? undefined : { y: -6 }}
              whileTap={prefersReducedMotion ? undefined : { scale: 0.99 }}
              className="hero-card rounded-2xl border border-white/70 bg-white/80 p-4 md:p-5 shadow-[0_20px_40px_rgba(15,23,42,0.12)] backdrop-blur-sm transition hover:border-white hover:brightness-105"
            >
              <p className="text-[0.65rem] md:text-xs font-semibold uppercase tracking-[0.3em] text-slate-500">
                {item.label}
              </p>
              <p className="mt-1 md:mt-2 text-xs md:text-sm font-semibold text-slate-800">
                {item.value}
              </p>
            </motion.div>
          ))}
        </div>

        <div className="hero-marquee mt-8 md:mt-10 rounded-full border border-white/60 bg-white/70 py-2 px-3 md:py-3 md:px-4">
          <Marquee
            speed={reduceMotion ? 0 : 40}
            play={!reduceMotion}
            gradient={false}
            className="text-xs font-semibold uppercase tracking-[0.4em] text-slate-600"
          >
            <span className="mx-6">{marqueeText}</span>
            <span className="mx-6">{marqueeText}</span>
          </Marquee>
        </div>
      </div>
    </section>
  );
}
