"use client";

import { useEffect, useRef, useState } from "react";

interface ImpactNumber {
  value: number;
  suffix?: string;
  prefix?: string;
  label: string;
  duration?: number;
}

const impactNumbers: ImpactNumber[] = [
  {
    value: 63,
    suffix: "gb",
    label: "de dados coletados",
    duration: 2000,
  },
  {
    value: 20,
    label: "municípios com dados",
    duration: 1500,
  },
  {
    value: 150,
    suffix: "+",
    label: "alunos/educação executiva",
    duration: 1800,
  },
  {
    value: 37,
    suffix: "+",
    label: "horas de eventos realizados",
    duration: 1600,
  },
  {
    value: 2000,
    suffix: "+",
    label: "participantes em eventos",
    duration: 2200,
  },
];

function useInView(ref: React.RefObject<HTMLElement | null>) {
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);
      },
      { threshold: 0.1 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [ref]);

  return isInView;
}

function useCounter(
  end: number,
  duration: number,
  start: number = 0,
  delay: number = 0
) {
  const [count, setCount] = useState(start);
  const [hasStarted, setHasStarted] = useState(false);

  useEffect(() => {
    if (!hasStarted) return;

    const startTime = Date.now();
    const endTime = startTime + duration;

    const timer = setInterval(() => {
      const now = Date.now();
      const progress = Math.min((now - startTime) / duration, 1);
      
      const currentCount = Math.floor(start + (end - start) * progress);
      setCount(currentCount);

      if (progress >= 1) {
        clearInterval(timer);
        setCount(end);
      }
    }, 16); // ~60fps

    return () => clearInterval(timer);
  }, [end, duration, start, hasStarted]);

  const startCounter = () => {
    if (!hasStarted) {
      setHasStarted(true);
    }
  };

  return { count, startCounter };
}

export function ImpactNumbersSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref);

  // Create individual counters for each impact number
  const counter1 = useCounter(63, 2000);
  const counter2 = useCounter(20, 1500);
  const counter3 = useCounter(150, 1800);
  const counter4 = useCounter(37, 1600);
  const counter5 = useCounter(2000, 2200);

  const counters = [counter1, counter2, counter3, counter4, counter5];

  useEffect(() => {
    if (isInView) {
      counters.forEach((counter) => counter.startCounter());
    }
  }, [isInView, counters]);

  return (
    <section className="py-16 px-4 2xl:px-16 bg-gray-50">
      <div className="mx-auto">
        {/* Title */}
        <h2 className="text-2xl font-medium text-gray-900 mb-8">
          Números de impacto
        </h2>
        
        {/* First separator line */}
        <div className="border-t border-gray-200 mb-8"></div>
        
        <div ref={ref} className="space-y-8">
          {/* First line: 63gb de dados coletados */}
          <div className="flex items-baseline gap-2">
            <span className="text-5xl font-bold text-gray-900">
              {counter1.count}
              {impactNumbers[0].suffix}
            </span>
            <span className="text-lg text-gray-600">
              {impactNumbers[0].label}
            </span>
          </div>

          {/* Second separator line */}
          <div className="border-t border-gray-200"></div>

          {/* Second line: 20 municípios com dados */}
          <div className="flex items-baseline gap-2">
            <span className="text-5xl font-bold text-gray-900">
              {counter2.count}
            </span>
            <span className="text-lg text-gray-600">
              {impactNumbers[1].label}
            </span>
          </div>

          {/* Third separator line */}
          <div className="border-t border-gray-200"></div>

          {/* Third line: 150+ alunos/educação executiva */}
          <div className="flex items-baseline gap-2">
            <span className="text-5xl font-bold text-gray-900">
              {counter3.count}
              {impactNumbers[2].suffix}
            </span>
            <span className="text-lg text-gray-600">
              {impactNumbers[2].label}
            </span>
          </div>

          {/* Fourth separator line */}
          <div className="border-t border-gray-200"></div>

          {/* Fourth line: 37+ horas de eventos realizados */}
          <div className="flex items-baseline gap-2">
            <span className="text-5xl font-bold text-gray-900">
              {counter4.count}
              {impactNumbers[3].suffix}
            </span>
            <span className="text-lg text-gray-600">
              {impactNumbers[3].label}
            </span>
          </div>

          {/* Fifth separator line */}
          <div className="border-t border-gray-200"></div>

          {/* Fifth line: 2000+ participantes em eventos */}
          <div className="flex items-baseline gap-2">
            <span className="text-5xl font-bold text-gray-900">
              {counter5.count}
              {impactNumbers[4].suffix}
            </span>
            <span className="text-lg text-gray-600">
              {impactNumbers[4].label}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
