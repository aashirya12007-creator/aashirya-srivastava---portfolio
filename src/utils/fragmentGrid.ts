export interface FragmentShard {
  id: string;
  row: number;
  col: number;
  leftPct: number;
  topPct: number;
  sizePct: number;
  tx: number;
  ty: number;
  rotate: number;
  delay: number;
}

/**
 * Builds a deterministic grid of fragments over a circular mask so that
 * clicking triggers an outward radial disintegration into flying shards.
 */
export function createFragmentShards(gridSize = 7): FragmentShard[] {
  const safeSize = Math.max(2, Math.min(10, Math.floor(gridSize)));
  const cellPct = 100 / safeSize;
  const center = (safeSize - 1) / 2;
  const shards: FragmentShard[] = [];

  for (let row = 0; row < safeSize; row++) {
    for (let col = 0; col < safeSize; col++) {
      const dx = col - center;
      const dy = row - center;
      const dist = Math.hypot(dx, dy);

      // Deterministic pseudo-random jitter based on grid coordinates
      const hash = ((row * 31 + col * 17) % 13) - 6;
      const angle = Math.atan2(dy, dx) + hash * 0.045;
      const push = 95 + dist * 42 + Math.abs(hash) * 8;

      const tx = Math.round(Math.cos(angle) * push);
      const ty = Math.round(Math.sin(angle) * push + 16);
      const rotate = ((row + col) % 2 === 0 ? 1 : -1) * (18 + Math.abs(hash) * 7);

      // Outer edge shards peel away slightly ahead of center shards
      const normalizedDist = center > 0 ? dist / (center * Math.SQRT2) : 0;
      const delay = Number(((1 - normalizedDist) * 0.16 + (Math.abs(hash) % 4) * 0.02).toFixed(3));

      shards.push({
        id: `shard-${row}-${col}`,
        row,
        col,
        leftPct: col * cellPct,
        topPct: row * cellPct,
        sizePct: cellPct + 0.6,
        tx,
        ty,
        rotate,
        delay,
      });
    }
  }

  return shards;
}
