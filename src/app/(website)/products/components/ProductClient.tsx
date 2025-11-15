"use client";

import ProductCard from "./ProductCard";

const ProductClient = () => {
  return (
    <div
      className="min-h-screen mt-24 max-w-6xl mx-auto px-4 sm:px-6 py-12 
                    grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8"
    >
      {Array.from({ length: 12 }).map((_, i) => (
        <ProductCard
          key={i}
          images={[
            `/products/product${(i % 4) + 1}.png`,
            `/products/product${((i + 1) % 4) + 1}.png`,
          ]}
          title="Wynnie At Tee V3"
          price="$10.99"
          discount="20% OFF"
        />
      ))}
    </div>
  );
};

export default ProductClient;
