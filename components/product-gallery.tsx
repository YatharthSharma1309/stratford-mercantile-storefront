import { ProductImage } from "@/components/product-image";
import { PRODUCT_KIND_LABELS } from "@/lib/product-media";
import type { Product } from "@/lib/types";

const crops = ["object-center", "object-[22%_28%]", "object-[78%_72%]"] as const;

interface ProductGalleryProps {
  product: Product;
  priority?: boolean;
}

/**
 * Divided hero: large primary + three cropped views of the same photo
 * (different focal crops) so PDP reads like a gallery without extra assets.
 */
export function ProductGallery({ product, priority }: ProductGalleryProps) {
  const kindLabel = PRODUCT_KIND_LABELS[product.productKind] ?? product.productKind;

  return (
    <div className="flex flex-col gap-3 md:flex-row md:items-start md:gap-4">
      <div className="relative aspect-square w-full overflow-hidden rounded-xl bg-muted ring-1 ring-border md:min-w-0 md:flex-1">
        <ProductImage
          src={product.image}
          alt={`${product.name} — ${kindLabel}`}
          fill
          sizes="(max-width: 768px) 100vw, 42vw"
          className="object-cover object-center"
          priority={priority}
        />
      </div>

      <div className="flex gap-2 md:w-28 md:shrink-0 md:flex-col">
        {crops.map((crop, i) => (
          <div
            key={i}
            className="relative aspect-square w-1/3 overflow-hidden rounded-lg bg-muted ring-1 ring-border md:h-28 md:w-full md:flex-none"
          >
            <ProductImage
              src={product.image}
              alt=""
              fill
              sizes="(max-width: 768px) 33vw, 112px"
              className={`object-cover ${crop}`}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
