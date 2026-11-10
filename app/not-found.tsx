import Link from "next/link";
import Header from "@/components/Header";
import { AlertCircle, ArrowLeft, BookOpen } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col bg-[#F9FAFB]">
      <Header />

      <main className="flex-1 flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white rounded-xl border border-tata-border shadow-sm p-8 text-center">
          <div className="w-12 h-12 rounded-full bg-red-50 text-tata-red flex items-center justify-center mx-auto mb-4 border border-red-100">
            <AlertCircle className="w-6 h-6 stroke-[2.2]" />
          </div>

          <h1 className="text-2xl font-extrabold text-tata-dark tracking-tight mb-2">
            Brochure Unavailable
          </h1>

          <p className="text-sm text-tata-muted mb-6 leading-relaxed">
            The requested vehicle brochure could not be found or has not been published yet. Please return to the brochure directory to view available models.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/"
              className="inline-flex items-center justify-center bg-tata-dark hover:bg-tata-charcoal text-white font-semibold text-sm px-5 py-2.5 rounded-lg transition-colors shadow-sm"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              <span>Back to Brochures</span>
            </Link>
          </div>
        </div>
      </main>

      <footer className="bg-white border-t border-tata-border py-4 text-center text-xs text-tata-muted">
        <p>© {new Date().getFullYear()} Tata Motors. Official Digital Brochure Platform.</p>
      </footer>
    </div>
  );
}
