import { useState } from 'react';
import { ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { SKILLS_LEARNED, type SkillCategory, type SkillItem } from '../data/portfolioData';
import { filterSkillsByCategory, getSkillCountByCategory } from '../utils/skillsFilter';

const CATEGORY_TABS: { id: SkillCategory; label: string }[] = [
  { id: 'all', label: 'All Skills' },
  { id: 'engineering', label: 'Engineering & Data' },
  { id: 'thinking', label: 'Thinking & Design' },
  { id: 'collaboration', label: 'Collaboration' },
];

export function SkillsSection() {
  const [activeCategory, setActiveCategory] = useState<SkillCategory>('all');
  const [selectedSkillId, setSelectedSkillId] = useState<string>(SKILLS_LEARNED[0].id);

  const visibleSkills = filterSkillsByCategory(SKILLS_LEARNED, activeCategory);
  const selectedSkill: SkillItem =
    visibleSkills.find((item) => item.id === selectedSkillId) ?? visibleSkills[0];

  const handleCategoryChange = (category: SkillCategory) => {
    setActiveCategory(category);
    const nextList = filterSkillsByCategory(SKILLS_LEARNED, category);
    if (nextList.length > 0 && !nextList.some((s) => s.id === selectedSkillId)) {
      setSelectedSkillId(nextList[0].id);
    }
  };

  return (
    <section
      id="skills"
      className="py-16 md:py-24 border-b border-[rgba(242,236,225,0.1)]"
    >
      <div className="max-w-[1200px] mx-auto px-6 md:px-10">
        {/* Section Header & Segmented Filter */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-10">
          <div className="max-w-lg">
            <p className="text-xs font-medium text-[#E09F3E] tracking-wide mb-3">
              02. Skills Learned
            </p>
            <h2
              className="font-display text-3xl md:text-4xl font-semibold text-[#F2ECE1] tracking-tight leading-[1.16]"
              style={{ textWrap: 'balance' }}
            >
              Capabilities shaped through coursework &amp; practice.
            </h2>
          </div>

          <div
            role="tablist"
            aria-label="Filter skills by category"
            className="inline-flex flex-wrap sm:flex-nowrap items-center gap-1 p-1 bg-[#1A1917] border border-[rgba(242,236,225,0.12)] rounded-lg self-start lg:self-auto shrink-0"
          >
            {CATEGORY_TABS.map((tab) => {
              const isSelected = activeCategory === tab.id;
              const count = getSkillCountByCategory(SKILLS_LEARNED, tab.id);
              return (
                <button
                  key={tab.id}
                  type="button"
                  role="tab"
                  aria-selected={isSelected}
                  onClick={() => handleCategoryChange(tab.id)}
                  className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors duration-150 whitespace-nowrap shrink-0 cursor-pointer ${
                    isSelected
                      ? 'bg-[#E09F3E] text-[#121110] font-semibold'
                      : 'text-[#B5ADA0] hover:text-[#F2ECE1]'
                  }`}
                >
                  {tab.label} ({count})
                </button>
              );
            })}
          </div>
        </div>

        {/* Interactive Skills Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
          {visibleSkills.map((skill) => {
            const isActive = selectedSkill?.id === skill.id;
            return (
              <motion.button
                key={skill.id}
                type="button"
                layout
                onClick={() => setSelectedSkillId(skill.id)}
                whileHover={{ y: -3 }}
                whileTap={{ scale: 0.99 }}
                transition={{ duration: 0.16, ease: [0.16, 1, 0.3, 1] }}
                aria-pressed={isActive}
                className={`group text-left rounded-xl p-6 transition-colors duration-150 cursor-pointer flex flex-col justify-between ${
                  isActive
                    ? 'paper-card-elevated border-[#E09F3E]/70'
                    : 'paper-card hover:border-[rgba(242,236,225,0.28)]'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between gap-4 mb-4 text-xs">
                    <span className="font-mono-tabular text-[#E09F3E]">{skill.index}</span>
                    <span className="text-[#8C8478]">{skill.categoryLabel}</span>
                  </div>

                  <h3 className="font-display text-xl font-semibold text-[#F2ECE1] group-hover:text-[#E09F3E] transition-colors mb-2.5">
                    {skill.title}
                  </h3>

                  <p className="text-sm leading-relaxed text-[#B5ADA0]">{skill.summary}</p>
                </div>

                <div className="mt-5 pt-3 border-t border-[rgba(242,236,225,0.09)] flex items-center justify-between text-xs">
                  <span className={isActive ? 'text-[#E09F3E] font-medium' : 'text-[#8C8478] group-hover:text-[#F2ECE1] transition-colors'}>
                    {isActive ? 'Inspecting practice notes' : 'Inspect practice notes'}
                  </span>
                  <ChevronRight
                    className={`w-4 h-4 transition-transform duration-150 ${
                      isActive
                        ? 'text-[#E09F3E] translate-x-0.5'
                        : 'text-[#8C8478] group-hover:text-[#E09F3E] group-hover:translate-x-1'
                    }`}
                    aria-hidden="true"
                  />
                </div>
              </motion.button>
            );
          })}
        </div>

        {/* Selected Skill Detail Workbench */}
        {selectedSkill && (
          <AnimatePresence mode="wait">
            <motion.div
              key={selectedSkill.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
              aria-live="polite"
              className="paper-card-elevated rounded-xl p-6 md:p-8"
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                <div className="lg:col-span-6">
                  <p className="text-xs text-[#7FA68A] font-medium mb-2">
                    Practice Focus · {selectedSkill.categoryLabel}
                  </p>
                  <h3 className="font-display text-2xl font-semibold text-[#F2ECE1] mb-3">
                    {selectedSkill.title}
                  </h3>
                  <p className="text-sm md:text-[15px] leading-[1.7] text-[#B5ADA0] mb-5">
                    {selectedSkill.practiceNote}
                  </p>
                  <div className="pt-4 border-t border-[rgba(242,236,225,0.1)]">
                    <p className="text-xs text-[#8C8478] mb-1">Classroom &amp; Studio Application</p>
                    <p className="text-sm text-[#F2ECE1] leading-relaxed">
                      {selectedSkill.appliedExample}
                    </p>
                  </div>
                </div>

                <div className="lg:col-span-6">
                  <p className="text-xs text-[#8C8478] mb-3">Key Habits &amp; Methods</p>
                  <ul className="divide-y divide-[rgba(242,236,225,0.1)]">
                    {selectedSkill.focusAreas.map((area, index) => (
                      <li
                        key={area}
                        className="py-3 px-2 -mx-2 rounded-md hover:bg-[#1A1917] transition-colors flex items-center justify-between gap-4 text-sm text-[#F2ECE1]"
                      >
                        <span>{area}</span>
                        <span className="font-mono-tabular text-xs text-[#8C8478]">
                          0{index + 1}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        )}
      </div>
    </section>
  );
}
