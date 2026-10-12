"use client";

import { DownloadSimple, Timer } from "@phosphor-icons/react";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { ThemeToggle } from "@/components/portfolio/theme-toggle";

const navigation = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Projects", href: "#projects" },
  { label: "Experience", href: "#experience" },
  { label: "Skills", href: "#skills" },
  { label: "Contact", href: "#contact" },
] as const;

const sectionIds = navigation.map((item) => item.href.slice(1));

export function SiteHeader() {
  const [activeSection, setActiveSection] = useState("home");
  const activeSectionRef = useRef("home");

  useEffect(() => {
    const sections = sectionIds
      .map((id) => document.getElementById(id))
      .filter((section): section is HTMLElement => section !== null);

    function updateActiveSection() {
      const header = document.querySelector("header");
      const headerBottom = header?.getBoundingClientRect().bottom ?? 80;
      const current = sections.find((section) => section.id === activeSectionRef.current);

      if (current) {
        const currentBounds = current.getBoundingClientRect();
        if (currentBounds.top <= headerBottom + 32 && currentBounds.bottom > headerBottom) {
          return;
        }
      }

      const nextActive = sections
        .filter((section) => section.getBoundingClientRect().top <= headerBottom + 32)
        .at(-1)?.id ?? sections[0]?.id ?? "home";

      if (nextActive !== activeSectionRef.current) {
        activeSectionRef.current = nextActive;
        setActiveSection(nextActive);
      }
    }

    function handleScroll() {
      window.requestAnimationFrame(updateActiveSection);
    }

    const initialHash = window.location.hash.slice(1);
    if (sectionIds.includes(initialHash)) {
      activeSectionRef.current = initialHash;
      window.requestAnimationFrame(() => setActiveSection(initialHash));
    }

    updateActiveSection();
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", updateActiveSection);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", updateActiveSection);
    };
  }, []);

  function activateSection(id: string) {
    activeSectionRef.current = id;
    setActiveSection(id);
  }

  return (
    <header className="fixed inset-x-0 top-0 z-navigation w-full shrink-0 border-b border-border/70 bg-background/85 px-5 py-4 backdrop-blur-md sm:px-8 lg:px-12">
      <nav
        aria-label="Main navigation"
        className="mx-auto flex min-h-12 w-full max-w-7xl items-center justify-between gap-4"
      >
        <Link
          href="#home"
          aria-label="Bhaskar Pandey home"
          onClick={() => activateSection("home")}
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
              aria-current={activeSection === item.href.slice(1) ? "page" : undefined}
              onClick={() => activateSection(item.href.slice(1))}
              className={
                activeSection === item.href.slice(1)
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
