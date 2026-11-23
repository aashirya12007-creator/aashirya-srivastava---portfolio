import { useMemo, useState } from 'react';
import { ArrowDownRight, ArrowUpRight, Eye, Mail, RotateCcw } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import { PORTFOLIO_OWNER } from '../data/portfolioData';
import { createFragmentShards } from '../utils/fragmentGrid';
import { PullCordLamp } from './PullCordLamp';

interface HeroSectionProps {
  onNavigate: (sectionId: string) => void;
}

type RevealPhase = 'hidden' | 'disintegrating' | 'revealed';

function getInitialLitState(): boolean {
  if (typeof window === 'undefined') return false;
  const params = new URLSearchParams(window.location.search);
  return params.get('autostart') === '1';
}

export function HeroSection({ onNavigate }: HeroSectionProps) {
  const [isLit, setIsLit] = useState<boolean>(getInitialLitState);
  const [imgError, setImgError] = useState(false);
  const [revealPhase, setRevealPhase] = useState<RevealPhase>('hidden');
  const [revealCycle, setRevealCycle] = useState(0);

  const shards = useMemo(() => createFragmentShards(7), []);

  const handleToggleLamp = () => {
    setIsLit((prev) => !prev);
  };

  const handleRevealClick = () => {
    if (!isLit || revealPhase !== 'hidden') return;
    setRevealPhase('disintegrating');
    window.setTimeout(() => {
      setRevealPhase('revealed');
    }, 900);
  };

  const handleReplay = () => {
    setRevealCycle((c) => c + 1);
    setRevealPhase('hidden');
  };

  return (
    <section
      id="home"
      data-lamp-lit={isLit ? 'true' : 'false'}
      className={`relative pt-8 pb-16 md:pt-16 md:pb-24 border-b border-[rgba(242,236,225,0.1)] transition-colors duration-700 overflow-hidden ${
        isLit ? 'stationery-rule bg-[#121110]' : 'bg-[#070706]'
      }`}
    >
      {/* Subtle warm radial room wash when lit */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 transition-opacity duration-700"
        style={{
          opacity: isLit ? 1 : 0,
          background:
            'radial-gradient(ellipse 68% 72% at 84% 18%, rgba(255, 204, 77, 0.10) 0%, rgba(224, 159, 62, 0.03) 45%, transparent 78%)',
        }}
      />

      <div className="relative z-10 max-w-[1260px] mx-auto px-6 md:px-10">
        {/* Interactive Pull-Cord Lamp: Top-right on mobile, dedicated right-side lane on desktop */}
        <div className="flex justify-end mb-2 lg:mb-0 lg:block lg:absolute lg:top-2 lg:right-8 z-30">
          <PullCordLamp isLit={isLit} onToggle={handleToggleLamp} />
        </div>

        {/* Initial Dark Intro Prompt (disappears smoothly once lamp is turned on) */}
        <AnimatePresence>
          {!isLit && (
            <motion.div
              key="lamp-dark-prompt"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8, transition: { duration: 0.14 } }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="pointer-events-none lg:absolute lg:inset-0 z-20 flex flex-col items-start lg:items-center justify-center py-6 lg:py-0 lg:pr-36"
            >
              <div className="max-w-md lg:text-center">
                <p className="font-display text-2xl sm:text-3xl md:text-4xl font-medium tracking-tight text-[#F2ECE1]/90 mb-2">
                  Turn on the lamp
                </p>
                <p className="text-xs sm:text-sm text-[#8C8478]">
                  Click or tug the hanging string on the right to illuminate the portfolio.
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Main 2-Column Editorial Split (Illuminated when isLit is true) */}
        <motion.div
          initial={false}
          animate={{
            opacity: isLit ? 1 : 0,
            y: isLit ? 0 : 14,
          }}
          transition={{
            duration: isLit ? 0.6 : 0.22,
            delay: isLit ? 0.14 : 0,
            ease: [0.16, 1, 0.3, 1],
          }}
          aria-hidden={!isLit}
          className={`lg:pr-44 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-10 items-stretch ${
            isLit ? 'pointer-events-auto' : 'pointer-events-none select-none'
          }`}
        >
          {/* Left Column: Typographic Anchor */}
          <div className="lg:col-span-7 flex flex-col justify-between py-2">
            <div>
              <p className="text-xs md:text-sm font-medium text-[#E09F3E] tracking-wide mb-5">
                {PORTFOLIO_OWNER.year} · {PORTFOLIO_OWNER.course} · {PORTFOLIO_OWNER.universityShort}
              </p>

              <h1
                className="font-display font-semibold text-[#F2ECE1] tracking-tight leading-[1.09] mb-6"
                style={{
                  fontSize: 'clamp(2.1rem, 3.8vw, 3.35rem)',
                  textWrap: 'balance',
                }}
              >
                Hello! I am Aashirya Srivastava, welcome to my portfolio!
              </h1>

              <p className="text-base md:text-[17px] leading-[1.7] text-[#B5ADA0] max-w-[56ch] mb-8">
                I&apos;m a second-year Computer Science undergraduate specializing in Data Science
                &amp; Artificial Intelligence at {PORTFOLIO_OWNER.university}. I care about
                turning messy, unverified inputs into clean insight—and crafting interfaces that
                feel calm and human to use.
              </p>

              {/* Single Dominant CTA + Secondary Quiet Actions */}
              <div className="flex flex-wrap items-center gap-4">
                <motion.button
                  type="button"
                  tabIndex={isLit ? 0 : -1}
                  onClick={() => onNavigate('contact')}
                  whileHover={{ y: -2, scale: 1.01 }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ duration: 0.16, ease: [0.16, 1, 0.3, 1] }}
                  className="inline-flex items-center gap-2 px-5 py-3 text-sm font-semibold text-[#121110] bg-[#E09F3E] hover:bg-[#e8ae54] rounded-md transition-colors duration-150 cursor-pointer whitespace-nowrap shrink-0"
                >
                  <Mail className="w-4 h-4" aria-hidden="true" />
                  <span>Contact Me</span>
                </motion.button>

                <motion.button
                  type="button"
                  tabIndex={isLit ? 0 : -1}
                  onClick={() => onNavigate('skills')}
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ duration: 0.16, ease: [0.16, 1, 0.3, 1] }}
                  className="group inline-flex items-center gap-1.5 px-4 py-3 text-sm font-medium text-[#F2ECE1] hover:text-[#E09F3E] border border-[rgba(242,236,225,0.16)] hover:border-[#E09F3E]/60 rounded-md transition-colors duration-150 cursor-pointer whitespace-nowrap shrink-0"
                >
                  <span>Explore Skills</span>
                  <ArrowDownRight
                    className="w-4 h-4 transition-transform duration-150 group-hover:translate-x-0.5 group-hover:translate-y-0.5"
                    aria-hidden="true"
                  />
                </motion.button>
              </div>
            </div>

            {/* Quiet External Links */}
            <div className="mt-10 pt-6 border-t border-[rgba(242,236,225,0.1)] flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-[#B5ADA0]">
              <a
                href={PORTFOLIO_OWNER.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                tabIndex={isLit ? 0 : -1}
                className="group inline-flex items-center gap-1 hover:text-[#E09F3E] transition-colors"
              >
                <span>GitHub</span>
                <ArrowUpRight
                  className="w-3.5 h-3.5 transition-transform duration-150 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  aria-hidden="true"
                />
              </a>
              <span aria-hidden="true" className="text-[#8C8478]">
                ·
              </span>
              <a
                href={PORTFOLIO_OWNER.linkedinUrl}
                target="_blank"
                rel="noopener noreferrer"
                tabIndex={isLit ? 0 : -1}
                className="group inline-flex items-center gap-1 hover:text-[#E09F3E] transition-colors"
              >
                <span>LinkedIn</span>
                <ArrowUpRight
                  className="w-3.5 h-3.5 transition-transform duration-150 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  aria-hidden="true"
                />
              </a>
              <span aria-hidden="true" className="hidden sm:inline text-[#8C8478]">
                ·
              </span>
              <a
                href={`mailto:${PORTFOLIO_OWNER.email}`}
                tabIndex={isLit ? 0 : -1}
                className="w-full sm:w-auto hover:text-[#E09F3E] transition-colors"
              >
                {PORTFOLIO_OWNER.email}
              </a>
            </div>
          </div>

          {/* Right Column: Free-Floating Circular Interactive Portrait Reveal */}
          <div className="lg:col-span-5 flex flex-col items-center justify-center py-4">
            <div className="relative flex items-center justify-center">
              {/* Outer subtle hairline orbital frame */}
              <motion.div
                aria-hidden="true"
                animate={isLit && revealPhase === 'hidden' ? { rotate: 360 } : { rotate: 0 }}
                transition={
                  isLit && revealPhase === 'hidden'
                    ? { duration: 28, repeat: Infinity, ease: 'linear' }
                    : { duration: 0.4 }
                }
                className="absolute -inset-3.5 rounded-full border border-dashed border-[rgba(224,159,62,0.36)] pointer-events-none"
              />

              <div
                data-testid="circular-portrait-stage"
                data-reveal-state={revealPhase}
                className="relative w-60 h-60 sm:w-68 sm:h-68 lg:w-72 lg:h-72 rounded-full overflow-hidden border-2 border-[rgba(242,236,225,0.22)] bg-[#090908] shadow-2xl"
              >
                {/* Underlying Circular Photo */}
                <motion.div
                  initial={false}
                  animate={{
                    scale: revealPhase === 'hidden' ? 0.92 : 1,
                    opacity: revealPhase === 'hidden' ? 0 : 1,
                  }}
                  transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
                  className="w-full h-full"
                >
                  {!imgError ? (
                    <img
                      src={PORTFOLIO_OWNER.portraitPath}
                      alt="Portrait of Aashirya Srivastava"
                      referrerPolicy="no-referrer"
                      onError={() => setImgError(true)}
                      className="w-full h-full object-cover object-top transition-transform duration-300 hover:scale-[1.04]"
                    />
                  ) : (
                    <div className="w-full h-full flex flex-col items-center justify-center p-6 text-center bg-[#1A1917]">
                      <span className="font-display text-4xl text-[#E09F3E] mb-2">AS</span>
                      <span className="text-sm text-[#B5ADA0]">{PORTFOLIO_OWNER.name}</span>
                    </div>
                  )}
                </motion.div>

                {/* Disintegrating Black Fragment Overlay */}
                <AnimatePresence>
                  {revealPhase !== 'revealed' && (
                    <div
                      key={`overlay-${revealCycle}`}
                      className="absolute inset-0 rounded-full overflow-hidden"
                    >
                      <div className="absolute inset-0" aria-hidden="true">
                        {shards.map((shard) => (
                          <motion.div
                            key={shard.id}
                            initial={{ x: 0, y: 0, rotate: 0, scale: 1, opacity: 1 }}
                            animate={
                              revealPhase === 'disintegrating'
                                ? {
                                    x: shard.tx,
                                    y: shard.ty,
                                    rotate: shard.rotate,
                                    scale: 0.2,
                                    opacity: 0,
                                  }
                                : { x: 0, y: 0, rotate: 0, scale: 1, opacity: 1 }
                            }
                            transition={{
                              duration: 0.68,
                              delay: revealPhase === 'disintegrating' ? shard.delay : 0,
                              ease: [0.16, 1, 0.3, 1],
                            }}
                            style={{
                              position: 'absolute',
                              left: `${shard.leftPct}%`,
                              top: `${shard.topPct}%`,
                              width: `${shard.sizePct}%`,
                              height: `${shard.sizePct}%`,
                              backgroundColor: '#0A0A09',
                              border: '0.5px solid rgba(242, 236, 225, 0.04)',
                            }}
                          />
                        ))}
                      </div>

                      {revealPhase === 'hidden' && (
                        <motion.button
                          type="button"
                          tabIndex={isLit ? 0 : -1}
                          onClick={handleRevealClick}
                          aria-label="Click me to reveal portrait photo"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.94 }}
                          className="relative z-10 w-full h-full rounded-full flex flex-col items-center justify-center gap-3 text-center p-6 cursor-pointer focus-visible:outline-2 focus-visible:outline-[#E09F3E]"
                        >
                          <motion.span
                            animate={{ scale: [1, 1.08, 1] }}
                            transition={{
                              duration: 2.2,
                              repeat: Infinity,
                              ease: 'easeInOut',
                            }}
                            className="inline-flex items-center justify-center w-12 h-12 rounded-full border border-[#E09F3E]/60 bg-[#171614] text-[#E09F3E]"
                          >
                            <Eye className="w-5 h-5" aria-hidden="true" />
                          </motion.span>

                          <motion.span
                            animate={{ y: [0, -3, 0] }}
                            transition={{
                              duration: 2.2,
                              repeat: Infinity,
                              ease: 'easeInOut',
                            }}
                            className="font-display text-xl font-semibold tracking-tight text-[#F2ECE1]"
                          >
                            Click me
                          </motion.span>

                          <span className="text-xs text-[#8C8478] max-w-[18ch]">
                            Tap to shatter &amp; reveal portrait
                          </span>
                        </motion.button>
                      )}
                    </div>
                  )}
                </AnimatePresence>
              </div>
            </div>

            {revealPhase === 'revealed' && (
              <motion.button
                type="button"
                tabIndex={isLit ? 0 : -1}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                onClick={handleReplay}
                className="mt-5 inline-flex items-center gap-1.5 text-xs text-[#E09F3E] hover:text-[#e8ae54] transition-colors cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" aria-hidden="true" />
                <span>Replay reveal</span>
              </motion.button>
            )}
          </div>
        </motion.div>

        {/* Full-Width 4-Column Academic Credential Strip */}
        <motion.div
          initial={false}
          animate={{
            opacity: isLit ? 1 : 0,
            y: isLit ? 0 : 10,
          }}
          transition={{ duration: 0.6, delay: isLit ? 0.08 : 0, ease: [0.16, 1, 0.3, 1] }}
          aria-hidden={!isLit}
          className={`mt-12 md:mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 ${
            isLit ? 'pointer-events-auto' : 'pointer-events-none select-none'
          }`}
        >
          <motion.div
            whileHover={{ y: -3 }}
            transition={{ duration: 0.16, ease: [0.16, 1, 0.3, 1] }}
            className="paper-card hover:border-[rgba(242,236,225,0.24)] rounded-lg px-5 py-4 transition-colors"
          >
            <p className="text-xs text-[#8C8478] mb-1">University</p>
            <p className="text-sm font-medium text-[#F2ECE1]">{PORTFOLIO_OWNER.university}</p>
          </motion.div>
          <motion.div
            whileHover={{ y: -3 }}
            transition={{ duration: 0.16, ease: [0.16, 1, 0.3, 1] }}
            className="paper-card hover:border-[rgba(242,236,225,0.24)] rounded-lg px-5 py-4 transition-colors"
          >
            <p className="text-xs text-[#8C8478] mb-1">Degree Track</p>
            <p className="text-sm font-medium text-[#F2ECE1]">
              {PORTFOLIO_OWNER.course} · {PORTFOLIO_OWNER.year}
            </p>
          </motion.div>
          <motion.div
            whileHover={{ y: -3 }}
            transition={{ duration: 0.16, ease: [0.16, 1, 0.3, 1] }}
            className="paper-card hover:border-[#E09F3E]/40 rounded-lg px-5 py-4 transition-colors"
          >
            <p className="text-xs text-[#8C8478] mb-1">University Roll No.</p>
            <p className="text-sm font-medium text-[#E09F3E] font-mono-tabular">
              {PORTFOLIO_OWNER.rollNumber}
            </p>
          </motion.div>
          <motion.div
            whileHover={{ y: -3 }}
            transition={{ duration: 0.16, ease: [0.16, 1, 0.3, 1] }}
            className="paper-card hover:border-[#7FA68A]/40 rounded-lg px-5 py-4 transition-colors"
          >
            <p className="text-xs text-[#8C8478] mb-1">Academic Group</p>
            <p className="text-sm font-medium text-[#7FA68A] font-mono-tabular">
              Group {PORTFOLIO_OWNER.group}
            </p>
          </motion.div>
        </motion.div>

        {/* Accessible Skip Intro Button in Corner (when dark) */}
        <AnimatePresence>
          {!isLit && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="mt-6 flex justify-end"
            >
              <button
                type="button"
                onClick={() => setIsLit(true)}
                className="px-3.5 py-2 text-xs font-medium text-[#B5ADA0] hover:text-[#F2ECE1] border border-[rgba(242,236,225,0.16)] hover:border-[#E09F3E]/60 rounded-md bg-[#121110]/80 transition-colors cursor-pointer"
              >
                Skip intro
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
