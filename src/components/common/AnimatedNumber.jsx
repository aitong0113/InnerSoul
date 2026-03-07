import { useEffect, useRef, useState } from "react";

function AnimatedNumber({ end, duration = 1500 }) {
  const [count, setCount] = useState(end);
  const [startAnimation, setStartAnimation] = useState(false);
  const [finished, setFinished] = useState(false);
  const ref = useRef(null);

  // 👇 滑到才開始
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStartAnimation(true);
        }
      },
      { threshold: 0.5 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  // 👇 微跑動畫（97% → 100%）
  useEffect(() => {
    if (!startAnimation) return;

    const startValue = Math.floor(end * 0.68);
    let current = startValue;

    const stepTime = 16;
    const totalSteps = duration / stepTime;
    const increment = (end - startValue) / totalSteps;

    const timer = setInterval(() => {
      current += increment;

      if (current >= end) {
        setCount(end);
        clearInterval(timer);
        setFinished(true);
      } else {
        setCount(Math.floor(current));
      }
    }, stepTime);

    return () => clearInterval(timer);
  }, [startAnimation, end, duration]);

  return (
    <span ref={ref} className={`soft-number ${finished ? "soft-breathe" : ""}`}>
      {count.toLocaleString()}
    </span>
  );
}

export default AnimatedNumber;
