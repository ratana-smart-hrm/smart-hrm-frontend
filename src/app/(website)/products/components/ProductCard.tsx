"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

interface Props {
  images: string[];
  title: string;
  price: string;
  discount?: string;
  description?: string;
}

const ProductCard = ({ images, title, price, discount }: Props) => {
  const titleRef = useRef<HTMLParagraphElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isOverflowing, setIsOverflowing] = useState(false);

  useEffect(() => {
    const checkOverflow = () => {
      if (titleRef.current && containerRef.current) {
        const titleWidth = titleRef.current.scrollWidth;
        const containerWidth = containerRef.current.clientWidth;
        setIsOverflowing(titleWidth > containerWidth);
      }
    };

    // Delay check to ensure DOM is fully rendered
    const timer = setTimeout(checkOverflow, 100);

    window.addEventListener("resize", checkOverflow);
    return () => {
      clearTimeout(timer);
      window.removeEventListener("resize", checkOverflow);
    };
  }, [title]);

  return (
    <Link
      href={`/products/1`}
      className="group cursor-pointer block transition-transform duration-300 hover:scale-[1.02]"
    >
      <div className="relative overflow-hidden rounded-xl">
        <Image
          src={images[0]}
          width={400}
          height={300}
          alt={title}
          className="h-46 w-full object-contain transition-opacity duration-700 group-hover:opacity-0"
        />

        {images[1] && (
          <Image
            src={images[1]}
            width={400}
            height={300}
            alt={`${title} alternate`}
            className="absolute inset-0 h-46 w-full object-contain opacity-0 transition-opacity duration-700 group-hover:opacity-100"
          />
        )}

        {discount && (
          <span className="absolute top-3 right-3 bg-pink-100 text-pink-800 text-xs font-medium px-2.5 py-1 rounded-full dark:bg-pink-900 dark:text-pink-200">
            {discount}
          </span>
        )}
      </div>

      <p className="text-brand-primary text-xl mt-3 neon-stroke">{price}</p>

      {/* Scrolling title - auto animates when text is long */}
      <div ref={containerRef} className="relative overflow-hidden max-w-full">
        <div
          className={`inline-flex ${isOverflowing ? "animate-marquee" : ""}`}
        >
          <p
            ref={titleRef}
            className="text-base text-gray-100/90 dark:text-gray-300 whitespace-nowrap pr-4"
          >
            {title}
          </p>
          {isOverflowing && (
            <p
              className="text-base text-gray-100/90 dark:text-gray-300 whitespace-nowrap pr-4"
              aria-hidden="true"
            >
              {title}
            </p>
          )}
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
