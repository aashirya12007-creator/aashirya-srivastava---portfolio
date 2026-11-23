const RIBBON_ITEMS = [
  'Frontend Development',
  'Data Cleaning',
  'Critical Thinking',
  'Design Thinking',
  'Leadership',
  'Teamwork',
];

export function MarqueeRibbon() {
  const repeated = [...RIBBON_ITEMS, ...RIBBON_ITEMS, ...RIBBON_ITEMS];

  return (
    <div
      aria-hidden="true"
      className="overflow-hidden border-b border-[rgba(242,236,225,0.1)] bg-[#171614] py-3.5 select-none"
    >
      <div className="animate-editorial-marquee flex items-center gap-8 text-xs md:text-sm text-[#B5ADA0] tracking-wide">
        {repeated.map((label, idx) => (
          <span key={`${label}-${idx}`} className="inline-flex items-center gap-8 whitespace-nowrap">
            <span>{label}</span>
            <span className="text-[#E09F3E]">·</span>
          </span>
        ))}
      </div>
    </div>
  );
}
