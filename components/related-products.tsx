import Link from "next/link";
import { products } from "@/lib/products";
import { formatPrice } from "@/lib/utils";
import { ProductImage } from "@/components/product-image";
import type { Category } from "@/lib/types";

interface RelatedProductsProps {
  currentId: string;
  category: Category;
}

export function RelatedProducts({ currentId, category }: RelatedProductsProps) {
  const related = products
    .filter((p) => p.category === category && p.id !== currentId)
    .slice(0, 4);

  if (related.length === 0) return null;

  return (
    <section className="mt-16 border-t pt-12">
      <h2 className="text-2xl font-bold tracking-tight mb-6">You may also like</h2>
      <ul className="grid grid-cols-2 gap-4 md:grid-cols-4">
        {related.map((p) => (
          <li key={p.id}>
            <Link
              href={`/product/${p.id}`}
              className="group block rounded-lg border bg-card overflow-hidden transition-shadow hover:shadow-md motion-reduce:transition-none"
            >
              <div className="relative aspect-square bg-muted overflow-hidden">
                <ProductImage
                  src={p.image}
                  alt={p.name}
                  fill
                  sizes="(max-width: 768px) 50vw, 25vw"
                  className="object-cover transition-transform duration-300 group-hover:scale-105 motion-reduce:transition-none motion-reduce:group-hover:scale-100"
                />
              </div>
              <div className="p-3 space-y-1">
                <p className="text-sm font-medium leading-snug line-clamp-2">{p.name}</p>
                <p className="text-sm font-semibold">{formatPrice(p.price)}</p>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
