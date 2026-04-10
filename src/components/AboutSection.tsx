import { motion } from "framer-motion";
import type { RegisterSection } from "../types";

type AboutSectionProps = {
  registerSection: RegisterSection;
  prefersReducedMotion: boolean;
  profileName: string;
};

export default function AboutSection({
  registerSection,
  prefersReducedMotion,
  profileName,
}: AboutSectionProps) {
  return (
    <section
      id="about"
      ref={registerSection("about")}
      className="relative scroll-mt-24 bg-white py-16 sm:py-24 md:py-28"
    >
      <div className="pointer-events-none absolute inset-0">
        <div className="container relative mx-auto px-6">
          <div className="ghost-text absolute -top-6 left-0 text-[18vw] uppercase tracking-[0.2em] text-slate-900/5">
            About Me
          </div>
        </div>
      </div>

      <div className="container relative mx-auto px-6" data-reveal-container>
        <div className="flex flex-col gap-10 md:flex-row md:items-end md:justify-between">
          <h2
            className="text-4xl sm:text-5xl font-display uppercase text-slate-900 md:text-6xl"
            data-reveal
          >
            Passionate
          </h2>
          <motion.button
            whileHover={prefersReducedMotion ? undefined : { x: 6 }}
            whileTap={prefersReducedMotion ? undefined : { scale: 0.98 }}
            className="group flex items-center gap-3 text-sm font-semibold uppercase tracking-[0.3em] text-slate-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400"
            data-reveal
          >
            <span className="relative">
              View Experience
              <span className="absolute left-0 -bottom-1 h-px w-0 bg-slate-700 transition-all group-hover:w-full" />
            </span>
            <span className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-slate-200">
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                aria-hidden="true"
              >
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

        <p
          className="mt-8 max-w-2xl text-base text-slate-600 md:text-lg"
          data-reveal
        >
          Halo, saya <span className="font-semibold text-slate-900">{profileName}</span>, seorang <strong>Fullstack Developer</strong> yang menyukai detail.
          Saya merancang antarmuka yang <strong>clean & intuitive</strong> menggunakan ekosistem React, Flutter, dan modern web stack.
        </p>

        <div className="mt-14 text-center" data-reveal>
          <p className="text-xs font-semibold uppercase tracking-[0.4em] text-slate-400">
            Scroll to Explore
          </p>
          <div className="mt-3 flex justify-center">
            <span className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-200">
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                aria-hidden="true"
              >
                <path
                  d="M12 6v12m0 0l-5-5m5 5l5-5"
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

      <div className="pointer-events-none absolute inset-0">
        <div
          className="absolute right-10 top-10 h-24 w-24 rounded-2xl border border-slate-200"
          data-float
          data-rotate="3"
        />
        <div
          className="absolute left-16 bottom-16 h-20 w-20 rounded-2xl border border-slate-200"
          data-float
          data-rotate="-4"
        />
        <div
          className="absolute right-24 bottom-24 hidden h-16 w-16 rounded-2xl border border-slate-200 md:block"
          data-float
          data-rotate="6"
        />
      </div>
    </section>
  );
}
