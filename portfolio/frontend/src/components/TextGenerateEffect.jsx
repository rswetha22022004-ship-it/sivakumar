import { useEffect, useRef, useState } from 'react';

export default function TextGenerateEffect({ children, className = '', as: Tag = 'span' }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(() => (
    typeof window !== 'undefined'
      && window.matchMedia('(prefers-reduced-motion: reduce)').matches
  ));
  const text = String(children ?? '');
  const words = text.trim().split(/\s+/).filter(Boolean);

  useEffect(() => {
    const element = ref.current;
    if (!element) return undefined;

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return undefined;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 },
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  return (
    <Tag ref={ref} className={`text-generate-effect ${visible ? 'is-visible' : ''} ${className}`}>
      {words.map((word, index) => (
        <span key={`${word}-${index}`} className="text-generate-effect__word" style={{ '--word-index': index }}>
          {word}
        </span>
      ))}
    </Tag>
  );
}
