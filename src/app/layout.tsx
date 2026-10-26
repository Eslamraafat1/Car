import type { Metadata, Viewport } from "next";
import { Inter, Tajawal, Space_Grotesk } from "next/font/google";
import { MotionConfig } from "framer-motion";
import "./globals.css";
import { LanguageProvider } from "@/lib/i18n";
import { ThemeProvider } from "@/lib/theme";
import SmoothScrollProvider from "@/components/automotive/SmoothScrollProvider";
import AutomotiveNavbar from "@/components/automotive/AutomotiveNavbar";
import AutomotiveFooter from "@/components/automotive/AutomotiveFooter";
import ScrollProgress from "@/components/ui/ScrollProgress";
import BackToTop from "@/components/ui/BackToTop";
import CommandPalette from "@/components/ui/CommandPalette";
import CursorAura from "@/components/ui/CursorAura";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const arabic = Tajawal({
  subsets: ["arabic"],
  weight: ["400", "500", "700", "800", "900"],
  variable: "--font-ar",
  display: "swap",
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

const themeInitScript = `(function(){try{var t=localStorage.getItem("evay-theme");var d=t==="dark";var r=document.documentElement;r.classList.toggle("dark",d);r.style.colorScheme=d?"dark":"light";}catch(e){}})();`;

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="ar"
      dir="rtl"
      className={`${inter.variable} ${arabic.variable} ${grotesk.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-ink text-fog">
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
        <MotionConfig reducedMotion="user">
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
              <CommandPalette />
              <main id="main-content">{children}</main>
              <AutomotiveFooter />
              <BackToTop />
              <CursorAura />
            </LanguageProvider>
          </ThemeProvider>
        </MotionConfig>
      </body>
    </html>
  );
}
