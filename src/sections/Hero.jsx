import { useRef } from 'react';
import { motion as Motion, useScroll, useTransform } from 'framer-motion';
import Arrow from '../components/Arrow';
import PortraitImage from '../components/PortraitImage';
import useMediaQuery from '../hooks/useMediaQuery';
import styles from './Hero.module.css';

export default function Hero() {
  const ref = useRef(null);
  const reducedMotion = useMediaQuery('(prefers-reduced-motion: reduce)');
  const compact = useMediaQuery('(max-width: 760px)');
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const nameY = useTransform(scrollYProgress, [0, 1], [0, -60]);
  const imageY = useTransform(scrollYProgress, [0, 1], [0, compact ? 36 : 72]);
  const imageRotate = useTransform(scrollYProgress, [0, 1], [0, compact ? -3 : -4]);
  const imageScale = useTransform(scrollYProgress, [0, 1], [1, compact ? 0.92 : 0.9]);

  return (
    <section id="hero" ref={ref} className={styles.hero} tabIndex={-1} aria-labelledby="hero-heading">
      <div className={`container ${styles.canvas}`}>
        <div className={styles.intro}>
          <Motion.h1 id="hero-heading" className={styles.name} style={reducedMotion ? undefined : { y: nameY }}>
            Assier<br />Anteneh<span className={styles.period}>.</span>
          </Motion.h1>
          <p className={styles.role}>IT infrastructure &amp;<br />cybersecurity engineer.</p>
          <p className={styles.statement}>Making complex systems work.<br />Keeping the people behind them in mind.</p>
          <a className={`round-link ${styles.explore}`} href="#projects">Explore my work <Arrow /></a>
        </div>
        <div className={styles.portrait}>
          <PortraitImage
            src="/images/assier-cutout-900.jpg"
            srcSet="/images/assier-cutout-540.jpg 540w, /images/assier-cutout-900.jpg 900w"
            sizes="(max-width: 760px) 90vw, 48vw"
            width={900}
            height={1080}
            alt="Assier Anteneh, in a monochrome portrait with an orange cutout surround."
            eager
            scrollStyle={reducedMotion ? undefined : { y: imageY, rotate: imageRotate, scale: imageScale }}
          />
        </div>
        <div className={styles.bottom}>
          <p><span className={styles.locationDot} aria-hidden="true" />Addis Ababa, Ethiopia</p>
          <a href="#projects" className={styles.scrollLink}>A little further down <Arrow /></a>
          <p className={styles.specialties}>Infrastructure / Security / Code</p>
        </div>
      </div>
    </section>
  );
}
