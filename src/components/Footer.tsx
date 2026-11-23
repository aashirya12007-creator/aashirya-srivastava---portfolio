import { ArrowUpRight } from 'lucide-react';
import { PORTFOLIO_OWNER } from '../data/portfolioData';
import { buildWhatsAppUrl } from '../utils/contactValidation';

interface FooterProps {
  onNavigate: (sectionId: string) => void;
}

export function Footer({ onNavigate }: FooterProps) {
  const whatsappUrl = buildWhatsAppUrl(PORTFOLIO_OWNER.whatsappDigits);

  return (
    <footer className="bg-[#121110] py-12 md:py-14">
      <div className="max-w-[1200px] mx-auto px-6 md:px-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pb-10 border-b border-[rgba(242,236,225,0.1)]">
          <div className="md:col-span-5">
            <p className="font-display text-xl font-semibold text-[#F2ECE1] mb-2">
              {PORTFOLIO_OWNER.name}
            </p>
            <p className="text-xs leading-relaxed text-[#B5ADA0] max-w-sm">
              {PORTFOLIO_OWNER.year} · {PORTFOLIO_OWNER.courseFull} · {PORTFOLIO_OWNER.university}
            </p>
            <p className="mt-2 font-mono-tabular text-xs text-[#8C8478]">
              Roll No. {PORTFOLIO_OWNER.rollNumber} · Group {PORTFOLIO_OWNER.group}
            </p>
          </div>

          <div className="md:col-span-3">
            <p className="text-xs font-medium text-[#8C8478] mb-3">Sections</p>
            <ul className="space-y-2 text-sm text-[#B5ADA0]">
              {['home', 'about', 'skills', 'work', 'contact'].map((sectionId) => (
                <li key={sectionId}>
                  <a
                    href={`#${sectionId}`}
                    onClick={(e) => {
                      e.preventDefault();
                      onNavigate(sectionId);
                    }}
                    className="capitalize hover:text-[#E09F3E] transition-colors"
                  >
                    {sectionId}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-4">
            <p className="text-xs font-medium text-[#8C8478] mb-3">Connect</p>
            <ul className="space-y-2 text-sm text-[#B5ADA0]">
              <li>
                <a
                  href={`mailto:${PORTFOLIO_OWNER.email}`}
                  className="hover:text-[#E09F3E] transition-colors"
                >
                  {PORTFOLIO_OWNER.email}
                </a>
              </li>
              <li>
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 hover:text-[#7FA68A] transition-colors"
                >
                  <span>WhatsApp ({PORTFOLIO_OWNER.whatsappDisplay})</span>
                  <ArrowUpRight className="w-3.5 h-3.5" aria-hidden="true" />
                </a>
              </li>
              <li>
                <a
                  href={PORTFOLIO_OWNER.linkedinUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 hover:text-[#E09F3E] transition-colors"
                >
                  <span>LinkedIn</span>
                  <ArrowUpRight className="w-3.5 h-3.5" aria-hidden="true" />
                </a>
              </li>
              <li>
                <a
                  href={PORTFOLIO_OWNER.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 hover:text-[#E09F3E] transition-colors"
                >
                  <span>GitHub</span>
                  <ArrowUpRight className="w-3.5 h-3.5" aria-hidden="true" />
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs text-[#8C8478]">
          <p>© {new Date().getFullYear()} {PORTFOLIO_OWNER.name}. Crafted with care.</p>
          <p>{PORTFOLIO_OWNER.universityShort} · Lucknow, India</p>
        </div>
      </div>
    </footer>
  );
}
