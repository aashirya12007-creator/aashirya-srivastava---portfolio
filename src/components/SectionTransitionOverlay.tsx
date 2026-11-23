import { AnimatePresence, motion } from 'motion/react';

export interface SectionTransitionState {
  key: number;
  sectionId: string;
  label: string;
}

interface SectionTransitionOverlayProps {
  transition: SectionTransitionState | null;
}

const BANDS = [
  { id: 'band-1', bg: '#181715', delayIn: 0, delayOut: 0.05 },
  { id: 'band-2', bg: '#E09F3E', delayIn: 0.04, delayOut: 0.02 },
  { id: 'band-3', bg: '#121110', delayIn: 0.08, delayOut: 0 },
];

export function SectionTransitionOverlay({ transition }: SectionTransitionOverlayProps) {
  return (
    <AnimatePresence>
      {transition && (
        <motion.div
          key={transition.key}
          aria-hidden="true"
          className="pointer-events-none fixed inset-0 z-50 overflow-hidden"
        >
          {BANDS.map((band) => (
            <motion.div
              key={band.id}
              initial={{ scaleX: 0 }}
              animate={{
                scaleX: [0, 1, 1, 0],
                transformOrigin: ['left', 'left', 'right', 'right'],
              }}
              transition={{
                duration: 0.56,
                times: [0, 0.36, 0.52, 1],
                delay: band.delayIn,
                ease: [0.22, 1, 0.36, 1],
              }}
              style={{ backgroundColor: band.bg }}
              className="absolute inset-0 will-change-transform border-r border-[rgba(242,236,225,0.12)]"
            />
          ))}

          {/* Editorial chapter title flash at wipe midpoint */}
          <motion.div
            initial={{ opacity: 0, y: 12, scale: 0.96 }}
            animate={{
              opacity: [0, 1, 1, 0],
              y: [12, 0, 0, -10],
              scale: [0.96, 1, 1, 1.02],
            }}
            transition={{
              duration: 0.52,
              times: [0, 0.32, 0.62, 1],
              ease: [0.16, 1, 0.3, 1],
            }}
            className="relative z-10 h-full w-full flex items-center justify-center px-6 text-center"
          >
            <span className="font-display text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight text-[#F2ECE1]">
              {transition.label}
            </span>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
