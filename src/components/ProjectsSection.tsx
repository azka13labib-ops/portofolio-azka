import { motion } from "framer-motion";
import type { Project, RegisterSection } from "../types";

type ProjectsSectionProps = {
  registerSection: RegisterSection;
  prefersReducedMotion: boolean;
  activeProject: number;
  setActiveProject: (index: number) => void;
  projects: Project[];
};

export default function ProjectsSection({
  registerSection,
  prefersReducedMotion,
  activeProject,
  setActiveProject,
  projects,
}: ProjectsSectionProps) {
  return (
    <section
      id="projects"
      ref={registerSection("projects")}
      className="relative scroll-mt-24 overflow-hidden bg-slate-950 py-24 text-white sm:py-28"
    >
      <div className="absolute inset-0 bg-grid-dark" />
      <div className="absolute inset-0 bg-vignette" />
      <div className="container relative mx-auto px-6">
        <div className="absolute -top-8 left-0 text-[16vw] font-display uppercase tracking-[0.2em] text-white/5">
          Projects
        </div>
        <div
          className="mb-14 flex flex-col gap-4 md:flex-row md:items-end md:justify-between"
          data-reveal-container
        >
          <div>
            <p
              className="text-xs font-semibold uppercase tracking-[0.4em] text-slate-400"
              data-reveal
            >
              Selected Work
            </p>
            <h2
              className="mt-3 text-4xl font-display uppercase md:text-5xl"
              data-reveal
            >
              Projects
            </h2>
          </div>
          <p className="max-w-md text-sm text-slate-300" data-reveal>
            A curated lineup of motion-led experiences with deep storytelling
            and refined UI systems.
          </p>
        </div>

        <div className="space-y-16">
          {projects.map((project, index) => {
            const isActive = index === activeProject;
            const isEven = index % 2 === 0;
            return (
              <motion.article
                key={project.title}
                data-project-item
                data-reveal-container
                onMouseEnter={() => setActiveProject(index)}
                onFocusCapture={() => setActiveProject(index)}
                className="grid items-center gap-10 lg:grid-cols-[0.45fr_0.55fr]"
              >
                <div
                  className={`space-y-4 ${
                    isEven ? "lg:order-1 lg:text-left" : "lg:order-2 lg:text-right"
                  }`}
                  data-reveal
                  data-reveal-dir={isEven ? "left" : "right"}
                >
                  <div className="flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.35em] text-slate-400">
                    <span className="text-sky-300">{project.number}</span>
                    <span className="h-px flex-1 bg-white/10" />
                  </div>
                  <h3 className="text-2xl font-semibold text-white md:text-3xl">
                    {project.title}
                  </h3>
                  <p className="text-sm text-slate-300">{project.desc}</p>
                  <div
                    className={`flex flex-wrap gap-2 ${
                      isEven ? "lg:justify-start" : "lg:justify-end"
                    }`}
                  >
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className={`rounded-full border px-3 py-1 text-[0.7rem] font-semibold uppercase tracking-[0.2em] transition ${
                          isActive
                            ? "border-white/40 text-white"
                            : "border-white/10 text-slate-400"
                        }`}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <div
                    className={`flex ${
                      isEven ? "lg:justify-start" : "lg:justify-end"
                    }`}
                  >
                    <a
                      href={project.url}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.3em] text-slate-300 transition hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400"
                    >
                      View Project
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        aria-hidden="true"
                      >
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
                </div>

                <motion.div
                  whileHover={prefersReducedMotion ? undefined : { y: -6 }}
                  whileTap={prefersReducedMotion ? undefined : { scale: 0.98 }}
                  className={`relative h-[230px] overflow-hidden rounded-[2rem] border shadow-[0_30px_65px_rgba(15,23,42,0.5)] sm:h-[260px] lg:h-[300px] ${
                    isEven ? "lg:order-2" : "lg:order-1"
                  } ${isActive ? "border-white/30" : "border-white/10"}`}
                  data-reveal
                  data-reveal-dir={isEven ? "right" : "left"}
                >
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${project.previewColor}`}
                  />
                </motion.div>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
