import Link from "next/link";
import { Logo } from "@/components/logo";
import { SITE_LEGAL_NAME, SITE_TAGLINE } from "@/lib/site";

const footerNav = [
  {
    title: "Catalogue",
    links: [
      { href: "/", label: "All products" },
      { href: "/wishlist", label: "Wishlist" },
    ],
  },
  {
    title: "Orders",
    links: [
      { href: "/checkout", label: "Checkout" },
      { href: "/product/p001", label: "Featured pick" },
    ],
  },
] as const;

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-auto border-t bg-muted/30">
      <div className="container py-12 md:py-14">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-5 space-y-4">
            <Logo />
            <p className="text-sm text-muted-foreground max-w-sm leading-relaxed">{SITE_TAGLINE}</p>
          </div>

          <div className="grid grid-cols-2 gap-8 sm:gap-12 lg:col-span-4 lg:col-start-8">
            {footerNav.map((col) => (
              <div key={col.title}>
                <h2 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3">
                  {col.title}
                </h2>
                <ul className="space-y-2.5">
                  {col.links.map((item) => (
                    <li key={`${item.href}-${item.label}`}>
                      <Link
                        href={item.href}
                        className="text-sm text-foreground/90 hover:text-foreground underline-offset-4 hover:underline"
                      >
                        {item.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-10 pt-8 border-t flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between text-xs text-muted-foreground">
          <p>
            © {year} {SITE_LEGAL_NAME}. Demonstration environment—sample inventory only.
          </p>
          <p className="sm:text-right">Built with Next.js &amp; Redux Toolkit</p>
        </div>
      </div>
    </footer>
  );
}
