import { LayoutGroup, motion } from 'framer-motion';

type NavItem = { id: string; label: string };

export default function Navbar({
  items,
  activeId,
  onNavigate,
  prefersReducedMotion,
}: {
  items: NavItem[];
  activeId: string;
  onNavigate: (id: string) => void;
  prefersReducedMotion: boolean;
}) {
  return (
    <nav
      aria-label="Primary"
      className="nav-pill fixed left-1/2 bottom-5 z-50 w-[92%] max-w-4xl -translate-x-1/2 rounded-full border border-white/60 bg-white/80 px-3 py-2 shadow-[0_18px_45px_rgba(15,23,42,0.18)] backdrop-blur-sm md:bottom-auto md:top-6 md:w-fit md:px-4"
    >
      <LayoutGroup id="primary-nav">
        <div className="flex items-center justify-between gap-2 md:gap-3">
          {items.map((item) => {
            const isActive = activeId === item.id;

            return (
              <motion.button
                key={item.id}
                type="button"
                onClick={() => onNavigate(item.id)}
                whileHover={prefersReducedMotion ? undefined : { y: -2 }}
                whileTap={prefersReducedMotion ? undefined : { scale: 0.98 }}
                aria-current={isActive ? 'page' : undefined}
                className={`relative rounded-full px-3 py-2 text-[0.7rem] font-semibold tracking-[0.25em] transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400 md:text-[0.72rem] ${
                  isActive
                    ? 'text-slate-900'
                    : 'text-slate-500 hover:text-slate-900'
                }`}
              >
                {/* pill highlight yang “ngikut” */}
                {isActive && (
                  <motion.span
                    layoutId="nav-active-pill"
                    className="absolute inset-0 rounded-full bg-slate-900/10"
                    transition={
                      prefersReducedMotion
                        ? { duration: 0 }
                        : { type: 'spring', stiffness: 520, damping: 42 }
                    }
                  />
                )}

                <span className="relative z-10">{item.label}</span>

                <span
                  className={`absolute inset-x-3 -bottom-0.5 h-px bg-slate-900 transition-opacity ${
                    isActive ? 'opacity-100' : 'opacity-0'
                  }`}
                />
              </motion.button>
            );
          })}
        </div>
      </LayoutGroup>
    </nav>
  );
}
