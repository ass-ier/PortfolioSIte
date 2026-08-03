import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from '../hooks/useInView';
import { experience } from '../data/resume';
import styles from './Experience.module.css';

const typeColors = {
  current: 'brand',
  design:  'accent',
  past:    'neutral',
};

export default function Experience() {
  const [ref, inView] = useInView();
  const [expanded, setExpanded] = useState('mmcy-lead');

  return (
    <section id="experience" className={`section ${styles.exp}`} ref={ref}>
      <div className="container">
        <motion.p
          className="section-label"
          initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5 }}
        >
          Experience
        </motion.p>
        <motion.h2
          className="section-title"
          initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          Where I've <span className="highlight">made an impact</span>
        </motion.h2>

        <div className={styles.layout}>
          {/* Tab list */}
          <div className={styles.tabs} role="tablist" aria-label="Experience tabs">
            {experience.map((e, i) => (
              <motion.button
                key={e.id}
                role="tab"
                aria-selected={expanded === e.id}
                aria-controls={`panel-${e.id}`}
                id={`tab-${e.id}`}
                className={`${styles.tab} ${expanded === e.id ? styles.tabActive : ''}`}
                onClick={() => setExpanded(e.id)}
                initial={{ opacity: 0, x: -16 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.45, delay: 0.15 + i * 0.07 }}
              >
                <span className={`${styles.tabDot} ${styles[`dot${typeColors[e.type]}`]}`} />
                <span className={styles.tabRole}>{e.role}</span>
                <span className={styles.tabCompany}>{e.company}</span>
              </motion.button>
            ))}
          </div>

          {/* Panel */}
          <div className={styles.panelWrap}>
            <AnimatePresence mode="wait">
              {experience.filter((e) => e.id === expanded).map((e) => (
                <motion.div
                  key={e.id}
                  id={`panel-${e.id}`}
                  role="tabpanel"
                  aria-labelledby={`tab-${e.id}`}
                  className={`glass ${styles.panel}`}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.35, ease: [0.25, 1, 0.5, 1] }}
                >
                  <div className={styles.panelHeader}>
                    <div>
                      <h3 className={styles.panelRole}>{e.role}</h3>
                      <p className={styles.panelCompany}>{e.company}</p>
                    </div>
                    <span className={styles.panelDate}>{e.period}</span>
                  </div>

                  <ul className={styles.highlights}>
                    {e.highlights.map((h, i) => (
                      <motion.li
                        key={i}
                        className={styles.highlight}
                        initial={{ opacity: 0, x: 12 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.06 }}
                      >
                        <span className={styles.arrow}>→</span>
                        {h}
                      </motion.li>
                    ))}
                  </ul>

                  {e.tags?.length > 0 && (
                    <div className={styles.tags}>
                      {e.tags.map((t) => <span key={t} className="tag">{t}</span>)}
                    </div>
                  )}
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
