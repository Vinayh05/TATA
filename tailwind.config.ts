import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        tata: {
          navy: "#002D62",
          navyDark: "#001A3A",
          red: "#E31837",
          redHover: "#C4122C",
          dark: "#111827",
          charcoal: "#1F2937",
          muted: "#6B7280",
          light: "#F9FAFB",
          surface: "#FFFFFF",
          border: "#E5E7EB",
          borderDark: "#D1D5DB",
        },
      },
      fontFamily: {
        sans: [
          "-apple-system",
          "BlinkMacSystemFont",
          '"Segoe UI"',
          "Roboto",
          '"Helvetica Neue"',
          "Arial",
          "sans-serif",
        ],
      },
    },
  },
  plugins: [],
};
export default config;
