import { useEffect, useState } from 'react';
import { ArrowUpRight, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { ACADEMIC_WORKS, type AcademicWorkItem } from '../data/portfolioData';

export function WorkSection() {
  const [selectedWork, setSelectedWork] = useState<AcademicWorkItem | null>(null);

  useEffect(() => {
    if (!selectedWork) return;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setSelectedWork(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedWork]);

  return (
    <section
      id="work"
      className="py-16 md:py-24 border-b border-[rgba(242,236,225,0.1)]"
    >
      <div className="max-w-[1200px] mx-auto px-6 md:px-10">
        <div className="max-w-2xl mb-10">
          <p className="text-xs font-medium text-[#E09F3E] tracking-wide mb-3">
            03. Selected Explorations
          </p>
          <h2
            className="font-display text-3xl md:text-4xl font-semibold text-[#F2ECE1] tracking-tight leading-[1.16] mb-3"
            style={{ textWrap: 'balance' }}
          >
            How those skills come together in practice.
          </h2>
          <p className="text-sm md:text-base text-[#B5ADA0] leading-relaxed">
            A closer look at coursework workflows, frontend builds, and Group 31 collaborative
            methods. Select any notebook to read the full breakdown.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {ACADEMIC_WORKS.map((work) => (
            <motion.button
              key={work.id}
              type="button"
              onClick={() => setSelectedWork(work)}
              whileHover={{ y: -3 }}
              whileTap={{ scale: 0.99 }}
              transition={{ duration: 0.16, ease: [0.16, 1, 0.3, 1] }}
              className="group paper-card hover:border-[rgba(242,236,225,0.28)] rounded-xl p-6 text-left flex flex-col justify-between transition-colors duration-150 cursor-pointer"
            >
              <div>
                <div className="flex items-center justify-between gap-2 text-xs text-[#8C8478] mb-4">
                  <span className="font-mono-tabular text-[#E09F3E]">{work.index}</span>
                  <span>{work.semester}</span>
                </div>

                <h3 className="font-display text-xl font-semibold text-[#F2ECE1] group-hover:text-[#E09F3E] transition-colors mb-3 leading-snug">
                  {work.title}
                </h3>

                <p className="text-sm text-[#B5ADA0] leading-relaxed mb-5">{work.summary}</p>
              </div>

              <div className="pt-4 border-t border-[rgba(242,236,225,0.1)] flex items-center justify-between gap-3 text-xs">
                <span className="text-[#7FA68A]">{work.discipline}</span>
                <span className="inline-flex items-center gap-1 text-[#F2ECE1] group-hover:text-[#E09F3E] font-medium shrink-0 transition-colors">
                  <span>Read note</span>
                  <ArrowUpRight
                    className="w-3.5 h-3.5 transition-transform duration-150 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    aria-hidden="true"
                  />
                </span>
              </div>
            </motion.button>
          ))}
        </div>
      </div>

      {/* Accessible Detail Modal */}
      <AnimatePresence>
        {selectedWork && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.16 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-[#121110]/85 backdrop-blur-sm"
            onClick={() => setSelectedWork(null)}
          >
            <motion.div
              role="dialog"
              aria-modal="true"
              aria-labelledby="work-modal-title"
              initial={{ opacity: 0, y: 12, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 8, scale: 0.98 }}
              transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="paper-card-elevated rounded-xl max-w-xl w-full p-6 md:p-8 shadow-2xl"
            >
              <div className="flex items-start justify-between gap-4 mb-5">
                <div>
                  <p className="text-xs text-[#E09F3E] font-medium mb-1.5">
                    {selectedWork.index} · {selectedWork.semester}
                  </p>
                  <h3
                    id="work-modal-title"
                    className="font-display text-2xl font-semibold text-[#F2ECE1] leading-snug"
                  >
                    {selectedWork.title}
                  </h3>
                </div>
                <button
                  type="button"
                  onClick={() => setSelectedWork(null)}
                  aria-label="Close project note"
                  className="p-2 rounded-md border border-[rgba(242,236,225,0.16)] text-[#B5ADA0] hover:text-[#F2ECE1] hover:border-[#E09F3E] transition-colors cursor-pointer shrink-0"
                >
                  <X className="w-4 h-4" aria-hidden="true" />
                </button>
              </div>

              <div className="space-y-5 text-sm leading-relaxed">
                <div>
                  <p className="text-xs text-[#8C8478] mb-1.5">Problem Addressed</p>
                  <p className="text-[#F2ECE1]">{selectedWork.problemSolved}</p>
                </div>

                <div>
                  <p className="text-xs text-[#8C8478] mb-2">Structured Approach</p>
                  <ul className="space-y-2 text-[#B5ADA0]">
                    {selectedWork.approach.map((step, i) => (
                      <li key={step} className="flex items-start gap-3">
                        <span className="font-mono-tabular text-xs text-[#E09F3E] mt-0.5">
                          0{i + 1}
                        </span>
                        <span>{step}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-4 border-t border-[rgba(242,236,225,0.1)] flex flex-wrap items-center justify-between gap-4">
                  <p className="text-xs text-[#7FA68A]">
                    Skills Applied: {selectedWork.skillsApplied.join(' · ')}
                  </p>
                  <button
                    type="button"
                    onClick={() => setSelectedWork(null)}
                    className="px-4 py-2 text-xs font-semibold bg-[#E09F3E] text-[#121110] rounded-md hover:bg-[#e8ae54] transition-colors cursor-pointer"
                  >
                    Close
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
