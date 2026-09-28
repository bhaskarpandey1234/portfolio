import { DownloadSimple, Timer } from "@phosphor-icons/react/ssr";
import Link from "next/link";
import { ThemeToggle } from "@/components/portfolio/theme-toggle";

const navigation = [
  { label: "Home", href: "#home", current: true },
  { label: "About", href: "#about", current: false },
  { label: "Projects", href: "#projects", current: false },
  { label: "Experience", href: "#experience", current: false },
  { label: "Skills", href: "#skills", current: false },
  { label: "Contact", href: "#contact", current: false },
] as const;

export function SiteHeader() {
  return (
    <header className="relative z-navigation w-full shrink-0 px-5 py-4 sm:px-8 lg:px-12">
      <nav
        aria-label="Main navigation"
        className="mx-auto flex min-h-12 w-full max-w-7xl items-center justify-between gap-4"
      >
        <Link
          href="#home"
          aria-label="Bhaskar Pandey home"
          className="group inline-flex min-h-11 shrink-0 items-center rounded-md px-1 text-2xl font-extrabold tracking-[-0.04em] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-focus-ring"
        >
          <span className="text-foreground transition-colors duration-150 group-hover:text-muted-foreground">
            B
          </span>
          <span className="text-accent transition-colors duration-150 group-hover:text-accent-hover">
            P
          </span>
        </Link>

        <div className="hidden min-w-0 items-center gap-7 text-sm font-medium text-muted-foreground lg:flex">
          {navigation.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              aria-current={item.current ? "page" : undefined}
              className={
                item.current
                  ? "relative py-2 font-semibold text-accent after:absolute after:inset-x-0 after:bottom-0 after:h-0.5 after:rounded-full after:bg-accent focus-visible:rounded-sm focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-focus-ring"
                  : "rounded-sm py-2 transition-colors duration-150 hover:text-accent focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-focus-ring"
              }
            >
              {item.label}
            </Link>
          ))}
        </div>

        <div className="flex shrink-0 items-center gap-1 sm:gap-2">
          <ThemeToggle />
          <a
            href="/resume.pdf"
            download
            className="active:scale-0.97 inline-flex min-h-11 items-center justify-center gap-1.5 rounded-full border border-accent bg-surface px-3 text-xs font-semibold whitespace-nowrap text-accent shadow-[0_8px_24px_rgb(var(--shadow-color)/10%)] transition-[color,background-color,border-color,transform] duration-150 ease-out hover:border-accent-hover hover:bg-accent-soft hover:text-accent-hover focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus-ring sm:px-4"
          >
            <Timer aria-hidden="true" className="shrink-0" size={15} weight="bold" />
            <span>Resume</span>
            <DownloadSimple
              aria-hidden="true"
              className="hidden shrink-0 sm:block"
              size={15}
              weight="bold"
            />
          </a>
        </div>
      </nav>
    </header>
  );
}
