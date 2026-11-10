import Link from "next/link";
import { ArrowRight, FileText, CheckCircle2 } from "lucide-react";
import { Brochure } from "@/lib/brochures";
import DownloadButton from "./DownloadButton";

interface BrochureCardProps {
  brochure: Brochure;
}

export default function BrochureCard({ brochure }: BrochureCardProps) {
  return (
    <div className="group relative bg-white rounded-xl border border-tata-border shadow-sm hover:shadow-md transition-all duration-200 overflow-hidden flex flex-col justify-between">
      {/* Top Accent Strip */}
      <div className="h-1.5 w-full bg-gradient-to-r from-tata-navy via-tata-navy to-tata-red" />

      <div className="p-6 sm:p-8 flex-1 flex flex-col">
        {/* Category & Badge */}
        <div className="flex items-center justify-between mb-4">
          <span className="inline-flex items-center text-xs font-bold uppercase tracking-wider text-tata-navy bg-blue-50 px-2.5 py-1 rounded-md border border-blue-100">
            {brochure.category}
          </span>
          <span className="text-xs text-tata-muted font-medium flex items-center">
            <FileText className="w-3.5 h-3.5 mr-1" />
            {brochure.fileSize}
          </span>
        </div>

        {/* Model & Title */}
        <div className="mb-4">
          <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-tata-dark uppercase">
            {brochure.name.toUpperCase()}
          </h3>
          <p className="text-base sm:text-lg font-semibold text-tata-red mt-0.5">
            {brochure.title}
          </p>
          <p className="text-xs italic text-tata-muted mt-0.5">
            &ldquo;{brochure.tagline}&rdquo;
          </p>
        </div>

        {/* Description */}
        <p className="text-sm text-tata-charcoal/80 leading-relaxed mb-6">
          {brochure.description}
        </p>

        {/* Key Highlights */}
        <div className="space-y-2 mb-6 pt-4 border-t border-neutral-100 flex-1">
          <p className="text-xs font-semibold text-tata-muted uppercase tracking-wider mb-2">
            Brochure Highlights
          </p>
          {brochure.keyHighlights.map((highlight, idx) => (
            <div key={idx} className="flex items-start text-xs text-tata-charcoal">
              <CheckCircle2 className="w-3.5 h-3.5 text-tata-navy mr-2 shrink-0 mt-0.5" />
              <span>{highlight}</span>
            </div>
          ))}
        </div>

        {/* Meta Info */}
        <div className="text-xs text-tata-muted flex items-center justify-between py-2 border-t border-neutral-100 mb-6">
          <span>{brochure.pageCount} Pages • High Resolution</span>
          <span>NFC Enabled</span>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
          <Link
            href={`/brochures/${brochure.slug}`}
            className="inline-flex items-center justify-center bg-tata-dark hover:bg-tata-charcoal text-white font-semibold text-sm px-4 py-3 rounded-lg shadow-sm hover:shadow transition-colors group-hover:bg-tata-navy"
          >
            <span>View Brochure</span>
            <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-0.5" />
          </Link>

          <DownloadButton
            brochureUrl={brochure.brochureUrl}
            fileName={brochure.fileName}
            variant="secondary"
            label="Download PDF"
            className="w-full"
          />
        </div>
      </div>
    </div>
  );
}
