import type { Metadata, Viewport } from "next";
import { Caveat, Inter } from "next/font/google";
import Script from "next/script";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const caveat = Caveat({
  variable: "--font-caveat",
  subsets: ["latin"],
  display: "swap",
  weight: ["600", "700"],
});

export const metadata: Metadata = {
  title: "Bhaskar Pandey - Full Stack Developer",
  description:
    "Bhaskar Pandey is a full stack developer building thoughtful web experiences, scalable APIs, and reliable data systems.",
};

export const viewport: Viewport = {
  themeColor: "#fafcfc",
};

const themeInitializer = `
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  let savedTheme = null;

  try {
    savedTheme = localStorage.getItem("theme");
  } catch {}

  const theme = savedTheme === "light" || savedTheme === "dark"
    ? savedTheme
    : prefersDark
      ? "dark"
      : "light";

  try {
    document.documentElement.classList.toggle("dark", theme === "dark");
    document.documentElement.dataset.theme = theme;
    document.documentElement.style.colorScheme = theme;
    document
      .querySelector('meta[name="theme-color"]')
      ?.setAttribute("content", theme === "dark" ? "#071412" : "#fafcfc");
  } catch {
    document.documentElement.dataset.theme = "light";
    document.documentElement.style.colorScheme = "light";
  }
`;

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${inter.variable} ${caveat.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col overflow-x-hidden">
        <a
          href="#main-content"
          className="fixed start-4 top-4 z-modal -translate-y-24 rounded-full bg-accent px-4 py-2 text-sm font-semibold text-accent-foreground shadow-elevated transition-transform duration-150 ease-out focus-visible:translate-y-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus-ring"
        >
          Skip to content
        </a>
        {children}
        <Script id="theme-initializer" strategy="beforeInteractive">
          {themeInitializer}
        </Script>
      </body>
    </html>
  );
}
