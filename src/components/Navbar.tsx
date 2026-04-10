import { useState } from 'react';
import { LayoutGroup, motion, AnimatePresence } from 'framer-motion';

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
  const [isOpen, setIsOpen] = useState(false);

  const activeLabel = items.find((i) => i.id === activeId)?.label || 'MENU';

  return (
    <>
      <nav
        aria-label="Primary"
        className="nav-pill fixed left-1/2 bottom-5 z-50 w-[90%] max-w-4xl -translate-x-1/2 rounded-full border border-white/60 bg-white/80 px-2 py-2 shadow-[0_18px_45px_rgba(15,23,42,0.18)] backdrop-blur-md md:bottom-auto md:top-6 md:w-fit md:px-4"
      >
        <LayoutGroup id="primary-nav">
          {/* PC Nav (hidden di mobile) */}
          <div className="hidden md:flex items-center justify-between gap-3">
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
                  className={`relative rounded-full px-3 py-2 text-[0.72rem] font-semibold tracking-[0.25em] transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400 ${
                    isActive
                      ? 'text-slate-900'
                      : 'text-slate-500 hover:text-slate-900'
                  }`}
                >
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

          {/* Mobile Nav Toggle */}
          <div className="flex w-full items-center justify-between px-3 md:hidden">
            <span className="text-[0.7rem] font-bold tracking-[0.25em] text-slate-800 uppercase">
              {activeLabel}
            </span>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-100 text-slate-900 transition focus-visible:ring-2 focus-visible:ring-sky-400"
              aria-label="Toggle Menu"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                {isOpen ? (
                  <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                ) : (
                  <path d="M4 8h16M4 16h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                )}
              </svg>
            </button>
          </div>
        </LayoutGroup>
      </nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="fixed bottom-20 left-1/2 z-40 w-[90%] -translate-x-1/2 rounded-[2rem] border border-white/60 bg-white/90 p-4 shadow-xl backdrop-blur-md md:hidden"
          >
            <div className="flex flex-col gap-2">
              {items.map((item) => {
                const isActive = activeId === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => {
                      onNavigate(item.id);
                      setIsOpen(false);
                    }}
                    className={`rounded-xl px-4 py-3 text-left text-xs font-semibold tracking-[0.2em] transition ${
                      isActive ? 'bg-slate-900/10 text-slate-900' : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                    }`}
                  >
                    {item.label}
                  </button>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
