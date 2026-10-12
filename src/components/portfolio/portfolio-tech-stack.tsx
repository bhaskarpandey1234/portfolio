"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useId, useMemo, useRef, useState } from "react";
import { cn } from "@/lib/utils";

gsap.registerPlugin(ScrollTrigger, useGSAP);

type TechCategory = "frontend" | "backend" | "database" | "devops";
type FilterKey = "all" | TechCategory;

type Technology = {
  id: string;
  name: string;
  categories: TechCategory[];
  mark: string;
  markColor: string;
  eyebrow: string;
  status: string;
  description: string;
  tags: string[];
};

const filters: { id: FilterKey; label: string }[] = [
  { id: "all", label: "All" },
  { id: "frontend", label: "Frontend" },
  { id: "backend", label: "Backend & API" },
  { id: "database", label: "Database & Caching" },
  { id: "devops", label: "DevOps & Cloud" },
];

const technologies: Technology[] = [
  {
    id: "sveltekit",
    name: "SvelteKit",
    categories: ["frontend"],
    mark: "S",
    markColor: "#ff3e00",
    eyebrow: "Primary framework",
    status: "1+ yr exp",
    description:
      "Production web applications, component-driven UI architecture, SSR, and reactive state management.",
    tags: ["Full-stack SSR", "Reactive Stores", "TypeScript"],
  },
  {
    id: "react",
    name: "React",
    categories: ["frontend"],
    mark: "R",
    markColor: "#00d8ff",
    eyebrow: "Frontend library",
    status: "3+ yrs exp",
    description:
      "Interactive single-page apps, hooks, custom state workflows, and modern component design systems.",
    tags: ["Hooks & Context", "Next.js / Vite", "SPA"],
  },
  {
    id: "typescript",
    name: "TypeScript",
    categories: ["frontend"],
    mark: "TS",
    markColor: "#3178c6",
    eyebrow: "Typed language",
    status: "Core standard",
    description:
      "Strict type safety across end-to-end stacks, API contracts, domain entities, and refactor confidence.",
    tags: ["Generics", "Zod Schemas", "Strict Nulls"],
  },
  {
    id: "tailwind",
    name: "Tailwind CSS",
    categories: ["frontend"],
    mark: "~",
    markColor: "#06b6d4",
    eyebrow: "Design system",
    status: "Styling",
    description:
      "Responsive layouts, design token customization, fluid typography, dark mode, and zero-runtime CSS.",
    tags: ["Responsive", "Plugins", "JIT Compiler"],
  },
  {
    id: "java",
    name: "Java",
    categories: ["backend"],
    mark: "J",
    markColor: "#e76f00",
    eyebrow: "Backend systems",
    status: "Enterprise",
    description:
      "Enterprise services, microservices, Spring Boot development, and reliable concurrent data processing.",
    tags: ["Spring Boot", "REST APIs", "JVM"],
  },
  {
    id: "fastapi",
    name: "FastAPI",
    categories: ["backend"],
    mark: "F",
    markColor: "#009688",
    eyebrow: "High-perf API",
    status: "Pythonic",
    description:
      "Asynchronous web APIs, OpenAPI documentation generation, Pydantic validation, and lightweight services.",
    tags: ["AsyncIO", "Pydantic", "Swagger"],
  },
  {
    id: "redis",
    name: "Redis",
    categories: ["database", "backend"],
    mark: "◆",
    markColor: "#d82c20",
    eyebrow: "Cache & broker",
    status: "Sub-ms",
    description:
      "Low-latency session caching, distributed locks, rate limiting, and pub/sub message brokers.",
    tags: ["Key-Value", "Rate Limiting", "Pub/Sub"],
  },
  {
    id: "postgresql",
    name: "PostgreSQL",
    categories: ["database"],
    mark: "P",
    markColor: "#336791",
    eyebrow: "Relational DB",
    status: "Primary data",
    description:
      "Relational schema modeling, indexing optimization, migrations, and query tuning for production workloads.",
    tags: ["ACID", "JSONB", "Prisma / Drizzle"],
  },
  {
    id: "docker",
    name: "Docker",
    categories: ["devops"],
    mark: "▣",
    markColor: "#2496ed",
    eyebrow: "Containerization",
    status: "Infra",
    description:
      "Multi-stage production image builds, reproducible developer environments, and Compose orchestration.",
    tags: ["Compose", "Multi-stage", "Microservices"],
  },
  {
    id: "git",
    name: "Git",
    categories: ["devops"],
    mark: "◆",
    markColor: "#f05032",
    eyebrow: "Version control",
    status: "VCS",
    description:
      "Trunk-based branch workflows, interactive rebasing, merge strategy hygiene, and release tagging.",
    tags: ["Rebase", "Branching", "Semantic Versioning"],
  },
  {
    id: "github",
    name: "GitHub",
    categories: ["devops"],
    mark: "GH",
    markColor: "#181717",
    eyebrow: "Collaboration & CI",
    status: "GitHub Actions",
    description:
      "Collaborative code review, automated testing matrices, release packaging, and preview deployments.",
    tags: ["Actions", "Pull Requests", "Releases"],
  },
  {
    id: "playwright",
    name: "Playwright",
    categories: ["devops"],
    mark: "▶",
    markColor: "#2ead33",
    eyebrow: "E2E testing",
    status: "Quality QA",
    description:
      "Reliable end-to-end browser automation, visual regression testing, and cross-browser coverage.",
    tags: ["Cross-browser", "Headless", "Visual Regression"],
  },
  {
    id: "cicd",
    name: "CI/CD",
    categories: ["devops"],
    mark: "∞",
    markColor: "#1e3a8a",
    eyebrow: "Automated delivery",
    status: "Pipelines",
    description:
      "Continuous integration, automated security scanning, container artifact publishing, and zero-downtime rollouts.",
    tags: ["GitHub Actions", "Lint & Test", "Zero-Downtime"],
  },
  {
    id: "aws",
    name: "AWS",
    categories: ["devops"],
    mark: "aws",
    markColor: "#ff9900",
    eyebrow: "Cloud platform",
    status: "Cloud",
    description:
      "EC2, S3 bucket management, CloudFront edge distribution, IAM policies, and serverless Lambda functions.",
    tags: ["S3 & CloudFront", "EC2", "Lambda"],
  },
];

function BrandMark({ tech }: { tech: Technology }) {
  return (
    <svg
      aria-hidden="true"
      className="size-5 shrink-0"
      fill="none"
      viewBox="0 0 24 24"
    >
      <rect fill={tech.markColor} height="24" rx="6" width="24" />
      <text
        fill="white"
        fontFamily="Arial, sans-serif"
        fontSize={tech.mark.length > 2 ? "6" : "9"}
        fontWeight="700"
        textAnchor="middle"
        x="12"
        y="15"
      >
        {tech.mark}
      </text>
    </svg>
  );
}

export function PortfolioTechStack() {
  const [activeFilter, setActiveFilter] = useState<FilterKey>("all");
  const [activeTech, setActiveTech] = useState<string | null>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const sectionId = useId();

  useGSAP(
    () => {
      const section = sectionRef.current;

      if (!section) {
        return;
      }

      const motionItems = gsap.utils.toArray<HTMLElement>(
        ".tech-stack-reveal",
        section,
      );
      const media = gsap.matchMedia();

      media.add("(prefers-reduced-motion: reduce)", () => {
        gsap.set(motionItems, { autoAlpha: 1, clearProps: "transform" });
      });

      media.add("(prefers-reduced-motion: no-preference)", () => {
        const kicker = gsap.utils.toArray<HTMLElement>(
          ".tech-stack-reveal-kicker",
          section,
        );
        const heading = gsap.utils.toArray<HTMLElement>(
          ".tech-stack-reveal-heading",
          section,
        );
        const filters = gsap.utils.toArray<HTMLElement>(
          ".tech-stack-reveal-filters",
          section,
        );
        const badges = gsap.utils.toArray<HTMLElement>(
          ".tech-stack-reveal-badge",
          section,
        );

        gsap.set(motionItems, { autoAlpha: 0, y: 24 });

        const timeline = gsap
          .timeline({ paused: true })
          .to(kicker, {
            autoAlpha: 1,
            y: 0,
            duration: 0.52,
            ease: "power3.out",
          })
          .to(
            heading,
            {
              autoAlpha: 1,
              y: 0,
              duration: 0.72,
              ease: "expo.out",
            },
            "-=0.3",
          )
          .to(
            filters,
            {
              autoAlpha: 1,
              y: 0,
              duration: 0.62,
              ease: "power3.out",
            },
            "-=0.36",
          )
          .to(
            badges,
            {
              autoAlpha: 1,
              y: 0,
              duration: 0.5,
              ease: "power3.out",
              stagger: 0.06,
            },
            "-=0.34",
          );

        ScrollTrigger.create({
          animation: timeline,
          trigger: section,
          start: "top 78%",
          end: "bottom 20%",
          toggleActions: "restart reset restart reset",
        });
      });

      return () => media.revert();
    },
    { scope: sectionRef },
  );

  const visibleTechnologies = useMemo(
    () =>
      technologies.filter(
        (technology) =>
          activeFilter === "all" || technology.categories.includes(activeFilter),
      ),
    [activeFilter],
  );

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") setActiveTech(null);
    }

    function handlePointerDown(event: PointerEvent) {
      if (!sectionRef.current?.contains(event.target as Node)) {
        setActiveTech(null);
      }
    }

    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("pointerdown", handlePointerDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("pointerdown", handlePointerDown);
    };
  }, []);

  function selectFilter(filter: FilterKey) {
    setActiveFilter(filter);
    setActiveTech(null);
  }

  return (
    <section
      ref={sectionRef}
      id="skills"
      aria-labelledby={`${sectionId}-title`}
      className="anchor-section relative isolate mx-auto w-full max-w-7xl px-5 py-section sm:px-8 lg:px-12"
    >
      <div aria-hidden="true" className="pointer-events-none absolute end-0 top-1/4 z-content size-64 rounded-full bg-[radial-gradient(circle,var(--hero-aura)_0%,transparent_70%)] blur-3xl" />

      <div className="relative z-content flex flex-col gap-8">
        <div className="flex flex-col gap-2">
          <p className="tech-stack-reveal tech-stack-reveal-kicker flex items-center gap-2 text-xs font-bold tracking-widest text-accent uppercase">
            <span className="size-2 shrink-0 animate-pulse rounded-full bg-accent" />
            Tech Stack
          </p>
          <h2
            id={`${sectionId}-title`}
            className="tech-stack-reveal tech-stack-reveal-heading max-w-xl text-3xl font-extrabold -tracking-wide text-balance sm:text-4xl"
          >
            Technologies I Work With
          </h2>
        </div>

        <div
          className="tech-stack-reveal tech-stack-reveal-filters flex flex-wrap gap-2"
          role="group"
          aria-label="Filter technologies"
        >
          {filters.map((filter) => {
            const count =
                filter.id === "all"
                  ? technologies.length
                  : technologies.filter((technology) =>
                    technology.categories.includes(filter.id as TechCategory),
                  ).length;
            const isActive = activeFilter === filter.id;

            return (
              <button
                key={filter.id}
                type="button"
                aria-pressed={isActive}
                onClick={() => selectFilter(filter.id)}
                className={cn(
                  "active:scale-0.97 inline-flex min-h-10 items-center rounded-full border px-3.5 py-1.5 text-xs font-semibold shadow-sm transition-[background-color,border-color,color,transform] duration-200 ease-out focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus-ring",
                  isActive
                    ? "border-accent bg-accent text-accent-foreground shadow-[0_8px_20px_rgb(var(--shadow-color)/18%)]"
                    : "border-border bg-surface text-muted-foreground hover:border-accent hover:text-foreground",
                )}
              >
                {filter.label}
                <span className={cn("ms-1.5 text-[11px]", isActive ? "text-accent-soft" : "text-muted-foreground")}>
                  ({count})
                </span>
              </button>
            );
          })}
        </div>

        <div className="flex flex-wrap gap-3 sm:gap-3.5" aria-live="polite">
          {visibleTechnologies.map((technology) => {
            const isActive = activeTech === technology.id;
            const popoverId = `${sectionId}-${technology.id}-details`;

            return (
              <div
                key={technology.id}
                className="tech-stack-reveal tech-stack-reveal-badge relative min-w-0"
                onBlur={(event) => {
                  if (!event.currentTarget.contains(event.relatedTarget as Node | null)) {
                    setActiveTech(null);
                  }
                }}
                onFocus={() => setActiveTech(technology.id)}
                onMouseEnter={() => setActiveTech(technology.id)}
                onMouseLeave={() => setActiveTech(null)}
              >
                <button
                  type="button"
                  aria-expanded={isActive}
                  aria-controls={popoverId}
                  onClick={() => setActiveTech(isActive ? null : technology.id)}
                  className={cn(
                    "group inline-flex min-h-12 max-w-full items-center gap-2.5 rounded-full border bg-surface px-4 py-2.5 text-sm font-semibold tracking-tight text-foreground shadow-sm transition-[border-color,box-shadow,transform,background-color] duration-200 ease-out focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus-ring",
                    isActive
                      ? "border-accent ring-4 ring-accent/15"
                      : "border-border hover:-translate-y-0.5 hover:border-accent hover:shadow-[0_10px_22px_rgb(var(--shadow-color)/14%)]",
                  )}
                >
                  <BrandMark tech={technology} />
                  <span className="min-w-0 break-words">{technology.name}</span>
                  {technology.id === "sveltekit" && (
                    <span className="relative flex size-2 shrink-0">
                      <span className="absolute inline-flex size-full animate-ping rounded-full bg-accent opacity-75" />
                      <span className="relative inline-flex size-2 rounded-full bg-accent" />
                    </span>
                  )}
                </button>

                {isActive && (
                  <div
                    id={popoverId}
                    role="region"
                    aria-label={`${technology.name} details`}
                    className="absolute start-0 bottom-full z-popover mb-3 w-[min(20rem,calc(100vw-2.5rem))] rounded-xl border border-border bg-surface/95 p-3.5 text-start shadow-elevated backdrop-blur-sm motion-safe:animate-[tech-popover-in_180ms_var(--ease-out)]"
                  >
                    <div className="flex items-start justify-between gap-3 border-b border-border pb-2">
                      <div className="flex min-w-0 items-center gap-1.5">
                        <span className="size-1.5 shrink-0 rounded-full bg-accent" />
                        <span className="min-w-0 text-xs font-bold text-foreground">{technology.eyebrow}</span>
                      </div>
                      <span className="shrink-0 rounded-full border border-accent/25 bg-accent-soft px-2 py-0.5 text-[11px] font-semibold text-accent">
                        {technology.status}
                      </span>
                    </div>
                    <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
                      {technology.description}
                    </p>
                    <div className="mt-2 flex flex-wrap gap-1.5">
                      {technology.tags.map((tag) => (
                        <span key={tag} className="rounded bg-surface-subtle px-2 py-0.5 text-[10px] font-medium text-muted-foreground">
                          {tag}
                        </span>
                      ))}
                    </div>
                    <span aria-hidden="true" className="absolute start-7 -bottom-1.5 size-3 rotate-45 border-r border-b border-border bg-surface" />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
