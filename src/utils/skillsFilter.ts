import type { SkillCategory, SkillItem } from '../data/portfolioData';

export function filterSkillsByCategory(
  skills: SkillItem[],
  category: SkillCategory,
): SkillItem[] {
  if (category === 'all') {
    return skills;
  }
  return skills.filter((skill) => skill.category === category);
}

export function getSkillCountByCategory(
  skills: SkillItem[],
  category: SkillCategory,
): number {
  return filterSkillsByCategory(skills, category).length;
}
