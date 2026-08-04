import { motion } from 'framer-motion';
import { useInView } from '../hooks/useInView';
import { skills, certifications } from '../data/resume';
import styles from './Skills.module.css';

function SkillGroup({ group, index, inView }) {
  return (
    <motion.div
      className={`glass ${styles.group}`}
      initial={{ opacity: 0, y: 28 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.55, delay: index * 0.1, ease: [0.25, 1, 0.5, 1] }}
      whileHover={{ y: -4, transition: { duration: 0.2 } }}
    >
      <div className={styles.groupHeader}>
        <span className={`${styles.icon} ${styles[`icon${group.color}`]}`}>{group.icon}</span>
        <h3 className={styles.groupTitle}>{group.category}</h3>
      </div>
      <ul className={styles.list}>
        {group.items.map((item, i) => (
          <motion.li
            key={item}
            className={styles.item}
            initial={{ opacity: 0, x: -10 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: index * 0.1 + i * 0.05 }}
          >
            <span className={styles.dot} />
            {item}
          </motion.li>
        ))}
      </ul>
    </motion.div>
  );
}

export default function Skills() {
  const [ref, inView] = useInView();

  return (
    <section id="skills" className={`section ${styles.skills}`} ref={ref}>
      <div className="container">
        <motion.p className="section-label"
          initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}}>
          Skills
        </motion.p>
        <motion.h2 className="section-title"
          initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.1 }}>
          My <span className="highlight">arsenal</span>
        </motion.h2>

        <div className={styles.grid}>
          {skills.map((g, i) => (
            <SkillGroup key={g.category} group={g} index={i} inView={inView} />
          ))}
        </div>

        {/* Certifications row */}
        <motion.div
          className={styles.certsWrap}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.5 }}
        >
          <p className={styles.certsLabel}>Certifications &amp; Awards</p>
          <div className={styles.certsRow}>
            {certifications.map((c, i) => (
              <motion.div
                key={c.id}
                className={`glass ${styles.cert}`}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={inView ? { opacity: 1, scale: 1 } : {}}
                transition={{ delay: 0.55 + i * 0.07 }}
                whileHover={{ y: -3, transition: { duration: 0.2 } }}
              >
                <div className={`${styles.certDot} ${styles[`certDot${c.color}`]}`} />
                <div className={styles.certBody}>
                  <p className={styles.certTitle}>{c.title}</p>
                  <p className={styles.certMeta}>{c.issuer} · {c.date}</p>
                  {c.link && (
                    <a
                      href={c.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={styles.certLink}
                      onClick={(e) => e.stopPropagation()}
                    >
                      Verify credential ↗
                    </a>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
