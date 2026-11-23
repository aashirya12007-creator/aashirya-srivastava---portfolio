export const MAX_CORD_PULL_PX = 54;
export const PULL_ACTIVATION_THRESHOLD_PX = 18;
export const TAP_MAX_MOVEMENT_PX = 6;

export function clampCordPull(rawDeltaY: number, maxPull = MAX_CORD_PULL_PX): number {
  if (!Number.isFinite(rawDeltaY) || rawDeltaY <= 0) {
    return 0;
  }
  return Math.min(rawDeltaY, maxPull);
}

export function shouldToggleLamp(maxDragDistance: number, wasPointerDownOnCord: boolean): boolean {
  if (!wasPointerDownOnCord) {
    return false;
  }
  // Toggle on either a deliberate downward pull (>= 18px) or a clean click/tap (< 6px movement)
  return maxDragDistance >= PULL_ACTIVATION_THRESHOLD_PX || maxDragDistance <= TAP_MAX_MOVEMENT_PX;
}
