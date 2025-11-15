"use client";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import Image from "next/image";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "@/service/util/query-key";
import { getProductById } from "@/service/admin/product.service";
import { LoadingOverlay } from "@/components/LoadingOverlay";

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  productId?: number;
}

export function ProductDetail({ open, onOpenChange, productId }: Props) {
  const [selected, setSelected] = useState<string | null>(null);

  const { data, isFetching } = useQuery({
    queryKey: queryKeys.products.byId(productId),
    queryFn: () => getProductById(productId),
    enabled: !!productId,
  });

  const product = data?.product ?? null;
  const imgs = product?.images ?? [];
  const selectedImage = selected ?? imgs[0]?.url ?? null;

  if (isFetching) {
    return <LoadingOverlay isLoading={isFetching} />;
  }
  if (!product) return null;
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className="
          w-full max-w-full sm:max-w-[700px]
          h-full sm:h-auto
          overflow-y-auto
          p-4 sm:p-6
        "
      >
        <DialogHeader>
          <DialogTitle className="text-lg sm:text-xl">
            {product.name}
          </DialogTitle>
          <DialogDescription className="sr-only">
            Product detail
          </DialogDescription>
        </DialogHeader>

        <div className="max-h-[80vh] overflow-y-auto pr-1">
          <div className="flex flex-col sm:flex-row gap-6">
            {/* ==== Thumbnails rail (desktop only) ==== */}
            <aside
              className="
                hidden sm:flex sm:flex-col
                sm:basis-[15%] sm:max-w-[15%]
                gap-2 p-1
                max-h-[400px] overflow-y-auto
              "
            >
              {imgs.map((img) => (
                <button
                  key={img.id}
                  onClick={() => setSelected(img.url ?? "")}
                  className={`border rounded-md overflow-hidden transition-all duration-200 hover:scale-105 hover:shadow-md ${
                    selected === img.url
                      ? "ring-2 ring-primary shadow-lg"
                      : "opacity-70 hover:opacity-100"
                  }`}
                  style={{ width: "72px", height: "72px", flexShrink: 0 }}
                >
                  <Image
                    src={img.url ?? ""}
                    alt="thumb"
                    width={72}
                    height={72}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </aside>

            {/* ==== Main image ==== */}
            <section className="flex-1 sm:basis-[40%] sm:max-w-[40%]">
              <div className="relative overflow-hidden rounded-lg border">
                <Image
                  key={selectedImage}
                  src={selectedImage ?? "/no-image.jpg"}
                  alt={product.name ?? ""}
                  width={900}
                  height={900}
                  className="w-full max-h-[60vh] object-contain transition-opacity duration-300"
                  priority
                />
              </div>

              {/* Mobile thumbnails under image */}
              {imgs.length > 1 && (
                <div className="mt-3 flex gap-2 overflow-x-auto sm:hidden pb-2">
                  {imgs.map((img) => (
                    <button
                      key={`m-${img.id}`}
                      onClick={() => setSelected(img.url ?? "")}
                      className={`border rounded-md overflow-hidden shrink-0 transition-all duration-200 ${
                        selected === img.url
                          ? "ring-2 ring-primary scale-105"
                          : "opacity-70"
                      }`}
                    >
                      <Image
                        src={img.url ?? ""}
                        alt="thumb"
                        width={64}
                        height={64}
                        className="w-16 h-16 object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}
            </section>

            {/* ==== Product details ==== */}
            <section className="flex-1 sm:basis-[45%] sm:max-w-[45%] text-sm">
              <div className="max-h-[60vh] overflow-y-auto space-y-4 pr-2">
                {product.description && (
                  <div>
                    <p className="text-muted-foreground leading-relaxed text-sm">
                      {product.description}
                    </p>
                  </div>
                )}

                <Separator />

                <div className="space-y-3">
                  <div className="flex justify-between items-center py-1">
                    <span className="font-medium text-muted-foreground">
                      Category
                    </span>
                    <span className="font-semibold">
                      {product.category?.name ?? "—"}
                    </span>
                  </div>

                  <div className="flex justify-between items-center py-1">
                    <span className="font-medium text-muted-foreground">
                      Price
                    </span>
                    <span
                      className={
                        product.discountPercent
                          ? "line-through text-muted-foreground"
                          : "font-semibold text-lg"
                      }
                    >
                      ${product.price}
                    </span>
                  </div>

                  {product.discountPercent != null &&
                    Number(product.discountPercent) > 0 && (
                      <>
                        <div className="flex justify-between items-center py-1">
                          <span className="font-medium text-muted-foreground">
                            Discount
                          </span>
                          <Badge
                            variant="destructive"
                            className="font-semibold"
                          >
                            {product.discountPercent}% OFF
                          </Badge>
                        </div>
                        <div className="flex justify-between items-center py-1">
                          <span className="font-medium text-muted-foreground">
                            Final Price
                          </span>
                          <span className="font-bold text-lg text-green-600">
                            $
                            {(
                              (product.price ?? 0) *
                              (1 - Number(product.discountPercent ?? 0) / 100)
                            ).toFixed(2)}
                          </span>
                        </div>
                      </>
                    )}

                  <Separator className="my-2" />

                  <div className="flex justify-between items-center py-1">
                    <span className="font-medium text-muted-foreground">
                      Stock
                    </span>
                    <span
                      className={`font-semibold ${
                        (product.quantity ?? 0) <= 0
                          ? "text-red-500"
                          : (product.quantity ?? 0) < 10
                          ? "text-orange-500"
                          : "text-green-600"
                      }`}
                    >
                      {product.quantity ?? 0} units
                      {(product.quantity ?? 0) <= 0 && " (Out of Stock)"}
                      {(product.quantity ?? 0) > 0 &&
                        (product.quantity ?? 0) < 10 &&
                        " (Low Stock)"}
                    </span>
                  </div>

                  <div className="flex justify-between items-center py-1">
                    <span className="font-medium text-muted-foreground">
                      Status
                    </span>
                    <Badge variant={product.isActive ? "default" : "secondary"}>
                      {product.isActive ? "Active" : "Inactive"}
                    </Badge>
                  </div>
                </div>

                {product.colors?.length ? (
                  <>
                    <Separator />
                    <div>
                      <div className="font-medium text-muted-foreground mb-3">
                        Available Colors ({product.colors.length})
                      </div>
                      <div className="flex flex-wrap gap-3">
                        {product.colors.map((c) => (
                          <div
                            key={c.id}
                            className="group relative"
                            title={c.hexCode}
                          >
                            <div
                              className="w-6 h-6 rounded-full transition-transform duration-200 group-hover:scale-110  cursor-pointer"
                              style={{
                                backgroundColor: c.hexCode,
                                borderColor:
                                  c.hexCode === "#FFFFFF" ||
                                  c.hexCode === "#ffffff"
                                    ? "#e5e7eb"
                                    : c.hexCode,
                              }}
                            />
                            <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 text-xs whitespace-nowrap bg-black text-white px-2 py-1 rounded pointer-events-none">
                              {c.hexCode}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </>
                ) : null}
              </div>
            </section>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
