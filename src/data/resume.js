export const experience = [
  {
    id: 'mmcy-lead',
    role: 'IT Support Team Lead',
    company: 'MMCY',
    period: 'Apr 2026 – Present',
    type: 'current',
    highlights: [
      'Lead and mentor IT support staff, overseeing daily operations, incident management, and escalations to ensure system reliability and SLA compliance across the organization.',
      'Strengthen security posture through SIEM monitoring, firewall policy enforcement, access control reviews, and incident response coordination.',
      'Manage Microsoft Entra ID and Azure environments — administering identity lifecycle, conditional access policies, MFA enforcement, and cloud resource governance.',
      'Collaborate with cross-functional teams to resolve infrastructure issues, implement security improvements, and maintain ISO 27001-aligned IT operations.',
    ],
    tags: ['Azure', 'Entra ID', 'SIEM', 'Incident Response', 'ISO 27001', 'Firewall'],
  },
  {
    id: 'mmcy-spec',
    role: 'IT Support Specialist',
    company: 'MMCY',
    period: 'Oct 2025 – Apr 2026',
    type: 'past',
    highlights: [
      'Managed full user lifecycle in Active Directory and Microsoft 365 — onboarding, offboarding, group policy, password policies, and MFA enforcement.',
      'Delivered infrastructure and end-user support via ticketing system; performed root cause analysis on hardware, software, and network incidents using ping, traceroute, nslookup.',
      'Monitored firewall alerts and endpoint security events, identifying and escalating threats, anomalies, and performance degradation.',
      'Assisted with patch management, Windows Server administration, and backup and recovery procedures.',
    ],
    tags: ['Active Directory', 'M365', 'MFA', 'TCP/IP', 'DNS', 'DHCP', 'Patch Management'],
  },
  {
    id: 'droga',
    role: 'UI/UX Designer / Frontend Engineer',
    company: 'Droga Consulting',
    period: 'Jun 2025 – Oct 2025',
    type: 'past',
    highlights: [
      'Led end-to-end product development for a client-facing web application, from requirements gathering through deployment.',
      'Designed user flows and high-fidelity prototypes; implemented the frontend with responsive web standards.',
    ],
    tags: ['Web Development', 'JavaScript', 'Responsive Design'],
  },
  {
    id: 'mom',
    role: 'Junior Developer',
    company: 'FDRE Ministry of Mines',
    period: 'Feb 2022 – Jun 2022',
    type: 'past',
    highlights: [
      'Co-created Mineral Explorer, a web application showcasing Ethiopia\'s mineral resources across five geological zones for the Ethiopian Mineral Gallery.',
      'Deployed a live on-premises solution with interactive geospatial maps — still in active use at the Gallery.',
    ],
    tags: ['Web Dev', 'On-Premises Deployment', 'JavaScript'],
  },
];

export const projects = [
  {
    id: 'traffic',
    title: 'ML Optimized Traffic Control System',
    emoji: '🚦',
    period: 'Jun – Oct 2025',
    category: 'infra',
    featured: true,
    badge: 'Distributed Systems',
    link: 'https://www.linkedin.com/feed/update/urn:li:activity:7403559510813958144/?lipi=urn%3Ali%3Apage%3Ad_flagship3_profile_view_base%3B3ChSHobqQlqn3OpvWMzb8Q%3D%3D',
    linkLabel: 'Demo on LinkedIn ↗',
    description:
      'Built a distributed, real-time traffic infrastructure system using PPO reinforcement learning. Engineered the backend with Node.js, Redis pub/sub, and MongoDB for low-latency coordination between multiple intersections. Includes emergency vehicle prioritization and real-time monitoring.',
    tags: ['Node.js', 'Redis', 'MongoDB', 'Python', 'Distributed Systems', 'Real-Time'],
    highlights: [
      'Real-time distributed backend with Redis pub/sub across multiple nodes',
      'Emergency vehicle prioritization and intersection coordination logic',
      'Live monitoring and logging infrastructure for system observability',
      'SUMO simulation integration via Python bridge for realistic testing',
    ],
  },
  {
    id: 'disease',
    title: 'Disease Prediction System',
    emoji: '🧬',
    period: 'Aug – Sep 2024',
    category: 'ml',
    featured: false,
    link: 'https://diseasesprediction.vercel.app/',
    linkLabel: 'Live App ↗',
    description:
      'ML-based disease prediction for Diabetes, Heart Disease, and Parkinson\'s — 85–90% accuracy on validation datasets. Modular training pipeline reduced retraining time by 30% with sub-0.5s inference per case.',
    tags: ['Python', 'Scikit-Learn', 'SVM', 'NumPy', 'Pandas'],
    highlights: [
      '85–90% average accuracy across three disease classifiers',
      'SVM models trained with Scikit-Learn',
      '30% reduction in model retraining time via modular scripts',
      '<0.5s average inference per case',
    ],
  },
  {
    id: 'math-genius',
    title: 'Math Genius AI — Secure Platform',
    emoji: '🏆',
    period: 'May 2025',
    category: 'ml',
    featured: true,
    badge: '2nd Place · GDG Hackathon',
    link: null,
    linkLabel: null,
    description:
      'Built in 48 hours at GDG Innovision Hackathon. Delivered secure authentication with zero reported incidents during the event, real-time progress tracking for 25+ beta testers, and adaptive AI-driven assessments — all under a tight deployment window.',
    tags: ['Secure Auth', 'AI', 'Real-Time', 'React'],
    highlights: [
      'Secure authentication with zero reported incidents during the event',
      '25+ beta testers onboarded within 48-hour window',
      'Real-time progress tracking and adaptive AI assessment engine',
      '25% increase in measured user engagement during demo',
    ],
  },
  {
    id: 'solveit',
    title: 'Automated Answer Sheet Grading System',
    emoji: '📷',
    period: 'Feb – Jun 2019',
    category: 'infra',
    featured: false,
    badge: '3rd Place · SolveIT 2019',
    link: null,
    linkLabel: null,
    description:
      'Real-time automated grading system using OpenCV and JavaScript, processing 28 FPS on live camera input. Achieved 95%+ accuracy in answer sheet detection via contour detection and adaptive thresholding — cutting grading time by 70% vs. manual.',
    tags: ['OpenCV', 'JavaScript', 'Computer Vision', 'Real-Time'],
    highlights: [
      '28 FPS live camera processing with OpenCV',
      '95%+ detection accuracy via adaptive thresholding',
      '70% reduction in grading time compared to manual processes',
      'Contour detection pipeline for robust sheet alignment',
    ],
  },
];

export const skills = [
  {
    category: 'Cloud & Identity',
    icon: '☁',
    color: 'brand',
    items: [
      'Microsoft Azure (AZ-900)',
      'Microsoft Entra ID',
      'Active Directory DS',
      'Conditional Access & MFA',
      'IAM & RBAC',
      'M365 Administration',
    ],
  },
  {
    category: 'Security Operations',
    icon: '⬡',
    color: 'brand',
    items: [
      'SIEM Monitoring',
      'Firewall Configuration & Monitoring',
      'Endpoint Security',
      'Incident Response',
      'Log Analysis',
      'ISO 27001 Compliance',
    ],
  },
  {
    category: 'Networking & Infra',
    icon: '◎',
    color: 'neutral',
    items: [
      'TCP/IP · DNS · DHCP',
      'VPN Configuration',
      'Network Diagnostics',
      'Windows Server Admin',
      'Patch Management',
      'Backup & Recovery',
    ],
  },
  {
    category: 'Scripting & Systems',
    icon: '◈',
    color: 'neutral',
    items: [
      'PowerShell',
      'Python',
      'Bash / CLI',
      'IT Operations',
      'System Monitoring',
      'Ticketing Systems',
    ],
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
  { label: 'Years in IT', value: 2, suffix: '+' },
  { label: 'Users Managed', value: 200, suffix: '+' },
  { label: 'Incidents Resolved', value: 500, suffix: '+' },
  { label: 'Uptime SLA', value: 99, suffix: '%' },
];
