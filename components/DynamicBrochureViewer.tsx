"use client";

import dynamic from "next/dynamic";
import { Loader2 } from "lucide-react";

const BrochureViewer = dynamic(() => import("./BrochureViewer"), {
  ssr: false,
  loading: () => (
    <div className="w-full min-h-[500px] bg-white rounded-2xl border border-tata-border flex flex-col items-center justify-center text-tata-muted p-8 shadow-xs">
      <Loader2 className="w-10 h-10 animate-spin text-tata-red mb-3" />
      <p className="text-sm font-semibold text-tata-dark">
        Initializing Digital Brochure Experience...
      </p>
      <p className="text-xs text-tata-muted mt-1">
        Preparing seamless interactive view
      </p>
    </div>
  ),
});

export default BrochureViewer;
