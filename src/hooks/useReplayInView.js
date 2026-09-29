import { useEffect, useState } from 'react';

export default function useReplayInView(ref, amount = 0.2) {
  const [active, setActive] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      setActive((previous) => {
        if (!entry.isIntersecting || entry.intersectionRatio === 0) return false;
        // Re-arm only after a full exit, not while crossing the entry threshold.
        return previous || entry.intersectionRatio >= amount;
      });
    }, { threshold: [0, amount] });

    observer.observe(ref.current);
    return () => observer.disconnect();
  }, [ref, amount]);

  return active;
}
