"use client";

import {
  ArrowRight,
  ArrowUpRight,
  Check,
  GithubLogo,
  Globe,
  Sparkle,
  X,
} from "@phosphor-icons/react";
import { useCallback, useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

type ProjectCategory = "ai-fs" | "webapp" | "arch";
type ProjectTab = "overview" | "highlights" | "tech";

type Project = {
  id: string;
  title: string;
  eyebrow: string;
  status: string;
  description: string;
  categories: ProjectCategory[];
  technologies: string[];
  overview: string;
  architecture: string;
  highlights: string[];
  preview: "turisqua" | "lunanote" | "ticket";
  liveUrl: string;
  sourceUrl: string;
};

const projects: Project[] = [
  {
    id: "turisqua",
    title: "Turisqua",
    eyebrow: "AI travel platform",
    status: "Live product",
    description:
      "An AI-powered travel platform connecting tourists, locals, and sellers through recommendations, marketplace passes, and meetups.",
    categories: ["ai-fs", "webapp"],
    technologies: ["SvelteKit", "TypeScript", "FastAPI", "PostgreSQL"],
    overview:
      "Turisqua brings discovery and local commerce into one focused travel experience. Travelers can find verified guides, explore recommendations, and move from inspiration to a bookable plan without losing context.",
    architecture:
      "A SvelteKit frontend sits on an asynchronous FastAPI layer, with PostgreSQL providing the durable source of truth for profiles, listings, passes, and recommendation signals.",
    highlights: [
      "Personalized recommendations shaped by traveler preferences and local context.",
      "Integrated marketplace flows for guides, artisans, and regional services.",
      "Verified meetups and signed digital passes for smooth on-site access.",
    ],
    preview: "turisqua",
    liveUrl: "#turisqua-live",
    sourceUrl: "#turisqua-source",
  },
  {
    id: "lunanote",
    title: "LunaNote",
    eyebrow: "AI workspace",
    status: "Selected demo",
    description:
      "A calm note-taking workspace with smart organization, fast search, and AI-assisted summaries for ideas that keep moving.",
    categories: ["ai-fs", "webapp"],
    technologies: ["SvelteKit", "TypeScript", "Supabase", "PostgreSQL"],
    overview:
      "LunaNote is designed around the feeling of returning to a thought and immediately finding your place. Structured notes, keyboard-first navigation, and AI summaries keep the workspace useful without making it feel busy.",
    architecture:
      "The client uses SvelteKit for a fast, responsive workspace while Supabase handles authentication, persistence, and PostgreSQL-backed search data.",
    highlights: [
      "AI summaries surface the useful shape of long notes in seconds.",
      "Keyboard-friendly workspace interactions reduce friction while writing.",
      "Supabase sync keeps notes available across sessions and devices.",
    ],
    preview: "lunanote",
    liveUrl: "#lunanote-live",
    sourceUrl: "#lunanote-source",
  },
  {
    id: "ticket-booking",
    title: "Ticket Booking",
    eyebrow: "Full-stack system",
    status: "Architecture study",
    description:
      "A full-stack ticket booking system with real-time availability and automated notifications from reservation to confirmation.",
    categories: ["arch"],
    technologies: ["React", "Spring Boot", "PostgreSQL", "Cron"],
    overview:
      "This booking system focuses on the parts that make transactional products trustworthy: clear availability, resilient reservation flows, and timely communication after every important state change.",
    architecture:
      "React handles the booking interface, Spring Boot coordinates the service layer, PostgreSQL stores reservation state, and scheduled jobs manage notification and expiry workflows.",
    highlights: [
      "Availability updates are reflected before a user commits to a seat.",
      "Reservation state is kept explicit so confirmation and expiry are reliable.",
      "Automated notifications keep travelers informed without manual follow-up.",
    ],
    preview: "ticket",
    liveUrl: "#ticket-booking-live",
    sourceUrl: "#ticket-booking-source",
  },
];

const filters = [
  { id: "all", label: "All" },
  { id: "ai-fs", label: "AI & Full Stack" },
  { id: "webapp", label: "Web Applications" },
  { id: "arch", label: "System Architecture" },
] as const;

function ProjectPreview({ project }: { project: Project }) {
  if (project.preview === "lunanote") {
    return (
      <div className="relative flex aspect-[16/10] items-center justify-center overflow-hidden bg-[#082b27] p-4 sm:p-5">
        <div className="absolute -end-12 -top-16 size-48 rounded-full bg-accent/25 blur-3xl" />
        <div className="relative flex aspect-[16/10] w-full max-w-sm flex-col gap-3 rounded-xl border border-accent/25 bg-surface p-3 shadow-2xl">
          <div className="flex items-center justify-between border-b border-border pb-2">
            <div className="flex items-center gap-1.5">
              <span className="size-2 rounded-full bg-rose-400" />
              <span className="size-2 rounded-full bg-amber-400" />
              <span className="size-2 rounded-full bg-emerald-400" />
              <span className="ms-1 text-[10px] font-semibold text-foreground">LunaNote</span>
            </div>
            <span className="rounded border border-accent/20 bg-accent-soft px-1.5 py-0.5 text-[9px] font-semibold text-accent">
              ⌘ K
            </span>
          </div>
          <div className="grid min-h-0 flex-1 grid-cols-12 gap-2">
            <div className="col-span-4 space-y-2 border-e border-border pe-2">
              <span className="block h-1.5 w-4/5 rounded-full bg-accent/60" />
              <span className="block h-1.5 w-3/4 rounded-full bg-muted" />
              <span className="block h-1.5 w-2/3 rounded-full bg-muted" />
            </div>
            <div className="col-span-8 space-y-2">
              <span className="block h-2.5 w-11/12 rounded-full bg-foreground/80" />
              <span className="block h-1.5 w-full rounded-full bg-muted" />
              <span className="block h-1.5 w-4/5 rounded-full bg-muted" />
              <span className="flex h-5 items-center rounded border border-accent/20 bg-accent-soft px-1.5 text-[8px] font-medium text-accent">
                <Sparkle aria-hidden="true" className="me-1 shrink-0" size={9} weight="fill" />
                AI summary ready
              </span>
            </div>
          </div>
          <div className="flex items-center justify-between border-t border-border pt-2 text-[9px] text-muted-foreground">
            <span>Synced workspace</span>
            <span className="font-semibold text-accent">Auto-saved</span>
          </div>
        </div>
      </div>
    );
  }

  if (project.preview === "ticket") {
    return (
      <div className="relative flex aspect-[16/10] items-center justify-center overflow-hidden bg-[#112b39] p-4 sm:p-5">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_10%,rgb(45_212_191_/_28%),transparent_38%),linear-gradient(135deg,#0b1724,#16485a)]" />
        <div className="relative w-full max-w-sm rounded-xl border border-white/15 bg-slate-950/85 p-3 text-white shadow-2xl backdrop-blur-sm">
          <div className="flex items-center justify-between border-b border-white/10 pb-2">
            <span className="text-[10px] font-semibold tracking-wider text-teal-300 uppercase">Express Transit</span>
            <span className="rounded-full bg-emerald-400/15 px-2 py-0.5 text-[9px] font-medium text-emerald-200">Confirmed</span>
          </div>
          <div className="flex items-center justify-between py-4">
            <div>
              <p className="text-[9px] text-slate-400">DELHI</p>
              <p className="text-xs font-bold">06:15 AM</p>
            </div>
            <div className="flex flex-col items-center gap-1 px-2 text-[9px] text-teal-300">
              <span>Live route</span>
              <span className="block h-px w-14 bg-teal-400/60" />
            </div>
            <div className="text-end">
              <p className="text-[9px] text-slate-400">DEHRADUN</p>
              <p className="text-xs font-bold">11:45 AM</p>
            </div>
          </div>
          <div className="flex justify-between border-t border-white/10 pt-2 text-[9px] text-slate-400">
            <span>Coach B2 · Seat 34</span>
            <span className="text-teal-300">Push active</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative flex aspect-[16/10] items-center justify-center overflow-hidden bg-[#16443d] p-4 sm:p-5">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_75%_25%,rgb(45_212_191_/_32%),transparent_35%),linear-gradient(145deg,#14332f,#1f5b51)]" />
      <div className="relative w-full max-w-sm rounded-xl border border-white/70 bg-white/95 p-3 text-left shadow-2xl">
        <div className="mb-3 flex items-center justify-between border-b border-slate-200 pb-2">
          <div className="flex items-center gap-1.5">
            <span className="size-2.5 rounded-full bg-emerald-500" />
            <span className="text-[10px] font-bold text-slate-800">Turisqua Explorer</span>
          </div>
          <span className="rounded bg-teal-50 px-1.5 py-0.5 text-[9px] font-medium text-teal-700">AI Pass</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-teal-600 text-white">
            <Globe aria-hidden="true" size={18} weight="bold" />
          </div>
          <div className="min-w-0">
            <p className="truncate text-[11px] font-semibold text-slate-800">Himalayan Base Tour</p>
            <p className="text-[9px] text-slate-500">Verified guide · Instant meetup</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function ProjectDialog({ project, onClose }: { project: Project; onClose: () => void }) {
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const restoreFocusRef = useRef<HTMLElement | null>(null);
  const [tab, setTab] = useState<ProjectTab>("overview");

  useEffect(() => {
    restoreFocusRef.current = document.activeElement as HTMLElement | null;
    closeButtonRef.current?.focus();
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        onClose();
        return;
      }

      if (event.key !== "Tab" || !dialogRef.current) {
        return;
      }

      const focusable = Array.from(
        dialogRef.current.querySelectorAll<HTMLElement>(
          'button:not([disabled]), a[href], [tabindex]:not([tabindex="-1"])',
        ),
      );
      if (focusable.length === 0) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    }

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = previousOverflow;
      restoreFocusRef.current?.focus();
    };
  }, [onClose]);

  const tabLabels: { id: ProjectTab; label: string }[] = [
    { id: "overview", label: "Overview" },
    { id: "highlights", label: "Highlights" },
    { id: "tech", label: "Tech stack" },
  ];

  return (
    <div
      className="fixed inset-0 z-modal flex items-center justify-center bg-slate-950/70 p-3 backdrop-blur-sm sm:p-6"
      role="presentation"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <div
        ref={dialogRef}
        aria-labelledby="project-dialog-title"
        aria-modal="true"
        className="relative flex max-h-[min(90dvh,48rem)] w-full max-w-3xl flex-col overflow-hidden rounded-2xl border border-border bg-surface shadow-elevated"
        role="dialog"
      >
        <header className="flex items-start justify-between gap-4 border-b border-border bg-surface-subtle/70 p-5 sm:p-6">
          <div className="min-w-0">
            <div className="mb-2 flex flex-wrap items-center gap-2">
              <span className="rounded-full bg-accent-soft px-2.5 py-1 text-[10px] font-bold tracking-wide text-accent">
                {project.eyebrow}
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-full border border-accent/20 bg-surface px-2.5 py-1 text-[10px] font-semibold text-accent">
                <span className="size-1.5 rounded-full bg-accent" />
                {project.status}
              </span>
            </div>
            <h2 id="project-dialog-title" className="text-xl font-extrabold tracking-tight break-words text-foreground sm:text-2xl">
              {project.title}
            </h2>
            <p className="mt-1 text-sm text-muted-foreground">A project by Bhaskar Pandey</p>
          </div>
          <button
            ref={closeButtonRef}
            type="button"
            aria-label="Close project details"
            onClick={onClose}
            className="inline-flex size-11 shrink-0 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-muted hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus-ring"
          >
            <X aria-hidden="true" size={21} />
          </button>
        </header>

        <div className="min-h-0 overflow-y-auto p-5 sm:p-6">
          <div className="grid gap-3 sm:grid-cols-3">
            <div className="rounded-xl border border-accent/20 bg-accent-soft/60 p-3">
              <p className="text-[10px] font-bold tracking-wider text-accent uppercase">Focus</p>
              <p className="mt-1 text-sm font-bold text-foreground">Product clarity</p>
            </div>
            <div className="rounded-xl border border-border bg-surface-subtle p-3">
              <p className="text-[10px] font-bold tracking-wider text-muted-foreground uppercase">Build</p>
              <p className="mt-1 text-sm font-bold text-foreground">Full-stack system</p>
            </div>
            <div className="rounded-xl border border-border bg-surface-subtle p-3">
              <p className="text-[10px] font-bold tracking-wider text-muted-foreground uppercase">Approach</p>
              <p className="mt-1 text-sm font-bold text-foreground">Performance-first</p>
            </div>
          </div>

          <div className="mt-7">
            <div className="flex flex-wrap gap-x-5 border-b border-border" role="tablist" aria-label="Project details">
              {tabLabels.map(({ id, label }) => (
                <button
                  key={id}
                  id={`project-tab-${id}`}
                  type="button"
                  role="tab"
                  aria-selected={tab === id}
                  aria-controls={`project-panel-${id}`}
                  tabIndex={tab === id ? 0 : -1}
                  onClick={() => setTab(id)}
                  className={cn(
                    "min-h-11 border-b-2 px-1 text-sm font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus-ring",
                    tab === id
                      ? "border-accent text-accent"
                      : "border-transparent text-muted-foreground hover:text-foreground",
                  )}
                >
                  {label}
                </button>
              ))}
            </div>

            <div
              id={`project-panel-${tab}`}
              role="tabpanel"
              aria-labelledby={`project-tab-${tab}`}
              className="min-h-44 pt-5 text-sm leading-7 text-muted-foreground"
            >
              {tab === "overview" && (
                <div className="flex flex-col gap-3">
                  <p>{project.overview}</p>
                  <p>{project.architecture}</p>
                </div>
              )}
              {tab === "highlights" && (
                <ul className="flex flex-col gap-3">
                  {project.highlights.map((highlight) => (
                    <li key={highlight} className="flex items-start gap-3">
                      <Check aria-hidden="true" className="mt-1 shrink-0 text-accent" size={18} weight="bold" />
                      <span className="min-w-0 break-words">{highlight}</span>
                    </li>
                  ))}
                </ul>
              )}
              {tab === "tech" && (
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((technology) => (
                    <span key={technology} className="rounded-lg border border-border bg-surface-subtle px-3 py-1.5 text-xs font-semibold text-foreground">
                      {technology}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="mt-6 border-t border-border pt-5">
            <p className="mb-2 text-xs font-bold tracking-wider text-muted-foreground uppercase">Technologies used</p>
            <div className="flex flex-wrap gap-2">
              {project.technologies.map((technology) => (
                <span key={technology} className="rounded-md bg-muted px-2.5 py-1 text-xs font-medium text-muted-foreground">
                  {technology}
                </span>
              ))}
            </div>
          </div>
        </div>

        <footer className="flex flex-col gap-3 border-t border-border bg-surface-subtle p-4 sm:flex-row sm:items-center sm:justify-between sm:p-5">
          <span className="text-xs text-muted-foreground">Press Escape or close this window to return.</span>
          <div className="flex w-full gap-2 sm:w-auto">
            <a
              href={project.sourceUrl}
              onClick={(event) => event.stopPropagation()}
              className="inline-flex min-h-11 flex-1 items-center justify-center gap-2 rounded-lg border border-border bg-surface px-4 text-xs font-semibold text-foreground transition-colors hover:border-accent hover:text-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus-ring sm:flex-none"
            >
              <GithubLogo aria-hidden="true" size={16} weight="fill" />
              Source code
            </a>
            <a
              href={project.liveUrl}
              onClick={(event) => event.stopPropagation()}
              className="inline-flex min-h-11 flex-1 items-center justify-center gap-2 rounded-lg bg-accent px-4 text-xs font-semibold text-accent-foreground transition-colors hover:bg-accent-hover focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus-ring sm:flex-none"
            >
              Visit live site
              <ArrowUpRight aria-hidden="true" size={16} weight="bold" />
            </a>
          </div>
        </footer>
      </div>
    </div>
  );
}

export function PortfolioProjects() {
  const [activeFilter, setActiveFilter] = useState<(typeof filters)[number]["id"]>("all");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const closeProject = useCallback(() => setSelectedProject(null), []);

  const visibleProjects = projects.filter(
    (project) => activeFilter === "all" || project.categories.includes(activeFilter),
  );

  const projectCount = (filterId: (typeof filters)[number]["id"]) =>
    filterId === "all"
      ? projects.length
      : projects.filter((project) => project.categories.includes(filterId)).length;

  return (
    <section
      id="projects"
      aria-labelledby="projects-title"
      className="anchor-section mx-auto flex w-full max-w-7xl flex-col gap-8 px-5 py-section sm:px-8 lg:px-12"
    >
      <header className="flex flex-col gap-4 border-b border-border pb-7 sm:flex-row sm:items-end sm:justify-between">
        <div className="min-w-0">
          <h2 id="projects-title" className="max-w-2xl text-4xl leading-tight font-extrabold tracking-tight text-balance sm:text-5xl">
            My recent work
          </h2>
          <p className="mt-3 max-w-prose text-base leading-7 text-muted-foreground">
            A few products and systems I&apos;ve shaped from the first idea to the final interaction.
          </p>
        </div>
        <span className="inline-flex shrink-0 items-center gap-2 text-sm font-semibold text-accent">
          <span className="size-2 rounded-full bg-accent" />
          {visibleProjects.length} featured {visibleProjects.length === 1 ? "project" : "projects"}
        </span>
      </header>

      <div className="flex flex-wrap items-center gap-2.5" aria-label="Project categories">
        {filters.map((filter) => {
          const isActive = activeFilter === filter.id;
          return (
            <button
              key={filter.id}
              type="button"
              aria-pressed={isActive}
              onClick={() => setActiveFilter(filter.id)}
              className={cn(
                "inline-flex min-h-11 items-center gap-2 rounded-full border px-3.5 py-1.5 text-xs font-semibold transition-[background-color,border-color,color,box-shadow,transform] duration-150 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus-ring",
                isActive
                  ? "border-accent bg-accent text-accent-foreground shadow-[0_8px_18px_rgb(var(--shadow-color)/16%)]"
                  : "border-border bg-surface text-muted-foreground hover:-translate-y-0.5 hover:border-accent hover:text-accent",
              )}
            >
              {filter.label}
              <span
                className={cn(
                  "inline-flex min-w-5 items-center justify-center rounded-full px-1.5 py-0.5 text-[10px]",
                  isActive ? "bg-white/20 text-current" : "bg-muted text-muted-foreground",
                )}
              >
                {projectCount(filter.id)}
              </span>
            </button>
          );
        })}
      </div>

      <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,19rem),1fr))] gap-6 lg:gap-8">
        {visibleProjects.map((project) => (
          <article
            key={project.id}
            className="group flex min-w-0 flex-col overflow-hidden rounded-2xl border border-border bg-surface shadow-[0_8px_24px_rgb(var(--shadow-color)/7%)] transition-[border-color,box-shadow,transform] duration-200 hover:-translate-y-1 hover:border-accent/40 hover:shadow-elevated"
          >
            <button
              type="button"
              aria-label={`View details for ${project.title}`}
              onClick={() => setSelectedProject(project)}
              className="relative block w-full text-start focus-visible:outline-2 focus-visible:outline-offset-[-3px] focus-visible:outline-focus-ring"
            >
              <ProjectPreview project={project} />
              <span className="absolute start-3 top-3 inline-flex items-center gap-1.5 rounded-full border border-white/30 bg-slate-950/75 px-2.5 py-1 text-[10px] font-semibold text-white shadow-sm backdrop-blur-sm">
                <span className="size-1.5 rounded-full bg-teal-300" />
                {project.status}
              </span>
            </button>
            <div className="flex flex-1 flex-col gap-5 p-5 sm:p-6">
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <p className="mb-1 text-xs font-semibold tracking-wide text-accent">{project.eyebrow}</p>
                  <h3 className="text-xl font-bold tracking-tight break-words text-foreground transition-colors group-hover:text-accent">
                    {project.title}
                  </h3>
                </div>
                <ArrowUpRight aria-hidden="true" className="mt-1 shrink-0 text-accent" size={18} weight="bold" />
              </div>
              <p className="min-w-0 flex-1 text-sm leading-6 text-muted-foreground">{project.description}</p>
              <div aria-label="Technologies used" className="flex flex-wrap gap-2">
                {project.technologies.map((technology) => (
                  <span key={technology} className="rounded-md border border-border bg-surface-subtle px-2.5 py-1 text-xs font-medium text-muted-foreground">
                    {technology}
                  </span>
                ))}
              </div>
              <div className="border-t border-border pt-4">
                <button
                  type="button"
                  onClick={() => setSelectedProject(project)}
                  className="group/cta inline-flex min-h-11 items-center gap-2 rounded-lg bg-accent px-4 text-sm font-semibold text-accent-foreground shadow-[0_8px_18px_rgb(var(--shadow-color)/16%)] transition-[background-color,box-shadow,transform] duration-150 hover:-translate-y-0.5 hover:bg-accent-hover hover:shadow-[0_10px_22px_rgb(var(--shadow-color)/22%)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus-ring"
                >
                  View details
                  <ArrowRight aria-hidden="true" className="transition-transform duration-150 group-hover/cta:translate-x-1" size={17} weight="bold" />
                </button>
              </div>
            </div>
          </article>
        ))}
      </div>

      {selectedProject && (
        <ProjectDialog
          key={selectedProject.id}
          project={selectedProject}
          onClose={closeProject}
        />
      )}
    </section>
  );
}
