import test from 'node:test';
import assert from 'node:assert/strict';
import { clampCordPull, shouldToggleLamp } from './lampPhysics';

test('clampCordPull constrains upward or invalid drags to 0 and caps downward pull', () => {
  assert.equal(clampCordPull(-20), 0);
  assert.equal(clampCordPull(0), 0);
  assert.equal(clampCordPull(Number.NaN), 0);
  assert.equal(clampCordPull(24), 24);
  assert.equal(clampCordPull(140), 54);
});

test('shouldToggleLamp activates on clean tap or deliberate downward pull', () => {
  assert.equal(shouldToggleLamp(0, false), false);
  assert.equal(shouldToggleLamp(2, true), true);
  assert.equal(shouldToggleLamp(5, true), true);
  assert.equal(shouldToggleLamp(10, true), false);
  assert.equal(shouldToggleLamp(18, true), true);
  assert.equal(shouldToggleLamp(45, true), true);
});
