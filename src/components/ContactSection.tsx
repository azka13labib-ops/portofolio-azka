import { useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { RegisterSection } from '../types';

type Props = {
  registerSection: RegisterSection;
  prefersReducedMotion: boolean;
};

type Key = 'github' | 'instagram' | 'whatsapp' | 'email';

type ContactItem = {
  key: Key;
  label: string;
  hint: string; // kecil di bawah label
  display: string; // tampil di UI
  copyText: string; // yang dicopy
  href: string; // open link
  Icon: React.FC<{ className?: string }>;
};

const IconGitHub = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path
      d="M9 19c-4 1.5-4-2-6-2m12 6v-3.5c0-1 .1-1.9-.5-2.7 2.2-.2 4.5-1.1 4.5-5a4 4 0 0 0-1.1-2.8 3.7 3.7 0 0 0-.1-2.8s-.9-.3-2.9 1.1a10 10 0 0 0-5.2 0c-2-1.4-2.9-1.1-2.9-1.1a3.7 3.7 0 0 0-.1 2.8A4 4 0 0 0 5 11c0 3.9 2.3 4.8 4.5 5-.4.4-.5 1-.5 1.7V22"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const IconIG = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path
      d="M8 3.5h8A4.5 4.5 0 0 1 20.5 8v8A4.5 4.5 0 0 1 16 20.5H8A4.5 4.5 0 0 1 3.5 16V8A4.5 4.5 0 0 1 8 3.5Z"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinejoin="round"
    />
    <path
      d="M12 16a4 4 0 1 0 0-8 4 4 0 0 0 0 8Z"
      stroke="currentColor"
      strokeWidth="1.6"
    />
    <path
      d="M17.2 6.8h.01"
      stroke="currentColor"
      strokeWidth="2.4"
      strokeLinecap="round"
    />
  </svg>
);

const IconWA = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path
      d="M12 21a9 9 0 1 0-7.8-4.5L3 21l4.7-1.2A9 9 0 0 0 12 21Z"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinejoin="round"
    />
    <path
      d="M9.2 8.7c.3-.4.7-.4 1 0l.8 1c.2.3.2.7 0 1l-.3.4c-.2.2-.2.5-.1.8.5 1 1.2 1.9 2.2 2.6.2.2.5.2.8 0l.4-.3c.3-.2.7-.2 1 0l1 .8c.4.3.4.7 0 1-.6.7-1.4 1-2.4.7-2.6-.8-5.8-4-6.6-6.6-.3-1 .1-1.8.7-2.4Z"
      stroke="currentColor"
      strokeWidth="1.4"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const IconMail = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path
      d="M4.5 7.5h15v9a2 2 0 0 1-2 2h-11a2 2 0 0 1-2-2v-9Z"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinejoin="round"
    />
    <path
      d="m5.5 8.5 6.1 5a1 1 0 0 0 1.3 0l6.1-5"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const ArrowOut = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path
      d="M7 17L17 7m0 0h-7m7 0v7"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export default function ContactSection({
  registerSection,
  prefersReducedMotion,
}: Props) {
  // TODO: ganti ini sesuai akun kamu
  const DATA = useMemo(
    () => ({
      githubUser: 'azka13labib-ops',
      igUser: 'Tryfind.Azka',
      waNumber: '628155761573', // tanpa +, contoh: 6281234567890
      email: 'Azka13labib@gmail.com',
    }),
    []
  );

  const items: ContactItem[] = useMemo(() => {
    const githubUrl = `https://github.com/azka13labib-ops/${DATA.githubUser}`;
    const igUrl = `https://instagram.com/${DATA.igUser}`;
    const waUrl = `https://wa.me/6283155761573?text=Halo%20Azka,%20saya%20ingin%20diskusi%20tentang%20project.
/${DATA.waNumber}`;

    return [
      {
        key: 'github',
        label: 'GitHub',
        hint: 'Repository / collab',
        display: `github.com/${DATA.githubUser}`,
        copyText: githubUrl,
        href: githubUrl,
        Icon: IconGitHub,
      },
      {
        key: 'instagram',
        label: 'Instagram',
        hint: 'DM cepat',
        display: `@${DATA.igUser}`,
        copyText: igUrl,
        href: igUrl,
        Icon: IconIG,
      },
      {
        key: 'whatsapp',
        label: 'WhatsApp',
        hint: 'Chat langsung',
        display: `+${DATA.waNumber}`,
        copyText: `+${DATA.waNumber}`,
        href: waUrl,
        Icon: IconWA,
      },
      {
        key: 'email',
        label: 'Email',
        hint: 'Proposal / brief',
        display: DATA.email,
        copyText: DATA.email,
        href: `mailto:${DATA.email}`,
        Icon: IconMail,
      },
    ];
  }, [DATA.email, DATA.githubUser, DATA.igUser, DATA.waNumber]);

  const [copiedKey, setCopiedKey] = useState<Key | null>(null);

  const copyToClipboard = async (text: string, key: Key) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedKey(key);
      window.setTimeout(() => setCopiedKey(null), 1100);
    } catch {
      const ta = document.createElement('textarea');
      ta.value = text;
      ta.style.position = 'fixed';
      ta.style.opacity = '0';
      document.body.appendChild(ta);
      ta.select();
      document.execCommand('copy');
      document.body.removeChild(ta);
      setCopiedKey(key);
      window.setTimeout(() => setCopiedKey(null), 1100);
    }
  };

  const open = (href: string) => window.open(href, '_blank', 'noreferrer');

  return (
    <section
      id="contact"
      ref={registerSection('contact')}
      className="relative scroll-mt-24 bg-white py-24 sm:py-28"
    >
      {/* ghost background word (unik tapi halus) */}
      <div className="pointer-events-none absolute inset-0">
        <div className="mx-auto w-full max-w-6xl px-6">
          <div className="absolute -top-8 left-0 text-[16vw] font-display uppercase tracking-[0.2em] text-slate-900/5">
            Contact
          </div>
        </div>
      </div>

      <div className="relative z-10 mx-auto w-full max-w-6xl px-6">
        <div className="grid gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-start">
          {/* left copy */}
          <div className="pt-4">
            <p className="text-xs font-semibold uppercase tracking-[0.4em] text-slate-500">
              /// Contact
            </p>

            <h2 className="mt-3 text-5xl font-display uppercase leading-[0.95] text-slate-900 md:text-6xl">
              Hubungi saya
            </h2>

            <p className="mt-5 max-w-md text-base text-slate-700">
              Pilih salah satu kontak di kanan. Klik baris untuk menyalin, klik
              tombol panah untuk membuka link.
            </p>

            <div className="mt-8 rounded-2xl border border-slate-200 bg-slate-50 p-5">
              <p className="text-[0.7rem] font-semibold uppercase tracking-[0.3em] text-slate-600">
                Pesan yang ideal
              </p>
              <p className="mt-2 text-sm text-slate-700">
                Tulis singkat: tujuan, referensi, deadline, dan scope. Biar saya
                bisa respon cepat dan tepat.
              </p>
            </div>
          </div>

          {/* right panel */}
          <div className="relative">
            <div className="rounded-[2rem] border border-slate-200 bg-white shadow-[0_18px_45px_rgba(15,23,42,0.10)]">
              {/* top rail */}
              <div className="flex items-center justify-between gap-3 border-b border-slate-200 px-5 py-4">
                <p className="text-[0.65rem] font-semibold uppercase tracking-[0.35em] text-slate-500">
                  Quick Links
                </p>

                <AnimatePresence>
                  {copiedKey ? (
                    <motion.div
                      initial={{ opacity: 0, y: -6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -6 }}
                      transition={{ duration: prefersReducedMotion ? 0 : 0.18 }}
                      className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-[0.65rem] font-semibold uppercase tracking-[0.25em] text-slate-700"
                    >
                      Copied
                    </motion.div>
                  ) : (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="text-[0.65rem] font-semibold uppercase tracking-[0.25em] text-slate-400"
                    >
                      Tap to copy
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <div className="p-2">
                {items.map((it, idx) => {
                  const Row: any = prefersReducedMotion ? 'div' : motion.div;
                  const isCopied = copiedKey === it.key;

                  return (
                    <Row
                      key={it.key}
                      whileHover={prefersReducedMotion ? undefined : { x: 2 }}
                      className={`group relative mx-1 my-2 cursor-pointer rounded-2xl border border-slate-200 bg-white px-4 py-4 transition ${
                        isCopied ? 'bg-slate-50' : 'hover:bg-slate-50'
                      }`}
                      onClick={() => copyToClipboard(it.copyText, it.key)}
                      role="button"
                      tabIndex={0}
                      onKeyDown={(e: React.KeyboardEvent) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                          e.preventDefault();
                          copyToClipboard(it.copyText, it.key);
                        }
                      }}
                    >
                      {/* subtle left marker (unik tapi ga rame) */}
                      <span className="absolute left-3 top-1/2 h-10 w-px -translate-y-1/2 bg-slate-200" />

                      <div className="flex items-center gap-4">
                        <span className="inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-slate-200 bg-white">
                          <it.Icon className="h-5 w-5 text-slate-900" />
                        </span>

                        <div className="min-w-0 flex-1">
                          <div className="flex items-baseline justify-between gap-3">
                            <p className="text-sm font-semibold text-slate-900">
                              {it.label}
                            </p>
                            <p className="hidden text-[0.65rem] font-semibold uppercase tracking-[0.25em] text-slate-400 sm:block">
                              {it.hint}
                            </p>
                          </div>

                          <p className="mt-1 truncate font-mono text-xs text-slate-700">
                            {it.display}
                          </p>

                          {/* underline micro */}
                          <div className="mt-3 h-px w-full bg-slate-200/70">
                            <div className="h-px w-0 bg-slate-900/50 transition-all duration-300 group-hover:w-[40%]" />
                          </div>
                        </div>

                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            open(it.href);
                          }}
                          className="inline-flex h-10 w-10 items-center justify-center rounded-2xl border border-slate-200 bg-white text-slate-900 transition hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400"
                          aria-label={`Open ${it.label}`}
                          title={`Open ${it.label}`}
                        >
                          <ArrowOut className="h-4 w-4" />
                        </button>
                      </div>
                    </Row>
                  );
                })}
              </div>
            </div>

            {/* small note bawah, tetap clean */}
          </div>
        </div>
      </div>
    </section>
  );
}
