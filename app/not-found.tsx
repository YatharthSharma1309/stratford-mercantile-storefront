import Link from "next/link";
import { PackageSearch } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { SITE_NAME } from "@/lib/site";

export default function NotFound() {
  return (
    <main className="container flex min-h-[60vh] flex-col items-center justify-center py-16 text-center">
      <PackageSearch className="mb-4 h-14 w-14 text-muted-foreground" aria-hidden />
      <h1 className="text-2xl font-bold tracking-tight">Page not found</h1>
      <p className="mt-2 max-w-md text-muted-foreground">
        That product or page does not exist. Head back to {SITE_NAME} to keep browsing.
      </p>
      <Link href="/" className={cn(buttonVariants(), "mt-8")}>
        Back to {SITE_NAME}
      </Link>
    </main>
  );
}
