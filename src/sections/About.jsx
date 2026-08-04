import { motion } from 'framer-motion';
import { useInView, useCounter } from '../hooks/useInView';
import { stats } from '../data/resume';
import styles from './About.module.css';

function StatItem({ label, value, suffix, trigger }) {
  const count = useCounter(value, 1400, trigger);
  return (
    <div className={styles.stat}>
      <span className={styles.statNum}>{count}{suffix}</span>
      <span className={styles.statLabel}>{label}</span>
    </div>
  );
}

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.25, 1, 0.5, 1] } },
};
const stagger = { show: { transition: { staggerChildren: 0.12 } } };

export default function About() {
  const [ref, inView] = useInView();

  return (
    <section id="about" className={`section ${styles.about}`} ref={ref}>
      <div className="container">
        <motion.div
          className={styles.grid}
          variants={stagger}
          initial="hidden"
          animate={inView ? 'show' : 'hidden'}
        >
          {/* Text side */}
          <div className={styles.textSide}>
            <motion.p className="section-label" variants={fadeUp}>About</motion.p>
            <motion.h2 className={`section-title ${styles.heading}`} variants={fadeUp}>
              Securing systems,<br />
              <span className="highlight">protecting people.</span>
            </motion.h2>
            <motion.p className={styles.body} variants={fadeUp}>
              I'm an IT Infrastructure and Cybersecurity Engineer with a BSc in Software
              Engineering from HiLCoE (2021–2025). I specialize in Microsoft cloud environments,
              identity and access management, security operations, and network infrastructure —
              with hands-on experience defending real enterprise systems.
            </motion.p>
            <motion.p className={styles.body} variants={fadeUp}>
              Currently serving as IT Support Team Lead at MMCY, I oversee security monitoring,
              incident response, and cloud governance. I'm Azure-certified and Google
              Cybersecurity-certified, with a proven track record of keeping systems compliant,
              resilient, and breach-free.
            </motion.p>

            <motion.div className={styles.statsRow} variants={fadeUp}>
              {stats.map((s) => (
                <StatItem key={s.label} {...s} trigger={inView} />
              ))}
            </motion.div>
          </div>

          {/* Card side */}
          <motion.div className={styles.cardSide} variants={fadeUp}>
            <div className={`glass ${styles.card}`}>
              {[
                { icon: '🎓', title: 'BSc Software Engineering', sub: 'HiLCoE · 2021 – 2025' },
                { icon: '☁', title: 'Azure Fundamentals (AZ-900)', sub: 'Microsoft Certified · Dec 2025' },
                { icon: '🔒', title: 'Google Cybersecurity Professional', sub: 'Google · Feb 2024' },
                { icon: '⬡', title: 'IT Support Team Lead', sub: 'MMCY · Apr 2026 – Present' },
              ].map((row) => (
                <div key={row.title} className={styles.cardRow}>
                  <div className={styles.cardIcon}>{row.icon}</div>
                  <div>
                    <p className={styles.cardTitle}>{row.title}</p>
                    <p className={styles.cardSub}>{row.sub}</p>
                  </div>
                </div>
              ))}
            </div>
            {/* Decorative accent bar */}
            <div className={styles.accentBar} aria-hidden="true" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
