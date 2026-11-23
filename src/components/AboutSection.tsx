import { useState } from 'react';
import { Check, Copy, ArrowUpRight } from 'lucide-react';
import { motion } from 'motion/react';
import { PORTFOLIO_OWNER } from '../data/portfolioData';

export function AboutSection() {
  const [copiedEmail, setCopiedEmail] = useState(false);

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(PORTFOLIO_OWNER.email);
      setCopiedEmail(true);
      window.setTimeout(() => setCopiedEmail(false), 2000);
    } catch {
      setCopiedEmail(false);
    }
  };

  return (
    <section
      id="about"
      className="py-16 md:py-24 border-b border-[rgba(242,236,225,0.1)]"
    >
      <div className="max-w-[1200px] mx-auto px-6 md:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          {/* Narrative Column */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-7"
          >
            <p className="text-xs font-medium text-[#E09F3E] tracking-wide mb-3">
              01. About Me
            </p>
            <h2
              className="font-display text-3xl md:text-4xl font-semibold text-[#F2ECE1] tracking-tight leading-[1.16] mb-6"
              style={{ textWrap: 'balance' }}
            >
              Curious about how clean data and human-centered design meet.
            </h2>

            <div className="space-y-4 text-[15px] md:text-base leading-[1.75] text-[#B5ADA0] max-w-[65ch]">
              <p>
                As a second-year student in {PORTFOLIO_OWNER.courseFull} at{' '}
                <span className="text-[#F2ECE1] font-medium">{PORTFOLIO_OWNER.university}</span>, I
                spend my time learning how technical rigor and everyday clarity reinforce each
                other. Whether I am organizing messy raw datasets or building interactive web
                pages, my goal is the same: make the underlying structure dependable and the surface
                effortless to read.
              </p>
              <p>
                Inside Group {PORTFOLIO_OWNER.group}, I enjoy stepping into collaborative lab
                assignments where critical thinking, design thinking, and steady teamwork turn
                early sketches into working solutions. Outside coursework, I continue refining my
                frontend craft—paying close attention to typography, form accessibility, and honest
                visual hierarchy.
              </p>
            </div>
          </motion.div>

          {/* Academic & Profile Folio Card */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            whileHover={{ y: -2 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5"
          >
            <div className="paper-card hover:border-[rgba(242,236,225,0.24)] transition-colors rounded-xl p-6 md:p-7">
              <h3 className="font-display text-lg font-semibold text-[#F2ECE1] mb-4">
                Academic &amp; Contact Record
              </h3>

              <dl className="divide-y divide-[rgba(242,236,225,0.1)] text-sm">
                <div className="py-3 px-2 -mx-2 rounded-md hover:bg-[#22201D]/60 transition-colors flex items-baseline justify-between gap-4">
                  <dt className="text-[#8C8478]">Student</dt>
                  <dd className="text-[#F2ECE1] font-medium text-right">
                    {PORTFOLIO_OWNER.name}
                  </dd>
                </div>

                <div className="py-3 px-2 -mx-2 rounded-md hover:bg-[#22201D]/60 transition-colors flex items-baseline justify-between gap-4">
                  <dt className="text-[#8C8478]">Roll Number</dt>
                  <dd className="text-[#E09F3E] font-mono-tabular text-right">
                    {PORTFOLIO_OWNER.rollNumber}
                  </dd>
                </div>

                <div className="py-3 px-2 -mx-2 rounded-md hover:bg-[#22201D]/60 transition-colors flex items-baseline justify-between gap-4">
                  <dt className="text-[#8C8478]">Program &amp; Year</dt>
                  <dd className="text-[#F2ECE1] text-right">
                    {PORTFOLIO_OWNER.course} · {PORTFOLIO_OWNER.year}
                  </dd>
                </div>

                <div className="py-3 px-2 -mx-2 rounded-md hover:bg-[#22201D]/60 transition-colors flex items-baseline justify-between gap-4">
                  <dt className="text-[#8C8478]">Group</dt>
                  <dd className="text-[#7FA68A] font-mono-tabular text-right">
                    Group {PORTFOLIO_OWNER.group}
                  </dd>
                </div>

                <div className="py-3 px-2 -mx-2 rounded-md hover:bg-[#22201D]/60 transition-colors flex items-center justify-between gap-4">
                  <dt className="text-[#8C8478]">Email</dt>
                  <dd className="flex items-center gap-2">
                    <a
                      href={`mailto:${PORTFOLIO_OWNER.email}`}
                      className="text-[#F2ECE1] hover:text-[#E09F3E] transition-colors truncate max-w-[200px]"
                    >
                      {PORTFOLIO_OWNER.email}
                    </a>
                    <motion.button
                      type="button"
                      onClick={handleCopyEmail}
                      whileHover={{ scale: 1.08 }}
                      whileTap={{ scale: 0.92 }}
                      aria-label="Copy email address"
                      className="p-1.5 rounded border border-[rgba(242,236,225,0.14)] text-[#B5ADA0] hover:text-[#E09F3E] hover:border-[#E09F3E]/50 transition-colors cursor-pointer"
                    >
                      {copiedEmail ? (
                        <Check className="w-3.5 h-3.5 text-[#7FA68A]" aria-hidden="true" />
                      ) : (
                        <Copy className="w-3.5 h-3.5" aria-hidden="true" />
                      )}
                    </motion.button>
                  </dd>
                </div>

                <div className="py-3 px-2 -mx-2 rounded-md hover:bg-[#22201D]/60 transition-colors flex items-baseline justify-between gap-4">
                  <dt className="text-[#8C8478]">WhatsApp</dt>
                  <dd className="font-mono-tabular text-[#F2ECE1] text-right">
                    {PORTFOLIO_OWNER.whatsappDisplay}
                  </dd>
                </div>

                <div className="pt-4 flex items-center justify-between gap-4">
                  <dt className="text-[#8C8478]">Profiles</dt>
                  <dd className="flex items-center gap-4">
                    <a
                      href={PORTFOLIO_OWNER.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group inline-flex items-center gap-1 text-[#F2ECE1] hover:text-[#E09F3E] transition-colors"
                    >
                      <span>GitHub</span>
                      <ArrowUpRight
                        className="w-3.5 h-3.5 transition-transform duration-150 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                        aria-hidden="true"
                      />
                    </a>
                    <a
                      href={PORTFOLIO_OWNER.linkedinUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group inline-flex items-center gap-1 text-[#F2ECE1] hover:text-[#E09F3E] transition-colors"
                    >
                      <span>LinkedIn</span>
                      <ArrowUpRight
                        className="w-3.5 h-3.5 transition-transform duration-150 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                        aria-hidden="true"
                      />
                    </a>
                  </dd>
                </div>
              </dl>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
