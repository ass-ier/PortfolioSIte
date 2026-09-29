import styles from './ProjectStudy.module.css';

function TrafficStudy() {
  return (
    <>
      <path className={styles.road} d="M0 160h600M0 240h600M170 0v400M250 0v400M420 0v400M500 0v400" />
      <path className={styles.lane} d="M0 200h600M210 0v400M460 0v400" />
      <path className={styles.route} d="M40 200h170V80h250v240H330" />
      {[{ x: 210, y: 200 }, { x: 460, y: 200 }].map(({ x, y }) => (
        <g key={x}>
          <circle cx={x} cy={y} r="35" fill="var(--ink)" />
          <path d={`M${x - 13} ${y}h26M${x} ${y - 13}v26`} stroke="var(--paper)" strokeWidth="2" />
          <circle cx={x} cy={y} r="46" fill="none" stroke="currentColor" strokeWidth="1" />
        </g>
      ))}
      <rect x="286" y="50" width="100" height="60" fill="var(--paper)" stroke="currentColor" />
      <text x="336" y="86" textAnchor="middle">Redis</text>
      <text x="58" y="147">SUMO</text>
      <text x="320" y="360">Coordinated intersections</text>
      <circle cx="84" cy="200" r="7" fill="var(--orange-ink)" />
      <circle cx="460" cy="288" r="7" fill="var(--orange-ink)" />
    </>
  );
}

function LearningStudy() {
  return (
    <>
      <circle className={styles.orbit} cx="300" cy="195" r="142" />
      <circle className={styles.orbit} cx="300" cy="195" r="103" />
      <path className={styles.route} d="M164 230 300 65l136 165H164" />
      <circle cx="300" cy="65" r="22" fill="var(--ink)" />
      <circle cx="164" cy="230" r="22" fill="var(--paper)" stroke="currentColor" />
      <circle cx="436" cy="230" r="22" fill="var(--orange-ink)" />
      <text x="300" y="199" textAnchor="middle" className={styles.equation}>x + y</text>
      <text x="300" y="31" textAnchor="middle">Practice</text>
      <text x="104" y="273">Assess</text>
      <text x="410" y="273">Adapt</text>
      <text x="300" y="372" textAnchor="middle">Adaptive learning</text>
    </>
  );
}

function GradingStudy() {
  return (
    <>
      <path className={styles.brackets} d="M130 80V35h45M425 35h45v45M470 320v45h-45M175 365h-45v-45" />
      <g transform="rotate(-5 300 200)">
        <rect x="185" y="42" width="230" height="316" fill="var(--paper)" stroke="currentColor" />
        <path d="M211 70h100M211 84h70" stroke="currentColor" strokeWidth="3" />
        {Array.from({ length: 6 }, (_, row) => (
          <g key={row}>
            <text x="212" y={125 + row * 36} className={styles.rowNumber}>{row + 1}</text>
            {Array.from({ length: 4 }, (_, column) => (
              <circle key={column} cx={252 + column * 40} cy={119 + row * 36} r="8" stroke="currentColor" fill={column === row % 4 ? 'var(--ink)' : 'none'} />
            ))}
          </g>
        ))}
      </g>
      <path d="M112 188h376" stroke="var(--orange-ink)" strokeWidth="2" />
      <circle cx="112" cy="188" r="4" fill="var(--orange-ink)" />
      <circle cx="488" cy="188" r="4" fill="var(--orange-ink)" />
      <text x="300" y="394" textAnchor="middle">Contour detection</text>
    </>
  );
}

const studies = {
  traffic: { Artwork: TrafficStudy, label: 'Concept illustration of distributed intersection coordination through Redis.' },
  learning: { Artwork: LearningStudy, label: 'Concept illustration of practice, assessment, and adaptive learning.' },
  grading: { Artwork: GradingStudy, label: 'Concept illustration of an answer sheet and computer-vision detection.' },
};

export default function ProjectStudy({ kind }) {
  const study = studies[kind];
  if (!study) throw new Error(`Unknown project study: ${kind}`);
  const Artwork = study.Artwork;

  return (
    <svg className={styles.study} viewBox="0 0 600 420" role="img" aria-label={study.label}>
      <Artwork />
    </svg>
  );
}
