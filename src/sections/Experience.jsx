import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion as Motion, useScroll } from 'framer-motion';
import useMediaQuery from '../hooks/useMediaQuery';
import { experience } from '../data/resume';
import styles from './Experience.module.css';

function CareerPreview({ job, reducedMotion }) {
  const year = job.period.match(/\b\d{4}\b/)[0];

  return (
    <div className={styles.careerPreview} data-career-preview={job.id} aria-hidden="true">
      <span className={styles.previewFrame} />
      <AnimatePresence initial={false} mode="popLayout">
        <Motion.div
          key={job.id}
          className={styles.previewContent}
          initial={reducedMotion ? false : { opacity: 0, y: 14, clipPath: 'inset(0% 0% 100% 0%)' }}
          animate={{ opacity: 1, y: 0, clipPath: 'inset(0% 0% 0% 0%)' }}
          exit={{ opacity: 0 }}
          transition={{ duration: reducedMotion ? 0 : 0.32, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className={styles.previewTop}><span className={styles.year}>{year}</span><span className={styles.previewMark}>↗</span></div>
          <p className={styles.previewCompany}>{job.company}</p>
          <p className={styles.previewRole}>{job.role}</p>
          <ul className={styles.focusAreas}>
            {job.tags.slice(0, 4).map((tag) => <li key={tag}>{tag}</li>)}
          </ul>
        </Motion.div>
      </AnimatePresence>
    </div>
  );
}

export default function Experience() {
  const ref = useRef(null);
  const [readingId, setReadingId] = useState(experience[0].id);
  const [hoveredId, setHoveredId] = useState(null);
  const [focusedId, setFocusedId] = useState(null);
  const reducedMotion = useMediaQuery('(prefers-reduced-motion: reduce)');
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start center', 'end center'] });
  const activeId = focusedId || hoveredId || readingId;
  const activeJob = experience.find((job) => job.id === activeId);

  useEffect(() => {
    const roles = [...ref.current.querySelectorAll('[data-career-role]')];
    let observer;

    function updateReadingRole(entries) {
      if (!entries.some((entry) => entry.isIntersecting)) return;
      const readingLine = window.innerHeight * 0.42;
      const positions = roles.map((element) => ({ element, bounds: element.getBoundingClientRect() }));
      const current = positions.find(({ bounds }) => bounds.top <= readingLine && bounds.bottom >= readingLine)
        || positions.reduce((nearest, role) => Math.abs(role.bounds.top - readingLine) < Math.abs(nearest.bounds.top - readingLine) ? role : nearest);
      setReadingId(current.element.dataset.careerRole);
      setFocusedId((id) => positions.some(({ element, bounds }) => element.dataset.careerRole === id && bounds.top < window.innerHeight && bounds.bottom > 0) ? id : null);
    }

    function observeRoles() {
      observer?.disconnect();
      const height = window.innerHeight;
      observer = new IntersectionObserver(updateReadingRole, {
        rootMargin: `-${height * 0.25}px 0px -${height * 0.4}px 0px`,
        threshold: [0, 0.25, 0.5, 0.75, 1],
      });
      roles.forEach((role) => observer.observe(role));
    }

    observeRoles();
    window.addEventListener('resize', observeRoles);
    return () => {
      observer.disconnect();
      window.removeEventListener('resize', observeRoles);
    };
  }, []);

  return (
    <section id="experience" className={`section ${styles.experience}`} ref={ref} tabIndex={-1} aria-labelledby="experience-heading">
      <div className={`container ${styles.layout}`}>
        <div className={styles.chapter}>
          <h2 id="experience-heading" className="section-title">Built through<br />experience.</h2>
          <p>From creating interfaces to supporting the infrastructure behind them.</p>
          <CareerPreview job={activeJob} reducedMotion={reducedMotion} />
          <nav className={styles.chapterNav} aria-label="Experience chapters">
            {experience.map((job, index) => (
              <a
                key={job.id}
                href={`#career-${job.id}`}
                aria-current={readingId === job.id ? 'step' : undefined}
                aria-label={`Jump to ${job.role} at ${job.company}`}
                title={`${job.role} at ${job.company}`}
                data-active={activeId === job.id}
              >
                <span>{String(index + 1).padStart(2, '0')}</span>
                <span className={styles.chapterSegment} aria-hidden="true" />
              </a>
            ))}
          </nav>
          <p className={styles.range}>2022 &mdash; Present <span>Follow the chapters</span></p>
          <div className={styles.chapterLine} aria-hidden="true">
            <Motion.span style={reducedMotion ? { scaleX: 1 } : { scaleX: scrollYProgress }} />
          </div>
        </div>
        <div className={styles.timelineWrap}>
          <div className={styles.timelineRail} aria-hidden="true"><Motion.span style={reducedMotion ? { scaleY: 1 } : { scaleY: scrollYProgress }} /></div>
          <ol className={styles.timeline}>
            {experience.map((job) => (
              <li
                id={`career-${job.id}`}
                className={styles.job}
                key={job.id}
                tabIndex={-1}
                data-career-role={job.id}
                data-active={activeId === job.id}
                onPointerEnter={(event) => {
                  if (event.pointerType === 'mouse') setHoveredId(job.id);
                }}
                onPointerLeave={() => setHoveredId(null)}
                onFocusCapture={(event) => setFocusedId(event.target.matches(':focus-visible') ? job.id : null)}
                onBlurCapture={(event) => {
                  if (!event.currentTarget.contains(event.relatedTarget)) setFocusedId(null);
                }}
              >
                <div className={styles.jobMeta}><span>{job.period}</span>{job.type === 'current' && <span className={styles.current}>Current role</span>}</div>
                <h3>{job.role}</h3>
                <p className={styles.company}>{job.company}</p>
                <p className={styles.summary}>{job.highlights[0]}</p>
                <details className={styles.details} open={job.type === 'current'}>
                  <summary>Role details <span aria-hidden="true" /></summary>
                  <ul>
                    {job.highlights.slice(1).map((highlight) => <li key={highlight}>{highlight}</li>)}
                  </ul>
                  <ul className={`tags ${styles.jobTags}`} aria-label={`${job.role} skills`}>
                    {job.tags.map((tag) => <li key={tag}>{tag}</li>)}
                  </ul>
                </details>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
