import test from 'node:test';
import assert from 'node:assert/strict';
import { createFragmentShards } from './fragmentGrid';

test('createFragmentShards returns gridSize^2 deterministic fragments covering 0..100%', () => {
  const shards = createFragmentShards(7);
  assert.equal(shards.length, 49);

  const first = shards[0];
  assert.equal(first.row, 0);
  assert.equal(first.col, 0);
  assert.equal(first.leftPct, 0);
  assert.equal(first.topPct, 0);
  assert.ok(first.tx < 0);
  assert.ok(first.ty < 0);

  const last = shards[shards.length - 1];
  assert.equal(last.row, 6);
  assert.equal(last.col, 6);
  assert.ok(last.tx > 0);
  assert.ok(last.ty > 0);
});

test('createFragmentShards clamps invalid grid sizes cleanly', () => {
  assert.equal(createFragmentShards(1).length, 4);
  assert.equal(createFragmentShards(20).length, 100);
});
