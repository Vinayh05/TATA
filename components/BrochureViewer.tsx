"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import {
  Download,
  ArrowUp,
  Loader2,
  FileText,
  AlertTriangle,
  ChevronDown,
  Sparkles,
  Smartphone,
  ExternalLink,
} from "lucide-react";
import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";

// Polyfill Promise.withResolvers for browsers and environments that lack native support
if (
  typeof window !== "undefined" &&
  typeof (Promise as any).withResolvers === "undefined"
) {
  (Promise as any).withResolvers = function <T>() {
    let resolve!: (value: T | PromiseLike<T>) => void;
    let reject!: (reason?: any) => void;
    const promise = new Promise<T>((res, rej) => {
      resolve = res;
      reject = rej;
    });
    return { promise, resolve, reject };
  };
}

// Self-hosted worker source
if (typeof window !== "undefined") {
  pdfjs.GlobalWorkerOptions.workerSrc = "/pdf.worker.min.mjs";
}

interface BrochureViewerProps {
  brochureUrl: string;
  fileName: string;
  title: string;
  fileSize?: string;
  pageCount?: number;
}

interface PageItemProps {
  pageNumber: number;
  width: number;
  onPageIntersect?: (pageNumber: number) => void;
}

function LazyBrochurePage({
  pageNumber,
  width,
  onPageIntersect,
}: PageItemProps) {
  // Eagerly render first 2 pages immediately
  const [isVisible, setIsVisible] = useState<boolean>(pageNumber <= 2);
  const containerRef = useRef<HTMLDivElement>(null);

  // Aspect ratio 1080 x 1920 (9:16 portrait)
  const estimatedHeight = Math.round(width * (1920 / 1080));

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    // Visibility observer to mount canvas 600px ahead of scroll
    const visibilityObserver = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { rootMargin: "600px 0px 600px 0px" }
    );

    // Active page observer for sticky progress bar
    const activeObserver = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && onPageIntersect) {
          onPageIntersect(pageNumber);
        }
      },
      { threshold: 0.3 }
    );

    visibilityObserver.observe(el);
    activeObserver.observe(el);

    return () => {
      visibilityObserver.disconnect();
      activeObserver.disconnect();
    };
  }, [pageNumber, onPageIntersect]);

  return (
    <div
      ref={containerRef}
      id={`page-${pageNumber}`}
      data-page-number={pageNumber}
      className="w-full flex justify-center py-2 sm:py-4 transition-all"
    >
      <div
        style={{ width: `${width}px`, minHeight: `${estimatedHeight}px` }}
        className="w-full rounded-xl sm:rounded-2xl overflow-hidden bg-white shadow-[0_4px_20px_rgba(0,0,0,0.06)] border border-neutral-200/90 relative transition-shadow hover:shadow-[0_8px_30px_rgba(0,0,0,0.1)]"
      >
        {isVisible ? (
          <Page
            pageNumber={pageNumber}
            width={width}
            renderTextLayer={false}
            renderAnnotationLayer={false}
            loading={
              <div
                style={{ width: `${width}px`, height: `${estimatedHeight}px` }}
                className="w-full bg-neutral-100/90 flex flex-col items-center justify-center text-neutral-400"
              >
                <Loader2 className="w-7 h-7 animate-spin text-tata-red mb-2" />
                <span className="text-xs font-semibold text-neutral-500">
                  Loading Section {pageNumber}...
                </span>
              </div>
            }
          />
        ) : (
          <div
            style={{ width: `${width}px`, height: `${estimatedHeight}px` }}
            className="w-full bg-neutral-100/50 flex flex-col items-center justify-center text-neutral-400 select-none"
          >
            <div className="w-9 h-9 rounded-full bg-neutral-200/70 flex items-center justify-center text-xs font-bold text-neutral-500 mb-2">
              {pageNumber}
            </div>
            <span className="text-xs text-neutral-400 font-medium">
              Section {pageNumber}
            </span>
          </div>
        )}

        {/* Subtle section watermark indicator */}
        <div className="absolute bottom-3 right-3 bg-neutral-900/60 backdrop-blur-xs text-white text-[10px] font-medium px-2 py-0.5 rounded opacity-0 sm:opacity-40 hover:opacity-100 transition-opacity pointer-events-none">
          {pageNumber}
        </div>
      </div>
    </div>
  );
}

export default function BrochureViewer({
  brochureUrl,
  fileName,
  title,
  fileSize = "63.6 MB",
  pageCount = 28,
}: BrochureViewerProps) {
  const [numPages, setNumPages] = useState<number>(pageCount);
  const [activePage, setActivePage] = useState<number>(1);
  const [containerWidth, setContainerWidth] = useState<number>(768);
  const [showStickyBar, setShowStickyBar] = useState<boolean>(false);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const streamWrapperRef = useRef<HTMLDivElement>(null);

  // Responsive width calculation: full width on mobile, capped at 768px on desktop for readability
  const updateWidth = useCallback(() => {
    if (typeof window !== "undefined") {
      const screenWidth = window.innerWidth;
      if (screenWidth < 640) {
        // Mobile: comfortable margin
        setContainerWidth(Math.min(screenWidth - 24, 480));
      } else if (screenWidth < 1024) {
        setContainerWidth(Math.min(screenWidth - 64, 680));
      } else {
        // Desktop: optimal presentation size
        setContainerWidth(760);
      }
    }
  }, []);

  useEffect(() => {
    updateWidth();
    window.addEventListener("resize", updateWidth);
    return () => window.removeEventListener("resize", updateWidth);
  }, [updateWidth]);

  // Track window scroll to reveal sticky top reading bar
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setShowStickyBar(scrollY > 280);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  function onDocumentLoadSuccess({ numPages }: { numPages: number }) {
    setNumPages(numPages);
    setIsLoading(false);
    setLoadError(null);
  }

  function onDocumentLoadError(error: Error) {
    console.error("Failed to load PDF in stream:", error);
    setLoadError(
      "Unable to render the brochure directly in the browser canvas."
    );
    setIsLoading(false);
  }

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handlePageIntersect = useCallback((pageNumber: number) => {
    setActivePage(pageNumber);
  }, []);

  const progressPercent = Math.min(
    100,
    Math.round((activePage / (numPages || 28)) * 100)
  );

  return (
    <div className="w-full flex flex-col items-center">
      {/* Floating Bottom Navigation Pill (Visible on scroll) */}
      <div
        className={`fixed bottom-6 left-1/2 -translate-x-1/2 z-40 bg-neutral-900/90 hover:bg-neutral-900 backdrop-blur-md text-white rounded-full pl-4 pr-2 py-2 shadow-2xl border border-neutral-700/80 transition-all duration-300 flex items-center space-x-3 select-none max-w-[92vw] ${
          showStickyBar
            ? "translate-y-0 opacity-100 scale-100"
            : "translate-y-12 opacity-0 scale-95 pointer-events-none"
        }`}
      >
        <div className="flex items-center space-x-2 text-xs font-medium pr-1">
          <span className="w-2 h-2 rounded-full bg-tata-red animate-pulse" />
          <span className="text-neutral-300">
            Page <strong className="text-white font-bold">{activePage}</strong> of {numPages}
          </span>
        </div>

        <div className="h-4 w-px bg-neutral-700 hidden sm:block" />

        <a
          href={brochureUrl}
          download={fileName}
          className="inline-flex items-center bg-tata-red hover:bg-tata-redHover text-white text-xs font-semibold px-3 py-1.5 rounded-full transition-colors shadow-xs active:scale-95"
          title={`Download original ${fileName}`}
        >
          <Download className="w-3.5 h-3.5 mr-1" />
          <span>Download PDF</span>
        </a>

        <button
          type="button"
          onClick={scrollToTop}
          className="p-1.5 rounded-full bg-neutral-800 hover:bg-neutral-700 text-neutral-300 hover:text-white transition-colors"
          title="Back to Top"
          aria-label="Back to Top"
        >
          <ArrowUp className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Main Continuous Brochure Stream */}
      <div
        ref={streamWrapperRef}
        className="w-full flex flex-col items-center py-4 sm:py-6"
      >
        {loadError ? (
          <div className="max-w-md w-full bg-white border border-tata-border rounded-xl p-8 my-12 text-center shadow-sm">
            <AlertTriangle className="w-12 h-12 text-amber-500 mx-auto mb-3" />
            <h4 className="text-lg font-bold text-tata-dark mb-2">
              Brochure Display Notice
            </h4>
            <p className="text-sm text-tata-muted mb-6 leading-relaxed">
              {loadError} You can open or download the complete original high-resolution Tata brochure directly.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <a
                href={brochureUrl}
                download={fileName}
                className="inline-flex items-center justify-center bg-tata-red hover:bg-tata-redHover text-white font-semibold text-sm px-5 py-2.5 rounded-lg transition-colors shadow-sm"
              >
                <Download className="w-4 h-4 mr-2" />
                Download Original PDF ({fileSize})
              </a>
              <a
                href={brochureUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center bg-neutral-100 hover:bg-neutral-200 text-tata-dark font-semibold text-sm px-4 py-2.5 rounded-lg transition-colors"
              >
                <ExternalLink className="w-4 h-4 mr-2" />
                Open in New Tab
              </a>
            </div>
          </div>
        ) : (
          <div className="w-full flex flex-col items-center">
            {/* Guide Hint */}
            <div className="inline-flex items-center space-x-1.5 text-xs text-tata-muted mb-4 bg-white px-3.5 py-1.5 rounded-full border border-tata-border shadow-xs">
              <ChevronDown className="w-3.5 h-3.5 text-tata-red animate-bounce" />
              <span>Scroll down to explore all {numPages} vehicle pages</span>
            </div>

            <Document
              file={brochureUrl}
              onLoadSuccess={onDocumentLoadSuccess}
              onLoadError={onDocumentLoadError}
              loading={
                <div className="flex flex-col items-center justify-center py-20 text-neutral-400">
                  <Loader2 className="w-10 h-10 animate-spin text-tata-red mb-3" />
                  <p className="text-sm font-semibold text-tata-dark">
                    Rendering Tata Motors Digital Brochure...
                  </p>
                  <p className="text-xs text-tata-muted mt-1">
                    Loading high-resolution pages for seamless scrolling
                  </p>
                </div>
              }
            >
              {Array.from(new Array(numPages), (_, index) => (
                <LazyBrochurePage
                  key={`page_${index + 1}`}
                  pageNumber={index + 1}
                  width={containerWidth}
                  onPageIntersect={handlePageIntersect}
                />
              ))}
            </Document>

            {/* End of Brochure Completed Banner */}
            <div className="w-full max-w-xl mx-auto mt-12 bg-white rounded-2xl border border-tata-border p-6 sm:p-8 text-center shadow-sm">
              <div className="w-12 h-12 rounded-full bg-red-50 text-tata-red flex items-center justify-center mx-auto mb-3 border border-red-100">
                <Sparkles className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-tata-dark mb-1">
                You&apos;ve Viewed the Complete Brochure
              </h3>
              <p className="text-xs sm:text-sm text-tata-muted mb-6 leading-relaxed">
                Save the genuine, high-resolution official Tata Motors PDF on your phone or computer for offline reference.
              </p>

              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <a
                  href={brochureUrl}
                  download={fileName}
                  className="inline-flex items-center justify-center bg-tata-red hover:bg-tata-redHover text-white font-semibold text-sm px-6 py-3 rounded-lg shadow-sm transition-colors"
                >
                  <Download className="w-4 h-4 mr-2" />
                  Download Original PDF ({fileSize})
                </a>

                <button
                  type="button"
                  onClick={scrollToTop}
                  className="inline-flex items-center justify-center bg-neutral-100 hover:bg-neutral-200 text-tata-dark font-semibold text-sm px-5 py-3 rounded-lg transition-colors"
                >
                  <ArrowUp className="w-4 h-4 mr-2" />
                  Back to Top
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
