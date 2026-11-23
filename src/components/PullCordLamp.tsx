import { useRef, useState, type KeyboardEvent, type PointerEvent } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'motion/react';
import { clampCordPull, shouldToggleLamp } from '../utils/lampPhysics';

interface PullCordLampProps {
  isLit: boolean;
  onToggle: () => void;
}

export function PullCordLamp({ isLit, onToggle }: PullCordLampProps) {
  const [isDragging, setIsDragging] = useState(false);
  const pointerStartY = useRef<number | null>(null);
  const maxPullSeen = useRef(0);
  const activePointerId = useRef<number | null>(null);

  const rawPull = useMotionValue(0);
  const springPull = useSpring(rawPull, {
    stiffness: 360,
    damping: 18,
    mass: 0.7,
  });

  // Dynamic SVG cord length (base 74px + pull offset)
  const cordEndY = useTransform(springPull, (v) => 124 + v);
  const tasselY = useTransform(springPull, (v) => 130 + v);

  const handlePointerDown = (event: PointerEvent<HTMLButtonElement>) => {
    event.preventDefault();
    event.currentTarget.setPointerCapture(event.pointerId);
    activePointerId.current = event.pointerId;
    pointerStartY.current = event.clientY;
    maxPullSeen.current = 0;
    setIsDragging(true);
  };

  const handlePointerMove = (event: PointerEvent<HTMLButtonElement>) => {
    if (pointerStartY.current === null || activePointerId.current !== event.pointerId) {
      return;
    }
    const deltaY = clampCordPull(event.clientY - pointerStartY.current);
    if (deltaY > maxPullSeen.current) {
      maxPullSeen.current = deltaY;
    }
    rawPull.set(deltaY);
  };

  const finishPull = (event: PointerEvent<HTMLButtonElement>) => {
    if (pointerStartY.current === null || activePointerId.current !== event.pointerId) {
      return;
    }
    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }
    const triggered = shouldToggleLamp(maxPullSeen.current, true);
    pointerStartY.current = null;
    activePointerId.current = null;
    maxPullSeen.current = 0;
    setIsDragging(false);
    rawPull.set(0);

    if (triggered) {
      onToggle();
    }
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLButtonElement>) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      rawPull.set(28);
      window.setTimeout(() => rawPull.set(0), 140);
      onToggle();
    }
  };

  return (
    <div className="relative select-none flex flex-col items-center">
      {/* Triangular Light Cone + Warm Bulb Glow when Lit */}
      <motion.div
        aria-hidden="true"
        initial={false}
        animate={{
          opacity: isLit ? 1 : 0,
          scale: isLit ? 1 : 0.94,
        }}
        transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
        className="pointer-events-none absolute top-[21%] right-[12%] w-[260px] sm:w-[420px] lg:w-[620px] h-[340px] sm:h-[420px] lg:h-[500px] origin-top-right"
      >
        {/* Radial Bulb Halo */}
        <div
          className="absolute top-0 right-[26px] sm:right-[30px] lg:right-[34px] w-32 h-32 -translate-y-1/3 rounded-full blur-2xl"
          style={{
            background:
              'radial-gradient(circle, rgba(255,219,102,0.58) 0%, rgba(255,190,11,0.22) 48%, transparent 76%)',
          }}
        />

        {/* Soft Triangular Light Cone */}
        <svg
          viewBox="0 0 600 500"
          className="w-full h-full overflow-visible"
          preserveAspectRatio="none"
        >
          <defs>
            <linearGradient id="lampConeGradient" x1="86%" y1="0%" x2="36%" y2="100%">
              <stop offset="0%" stopColor="#ffdb66" stopOpacity="0.34" />
              <stop offset="42%" stopColor="#ffbe0b" stopOpacity="0.13" />
              <stop offset="100%" stopColor="#ffbe0b" stopOpacity="0" />
            </linearGradient>
            <filter id="coneSoftEdge" x="-15%" y="-10%" width="130%" height="125%">
              <feGaussianBlur stdDeviation="10" />
            </filter>
          </defs>
          <polygon
            points="488,0 554,0 596,500 24,500"
            fill="url(#lampConeGradient)"
            filter="url(#coneSoftEdge)"
          />
        </svg>
      </motion.div>

      {/* Minimalist Architectural Floor / Desk Lamp SVG */}
      <div className="relative w-32 sm:w-36 lg:w-40">
        <svg
          viewBox="0 0 160 290"
          className="w-full h-auto overflow-visible"
          aria-hidden="true"
        >
          <defs>
            <radialGradient id="bulbGlowGrad" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#fff7d6" />
              <stop offset="45%" stopColor="#ffdb66" />
              <stop offset="100%" stopColor="#ffbe0b" />
            </radialGradient>
          </defs>

          {/* Slender Standing Floor/Desk Lamp Arm & Base */}
          <path
            d="M 118 282 L 118 52 Q 118 24 94 24 L 68 24"
            fill="none"
            stroke={isLit ? '#6C6458' : '#3C3833'}
            strokeWidth="3.5"
            strokeLinecap="round"
          />
          {/* Weighted Base */}
          <ellipse
            cx="118"
            cy="283"
            rx="24"
            ry="4.5"
            fill={isLit ? '#3A3630' : '#24221F'}
            stroke={isLit ? '#7B7265' : '#433E38'}
            strokeWidth="1.2"
          />

          {/* Bulb */}
          <circle
            cx="68"
            cy="64"
            r="11"
            fill={isLit ? 'url(#bulbGlowGrad)' : '#252320'}
            stroke={isLit ? '#ffdb66' : '#3F3B35'}
            strokeWidth="1.2"
          />

          {/* Minimal Angled Lamp Shade */}
          <path
            d="M 48 26 L 88 26 L 100 62 L 36 62 Z"
            fill={isLit ? '#26231F' : '#181715'}
            stroke={isLit ? '#E09F3E' : '#4E4840'}
            strokeWidth="1.8"
            strokeLinejoin="round"
          />
          {/* Inner Shade Rim Glow */}
          <line
            x1="39"
            y1="61"
            x2="97"
            y2="61"
            stroke={isLit ? '#ffdb66' : '#2D2A26'}
            strokeWidth={isLit ? '2.5' : '1.2'}
            strokeLinecap="round"
          />

          {/* Interactive Hanging Pull-String */}
          <motion.line
            x1="54"
            y1="62"
            x2="54"
            y2={cordEndY}
            stroke={isLit ? '#E09F3E' : '#D5CBB8'}
            strokeWidth="1.8"
            strokeLinecap="round"
          />
          <motion.circle
            cx="54"
            cy={tasselY}
            r="6.5"
            fill={isLit ? '#ffbe0b' : '#E09F3E'}
            stroke="#121110"
            strokeWidth="1.5"
          />
        </svg>

        {/* Accessible Interactive Hit Target Over the Pull Cord & Handle */}
        <button
          type="button"
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={finishPull}
          onPointerCancel={finishPull}
          onKeyDown={handleKeyDown}
          aria-pressed={isLit}
          aria-label={isLit ? 'Pull cord to turn off lamp' : 'Pull the string to turn on the lamp'}
          data-testid="lamp-pull-cord"
          className={`absolute left-[18%] top-[20%] w-[36%] h-[48%] rounded-full cursor-grab active:cursor-grabbing focus-visible:outline-2 focus-visible:outline-[#ffbe0b] ${
            isDragging ? 'cursor-grabbing' : ''
          }`}
        />

        {/* Subtle Pulsing Hint Near the Cord */}
        {!isLit && (
          <motion.div
            initial={{ opacity: 0, x: -4 }}
            animate={{ opacity: [0.55, 1, 0.55], y: [0, 3, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            className="pointer-events-none absolute left-[-56px] sm:left-[-72px] top-[128px] sm:top-[142px] text-right whitespace-nowrap"
          >
            <span className="text-[11px] sm:text-xs font-medium text-[#ffdb66] tracking-wide">
              Pull the string
            </span>
          </motion.div>
        )}
      </div>
    </div>
  );
}
