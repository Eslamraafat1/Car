import type { Metadata, Viewport } from "next";
import { Inter, IBM_Plex_Sans_Arabic, Readex_Pro, Space_Grotesk } from "next/font/google";
import "./globals.css";
import { LanguageProvider } from "@/lib/i18n";
import { ThemeProvider } from "@/lib/theme";
import SmoothScrollProvider from "@/components/automotive/SmoothScrollProvider";
import AutomotiveNavbar from "@/components/automotive/AutomotiveNavbar";
import AutomotiveFooter from "@/components/automotive/AutomotiveFooter";
import ScrollProgress from "@/components/ui/ScrollProgress";
import BackToTop from "@/components/ui/BackToTop";
import LazyCommandPalette from "@/components/ui/LazyCommandPalette";
import CursorAura from "@/components/ui/CursorAura";
import Loader from "@/components/ui/Loader";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const arabic = IBM_Plex_Sans_Arabic({
  subsets: ["arabic"],
  weight: ["400", "600"],
  variable: "--font-ar",
  display: "swap",
  preload: false,
});

const arabicDisplay = Readex_Pro({
  subsets: ["arabic"],
  weight: ["600"],
  variable: "--font-ar-display",
  display: "swap",
  preload: false,
});

const grotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-grotesk",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"),
  title: {
    default: "EVAY — شريكك في عالم السيارات | Premium Automotive Partner",
    template: "%s · EVAY",
  },
  description:
    "إيفاي: بروفايل شركة متخصصة في السيارات الفاخرة والكهربائية — خبرة وشفافية وخدمة ما بعد البيع. Evay is a premium automotive partner built on expertise, transparency and care.",
  keywords: ["automotive", "company profile", "cars", "luxury cars", "electric cars", "سيارات", "بروفايل شركة"],
  openGraph: {
    type: "website",
    title: "EVAY — Premium Automotive Partner",
    description: "Expertise, transparency and care for every detail — luxury, performance and electric cars.",
    images: [{ url: "/media/images/hero-poster.jpg", width: 2400, height: 1600 }],
  },
};

export const viewport: Viewport = {
  colorScheme: "light dark",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f4f4f6" },
    { media: "(prefers-color-scheme: dark)", color: "#070809" },
  ],
};

const themeInitScript = `(function(){try{var t=localStorage.getItem("evay-theme");var d=t==="dark";var r=document.documentElement;r.classList.toggle("dark",d);r.style.colorScheme=d?"dark":"light";}catch(e){}try{if(localStorage.getItem("evay-lang")==="en"){r.lang="en";r.dir="ltr";}}catch(e){}try{if(!sessionStorage.getItem("evay-loaded"))document.documentElement.classList.add("has-loader");}catch(e){}})();`;

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="ar"
      dir="rtl"
      suppressHydrationWarning
      className={`${inter.variable} ${arabic.variable} ${arabicDisplay.variable} ${grotesk.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-ink text-fog">
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
        <Loader />
          <ThemeProvider>
            <LanguageProvider>
              <SmoothScrollProvider />
              <ScrollProgress />
              <a
                href="#main-content"
                className="sr-only z-[100] rounded-full bg-volt px-4 py-2 text-sm font-semibold text-white focus:not-sr-only focus:fixed focus:start-4 focus:top-4"
              >
                تخطَّ إلى المحتوى · Skip to content
              </a>
              <AutomotiveNavbar />
              <LazyCommandPalette />
              <main id="main-content">{children}</main>
              <AutomotiveFooter />
              <BackToTop />
              <CursorAura />
            </LanguageProvider>
          </ThemeProvider>
      </body>
    </html>
  );
}
