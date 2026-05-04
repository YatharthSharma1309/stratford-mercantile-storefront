import { notFound } from "next/navigation";
import Link from "next/link";
import { Star, ChevronLeft, Truck, ShieldCheck, RotateCcw } from "lucide-react";
import { getProductById, products } from "@/lib/products";
import { PRODUCT_KIND_LABELS } from "@/lib/product-media";
import { formatPrice } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { AddToCartButton } from "@/components/add-to-cart-button";
import { RelatedProducts } from "@/components/related-products";
import { WishlistButton } from "@/components/wishlist-button";
import { ProductGallery } from "@/components/product-gallery";

interface PageProps {
  params: { id: string };
}

export function generateStaticParams() {
  return products.map((p) => ({ id: p.id }));
}

export default function ProductPage({ params }: PageProps) {
  const product = getProductById(params.id);
  if (!product) notFound();

  return (
    <main className="container py-8">
      <Link
        href="/"
        className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground mb-6"
      >
        <ChevronLeft className="h-4 w-4" /> Back to shop
      </Link>

      <div className="grid gap-8 md:grid-cols-2">
        {/* Gallery — primary + divided thumbnails */}
        <div className="relative space-y-3">
          <WishlistButton productId={product.id} className="absolute right-3 top-3 z-10 h-11 w-11 md:right-4 md:top-4" />
          {!product.inStock && (
            <Badge variant="destructive" className="absolute left-3 top-3 z-10 md:left-4 md:top-4">
              Out of stock
            </Badge>
          )}
          <ProductGallery product={product} priority />
        </div>

        {/* Details */}
        <div className="space-y-5">
          <div className="space-y-2">
            <div className="flex flex-wrap items-center gap-2">
              <Badge variant="secondary" className="capitalize">
                {product.category}
              </Badge>
              <Badge variant="outline" className="font-normal max-w-full truncate">
                {PRODUCT_KIND_LABELS[product.productKind] ?? product.productKind}
              </Badge>
            </div>
            <h1 className="text-3xl font-bold tracking-tight">{product.name}</h1>
            <div className="flex items-center gap-2 text-sm">
              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
              <span className="font-medium">{product.rating.toFixed(1)}</span>
              <span className="text-muted-foreground">
                ({product.reviewCount.toLocaleString()} reviews)
              </span>
            </div>
          </div>

          <div className="text-3xl font-semibold">{formatPrice(product.price)}</div>

          <p className="text-muted-foreground">{product.description}</p>

          <AddToCartButton productId={product.id} disabled={!product.inStock} />

          <div className="grid gap-3 pt-4 text-sm">
            <div className="flex items-center gap-3">
              <Truck className="h-4 w-4 text-muted-foreground" />
              <span>Free shipping on orders over $50</span>
            </div>
            <div className="flex items-center gap-3">
              <RotateCcw className="h-4 w-4 text-muted-foreground" />
              <span>30-day free returns</span>
            </div>
            <div className="flex items-center gap-3">
              <ShieldCheck className="h-4 w-4 text-muted-foreground" />
              <span>2-year manufacturer warranty</span>
            </div>
          </div>
        </div>
      </div>

      <RelatedProducts currentId={product.id} category={product.category} />
    </main>
  );
}
