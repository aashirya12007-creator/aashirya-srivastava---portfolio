import { useCallback, useEffect, useRef, useState } from 'react';
import { motion, MotionConfig } from 'motion/react';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { MarqueeRibbon } from './components/MarqueeRibbon';
import { AboutSection } from './components/AboutSection';
import { SkillsSection } from './components/SkillsSection';
import { WorkSection } from './components/WorkSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import {
  SectionTransitionOverlay,
  type SectionTransitionState,
} from './components/SectionTransitionOverlay';

const SECTION_IDS = ['home', 'about', 'skills', 'work', 'contact'] as const;

const SECTION_LABELS: Record<string, string> = {
  home: 'Home',
  about: '01. About Me',
  skills: '02. Skills Learned',
  work: '03. Selected Explorations',
  contact: '04. Contact Me',
};

export default function App() {
  const [activeSection, setActiveSection] = useState<string>('home');
  const [transition, setTransition] = useState<SectionTransitionState | null>(null);
  const [arrivedKey, setArrivedKey] = useState<{ id: string; tick: number } | null>(null);
  const timersRef = useRef<number[]>([]);

  const clearTransitionTimers = () => {
    timersRef.current.forEach((id) => window.clearTimeout(id));
    timersRef.current = [];
  };

  useEffect(() => {
    const elements = SECTION_IDS.map((id) => document.getElementById(id)).filter(
      (el): el is HTMLElement => el !== null,
    );

    if (elements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        }
      },
      {
        rootMargin: '-30% 0px -55% 0px',
        threshold: 0.05,
      },
    );

    elements.forEach((el) => observer.observe(el));
    return () => {
      observer.disconnect();
      clearTransitionTimers();
    };
  }, []);

  const jumpToSection = useCallback((sectionId: string) => {
    if (sectionId === 'home') {
      window.scrollTo({ top: 0, behavior: 'auto' });
      return;
    }
    const target = document.getElementById(sectionId);
    if (target) {
      const headerOffset = 68;
      const top = target.getBoundingClientRect().top + window.scrollY - headerOffset;
      window.scrollTo({ top: Math.max(0, top), behavior: 'auto' });
    }
  }, []);

  const handleNavigate = useCallback(
    (sectionId: string) => {
      setActiveSection(sectionId);

      const prefersReduced =
        typeof window !== 'undefined' &&
        window.matchMedia('(prefers-reduced-motion: reduce)').matches;

      if (prefersReduced) {
        jumpToSection(sectionId);
        return;
      }

      clearTransitionTimers();
      const key = Date.now();
      const label = SECTION_LABELS[sectionId] || sectionId;
      setTransition({ key, sectionId, label });

      // Jump cleanly behind the editorial shutter at the midpoint so there is no plain scroll
      const midTimer = window.setTimeout(() => {
        jumpToSection(sectionId);
        setArrivedKey({ id: sectionId, tick: key });
      }, 240);

      const endTimer = window.setTimeout(() => {
        setTransition(null);
      }, 640);

      timersRef.current.push(midTimer, endTimer);
    },
    [jumpToSection],
  );

  const getSectionKey = (sectionId: string) =>
    arrivedKey?.id === sectionId ? `${sectionId}-${arrivedKey.tick}` : sectionId;

  const getSectionMotion = (sectionId: string) => {
    const isArriving = arrivedKey?.id === sectionId;
    return {
      initial: isArriving ? { opacity: 0.45, y: 24, scale: 0.985 } : false,
      animate: { opacity: 1, y: 0, scale: 1 },
      transition: { duration: 0.42, ease: [0.16, 1, 0.3, 1] as const },
    };
  };

  return (
    <MotionConfig reducedMotion="user">
      <div className="relative min-h-screen bg-[#121110] text-[#F2ECE1]">
        {/* Tactile paper fiber overlay across entire dark canvas */}
        <div
          aria-hidden="true"
          className="pointer-events-none fixed inset-0 z-30 paper-grain-overlay opacity-75"
        />

        {/* Editorial shutter wipe when navigating between sections */}
        <SectionTransitionOverlay transition={transition} />

        <div className="relative z-10 flex flex-col min-h-screen">
          <Navbar activeSection={activeSection} onNavigate={handleNavigate} />

          <main className="flex-1">
            <motion.div key={getSectionKey('home')} {...getSectionMotion('home')}>
              <HeroSection onNavigate={handleNavigate} />
            </motion.div>

            <MarqueeRibbon />

            <motion.div key={getSectionKey('about')} {...getSectionMotion('about')}>
              <AboutSection />
            </motion.div>

            <motion.div key={getSectionKey('skills')} {...getSectionMotion('skills')}>
              <SkillsSection />
            </motion.div>

            <motion.div key={getSectionKey('work')} {...getSectionMotion('work')}>
              <WorkSection />
            </motion.div>

            <motion.div key={getSectionKey('contact')} {...getSectionMotion('contact')}>
              <ContactSection />
            </motion.div>
          </main>

          <Footer onNavigate={handleNavigate} />
        </div>
      </div>
    </MotionConfig>
  );
}
