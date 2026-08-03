export const experience = [
  {
    id: 'mmcy-lead',
    role: 'IT Support Team Lead',
    company: 'MMCY',
    period: 'Apr 2026 – Present',
    type: 'current',
    highlights: [
      'Lead and mentor IT support staff while overseeing daily operations, incident management, and escalations to ensure system reliability and SLA compliance.',
      'Drive security and cloud operations by strengthening monitoring, incident response, and access control practices.',
      'Manage identity and access, support cloud environments, and collaborate with cross-functional teams to resolve issues and maintain secure, high-performing IT systems.',
    ],
    tags: ['Azure', 'Entra ID', 'SIEM', 'Incident Response'],
  },
  {
    id: 'mmcy-spec',
    role: 'IT Support Specialist',
    company: 'MMCY',
    period: 'Oct 2025 – Apr 2026',
    type: 'past',
    highlights: [
      'Managed user onboarding/offboarding, identity access, and security controls in Active Directory and M365, enforcing password policies and MFA.',
      'Delivered end-user and infrastructure support through a ticketing system, conducting root cause troubleshooting for hardware, software, and network issues.',
      'Monitored and responded to alerts from firewall and end-user devices, identifying security and performance issues.',
    ],
    tags: ['Active Directory', 'M365', 'MFA', 'Networking'],
  },
  {
    id: 'droga',
    role: 'UI/UX Designer / Frontend Engineer',
    company: 'Droga Consulting',
    period: 'Jun 2025 – Oct 2025',
    type: 'design',
    highlights: [
      'Led end-to-end product development from requirements gathering to final deployment for a client-facing web application.',
      'Designed intuitive user flows, wireframes, and high-fidelity UI prototypes using Figma.',
    ],
    tags: ['Figma', 'UI/UX', 'Frontend', 'Product Design'],
  },
  {
    id: 'mom',
    role: 'Junior Developer',
    company: 'FDRE Ministry of Mines',
    period: 'Feb 2022 – Jun 2022',
    type: 'past',
    highlights: [
      'Co-created Mineral Explorer, a web app showcasing Ethiopia\'s mineral resources across five geological zones.',
      'Integrated interactive geospatial maps for the Ethiopian Mineral Gallery and deployed a live on-premises solution.',
    ],
    tags: ['Web Dev', 'Geospatial', 'JavaScript'],
  },
];

export const projects = [
  {
    id: 'traffic',
    title: 'ML Optimized Traffic Control System',
    emoji: '🚦',
    period: 'Jun – Oct 2025',
    category: 'fullstack',
    featured: false,
    link: 'https://www.linkedin.com/feed/update/urn:li:activity:7403559510813958144/?lipi=urn%3Ali%3Apage%3Ad_flagship3_profile_view_base%3B3ChSHobqQlqn3OpvWMzb8Q%3D%3D',
    linkLabel: 'Demo on LinkedIn ↗',
    description:
      'Intelligent traffic control using PPO-based reinforcement learning to dynamically optimize signal timing. Built a React dashboard with heatmap visualization, live simulation monitoring, and manual signal override for operators.',
    tags: ['React', 'Python', 'Node.js', 'Redis', 'MongoDB', 'RL/ML'],
    highlights: [
      'PPO reinforcement learning model via Stable Baselines3',
      'Real-time distributed backend with Redis pub/sub',
      'React heatmap dashboard with live simulation feed',
      'SUMO traffic simulation via Python bridge',
    ],
  },
  {
    id: 'simba',
    title: 'Simba Tech Website',
    emoji: '🌐',
    period: 'Jun – Aug 2025',
    category: 'design',
    featured: true,
    badge: 'UI/UX · Frontend',
    link: 'https://simbatech-a7y6.vercel.app/',
    linkLabel: 'Live Site ↗',
    description:
      'Designed and developed a modern responsive corporate website. Led the full UI/UX lifecycle — research, wireframing, high-fidelity prototyping in Figma, and final coded delivery with optimized cross-device performance.',
    tags: ['Figma', 'HTML/CSS', 'JavaScript', 'Responsive Design'],
    highlights: [
      'End-to-end UI/UX ownership from research to deployment',
      'Wireframes and high-fidelity Figma prototypes',
      'Google Forms integration for lead capture',
      'Optimized for accessibility and Core Web Vitals',
    ],
  },
  {
    id: 'math-genius',
    title: 'Math Genius AI',
    emoji: '🏆',
    period: 'May 2025',
    category: 'ai',
    featured: true,
    badge: '2nd Place · GDG Hackathon',
    link: null,
    linkLabel: null,
    description:
      'AI-powered math tutoring platform with adaptive assessments built in 48 hours at GDG Innovision Hackathon. Increased user engagement by 25% and served 25+ beta testers with real-time progress tracking and zero security incidents.',
    tags: ['AI', 'Adaptive Learning', 'React', 'Auth'],
    highlights: [
      '25% increase in user engagement during demo',
      '25+ beta testers within 48-hour window',
      'Secure authentication with zero reported incidents',
      'Real-time progress tracking dashboard',
    ],
  },
  {
    id: 'disease',
    title: 'Disease Prediction System',
    emoji: '🧬',
    period: 'Aug – Sep 2024',
    category: 'ai',
    featured: false,
    link: 'https://diseasesprediction.vercel.app/',
    linkLabel: 'Live App ↗',
    description:
      'ML-based disease prediction for Diabetes, Heart Disease, and Parkinson\'s — achieving 85–90% accuracy on validation datasets. Modular training scripts reduced retraining time by 30% with sub-0.5s inference.',
    tags: ['Python', 'Scikit-Learn', 'SVM', 'NumPy', 'Pandas'],
    highlights: [
      '85–90% average accuracy across three diseases',
      'SVM models with Scikit-Learn',
      '30% reduction in model retraining time',
      '<0.5s average inference per case',
    ],
  },
];

export const skills = [
  {
    category: 'Design',
    icon: '✦',
    color: 'brand',
    items: ['Figma', 'Wireframing & Prototyping', 'High-Fidelity UI', 'User Flows', 'Usability Optimization', 'Design Systems', 'Information Architecture'],
  },
  {
    category: 'Frontend',
    icon: '◈',
    color: 'brand',
    items: ['HTML / CSS / JavaScript', 'React', 'Responsive Web Design', 'Accessibility (WCAG)', 'Performance Optimization', 'Framer Motion'],
  },
  {
    category: 'Backend & Data',
    icon: '⬡',
    color: 'neutral',
    items: ['Node.js', 'Python', 'MongoDB · Redis', 'REST APIs', 'ML / Scikit-Learn', 'Stable Baselines3'],
  },
  {
    category: 'Cloud & Security',
    icon: '◎',
    color: 'neutral',
    items: ['Microsoft Azure (AZ-900)', 'Entra ID / Active Directory', 'SIEM Monitoring', 'Firewall Configuration', 'IAM · MFA · PowerShell', 'ISO 27001'],
  },
];

export const certifications = [
  {
    id: 'az900',
    title: 'AZ-900 Microsoft Azure Fundamentals',
    issuer: 'Microsoft',
    date: 'Dec 2025',
    color: 'brand',
    link: 'https://learn.microsoft.com/en-gb/users/assierantenehalemu-8808/credentials/cf0cc3251d0c6136?ref=https%3A%2F%2Fwww.linkedin.com%2F',
  },
  {
    id: 'google-cyber',
    title: 'Google Cybersecurity Professional',
    issuer: 'Google',
    date: 'Feb 2024',
    color: 'accent',
    link: 'https://www.credly.com/badges/6c1625e0-6fa1-42fc-9e79-3895c214c0d6/linked_in_profile',
  },
  {
    id: 'gdg',
    title: '2nd Place — GDG Innovision Hackathon',
    issuer: 'HiLCoE GDG',
    date: 'May 2025',
    color: 'accent',
    link: null,
  },
  {
    id: 'solveit',
    title: '3rd Place — SolveIT 2019 Regional Innovation',
    issuer: 'Regional',
    date: '2019',
    color: 'neutral',
    link: null,
  },
];

export const stats = [
  { label: 'Years Experience', value: 4, suffix: '+' },
  { label: 'Projects Shipped', value: 6, suffix: '' },
  { label: 'Hackathon Wins', value: 2, suffix: '' },
  { label: 'Accuracy (Disease ML)', value: 90, suffix: '%' },
];
