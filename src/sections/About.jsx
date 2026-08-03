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
              Designing with purpose,<br />
              <span className="highlight">building with precision.</span>
            </motion.h2>
            <motion.p className={styles.body} variants={fadeUp}>
              I'm a Software Engineering graduate from HiLCoE (BSc, 2021–2025) with hands-on
              experience spanning UI/UX design, frontend engineering, and IT infrastructure.
              I thrive at the intersection of design and code — turning user problems into
              polished digital experiences.
            </motion.p>
            <motion.p className={styles.body} variants={fadeUp}>
              Previously led end-to-end product development at Droga Consulting, owning everything
              from Figma wireframes to final deployment. I believe great products are built when
              design and engineering speak the same language.
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
                { icon: '✦', title: 'UI/UX + Frontend', sub: 'Figma · React · Responsive Design' },
                { icon: '☁', title: 'Azure Fundamentals', sub: 'AZ-900 Certified · Dec 2025' },
                { icon: '⬡', title: 'Google Cybersecurity', sub: 'Professional Cert · Feb 2024' },
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
