export type SkillCategory = 'all' | 'engineering' | 'thinking' | 'collaboration';

export interface SkillItem {
  id: string;
  title: string;
  category: Exclude<SkillCategory, 'all'>;
  categoryLabel: string;
  index: string;
  summary: string;
  practiceNote: string;
  focusAreas: string[];
  appliedExample: string;
}

export interface AcademicWorkItem {
  id: string;
  index: string;
  title: string;
  discipline: string;
  semester: string;
  summary: string;
  problemSolved: string;
  approach: string[];
  skillsApplied: string[];
}

export const PORTFOLIO_OWNER = {
  name: 'Aashirya Srivastava',
  shortName: 'Aashirya',
  rollNumber: '202510101150010',
  group: '31',
  year: 'Second Year',
  course: 'B.Tech CSE (DS + AI)',
  courseFull: 'B.Tech Computer Science & Engineering (Data Science + Artificial Intelligence)',
  university: 'Shri Ramswaroop Memorial University',
  universityShort: 'SRMU',
  email: 'aashirya12007@gmail.com',
  whatsappDisplay: '+91 8009375166',
  whatsappDigits: '918009375166',
  githubUrl: 'https://github.com',
  linkedinUrl: 'https://www.linkedin.com/in/aashirya-srivastava-a9819a428',
  portraitPath: '/assets/aistudio/IMG-20260415-WA0012_d1fe8d40.jpg',
  location: 'Lucknow Region · India',
} as const;

export const SKILLS_LEARNED: SkillItem[] = [
  {
    id: 'frontend-development',
    index: '01',
    title: 'Frontend Development',
    category: 'engineering',
    categoryLabel: 'Engineering & Data',
    summary:
      'Translating layout sketches and user flows into accessible, responsive web pages with clean semantic HTML, CSS systems, and interactive JavaScript.',
    practiceNote:
      'Focused on clarity of layout, keyboard navigation, form validation, and visual rhythm that feels natural on both laptop and phone screens.',
    focusAreas: [
      'Semantic HTML5 & Accessible Forms',
      'Responsive Grid & Flexbox Layouts',
      'React Components & Interactive State',
      'Client-Side Validation & Error Handling',
    ],
    appliedExample:
      'Designed and structured multi-section personal web pages with real-time input checks and clear visual feedback.',
  },
  {
    id: 'data-cleaning',
    index: '02',
    title: 'Data Cleaning',
    category: 'engineering',
    categoryLabel: 'Engineering & Data',
    summary:
      'Inspecting raw, inconsistent datasets to handle missing entries, standardize formatting, spot anomalies, and prepare reliable tables for analysis.',
    practiceNote:
      'Good models start with trustworthy inputs. I treat data hygiene as careful editorial work before jumping into visualization or algorithms.',
    focusAreas: [
      'Missing Value Imputation & Filtering',
      'Duplicate & Outlier Detection',
      'Schema & Date/String Normalization',
      'Exploratory Sanity Checks',
    ],
    appliedExample:
      'Cleaned messy CSV student and survey logs during coursework labs so summary statistics reflected reality rather than entry typos.',
  },
  {
    id: 'critical-thinking',
    index: '03',
    title: 'Critical Thinking',
    category: 'thinking',
    categoryLabel: 'Thinking & Design',
    summary:
      'Questioning assumptions, breaking complex problems into verifiable steps, and evaluating edge cases before committing to an implementation.',
    practiceNote:
      'Helps me debug calmly when code or data behaves unexpectedly—tracing root causes rather than guessing quick patches.',
    focusAreas: [
      'Root-Cause Debugging',
      'Trade-Off Analysis',
      'Edge-Case Verification',
      'Evidence-Based Reasoning',
    ],
    appliedExample:
      'Auditing form inputs and dataset joins systematically to catch silent formatting mismatches early.',
  },
  {
    id: 'design-thinking',
    index: '04',
    title: 'Design Thinking',
    category: 'thinking',
    categoryLabel: 'Thinking & Design',
    summary:
      'Approaching technical problems from the perspective of the person using the tool—iterating through empathy, sketching, prototyping, and testing.',
    practiceNote:
      'Balances engineering structure with human warmth so interfaces remain calm, readable, and effortless to navigate.',
    focusAreas: [
      'User Journey Mapping',
      'Rapid Wireframing & Iteration',
      'Information Hierarchy',
      'Readable Visual Pacing',
    ],
    appliedExample:
      'Refining contact and portfolio layouts around how visitors actually scan credentials and reach out.',
  },
  {
    id: 'leadership',
    index: '05',
    title: 'Leadership',
    category: 'collaboration',
    categoryLabel: 'Collaboration',
    summary:
      'Coordinating timelines, clarifying deliverables across peers, and stepping up to unblock group lab assignments when deadlines tighten.',
    practiceNote:
      'I believe leadership in student teams means listening first, keeping expectations clear, and sharing credit generously.',
    focusAreas: [
      'Milestone Planning',
      'Clear Task Ownership',
      'Constructive Review',
      'Calm Under Deadlines',
    ],
    appliedExample:
      'Organizing Group 31 study sprints and review checklists ahead of practical assessments at SRMU.',
  },
  {
    id: 'teamwork',
    index: '06',
    title: 'Teamwork',
    category: 'collaboration',
    categoryLabel: 'Collaboration',
    summary:
      'Working smoothly alongside classmates across coding, data preparation, and presentation tasks while adapting to different working styles.',
    practiceNote:
      'Strong academic projects happen when everyone understands how their piece fits into the shared whole.',
    focusAreas: [
      'Active Listening',
      'Pair Debugging',
      'Shared Documentation',
      'Reliable Follow-Through',
    ],
    appliedExample:
      'Collaborating with Group 31 peers to combine cleaned datasets with front-end presentation slides and live demos.',
  },
];

export const ACADEMIC_WORKS: AcademicWorkItem[] = [
  {
    id: 'survey-data-hygiene',
    index: '01',
    title: 'Student Survey Data Hygiene Notebook',
    discipline: 'Data Cleaning · Critical Thinking',
    semester: 'B.Tech Year 2 Lab Exploration',
    summary:
      'A structured workflow for turning raw, inconsistently formatted campus survey spreadsheets into clean, analysis-ready tables.',
    problemSolved:
      'Survey exports often arrive with mixed capitalization, blank responses, duplicate rows, and inconsistent phone or email entries that skew counts.',
    approach: [
      'Profiled column distributions to isolate malformed records and trailing whitespace.',
      'Standardized categorical labels and validated email/contact patterns cleanly.',
      'Documented every cleaning rule so results stayed transparent and reproducible.',
    ],
    skillsApplied: ['Data Cleaning', 'Critical Thinking'],
  },
  {
    id: 'human-first-interface',
    index: '02',
    title: 'Tactile Editorial Web Interface System',
    discipline: 'Frontend Development · Design Thinking',
    semester: 'Personal Studio Project',
    summary:
      'A dark-paper portfolio and contact system built without generic gradients, focusing on quiet typography, accessible forms, and tactile feedback.',
    problemSolved:
      'Many student portfolios rely on copy-pasted templates that obscure the person behind the work and leave contact forms unvalidated.',
    approach: [
      'Sketched an asymmetric editorial layout centered on clarity and authentic academic identity.',
      'Implemented strict email format verification, accessible inline error states, and WhatsApp handoff.',
      'Tested keyboard navigation and mobile readability across narrow viewports.',
    ],
    skillsApplied: ['Frontend Development', 'Design Thinking'],
  },
  {
    id: 'group-31-study-sprint',
    index: '03',
    title: 'Group 31 Collaborative Lab Framework',
    discipline: 'Leadership · Teamwork',
    semester: 'SRMU Group 31 Initiative',
    summary:
      'A lightweight shared checklist and peer-review habit helping classmates organize lab submissions, debug together, and review concepts calmly.',
    problemSolved:
      'Last-minute lab submissions often suffer from fragmented files and unclear division of responsibilities across team members.',
    approach: [
      'Broke practical assignments into clear data, code, and presentation checkpoints.',
      'Paired teammates on debugging bottlenecks so nobody got stuck alone before viva reviews.',
      'Maintained concise notes summarizing key takeaways after each practical.',
    ],
    skillsApplied: ['Leadership', 'Teamwork'],
  },
];
