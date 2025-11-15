"use client";

import Image from "next/image";
import Link from "next/link";
import { Minus, Plus, ShoppingCartIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import RelatedProduct from "./RelatedProduct";

export default function ProductDetail() {
  const [quantity, setQuantity] = useState(1);

  const handleDecrement = () => {
    setQuantity((prev) => Math.max(1, prev - 1));
  };

  const handleIncrement = () => {
    setQuantity((prev) => prev + 1);
  };

  return (
    <div className="max-w-6xl mx-auto px-6 mt-24 mb-16 text-white">
      {/* Back link */}
      <div className="mb-8">
        <Link
          href="/products"
          className="flex items-center gap-2 text-gray-400 hover:text-brand-primary transition text-sm md:text-base"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-5 h-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M15 19l-7-7 7-7"
            />
          </svg>
          <span>Back</span>
        </Link>
      </div>

      {/* Product Detail Section */}
      <section className="grid grid-cols-1 md:grid-cols-12 gap-10 items-start">
        {/* 🖼 Thumbnails */}
        <div
          className=" md:col-span-2 flex  md:flex-col flex-row md:space-y-3 space-x-3 md:space-x-0 overflow-x-auto md:overflow-visible 
            md:sticky md:top-28
            scrollbar-thin scrollbar-thumb-brand-primary/40 scrollbar-track-transparent order-2 md:order-1
          "
        >
          {[
            "/products/product1.png",
            "/products/product2.png",
            "/products/product1.png",
          ].map((src, i) => (
            <div
              key={i}
              className="shrink-0 w-20 h-20 rounded-md overflow-hidden border border-gray-700 hover:border-brand-primary transition cursor-pointer"
            >
              <Image
                src={src}
                alt={`Thumbnail ${i + 1}`}
                width={80}
                height={80}
                className="object-contain w-full h-full"
              />
            </div>
          ))}
        </div>

        {/* 📸 Main Image */}
        <div className="md:col-span-5 flex justify-center items-center md:sticky md:top-28 order-1 md:order-2">
          <Image
            src="/products/product1.png"
            alt="Main product image"
            width={420}
            height={420}
            className="w-[350px] md:w-[420px] h-[350px] md:h-[420px] object-contain rounded-md hover:scale-105 transition-transform duration-300"
          />
        </div>

        {/* 🧾 Product Info */}
        <div className="md:col-span-5 space-y-6 order-3">
          <h2 className="text-2xl md:text-3xl font-bold">
            Wynnie Runner T-Shirt V3
          </h2>

          <div className="flex items-center gap-2 text-yellow-400">
            <span>★★★★☆</span>
            <span className="text-gray-400 text-sm">(120 reviews)</span>
          </div>

          <p className="text-2xl text-brand-primary font-semibold">$10.99</p>

          <p className="text-gray-300 leading-relaxed">
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Suscipit
            dolore obcaecati animi asperiores incidunt explicabo soluta totam
            repudiandae eius, aperiam harum voluptatibus quibusdam nemo autem.
            Nostrum iste rerum similique. Autem ad harum aperiam corporis earum
            recusandae nulla eum doloremque dolore, animi fugiat aliquid quam
            hic error exercitationem. Sed adipisci unde voluptatibus, voluptates
            quas ipsam maxime labore ipsa officiis dolor alias dignissimos
            omnis. Voluptas vitae illo perferendis numquam voluptatem ullam
            nobis dolorum! Praesentium totam obcaecati architecto maxime optio
            reprehenderit quis reiciendis ad, consequatur minima numquam,
            commodi officia accusantium. Nostrum molestiae id architecto
            accusantium laboriosam modi impedit, nulla nam asperiores
            dignissimos magni nisi illo repudiandae at eaque possimus autem
            corporis quidem quasi, officia culpa omnis corrupti totam. Minima
            inventore nihil aspernatur dolor facere id eius non atque culpa
            adipisci ipsum impedit aperiam, cumque sed quae deleniti sapiente
            soluta ea mollitia. Adipisci quam unde obcaecati porro consequuntur
            explicabo possimus! Laboriosam nemo officia vel modi quos id
            eligendi facilis sint labore soluta molestiae aspernatur rerum,
            praesentium ducimus nulla quo exercitationem eum qui a earum ipsum
            reiciendis dolorem vero. Quo blanditiis totam expedita laborum at
            nisi, minima facere et! Beatae animi, error, dicta provident quod ad
            optio excepturi eius quisquam sapiente ducimus! Sapiente, delectus
            cupiditate.
          </p>

          <div>
            <label className="block text-gray-400 mb-2">Quantity:</label>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="icon"
                onClick={handleDecrement}
                disabled={quantity <= 1}
                className="h-9 w-9 border-gray-600 hover:border-brand-primary hover:bg-brand-primary/10 text-brand-primary"
              >
                <Minus className="h-4 w-4" />
              </Button>
              <input
                type="number"
                value={quantity}
                onChange={(e) =>
                  setQuantity(Math.max(1, parseInt(e.target.value) || 1))
                }
                min={1}
                className="bg-transparent border border-gray-600 rounded-md w-20 text-center py-2 focus:border-brand-primary outline-none"
              />
              <Button
                variant="outline"
                size="icon"
                onClick={handleIncrement}
                className="h-9 w-9 border-gray-600 hover:border-brand-primary hover:bg-brand-primary/10  text-brand-primary"
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <div className="flex flex-col md:flex-row gap-3">
            <button className="flex-1 bg-brand-primary hover:opacity-90 text-white py-2.5 rounded-md flex items-center justify-center gap-2 transition">
              <ShoppingCartIcon className="w-4 h-4" />
              Add to Cart
            </button>
          </div>
        </div>
      </section>

      {/* Related Product */}
      <RelatedProduct />
    </div>
  );
}
