import { useState, useEffect, useRef } from 'react';
import { useInView, animate } from 'motion/react';

export const CountUp = ({ to, duration = 1.5, suffix = "" }: { to: number, duration?: number, suffix?: string }) => {
  const [count, setCount] = useState(0);
  const nodeRef = useRef(null);
  const isInView = useInView(nodeRef as any, { once: true, margin: "-50px" });

  useEffect(() => {
    if (isInView) {
      const controls = animate(0, to, {
        duration: duration,
        onUpdate: (value) => setCount(Math.floor(value)),
        ease: [0.22, 1, 0.36, 1],
      });
      return () => controls.stop();
    }
  }, [isInView, to, duration]);

  return <span ref={nodeRef}>{count.toLocaleString()}{suffix}</span>;
};
