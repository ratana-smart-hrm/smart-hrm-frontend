import Image from "next/image";
import React from "react";

const RelatedProduct = () => {
  return (
    <section className="mt-20">
      <h2 className="text-2xl md:text-3xl mb-6 border-l-4 border-brand-primary pl-3">
        Related Products
      </h2>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 md:gap-10">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="flex flex-col group cursor-pointer">
            <Image
              src={`/products/product${(i % 2) + 1}.png`}
              alt="Related Product"
              width={250}
              height={250}
              className="w-full h-42 object-contain mb-3 group-hover:opacity-80 transition"
            />
            <p className="text-gray-200 text-lg">$9.99</p>
            <p className="text-gray-400 text-sm group-hover:text-white line-clamp-2">
              Wynnie Runner Classic Tee
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default RelatedProduct;
