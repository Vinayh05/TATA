# Tata Motors - Digital Brochure Web Platform

A production-ready digital brochure web application for **Tata Motors Passenger Vehicles**.

Designed specifically for **NFC smart cards** and direct QR code scans at Tata showrooms and exhibitions. Customers tap their phone, instantly land on the vehicle's digital brochure inside the browser, flip through high-resolution pages, and have a one-click option to download the original official PDF.

---

## Key Features

- **In-Browser PDF Reader**: Fast, canvas-based brochure viewing with page flipping (`Prev` / `Next` / direct page number jumper), zoom controls (`+`, `-`, `Fit Width`), and fullscreen mode.
- **Original PDF Downloads**: Dedicated, high-visibility "Download Brochure" buttons that download the genuine, unmodified official Tata Motors PDF brochure directly (`next-gen-tiago-brochure-may.pdf`, 63.6 MB).
- **Mobile-First NFC Optimization**: Touch targets $\ge 44\times 44\text{px}$, responsive fit-to-width, sticky bottom mobile controls, zero awkward horizontal panning.
- **Automotive Design Aesthetic**: Clean, restrained Tata Motors visual identity (light background `#F9FAFB`, charcoal typography `#111827`, subtle micro-borders, and Tata red accents `#E31837`).
- **Zero Third-Party Dependency / 100% Self-Hosted**: Self-hosted PDF.js worker in `public/` ensures offline resilience and zero CDN failure.
- **Vercel-Ready Architecture**: Clean Next.js App Router with TypeScript and static generation (`generateStaticParams`).

---

## Project Structure

```text
.
├── public/
│   ├── brochures/
│   │   └── tiago/
│   │       └── next-gen-tiago-brochure-may.pdf   # Original official PDF brochure
│   ├── favicon.svg
│   ├── pdf.worker.min.mjs                        # Self-hosted PDF.js worker
│   └── pdf.worker.mjs
│
├── app/
│   ├── layout.tsx                                # Root layout & meta tags
│   ├── globals.css                               # Tailwind directives & viewer styles
│   ├── page.tsx                                  # Homepage (Hero & available cards)
│   ├── not-found.tsx                             # Custom "Brochure unavailable" page
│   └── brochures/
│       ├── page.tsx                              # Redirects to /
│       └── [slug]/
│           └── page.tsx                          # Dynamic vehicle brochure page
│
├── components/
│   ├── Header.tsx                                # Automotive Tata Motors header
│   ├── BrochureCard.tsx                          # Vehicle card with specs & CTA
│   ├── BrochureViewer.tsx                        # Canvas PDF viewer with controls
│   ├── DynamicBrochureViewer.tsx                 # Dynamic client wrapper (no SSR)
│   └── DownloadButton.tsx                        # Direct original PDF download button
│
├── lib/
│   └── brochures.ts                              # Central brochure metadata registry
│
├── package.json
├── tsconfig.json
├── tailwind.config.ts
├── postcss.config.mjs
└── next.config.mjs
```

---

## How to Add Future Brochures

Adding another Tata vehicle brochure (e.g. Punch, Nexon, Harrier) takes less than 2 minutes:

1. Place the official PDF into `public/brochures/<slug>/`:
   ```text
   public/brochures/punch/punch-brochure.pdf
   ```

2. Add the vehicle metadata entry into `lib/brochures.ts`:
   ```ts
   {
     slug: "punch",
     name: "Punch",
     title: "Tata Punch",
     tagline: "Vibes With You",
     category: "Compact SUV",
     brochureUrl: "/brochures/punch/punch-brochure.pdf",
     fileName: "punch-brochure.pdf",
     fileSize: "45.2 MB",
     pageCount: 24,
     badge: "Official Brochure",
     description: "Explore specifications, colors, and technology of the Tata Punch.",
     keyHighlights: [
       "5-Star GNCAP Safety Rating",
       "Commanding SUV Stance",
       "Harman Audio Experience"
     ]
   }
   ```

3. The homepage catalog and direct URL (`/brochures/punch`) will automatically generate at build time.

---

## NFC Card URL Configuration

Configure your NFC smart cards to point directly to the individual vehicle URL:

```text
https://YOUR-DOMAIN.com/brochures/tiago
```

This bypasses the homepage and lands the customer directly inside the Tiago brochure reader.

---

## Running Locally

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Run production build
npm run build

# Start production server
npm run start
```
