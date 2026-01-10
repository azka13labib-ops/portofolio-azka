import { motion } from "framer-motion";
import type { JourneyItem, RegisterSection } from "../types";

type JourneySectionProps = {
  registerSection: RegisterSection;
  prefersReducedMotion: boolean;
  journey: JourneyItem[];
};

export default function JourneySection({
  registerSection,
  prefersReducedMotion,
  journey,
}: JourneySectionProps) {
  return (
    <section
      id="journey"
      ref={registerSection("journey")}
      className="relative scroll-mt-24 overflow-hidden bg-gradient-to-b from-sky-100 via-sky-200 to-sky-300 py-24 sm:py-28"
    >
      <div className="absolute inset-0">
        <div className="absolute left-10 top-16 h-20 w-40 rounded-full bg-white/50" />
        <div className="absolute right-20 top-24 h-16 w-32 rounded-full bg-white/40" />
        <div className="absolute left-1/2 top-10 h-14 w-28 -translate-x-1/2 rounded-full bg-white/40" />
        <div className="absolute bottom-24 left-16 h-10 w-24 rounded-full bg-white/35" />
      </div>
      <div className="pointer-events-none absolute inset-0">
        <div className="container relative mx-auto px-6">
          <div className="ghost-text absolute -top-6 left-0 text-[16vw] uppercase tracking-[0.2em] text-slate-900/10">
            Journey
          </div>
        </div>
      </div>

      <div className="container relative mx-auto px-6">
        <div className="mb-12 flex flex-col gap-4" data-reveal-container>
          <p
            className="text-xs font-semibold uppercase tracking-[0.4em] text-slate-500"
            data-reveal
          >
            Timeline
          </p>
          <h2
            className="text-4xl font-display uppercase text-slate-900 md:text-5xl"
            data-reveal
          >
            Journey
          </h2>
          <p className="max-w-xl text-sm text-slate-700" data-reveal>
            A scrapbook timeline of roles, experiments, and moments that shaped
            the visual language.
          </p>
        </div>

        <div className="relative">
          <div className="absolute left-1/2 top-0 hidden h-full w-px -translate-x-1/2 border-l border-dashed border-sky-400/60 lg:block" />
          <div className="space-y-14">
            {journey.map((item, index) => {
              const isLeft = item.side === "left";
              const polaroidTone =
                item.photoTone ?? "from-slate-100 to-slate-200";
              return (
                <div
                  key={item.title}
                  className="relative grid gap-6 lg:grid-cols-[1fr_80px_1fr] lg:items-center"
                  data-reveal-container
                >
                  <motion.div
                    data-reveal
                    data-reveal-dir={isLeft ? "left" : "right"}
                    className={`rounded-[2.5rem] border border-white/70 bg-white/90 p-6 shadow-[0_16px_35px_rgba(15,23,42,0.12)] ${
                      isLeft ? "lg:col-start-1" : "lg:col-start-3"
                    }`}
                  >
                    <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-500">
                      {item.yearRange}
                    </p>
                    <h3 className="mt-2 text-lg font-semibold text-slate-900">
                      {item.title}
                    </h3>
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
                    <span className="flex h-5 w-5 items-center justify-center rounded-full border border-sky-400 bg-white shadow-[0_0_0_6px_rgba(125,211,252,0.18)]" />
                  </div>
                  <div
                    className={`hidden items-start justify-center lg:flex ${
                      isLeft ? "lg:col-start-3" : "lg:col-start-1"
                    }`}
                  >
                    <motion.div
                      data-reveal
                      data-reveal-dir={isLeft ? "right" : "left"}
                      whileHover={
                        prefersReducedMotion
                          ? undefined
                          : { rotate: 0, scale: 1.03 }
                      }
                      whileTap={
                        prefersReducedMotion ? undefined : { scale: 0.98 }
                      }
                      className={`w-48 rounded-[2.2rem] border border-white/70 bg-white/95 p-3 shadow-[0_16px_35px_rgba(15,23,42,0.12)] ${
                        item.photoRotate ?? ""
                      }`}
                      data-drift={`${8 + index * 2}`}
                    >
                      <div
                        className={`h-28 rounded-2xl bg-gradient-to-br ${polaroidTone}`}
                      />
                      <p className="mt-3 text-[0.6rem] font-semibold uppercase tracking-[0.3em] text-slate-500">
                        {item.photoPlaceholder}
                      </p>
                    </motion.div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="pointer-events-none absolute right-8 top-6 hidden lg:block">
          <svg
            width="180"
            height="120"
            viewBox="0 0 180 120"
            fill="none"
            aria-hidden="true"
          >
            <path
              d="M10 100C40 40 120 20 170 90"
              stroke="rgba(148,163,184,0.7)"
              strokeDasharray="6 8"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
            <g data-drift="6">
              <path
                d="M92 52l18-8-6 18-4-7-8-3z"
                stroke="rgba(30,41,59,0.8)"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </g>
          </svg>
        </div>
      </div>
    </section>
  );
}
