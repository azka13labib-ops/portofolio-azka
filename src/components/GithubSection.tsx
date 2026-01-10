import { GitHubCalendar } from "react-github-calendar";
import type { RegisterSection } from "../types";

type GithubSectionProps = {
  registerSection: RegisterSection;
  showCalendarFallback: boolean;
  username: string;
};

export default function GithubSection({
  registerSection,
  showCalendarFallback,
  username,
}: GithubSectionProps) {
  return (
    <section
      id="github"
      ref={registerSection("github")}
      className="relative scroll-mt-24 bg-white py-24 sm:py-28"
    >
      <div className="pointer-events-none absolute inset-0">
        <div className="container relative mx-auto px-6">
          <div className="ghost-text absolute -top-6 left-0 text-[16vw] uppercase tracking-[0.2em] text-slate-900/5">
            GitHub
          </div>
        </div>
      </div>

      <div className="container relative mx-auto px-6">
        <div className="grid gap-12 lg:grid-cols-[0.45fr_0.55fr] lg:items-start">
          <div data-reveal-container>
            <p
              className="text-xs font-semibold uppercase tracking-[0.4em] text-slate-500"
              data-reveal
            >
              Contribution
            </p>
            <div className="mt-4 flex items-center gap-3" data-reveal>
              <span className="flex h-11 w-11 items-center justify-center rounded-full border border-slate-200">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  aria-hidden="true"
                >
                  <path
                    d="M9 19c-4 1.5-4-2-6-2m12 6v-3.5c0-1 .1-1.9-.5-2.7 2.2-.2 4.5-1.1 4.5-5a4 4 0 0 0-1.1-2.8 3.7 3.7 0 0 0-.1-2.8s-.9-.3-2.9 1.1a10 10 0 0 0-5.2 0c-2-1.4-2.9-1.1-2.9-1.1a3.7 3.7 0 0 0-.1 2.8A4 4 0 0 0 5 11c0 3.9 2.3 4.8 4.5 5-.4.4-.5 1-.5 1.7V22"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
              <h2 className="text-4xl font-display uppercase text-slate-900">
                GitHub
              </h2>
            </div>
            <h3
              className="mt-2 text-4xl font-display uppercase text-stroke"
              data-reveal
            >
              Activity
            </h3>
            <p className="mt-4 max-w-sm text-sm text-slate-600" data-reveal>
              Live contributions and cadence from the latest build cycles and
              open-source explorations.
            </p>
          </div>

          <div data-reveal-container>
            <div
              className="github-calendar rounded-[2rem] border border-slate-200 bg-white p-6 shadow-[0_18px_40px_rgba(15,23,42,0.12)]"
              data-reveal
            >
              <div className="flex items-center gap-4 border-b border-slate-200 pb-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-full border border-slate-200 bg-slate-900 text-xs font-semibold uppercase tracking-[0.2em] text-white">
                  {username.slice(0, 2).toUpperCase()}
                </div>
                <div>
                  <p className="text-sm font-semibold text-slate-900">
                    {username}
                  </p>
                  <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-400">
                    Contribution Map
                  </p>
                </div>
              </div>
              <div className="mt-5 overflow-x-auto">
                <GitHubCalendar
                  username={username}
                  blockSize={10}
                  blockMargin={4}
                  fontSize={12}
                  colorScheme="light"
                  theme={{
                    light: [
                      "#e2e8f0",
                      "#93c5fd",
                      "#60a5fa",
                      "#3b82f6",
                      "#1d4ed8",
                    ],
                    dark: [
                      "#0f172a",
                      "#1d4ed8",
                      "#2563eb",
                      "#3b82f6",
                      "#60a5fa",
                    ],
                  }}
                />
              </div>
              {showCalendarFallback && (
                <div className="mt-6 rounded-2xl border border-slate-200 bg-slate-50 p-4">
                  <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-500">
                    Fallback Activity Grid
                  </p>
                  <div className="mt-4 grid grid-cols-14 gap-2">
                    {Array.from({ length: 84 }).map((_, index) => (
                      <div
                        key={index}
                        className="h-3 w-3 rounded-sm bg-slate-200"
                      />
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="pointer-events-none absolute inset-0">
        <div
          className="absolute left-10 top-20 h-12 w-12 -rotate-12 rounded-xl border border-slate-200"
          data-float
          data-rotate="-6"
        />
        <div
          className="absolute right-14 top-28 h-10 w-10 rotate-6 rounded-xl border border-slate-200"
          data-float
          data-rotate="4"
        />
      </div>
    </section>
  );
}
