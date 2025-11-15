"use client";

import { InfiniteMovingCards } from "@/components/ui/infinite-moving-cards";

export function InfiniteMovingCardsDemo() {
  const images = [
    { image: "/hero/hero1.png", alt: "Runner 1" },
    { image: "/hero/hero2.png", alt: "Runner 2" },
    { image: "/hero/hero3.png", alt: "Runner 3" },
    { image: "/hero/hero4.png", alt: "Runner 4" },
    { image: "/hero/hero5.png", alt: "Runner 5" },
    { image: "/hero/hero6.png", alt: "Runner 6" },
    { image: "/hero/hero7.png", alt: "Runner 7" },
  ];

  return (
    <div className="mt-16 w-full flex flex-col items-center justify-center overflow-hidden">
      <InfiniteMovingCards
        items={images}
        direction="left"
        speed="normal"
        pauseOnHover={true}
      />
    </div>
  );
}