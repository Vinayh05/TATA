import Header from "@/components/Header";
import BrochureCard from "@/components/BrochureCard";
import { getAllBrochures } from "@/lib/brochures";
import { Smartphone, BookOpen, Download, ShieldCheck } from "lucide-react";

export default function HomePage() {
  const brochures = getAllBrochures();

  return (
    <div className="min-h-screen flex flex-col">
      {/* Minimal Header */}
      <Header />

      {/* Main Content */}
      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-white border-b border-tata-border py-12 sm:py-16 md:py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl">
              {/* Subtle Tag */}
              <div className="inline-flex items-center space-x-2 bg-neutral-100 border border-neutral-200 px-3 py-1 rounded-full text-xs font-semibold text-tata-charcoal uppercase tracking-wider mb-4">
                <Smartphone className="w-3.5 h-3.5 text-tata-navy" />
                <span>NFC Enabled Digital Experience</span>
              </div>

              {/* Headings */}
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-tata-dark tracking-tight leading-tight">
                Digital Brochures
              </h1>
              <p className="text-xl sm:text-2xl font-medium text-tata-charcoal mt-2">
                Explore Tata Motors vehicle brochures.
              </p>

              {/* Short Supporting Text */}
              <p className="text-sm sm:text-base text-tata-muted mt-3 leading-relaxed">
                View vehicle brochures online or download the original brochure
                for later.
              </p>
            </div>
          </div>
        </section>

        {/* Brochure Catalog Section */}
        <section className="py-10 sm:py-14 bg-[#F9FAFB]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between mb-8 pb-3 border-b border-tata-border">
              <div>
                <h2 className="text-lg sm:text-xl font-bold text-tata-dark tracking-tight">
                  Available Vehicles
                </h2>
                <p className="text-xs text-tata-muted mt-0.5">
                  Select a vehicle to inspect the brochure in-browser or download
                </p>
              </div>
              <span className="text-xs font-semibold text-tata-muted bg-white px-3 py-1 rounded-full border border-tata-border shadow-xs">
                {brochures.length} {brochures.length === 1 ? "Brochure" : "Brochures"} Available
              </span>
            </div>

            {/* Brochure Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {brochures.map((brochure) => (
                <BrochureCard key={brochure.slug} brochure={brochure} />
              ))}
            </div>

            {/* Supporting Information Box */}
            <div className="mt-12 sm:mt-16 bg-white rounded-xl border border-tata-border p-6 sm:p-8">
              <h3 className="text-sm font-bold uppercase tracking-wider text-tata-dark mb-4">
                How It Works
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-sm">
                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 rounded-lg bg-blue-50 text-tata-navy flex items-center justify-center shrink-0 mt-0.5 font-bold text-xs">
                    01
                  </div>
                  <div>
                    <h4 className="font-semibold text-tata-dark">Instant NFC Tap</h4>
                    <p className="text-xs text-tata-muted mt-1 leading-relaxed">
                      Tap your phone against any Tata showroom or smart card display to launch directly.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 rounded-lg bg-neutral-100 text-tata-dark flex items-center justify-center shrink-0 mt-0.5 font-bold text-xs">
                    02
                  </div>
                  <div>
                    <h4 className="font-semibold text-tata-dark">In-Browser Reader</h4>
                    <p className="text-xs text-tata-muted mt-1 leading-relaxed">
                      Flip through pages, zoom into features, and inspect specs without downloading bulky files.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 rounded-lg bg-red-50 text-tata-red flex items-center justify-center shrink-0 mt-0.5 font-bold text-xs">
                    03
                  </div>
                  <div>
                    <h4 className="font-semibold text-tata-dark">Original PDF Download</h4>
                    <p className="text-xs text-tata-muted mt-1 leading-relaxed">
                      Download the genuine, unmodified official Tata Motors PDF brochure to save on your device.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-tata-border py-8 text-center text-xs text-tata-muted">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center space-x-2">
            <span className="font-extrabold tracking-wider text-tata-dark">TATA MOTORS</span>
            <span>•</span>
            <span>Digital Brochure Portal</span>
          </div>
          <p>© {new Date().getFullYear()} Tata Motors Passenger Vehicles. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
