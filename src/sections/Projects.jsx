import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from '../hooks/useInView';
import { projects } from '../data/resume';
import styles from './Projects.module.css';

const FILTERS = ['all', 'design', 'fullstack', 'ai'];

function ProjectModal({ project, onClose }) {
  return (
    <motion.div
      className={styles.overlay}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={project.title}
    >
      <motion.div
        className={`glass ${styles.modal}`}
        initial={{ opacity: 0, scale: 0.9, y: 24 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 12 }}
        transition={{ duration: 0.3, ease: [0.25, 1, 0.5, 1] }}
        onClick={(e) => e.stopPropagation()}
      >
        <button className={styles.modalClose} onClick={onClose} aria-label="Close">✕</button>

        <div className={styles.modalHeader}>
          <span className={styles.modalEmoji}>{project.emoji}</span>
          {project.badge && <span className={styles.badge}>{project.badge}</span>}
        </div>
        <h3 className={styles.modalTitle}>{project.title}</h3>
        <p className={styles.modalDate}>{project.period}</p>
        <p className={styles.modalDesc}>{project.description}</p>

        <div className={styles.modalHighlights}>
          <p className={styles.modalSubhead}>Key highlights</p>
          <ul className={styles.highlightList}>
            {project.highlights.map((h, i) => (
              <motion.li
                key={i}
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.05 + i * 0.06 }}
              >
                <span className={styles.bullet}>◈</span>{h}
              </motion.li>
            ))}
          </ul>
        </div>

        <div className={styles.modalTags}>
          {project.tags.map((t) => <span key={t} className="tag">{t}</span>)}
        </div>

        {project.link && (
          <a
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.modalLink}
          >
            {project.linkLabel || 'View Project ↗'}
          </a>
        )}
      </motion.div>
    </motion.div>
  );
}

function ProjectCard({ project, index, inView, onOpen }) {
  return (
    <motion.article
      className={`glass ${styles.card} ${project.featured ? styles.cardFeatured : ''}`}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.55, delay: index * 0.08, ease: [0.25, 1, 0.5, 1] }}
      whileHover={{ y: -5, transition: { duration: 0.2 } }}
      onClick={() => onOpen(project)}
      role="button"
      tabIndex={0}
      aria-label={`Open details for ${project.title}`}
      onKeyDown={(e) => e.key === 'Enter' && onOpen(project)}
    >
      {/* Top shine on featured */}
      {project.featured && <div className={styles.shine} aria-hidden="true" />}

      <div className={styles.cardTop}>
        <span className={styles.emoji}>{project.emoji}</span>
        <span className={styles.period}>{project.period}</span>
      </div>

      {project.badge && <span className={styles.badge}>{project.badge}</span>}
      <h3 className={styles.cardTitle}>{project.title}</h3>
      <p className={styles.cardDesc}>{project.description}</p>

      <div className={styles.cardTags}>
        {project.tags.slice(0, 4).map((t) => <span key={t} className="tag">{t}</span>)}
        {project.tags.length > 4 && <span className="tag">+{project.tags.length - 4}</span>}
      </div>

      <div className={styles.viewMore}>
        {project.link ? 'View details & live link →' : 'View details →'}
      </div>
    </motion.article>
  );
}

export default function Projects() {
  const [ref, inView] = useInView();
  const [filter, setFilter] = useState('all');
  const [selected, setSelected] = useState(null);

  const filtered = filter === 'all' ? projects : projects.filter((p) => p.category === filter);

  return (
    <section id="projects" className={`section ${styles.projects}`} ref={ref}>
      <div className="container">
        <motion.p className="section-label"
          initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}}>
          Projects
        </motion.p>
        <motion.h2 className="section-title"
          initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.1 }}>
          Things I've <span className="highlight">built</span>
        </motion.h2>

        {/* Filter chips */}
        <motion.div
          className={styles.filters}
          initial={{ opacity: 0, y: 10 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.2 }}
          role="group"
          aria-label="Filter projects"
        >
          {FILTERS.map((f) => (
            <button
              key={f}
              className={`${styles.filter} ${filter === f ? styles.filterActive : ''}`}
              onClick={() => setFilter(f)}
              aria-pressed={filter === f}
            >
              {f === 'all' ? 'All' : f === 'design' ? 'Design' : f === 'fullstack' ? 'Full Stack' : 'AI / ML'}
            </button>
          ))}
        </motion.div>

        <motion.div className={styles.grid} layout>
          <AnimatePresence mode="popLayout">
            {filtered.map((p, i) => (
              <ProjectCard key={p.id} project={p} index={i} inView={inView} onOpen={setSelected} />
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      <AnimatePresence>
        {selected && <ProjectModal project={selected} onClose={() => setSelected(null)} />}
      </AnimatePresence>
    </section>
  );
}
