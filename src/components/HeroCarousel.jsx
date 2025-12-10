// src/components/HeroCarousel.jsx
import { useState, useEffect, forwardRef } from "react";
import { gsap } from "gsap";

import HeroPuma from "./HeroPuma";
import HeroNike from "./HeroNike";

const HeroCarousel = forwardRef(function HeroCarousel(_, ref) {
  const [index, setIndex] = useState(0);

  const slides = [
    <HeroPuma />,
    <HeroNike />,
  ];

  // Animasi fade antar slide
  useEffect(() => {
    if (!ref?.current) return;

    gsap.fromTo(
      ref.current,
      { opacity: 0 },
      { opacity: 1, duration: 1.2, ease: "power2.out" }
    );
  }, [index, ref]);

  // Auto-slide
  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % slides.length);
    }, 7000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section
      ref={ref}
      className="relative w-full aspect-video overflow-hidden"
    >
      {slides[index]}

      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-3 z-20">
        {slides.map((_, i) => (
          <div
            key={i}
            onClick={() => setIndex(i)}
            className={`w-3 h-3 rounded-full cursor-pointer transition 
              ${index === i ? "bg-white" : "bg-white/40"}`}
          />
        ))}
      </div>
    </section>
  );
});

export default HeroCarousel;
