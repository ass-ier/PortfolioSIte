import { useSpring } from 'framer-motion';
import useMediaQuery from './useMediaQuery';

const query = '(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)';
const spring = { stiffness: 180, damping: 26, mass: 0.65 };

export default function usePointerTilt(strength = 6) {
  const enabled = useMediaQuery(query);
  const rotateX = useSpring(0, spring);
  const rotateY = useSpring(0, spring);

  function reset() {
    rotateX.set(0);
    rotateY.set(0);
  }

  function onPointerMove(event) {
    if (!enabled || event.pointerType !== 'mouse') return;
    const bounds = event.currentTarget.getBoundingClientRect();
    const x = Math.max(-1, Math.min(1, (event.clientX - bounds.left) / bounds.width * 2 - 1));
    const y = Math.max(-1, Math.min(1, (event.clientY - bounds.top) / bounds.height * 2 - 1));
    rotateX.set(-y * strength);
    rotateY.set(x * strength);
  }

  return {
    style: enabled ? { rotateX, rotateY, transformPerspective: 1000 } : undefined,
    onPointerMove,
    onPointerLeave: reset,
    onBlur: reset,
  };
}
