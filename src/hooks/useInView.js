import { useEffect, useRef, useState } from 'react';

export function useInView(options = {}) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.unobserve(el); // trigger once
        }
      },
      { threshold: 0.15, rootMargin: '0px 0px -40px 0px', ...options }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return [ref, inView];
}

export function useCounter(target, duration = 1400, trigger = true) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!trigger) return;
    let start = null;
    const step = (ts) => {
      if (!start) start = ts;
      const progress = Math.min((ts - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.round(eased * target));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [target, duration, trigger]);

  return count;
}

export function useTyped(phrases, speeds = { type: 80, delete: 45, pause: 55 }) {
  const [displayed, setDisplayed] = useState('');
  const [phraseIdx, setPhraseIdx] = useState(0);
  const [charIdx, setCharIdx] = useState(0);
  const [deleting, setDeleting] = useState(false);
  const [pause, setPause] = useState(0);

  useEffect(() => {
    const current = phrases[phraseIdx];
    let timeout;

    if (pause > 0) {
      timeout = setTimeout(() => setPause((p) => p - 1), 60);
    } else if (!deleting) {
      timeout = setTimeout(() => {
        const next = charIdx + 1;
        setDisplayed(current.slice(0, next));
        if (next === current.length) {
          setPause(speeds.pause);
          setDeleting(true);
        } else {
          setCharIdx(next);
        }
      }, speeds.type + Math.random() * 30);
    } else {
      timeout = setTimeout(() => {
        const next = charIdx - 1;
        setDisplayed(current.slice(0, next));
        setCharIdx(next);
        if (next === 0) {
          setDeleting(false);
          setPhraseIdx((i) => (i + 1) % phrases.length);
        }
      }, speeds.delete);
    }

    return () => clearTimeout(timeout);
  }, [displayed, deleting, pause, charIdx, phraseIdx, phrases, speeds]);

  return displayed;
}
