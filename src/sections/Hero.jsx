import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { useTyped } from '../hooks/useInView';
import styles from './Hero.module.css';

const PHRASES = ['IT Infrastructure Engineer', 'Cybersecurity Analyst', 'Cloud & Identity Engineer', 'IT Support Team Lead'];

/* Particle canvas */
function ParticleCanvas() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let raf;
    const particles = [];
    const COUNT = 55;

    const resize = () => {
      canvas.width  = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    for (let i = 0; i < COUNT; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        r: Math.random() * 1.4 + 0.3,
        dx: (Math.random() - 0.5) * 0.22,
        dy: (Math.random() - 0.5) * 0.22,
        alpha: Math.random() * 0.35 + 0.08,
      });
    }

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((p) => {
        p.x += p.dx;
        p.y += p.dy;
        if (p.x < 0 || p.x > canvas.width)  p.dx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.dy *= -1;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(15,206,90,${p.alpha})`;
        ctx.fill();
      });

      // Connect nearby particles
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 120) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(15,206,90,${0.07 * (1 - dist / 120)})`;
            ctx.lineWidth = 0.6;
            ctx.stroke();
          }
        }
      }

      raf = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return <canvas ref={canvasRef} className={styles.canvas} aria-hidden="true" />;
}

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1, delayChildren: 0.3 } },
};
const item = {
  hidden: { opacity: 0, y: 24 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.25, 1, 0.5, 1] } },
};

export default function Hero() {
  const typed = useTyped(PHRASES);

  return (
    <section id="hero" className={`section ${styles.hero}`} aria-label="Introduction">
      <ParticleCanvas />

      {/* Radial gradient blob */}
      <div className={styles.blob} aria-hidden="true" />

      <div className={`container ${styles.content}`}>
        <motion.div className={styles.text} variants={container} initial="hidden" animate="show">
          <motion.p className={`section-label ${styles.eyebrow}`} variants={item}>
            Addis Ababa, Ethiopia
          </motion.p>

          <motion.h1 className={styles.name} variants={item}>
            Assier<br />
            <span className={styles.nameAccent}>Anteneh</span>
          </motion.h1>

          <motion.p className={styles.role} variants={item} aria-live="polite">
            <span className={styles.typedText}>{typed}</span>
            <span className={styles.cursor} aria-hidden="true">|</span>
          </motion.p>

          <motion.p className={styles.summary} variants={item}>
            I secure networks, manage cloud identities, and respond to threats —
            keeping systems resilient, compliant, and always-on.
          </motion.p>

          <motion.div className={styles.actions} variants={item}>
            <a href="#experience" className={styles.btnPrimary}>View Experience</a>
            <a href="#contact"    className={styles.btnGhost}>Get in Touch</a>
          </motion.div>
        </motion.div>

        {/* Geometric accent */}
        <motion.div
          className={styles.graphic}
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.5, ease: [0.25, 1, 0.5, 1] }}
          aria-hidden="true"
        >
          <div className={styles.ring1} />
          <div className={styles.ring2} />
          <div className={styles.ring3} />
          <div className={styles.hexCore}>
            <span>SEC</span>
            <span className={styles.hexSlash}>OPS</span>
          </div>
          <div className={`${styles.orbitDot} ${styles.dot1}`} />
          <div className={`${styles.orbitDot} ${styles.dot2}`} />
        </motion.div>
      </div>

      {/* Scroll cue */}
      <motion.a
        href="#about"
        className={styles.scrollCue}
        aria-label="Scroll to about"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4 }}
      >
        <span>Scroll</span>
        <motion.span
          className={styles.scrollLine}
          animate={{ scaleY: [1, 0.5, 1] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        />
      </motion.a>
    </section>
  );
}
