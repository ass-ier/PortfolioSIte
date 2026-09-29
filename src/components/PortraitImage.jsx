import { useCallback, useRef, useState } from 'react';
import { motion as Motion } from 'framer-motion';
import useMediaQuery from '../hooks/useMediaQuery';
import useReplayInView from '../hooks/useReplayInView';
import styles from './PortraitImage.module.css';

const settled = { scale: 1, y: 0, rotate: 0 };
const zoomed = { scale: 1.12, y: 0, rotate: 0 };
const raised = { scale: 0.94, y: 36, rotate: -2.5 };

export default function PortraitImage({ src, srcSet, sizes, width, height, alt, eager = false, scrollStyle }) {
  const frame = useRef(null);
  const reducedMotion = useMediaQuery('(prefers-reduced-motion: reduce)');
  const inView = useReplayInView(frame);
  const [status, setStatus] = useState('loading');
  const [attempt, setAttempt] = useState(0);
  const imageRef = useCallback((image) => {
    if (image?.complete) setStatus(image.naturalWidth > 0 ? 'loaded' : 'error');
  }, []);
  const entered = status === 'loaded' && inView;
  const start = eager ? zoomed : raised;

  function retry() {
    setStatus('loading');
    setAttempt((value) => value + 1);
  }

  return (
    <div
      ref={frame}
      className={styles.frame}
      style={{ aspectRatio: `${width} / ${height}` }}
      aria-busy={status === 'loading'}
      data-portrait={eager ? 'hero' : 'about'}
      data-image-state={status}
      data-portrait-entered={entered}
    >
      {status !== 'error' && (
        <Motion.div className={styles.scrollLayer} style={scrollStyle} data-portrait-scroll>
          <Motion.img
            key={attempt}
            ref={imageRef}
            className={styles.image}
            src={src}
            srcSet={srcSet}
            sizes={sizes}
            width={width}
            height={height}
            alt={alt}
            loading={eager ? 'eager' : 'lazy'}
            fetchPriority={eager ? 'high' : undefined}
            decoding="async"
            onLoad={() => setStatus('loaded')}
            onError={() => setStatus('error')}
            initial={reducedMotion ? false : start}
            animate={reducedMotion || entered ? settled : start}
            transition={{ duration: reducedMotion || !entered ? 0 : eager ? 1.05 : 0.85, ease: [0.22, 1, 0.36, 1] }}
          />
        </Motion.div>
      )}
      {status === 'error' && (
        <p className={styles.error} role="alert">
          The portrait could not load.
          <button className={styles.retry} onClick={retry}>Retry portrait</button>
        </p>
      )}
    </div>
  );
}
