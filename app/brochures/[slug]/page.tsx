import { Metadata } from "next";
import { notFound } from "next/navigation";
import Header from "@/components/Header";
import DownloadButton from "@/components/DownloadButton";
import DynamicBrochureViewer from "@/components/DynamicBrochureViewer";
import { getBrochureBySlug, getAllBrochures } from "@/lib/brochures";
import { Smartphone, Sparkles, Shield, Award } from "lucide-react";

interface PageProps {
  params: {
    slug: string;
  };
}

export async function generateStaticParams() {
  const brochures = getAllBrochures();
  return brochures.map((b) => ({
    slug: b.slug,
  }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const brochure = getBrochureBySlug(params.slug);
  if (!brochure) {
    return {
      title: "Brochure Unavailable | Tata Motors",
    };
  }

  return {
    title: `${brochure.name} - ${brochure.title} | Official Digital Brochure | Tata Motors`,
    description: brochure.description,
    openGraph: {
      title: `${brochure.name} - ${brochure.title} Official Brochure`,
      description: brochure.description,
    },
  };
}

export default function BrochureDetailPage({ params }: PageProps) {
  const brochure = getBrochureBySlug(params.slug);

  if (!brochure) {
    notFound();
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#F9FAFB]">
      {/* Header with Back to brochures */}
      <Header showBack={true} backHref="/" backLabel="Back to brochures" />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-3 sm:px-6 lg:px-8 py-4 sm:py-6 flex flex-col">
        {/* Vehicle Title & Action Header */}
        <div className="bg-white rounded-xl border border-tata-border p-4 sm:p-6 mb-4 sm:mb-6 shadow-xs flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <div className="flex items-center space-x-2 mb-1.5">
              <span className="text-[11px] font-extrabold uppercase tracking-widest text-tata-navy bg-blue-50 px-2 py-0.5 rounded border border-blue-100">
                {brochure.category}
              </span>
              <span className="text-xs text-tata-muted font-medium flex items-center">
                <Smartphone className="w-3 h-3 mr-1 text-tata-muted" />
                NFC Tap Verified
              </span>
            </div>

            <div className="flex flex-wrap items-baseline gap-x-3">
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-tata-dark uppercase tracking-tight">
                {brochure.name}
              </h1>
              <p className="text-lg sm:text-xl font-bold text-tata-red">
                {brochure.title}
              </p>
            </div>

            <p className="text-xs sm:text-sm text-tata-muted mt-1">
              &ldquo;{brochure.tagline}&rdquo; • Official manufacturer specification and feature catalogue ({brochure.fileSize})
            </p>
          </div>

          {/* Prominent Download Button */}
          <div className="flex items-center space-x-3 shrink-0">
            <DownloadButton
              brochureUrl={brochure.brochureUrl}
              fileName={brochure.fileName}
              fileSize={brochure.fileSize}
              variant="primary"
              label="Download Brochure"
              className="w-full sm:w-auto text-sm sm:text-base py-3 px-5 shadow"
            />
          </div>
        </div>

        {/* Main In-Browser PDF Brochure Stream */}
        <section className="flex-1 flex flex-col items-center">
          <DynamicBrochureViewer
            brochureUrl={brochure.brochureUrl}
            fileName={brochure.fileName}
            title={`${brochure.name} - ${brochure.title}`}
            fileSize={brochure.fileSize}
            pageCount={brochure.pageCount}
          />
        </section>

        {/* Quick Highlights / Specifications Summary below Viewer */}
        <section className="mt-6 bg-white rounded-xl border border-tata-border p-5 sm:p-6 shadow-xs">
          <h2 className="text-sm font-bold uppercase tracking-wider text-tata-dark mb-3">
            About {brochure.name}
          </h2>
          <p className="text-sm text-tata-charcoal/85 leading-relaxed mb-4">
            {brochure.description}
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 pt-3 border-t border-neutral-100 text-xs">
            {brochure.keyHighlights.map((highlight, idx) => (
              <div
                key={idx}
                className="flex items-center space-x-2 text-tata-charcoal bg-neutral-50 p-2.5 rounded-lg border border-neutral-100"
              >
                <Award className="w-4 h-4 text-tata-navy shrink-0" />
                <span className="font-medium">{highlight}</span>
              </div>
            ))}
          </div>
        </section>
      </main>

      {/* Minimal Footer */}
      <footer className="bg-white border-t border-tata-border py-4 text-center text-xs text-tata-muted mt-6">
        <div className="max-w-7xl mx-auto px-4 flex items-center justify-between">
          <span className="font-bold tracking-wider text-tata-dark">TATA MOTORS</span>
          <span>Official Digital Brochure Reader</span>
        </div>
      </footer>
    </div>
  );
}
