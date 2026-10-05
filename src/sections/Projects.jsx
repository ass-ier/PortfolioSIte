import { useRef, useState } from 'react';
import { motion as Motion, useScroll, useTransform } from 'framer-motion';
import Arrow from '../components/Arrow';
import Dialog from '../components/Dialog';
import ProjectStudy from '../components/ProjectStudy';
import useMediaQuery from '../hooks/useMediaQuery';
import usePointerTilt from '../hooks/usePointerTilt';
import { projects } from '../data/resume';
import styles from './Projects.module.css';

const featured = projects.filter((project) => project.showcase);
const additional = projects.filter((project) => !project.showcase);

function ProjectImage({ project, className = '', lazy = false }) {
  return (
    <img
      className={className}
      src={project.image}
      srcSet={project.imageSmall ? `${project.imageSmall} 800w, ${project.image} 1440w` : undefined}
      sizes="(max-width: 760px) 90vw, 65vw"
      alt={project.imageAlt}
      width="1440"
      height="1000"
      loading={lazy ? 'lazy' : 'eager'}
      decoding="async"
    />
  );
}

function ProjectLink({ project, className }) {
  if (!project.link) return null;

  return (
    <a className={className} href={project.link} target="_blank" rel="noopener noreferrer">
      {project.linkLabel?.replace(/\s*[↗→]\s*$/u, '') || 'Open project'} <Arrow />
      <span className="visually-hidden"> (opens in a new tab)</span>
    </a>
  );
}

function ProjectDetails({ project, onClose }) {
  return (
    <Dialog labelledBy={`detail-${project.id}`} onDismiss={onClose} className={styles.projectDialog}>
      <div className={styles.detailContent}>
        <div className={styles.closeRow}>
          <span>{project.discipline || (project.category === 'ml' ? 'AI / Machine learning' : 'Systems / Engineering')}</span>
          <button className={styles.closeButton} onClick={onClose} aria-label="Close project details">
            Close
            <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="m6 6 12 12M6 18 18 6" stroke="currentColor" strokeWidth="1.5" /></svg>
          </button>
        </div>
        <div className={styles.detailBody}>
          <h2 id={`detail-${project.id}`} className={styles.detailTitle}>{project.title}</h2>
          <div className={styles.detailMeta}>
            {project.period && <span>{project.period}</span>}
            {project.status && <span>{project.status}</span>}
            {project.badge && <span>{project.badge}</span>}
          </div>
          <p className={styles.detailDescription}>{project.description}</p>
          {(project.image || project.study) && (
            <figure className={styles.detailFigure}>
              {project.image ? <ProjectImage project={project} /> : (
                <div className={styles.studyCanvas} data-study={project.study}>
                  <ProjectStudy kind={project.study} />
                </div>
              )}
              <figcaption>{project.caption || project.studyCaption}</figcaption>
            </figure>
          )}
          <div className={styles.detailColumns}>
            <div>
              <h3>What went into it</h3>
              <ul className={styles.highlights}>
                {project.highlights.map((highlight) => <li key={highlight}>{highlight}</li>)}
              </ul>
            </div>
            <div>
              <h3>The toolkit</h3>
              <ul className={styles.toolkit}>
                {project.tags.map((tag) => <li key={tag}>{tag}</li>)}
              </ul>
            </div>
          </div>
          {project.detailImage && (
            <figure className={styles.detailFigure}>
              <img src={project.detailImage} width="1440" height="1150" alt={project.detailImageAlt} loading="lazy" />
              <figcaption>Inside an investigation: synthetic evidence connected to the rule that triggered it.</figcaption>
            </figure>
          )}
          {(project.link || project.repository || project.notice) && (
            <div className={styles.detailActions}>
              <ProjectLink project={project} className="round-link" />
              {project.repository && (
                <a className="text-link" href={project.repository} target="_blank" rel="noopener noreferrer">
                  View source <Arrow /><span className="visually-hidden"> (opens in a new tab)</span>
                </a>
              )}
              {project.notice && <p className={styles.localNotice}>{project.notice}</p>}
            </div>
          )}
        </div>
      </div>
    </Dialog>
  );
}

function ProjectScene({ project, onOpen }) {
  const ref = useRef(null);
  const reducedMotion = useMediaQuery('(prefers-reduced-motion: reduce)');
  const tilt = usePointerTilt(7);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const rotate = useTransform(scrollYProgress, [0, 0.5, 1], [-5, 0, 2]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.82, 1, 1.035]);
  const y = useTransform(scrollYProgress, [0, 0.5, 1], [72, 0, -42]);
  const wordX = useTransform(scrollYProgress, [0, 1], ['12%', '-12%']);
  const clipPath = useTransform(scrollYProgress, [0, 0.42], ['inset(14% 8% 14% 8%)', 'inset(0% 0% 0% 0%)']);

  return (
    <article ref={ref} className={styles.sceneTrack} aria-labelledby={`project-${project.id}`} data-project-scene={project.id}>
      <div className={styles.scene}>
        <div className={styles.projectCopy}>
          <h3 id={`project-${project.id}`}>{project.title}</h3>
          <p className={styles.discipline}>{project.discipline}</p>
          <p className={styles.projectSummary}>{project.summary}</p>
          <p className={styles.introduction}>{project.introduction}</p>
          {(project.period || project.badge) && (
            <p className={styles.projectMeta}>
              {project.period && <span>{project.period}</span>}
              {project.badge && <span>{project.badge}</span>}
            </p>
          )}
          <p className={styles.projectStatus}><span aria-hidden="true" />{project.status}</p>
          <button className={styles.detailLink} onClick={() => onOpen(project)}>
            Explore project <Arrow /><span className="visually-hidden">: {project.title}</span>
          </button>
          <ProjectLink project={project} className={styles.liveLink} />
        </div>
        <figure className={styles.projectFigure}>
          <button
            className={styles.visual}
            data-tone={project.visualTone}
            onClick={() => onOpen(project)}
            onPointerMove={tilt.onPointerMove}
            onPointerLeave={tilt.onPointerLeave}
            onBlur={tilt.onBlur}
            aria-label={`View ${project.title} project details`}
          >
            <Motion.span className={styles.sceneWord} style={reducedMotion ? undefined : { x: wordX }} aria-hidden="true">{project.title}</Motion.span>
            <span className={styles.visualTitle}>{project.visualTitle}</span>
            <Motion.div className={styles.screenDepth} style={tilt.style} data-project-depth={project.id}>
              <Motion.div className={styles.screen} style={reducedMotion ? undefined : { rotate, scale, y, clipPath }}>
                {project.image ? <ProjectImage project={project} lazy /> : (
                  <div className={styles.studyCanvas} data-study={project.study}>
                    <ProjectStudy kind={project.study} />
                  </div>
                )}
                <span className={styles.screenReflection} aria-hidden="true" />
              </Motion.div>
            </Motion.div>
            <span className={styles.visualFooter}>
              <span>{project.visualLabel}</span>
              <span className={styles.visualAction}><span className={styles.visualHint} aria-hidden="true">Open project</span><span className={styles.visualArrow}><Arrow /></span></span>
            </span>
          </button>
          <figcaption>{project.caption || project.studyCaption}</figcaption>
        </figure>
      </div>
    </article>
  );
}

export default function Projects() {
  const [selected, setSelected] = useState(null);
  const [expanded, setExpanded] = useState(false);

  return (
    <section id="projects" className={styles.projects} tabIndex={-1} aria-labelledby="projects-heading">
      <div className="container">
        <div className={styles.heading}>
          <h2 id="projects-heading" className="section-title">A few things<br />I&apos;ve built.</h2>
          <p>Selected projects. Different problems.<br />The same curiosity about how things work.</p>
        </div>
        {featured.map((project) => <ProjectScene key={project.id} project={project} onOpen={setSelected} />)}
        <div className={styles.disclosure}>
          <button
            type="button"
            className={`${styles.detailLink} ${styles.moreButton}`}
            aria-expanded={expanded}
            aria-controls="more-projects"
            onClick={() => setExpanded((value) => !value)}
          >
            {expanded ? 'Show fewer projects' : 'Explore more projects'}
            <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="m6 9 6 6 6-6" stroke="currentColor" strokeWidth="1.5" />
            </svg>
          </button>
        </div>
        <div id="more-projects" className={styles.moreProjects} hidden={!expanded}>
          {expanded && additional.map((project) => <ProjectScene key={project.id} project={project} onOpen={setSelected} />)}
        </div>
      </div>
      {selected && <ProjectDetails project={selected} onClose={() => setSelected(null)} />}
    </section>
  );
}
