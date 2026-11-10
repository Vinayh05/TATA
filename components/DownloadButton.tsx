import { Download } from "lucide-react";

interface DownloadButtonProps {
  brochureUrl: string;
  fileName: string;
  fileSize?: string;
  variant?: "primary" | "secondary" | "compact";
  className?: string;
  label?: string;
}

export default function DownloadButton({
  brochureUrl,
  fileName,
  fileSize,
  variant = "primary",
  className = "",
  label = "Download Brochure",
}: DownloadButtonProps) {
  const baseClasses =
    "inline-flex items-center justify-center font-medium transition-all duration-150 select-none focus:outline-none focus:ring-2 focus:ring-offset-2 active:scale-[0.98]";

  const variantClasses = {
    primary:
      "bg-tata-red hover:bg-tata-redHover text-white shadow-sm hover:shadow-md focus:ring-tata-red/50 rounded-lg px-4 sm:px-5 py-2.5 sm:py-3 text-sm sm:text-base font-semibold",
    secondary:
      "bg-white hover:bg-neutral-50 text-tata-dark border border-tata-border hover:border-neutral-300 shadow-sm focus:ring-tata-navy/20 rounded-lg px-4 py-2.5 text-sm font-semibold",
    compact:
      "bg-neutral-100 hover:bg-neutral-200 text-tata-dark rounded-md px-3 py-1.5 text-xs font-semibold focus:ring-neutral-400",
  };

  return (
    <a
      href={brochureUrl}
      download={fileName}
      className={`${baseClasses} ${variantClasses[variant]} ${className}`}
      title={`Download ${fileName}`}
    >
      <Download className="w-4 h-4 mr-2 shrink-0 stroke-[2.2]" />
      <span>{label}</span>
      {fileSize && variant !== "compact" && (
        <span className="ml-2 text-xs opacity-85 font-normal tracking-wide">
          ({fileSize})
        </span>
      )}
    </a>
  );
}
