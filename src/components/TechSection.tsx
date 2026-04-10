import { motion } from "framer-motion";
import type { RegisterSection, Tool } from "../types";

const toolIcons: Record<string, JSX.Element> = {
  React: (
    <svg
      viewBox="0 0 24 24"
      className="h-7 w-7"
      fill="none"
      aria-hidden="true"
    >
      <ellipse
        cx="12"
        cy="12"
        rx="9"
        ry="3.4"
        stroke="currentColor"
        strokeWidth="1.6"
      />
      <ellipse
        cx="12"
        cy="12"
        rx="9"
        ry="3.4"
        stroke="currentColor"
        strokeWidth="1.6"
        transform="rotate(60 12 12)"
      />
      <ellipse
        cx="12"
        cy="12"
        rx="9"
        ry="3.4"
        stroke="currentColor"
        strokeWidth="1.6"
        transform="rotate(120 12 12)"
      />
      <circle cx="12" cy="12" r="1.7" fill="currentColor" />
    </svg>
  ),
  "Next.js": (
    <svg
      viewBox="0 0 24 24"
      className="h-7 w-7"
      fill="none"
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.6" />
      <path
        d="M9 15V9l6 6V9"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  ),
  TypeScript: (
    <svg
      viewBox="0 0 24 24"
      className="h-7 w-7"
      fill="none"
      aria-hidden="true"
    >
      <rect
        x="4"
        y="4"
        width="16"
        height="16"
        rx="3"
        stroke="currentColor"
        strokeWidth="1.6"
      />
      <text
        x="12"
        y="15"
        textAnchor="middle"
        fontSize="8"
        fontFamily="Space Grotesk, sans-serif"
        fontWeight="700"
        fill="currentColor"
      >
        TS
      </text>
    </svg>
  ),
  Tailwind: (
    <svg
      viewBox="0 0 24 24"
      className="h-7 w-7"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M3 9c2-2 4-2 6 0s4 2 6 0 4-2 6 0"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
      <path
        d="M3 12c2-2 4-2 6 0s4 2 6 0 4-2 6 0"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
      <path
        d="M3 15c2-2 4-2 6 0s4 2 6 0 4-2 6 0"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    </svg>
  ),
  "Node.js": (
    <svg
      viewBox="0 0 24 24"
      className="h-7 w-7"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M12 3l7 4v10l-7 4-7-4V7l7-4z"
        stroke="currentColor"
        strokeWidth="1.6"
      />
      <text
        x="12"
        y="14.5"
        textAnchor="middle"
        fontSize="7"
        fontFamily="Space Grotesk, sans-serif"
        fontWeight="700"
        fill="currentColor"
      >
        N
      </text>
    </svg>
  ),
  Python: (
    <svg
      viewBox="0 0 24 24"
      className="h-7 w-7"
      fill="none"
      aria-hidden="true"
    >
      <rect
        x="3.5"
        y="6.5"
        width="17"
        height="11"
        rx="5.5"
        stroke="currentColor"
        strokeWidth="1.6"
      />
      <text
        x="12"
        y="15"
        textAnchor="middle"
        fontSize="7"
        fontFamily="Space Grotesk, sans-serif"
        fontWeight="700"
        fill="currentColor"
      >
        PY
      </text>
    </svg>
  ),
  PHP: (
    <svg
      viewBox="0 0 24 24"
      className="h-7 w-7"
      fill="none"
      aria-hidden="true"
    >
      <rect
        x="3.5"
        y="7"
        width="17"
        height="10"
        rx="5"
        stroke="currentColor"
        strokeWidth="1.6"
      />
      <text
        x="12"
        y="14"
        textAnchor="middle"
        fontSize="7"
        fontFamily="Space Grotesk, sans-serif"
        fontWeight="700"
        fill="currentColor"
      >
        PHP
      </text>
    </svg>
  ),
  Kotlin: (
    <svg
      viewBox="0 0 24 24"
      className="h-7 w-7"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M7 5v14M17 5l-7 7 7 7"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  ),
  Git: (
    <svg
      viewBox="0 0 24 24"
      className="h-7 w-7"
      fill="none"
      aria-hidden="true"
    >
      <circle cx="7" cy="6.5" r="2.2" stroke="currentColor" strokeWidth="1.6" />
      <circle
        cx="17"
        cy="6.5"
        r="2.2"
        stroke="currentColor"
        strokeWidth="1.6"
      />
      <circle
        cx="17"
        cy="17.5"
        r="2.2"
        stroke="currentColor"
        strokeWidth="1.6"
      />
      <path
        d="M9.2 6.5h5.4M17 8.7v6.6M7 8.7v4.6a4.2 4.2 0 0 0 4.2 4.2h1.8"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  ),
};

type TechSectionProps = {
  registerSection: RegisterSection;
  prefersReducedMotion: boolean;
  tools: Tool[];
};

export default function TechSection({
  registerSection,
  prefersReducedMotion,
  tools,
}: TechSectionProps) {
  return (
    <section
      id="tech"
      ref={registerSection("tech")}
      className="relative min-h-[100vh] scroll-mt-24 bg-white pt-24 pb-16 sm:pt-36 sm:pb-24 md:pt-40 md:pb-28 lg:pt-44 lg:pb-32"
    >
      <div className="pointer-events-none absolute inset-0">
        <div className="container relative mx-auto px-6">
          <div className="ghost-text absolute -top-8 left-0 text-[16vw] uppercase tracking-[0.2em] text-slate-900/5">
            Tools
          </div>
        </div>
      </div>

      <div className="container relative mx-auto px-6" data-reveal-container>
        <div className="grid gap-12 lg:grid-cols-[0.7fr_1fr]">
          <div className="pt-8 sm:pt-12 md:pt-16 lg:pt-24">
            <h2 className="text-5xl sm:text-6xl font-display uppercase leading-[0.92] md:text-8xl lg:text-[7rem]">
              <span className="block text-slate-900" data-reveal>
                Tech
              </span>
              <span className="block text-slate-300" data-reveal>
                Stack
              </span>
            </h2>
            <p className="mt-6 sm:mt-10 max-w-md text-base sm:text-lg text-slate-600" data-reveal>
              Tools that keep the workflow lean, expressive, and ready for
              production at scale.
            </p>
          </div>
          <div className="grid gap-4 sm:gap-6 grid-cols-2 lg:grid-cols-3">
            {tools.map((tool, index) => (
              <motion.div
                key={tool.name}
                data-reveal
                whileHover={prefersReducedMotion ? undefined : { y: -4 }}
                whileTap={prefersReducedMotion ? undefined : { scale: 0.98 }}
                className="group flex items-start gap-4 border-b border-slate-200/70 pb-5"
                style={{ transitionDelay: `${index * 30}ms` }}
              >
                <div
                  className={`flex h-12 w-12 items-center justify-center rounded-2xl border ${tool.accentBg} ${tool.accent} ${tool.accentRing}`}
                >
                  {toolIcons[tool.name] ?? (
                    <span className="text-xs font-semibold tracking-[0.2em]">
                      {tool.symbol}
                    </span>
                  )}
                </div>
                <div className="mt-1">
                  <p className="text-sm font-semibold text-slate-900">
                    {tool.name}
                  </p>
                  <p className="mt-1 text-[0.65rem] font-semibold uppercase tracking-[0.3em] text-slate-400">
                    {tool.detail}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
