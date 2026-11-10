import Link from "next/link";
import { ArrowLeft, BookOpen } from "lucide-react";

interface HeaderProps {
  showBack?: boolean;
  backHref?: string;
  backLabel?: string;
}

export default function Header({
  showBack = false,
  backHref = "/",
  backLabel = "Back to brochures",
}: HeaderProps) {
  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-sm border-b border-tata-border shadow-[0_1px_3px_rgba(0,0,0,0.03)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-18">
          {/* Logo & Brand */}
          <div className="flex items-center space-x-3">
            <Link
              href="/"
              className="group flex items-center space-x-2.5 focus:outline-none focus:ring-2 focus:ring-tata-navy/20 rounded-md p-1 -m-1"
            >
              {/* Automotive Emblem Icon / Monogram */}
              <div className="w-8 h-8 rounded bg-tata-navy flex items-center justify-center text-white font-bold text-sm tracking-wider shadow-sm group-hover:bg-tata-navyDark transition-colors">
                T
              </div>
              <div className="flex flex-col">
                <span className="font-extrabold tracking-widest text-tata-dark text-base sm:text-lg leading-none uppercase">
                  TATA MOTORS
                </span>
                <span className="text-[10px] tracking-wider text-tata-muted font-medium uppercase mt-0.5">
                  Digital Brochures
                </span>
              </div>
            </Link>
          </div>

          {/* Navigation / Action */}
          <nav className="flex items-center">
            {showBack ? (
              <Link
                href={backHref}
                className="inline-flex items-center space-x-1.5 text-xs sm:text-sm font-semibold text-tata-charcoal hover:text-tata-red transition-colors py-2 px-3 rounded-md hover:bg-neutral-50 active:bg-neutral-100 border border-transparent hover:border-neutral-200"
              >
                <ArrowLeft className="w-4 h-4 text-tata-muted group-hover:text-tata-red transition-colors" />
                <span>{backLabel}</span>
              </Link>
            ) : (
              <Link
                href="/"
                className="inline-flex items-center space-x-1.5 text-xs sm:text-sm font-semibold text-tata-charcoal hover:text-tata-navy py-2 px-3 rounded-md hover:bg-neutral-50 transition-colors"
              >
                <BookOpen className="w-4 h-4 text-tata-navy" />
                <span>Brochures</span>
              </Link>
            )}
          </nav>
        </div>
      </div>
    </header>
  );
}
