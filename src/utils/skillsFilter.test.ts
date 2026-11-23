import test from 'node:test';
import assert from 'node:assert/strict';
import { SKILLS_LEARNED } from '../data/portfolioData';
import { filterSkillsByCategory, getSkillCountByCategory } from './skillsFilter';

test('filterSkillsByCategory returns all 6 learned skills for "all"', () => {
  const all = filterSkillsByCategory(SKILLS_LEARNED, 'all');
  assert.equal(all.length, 6);
});

test('filterSkillsByCategory isolates each category accurately', () => {
  const engineering = filterSkillsByCategory(SKILLS_LEARNED, 'engineering');
  assert.deepEqual(
    engineering.map((s) => s.title),
    ['Frontend Development', 'Data Cleaning'],
  );

  const thinking = filterSkillsByCategory(SKILLS_LEARNED, 'thinking');
  assert.deepEqual(
    thinking.map((s) => s.title),
    ['Critical Thinking', 'Design Thinking'],
  );

  const collaboration = filterSkillsByCategory(SKILLS_LEARNED, 'collaboration');
  assert.deepEqual(
    collaboration.map((s) => s.title),
    ['Leadership', 'Teamwork'],
  );
});

test('getSkillCountByCategory matches filtered lengths', () => {
  assert.equal(getSkillCountByCategory(SKILLS_LEARNED, 'all'), 6);
  assert.equal(getSkillCountByCategory(SKILLS_LEARNED, 'engineering'), 2);
  assert.equal(getSkillCountByCategory(SKILLS_LEARNED, 'thinking'), 2);
  assert.equal(getSkillCountByCategory(SKILLS_LEARNED, 'collaboration'), 2);
});
