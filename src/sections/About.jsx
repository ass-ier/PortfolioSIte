import { useEffect, useLayoutEffect, useRef } from 'react';
import { animate, motion as Motion, useMotionValue, useScroll, useTransform } from 'framer-motion';
import Arrow from '../components/Arrow';
import PortraitImage from '../components/PortraitImage';
import useMediaQuery from '../hooks/useMediaQuery';
import useReplayInView from '../hooks/useReplayInView';
import { stats } from '../data/resume';
import styles from './About.module.css';

function AnimatedStat({ stat }) {
  const ref = useRef(null);
  const reducedMotion = useMediaQuery('(prefers-reduced-motion: reduce)');
  const inView = useReplayInView(ref, 0.6);
  const count = useMotionValue(0);
  const displayCount = useTransform(count, (value) => Math.floor(value));

  useEffect(() => {
    if (reducedMotion) {
      count.set(stat.value);
      return;
    }
    if (!inView) {
      count.set(0);
      return;
    }
    if (count.get() === stat.value) return;
    const animation = animate(count, stat.value, { duration: 1.5, ease: [0.22, 1, 0.36, 1] });
    return () => animation.stop();
  }, [count, inView, reducedMotion, stat.value]);

  return (
    <div ref={ref} data-stat={stat.label} data-stat-active={inView}>
      <dt>{stat.label}</dt>
      <dd>
        <span className="visually-hidden">{stat.value}{stat.suffix}</span>
        <span aria-hidden="true" data-stat-counter>
          {reducedMotion ? stat.value : <Motion.span>{displayCount}</Motion.span>}{stat.suffix}
        </span>
      </dd>
    </div>
  );
}

function ScrollStatement() {
  const track = useRef(null);
  const text = useRef(null);
  const reducedMotion = useMediaQuery('(prefers-reduced-motion: reduce)');
  const travel = useMotionValue(0);
  const { scrollYProgress } = useScroll({ target: text, offset: ['center 0.75', 'center 0.4'] });
  const x = useTransform([scrollYProgress, travel], ([progress, distance]) => progress * distance);

  useLayoutEffect(() => {
    const measure = () => travel.set(Math.min(0, track.current.clientWidth - text.current.scrollWidth));
    const observer = new ResizeObserver(measure);
    observer.observe(track.current);
    observer.observe(text.current);
    measure();
    return () => observer.disconnect();
  }, [travel]);

  return (
    <div ref={track} className={styles.typeTrack} aria-hidden="true" data-scroll-statement>
      <Motion.p ref={text} style={reducedMotion ? undefined : { x }}>Systems thinking. Human perspective.</Motion.p>
    </div>
  );
}

export default function About() {
  return (
    <section id="about" className={`section ${styles.about}`} tabIndex={-1} aria-labelledby="about-heading">
      <div className="container">
        <div className={styles.grid}>
          <figure className={styles.portrait}>
            <PortraitImage
              src="/images/assier-about-cutout-1080.jpg"
              srcSet="/images/assier-about-cutout-640.jpg 640w, /images/assier-about-cutout-1080.jpg 1080w"
              sizes="(max-width: 760px) 80vw, 38vw"
              width={1080}
              height={1350}
              alt="Assier Anteneh smiling with his arms crossed, in a monochrome portrait with an orange cutout surround."
            />
            <figcaption><span>Assier, beyond the screen.</span><span>Addis Ababa, Ethiopia</span></figcaption>
          </figure>
          <div className={styles.copy}>
            <h2 id="about-heading" className="section-title">Good systems<br />start with<br /><span>people.</span></h2>
            <p className={styles.lead}>I&apos;m Assier. I work where infrastructure, security, and the everyday experience of technology meet.</p>
            <p>I&apos;m an IT Infrastructure and Cybersecurity Engineer with a BSc in Software Engineering from HiLCoE. I&apos;m currently pursuing an MSc in Computer Science at Addis Ababa University, specializing in Network and Security. My work spans Microsoft cloud environments, identity and access management, security operations, and network infrastructure.</p>
            <p>As IT Support Team Lead at MMCY, I oversee IT support, security monitoring, incident response, and cloud governance. My path also includes frontend engineering and UI/UX design &mdash; a perspective I bring to the systems I build and support.</p>
            <a className="text-link" href="#experience">The story so far <Arrow /></a>
            <div className={styles.education}>
              <span>Education</span>
              <div>
                <p>MSc Computer Science &mdash; Specialization in Network and Security<br /><span>Addis Ababa University &middot; 2026&ndash;2029 (expected)</span></p>
                <p>BSc Software Engineering<br /><span>HiLCoE &middot; 2021&ndash;2025</span></p>
              </div>
            </div>
          </div>
        </div>
        <dl className={styles.stats}>
          {stats.map((stat) => <AnimatedStat key={stat.label} stat={stat} />)}
        </dl>
      </div>
      <ScrollStatement />
    </section>
  );
}
