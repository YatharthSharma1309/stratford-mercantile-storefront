import Link from "next/link";
import { Playfair_Display } from "next/font/google";
import { cn } from "@/lib/utils";
import { SITE_NAME } from "@/lib/site";

const brandSerif = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "600"],
  display: "swap",
});

function LogoMark({ className }: { className?: string }) {
  return (
    <span
      className={cn(
        "flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-slate-950 shadow-md ring-1 ring-amber-600/85 ring-offset-2 ring-offset-background",
        className,
      )}
      aria-hidden
    >
      <svg
        width={26}
        height={26}
        viewBox="0 0 32 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="text-amber-500/95"
      >
        <path
          d="M16 7L7 13v12h18V13l-9-6z"
          stroke="currentColor"
          strokeWidth="1.35"
          strokeLinejoin="round"
          fill="rgb(15 23 42 / 0.65)"
        />
        <path
          d="M7 13L16 8l9 5"
          stroke="currentColor"
          strokeWidth="1.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M13 21h6v5H13v-5z"
          stroke="currentColor"
          strokeWidth="1.15"
          fill="transparent"
          strokeLinejoin="round"
        />
        <circle cx="16" cy="18.75" r="0.95" fill="currentColor" className="text-amber-400" />
        <path
          d="M11 26h10"
          stroke="currentColor"
          strokeWidth="1.05"
          strokeLinecap="round"
          opacity={0.9}
        />
      </svg>
    </span>
  );
}

type LogoProps = {
  className?: string;
  /** Smaller mark + text for tight spaces */
  compact?: boolean;
};

export function Logo({ className, compact }: LogoProps) {
  return (
    <Link
      href="/"
      className={cn("flex items-center gap-3 text-foreground", className)}
      aria-label={`${SITE_NAME} — home`}
    >
      <LogoMark className={compact ? "h-9 w-9 [&_svg]:h-[22px] [&_svg]:w-[22px]" : undefined} />
      <span
        className={cn(
          brandSerif.className,
          "font-semibold leading-tight tracking-[0.04em]",
          compact ? "text-[0.95rem] sm:text-base" : "text-base sm:text-lg",
        )}
      >
        Stratford <span className="font-normal text-muted-foreground">Mercantile</span>
      </span>
    </Link>
  );
}

export { LogoMark };
