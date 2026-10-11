"use client";

import { CaretDown, CheckCircle } from "@phosphor-icons/react";
import { useState } from "react";
import { cn } from "@/lib/utils";

type Experience = {
  id: string;
  company: string;
  role: string;
  dates: string;
  location: string;
  current?: boolean;
  highlights: string[];
  technologies: string[];
};

const experiences: Experience[] = [
  {
    id: "telic",
    company: "Telic Info Services Pvt. Ltd.",
    role: "Telic Stack Developer",
    dates: "Oct 2025 – Present",
    location: "Remote",
    current: true,
    highlights: [
      "Architecting scalable full-stack web applications with FastAPI and SvelteKit for enterprise clients.",
      "Optimized database queries and async API response times by 35%.",
      "Collaborating across cross-functional remote teams with clean CI/CD automated deployments.",
    ],
    technologies: ["SvelteKit", "FastAPI", "PostgreSQL", "Docker"],
  },
  {
    id: "workfall-backend",
    company: "Workfall",
    role: "Backend Developer Intern",
    dates: "Nov 2024 – Jan 2025",
    location: "Remote",
    highlights: [
      "Engineered microservices and secure REST APIs using Node.js, Express, and cloud database integrations.",
      "Authored modular API unit tests with Jest, increasing test coverage across core modules by 25%.",
    ],
    technologies: ["Node.js", "Express", "MongoDB", "Jest"],
  },
  {
    id: "kodnest",
    company: "KodNest",
    role: "Java Full Stack Intern",
    dates: "Mar 2024 – May 2024",
    location: "Remote",
    highlights: [
      "Built enterprise web applications using Spring Boot, Hibernate ORM, and MySQL schemas.",
      "Designed intuitive frontend dashboards utilizing HTML5, modern CSS, and JavaScript.",
    ],
    technologies: ["Java", "Spring Boot", "MySQL", "Hibernate"],
  },
  {
    id: "workfall-frontend",
    company: "Workfall",
    role: "Frontend Intern",
    dates: "May 2025 – Jul 2025",
    location: "Remote",
    highlights: [
      "Developed reactive components, accessible web interfaces, and high-performance client features.",
      "Collaborated with designers to deliver pixel-perfect responsive layouts on mobile and desktop.",
    ],
    technologies: ["React", "Tailwind CSS", "TypeScript"],
  },
];

export function PortfolioExperience() {
  const [expandedId, setExpandedId] = useState("telic");

  return (
    <section id="experience" aria-labelledby="experience-title" className="animate-fade-in-up-1 min-w-0 lg:col-span-6">
      <div className="flex flex-col gap-2">
        <p className="text-xs font-bold tracking-widest text-accent uppercase">Experience</p>
        <h2 id="experience-title" className="text-3xl font-extrabold tracking-tight text-balance sm:text-4xl">
          Work experience
        </h2>
      </div>

      <ol className="relative ms-2 mt-8 flex flex-col gap-8 border-s border-accent/70 ps-6 sm:gap-9 sm:ps-7">
        {experiences.map((experience) => {
          const isExpanded = expandedId === experience.id;
          const panelId = `${experience.id}-details`;

          return (
            <li key={experience.id} className="relative min-w-0">
              <span
                aria-hidden="true"
                className={cn(
                  "absolute -start-[2.05rem] top-1.5 size-3.5 rounded-full border-4 border-background bg-accent transition-transform duration-200 sm:-start-[2.4rem]",
                  isExpanded && "animate-pulse-ring scale-125",
                )}
              />
              <button
                type="button"
                aria-expanded={isExpanded}
                aria-controls={panelId}
                onClick={() => setExpandedId(isExpanded ? "" : experience.id)}
                className="group flex min-h-11 w-full flex-col gap-1 text-start focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-focus-ring sm:flex-row sm:items-start sm:justify-between sm:gap-4"
              >
                <span className="min-w-0">
                  <span className="flex flex-wrap items-center gap-2">
                    <span className="text-base font-semibold tracking-tight break-words text-foreground transition-colors group-hover:text-accent">
                      {experience.company}
                    </span>
                    {experience.current && (
                      <span className="rounded-full bg-accent-soft px-2 py-0.5 text-[10px] font-bold tracking-wide text-accent uppercase">
                        Current
                      </span>
                    )}
                    <CaretDown
                      aria-hidden="true"
                      className={cn("shrink-0 text-muted-foreground transition-transform duration-200", isExpanded && "rotate-180")}
                      size={15}
                      weight="bold"
                    />
                  </span>
                  <span className="mt-0.5 block text-sm font-medium text-accent">{experience.role}</span>
                </span>
                <span className="shrink-0 text-start sm:text-end">
                  <span className="block text-xs font-semibold text-foreground sm:text-sm">{experience.dates}</span>
                  <span className="mt-0.5 block text-xs text-muted-foreground">{experience.location}</span>
                </span>
              </button>

              <div id={panelId} aria-hidden={!isExpanded} data-expanded={isExpanded} className="timeline-collapsible">
                <div className="rounded-xl border border-border bg-surface-subtle p-4 shadow-[0_8px_24px_rgb(var(--shadow-color)/6%)] sm:p-5">
                  <ul className="flex flex-col gap-2.5 text-sm leading-6 text-muted-foreground">
                    {experience.highlights.map((highlight) => (
                      <li key={highlight} className="flex min-w-0 items-start gap-2.5">
                        <CheckCircle aria-hidden="true" className="mt-1 shrink-0 text-accent" size={15} weight="fill" />
                        <span className="min-w-0 break-words">{highlight}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="mt-4 flex flex-wrap gap-1.5 border-t border-border pt-3">
                    {experience.technologies.map((technology) => (
                      <span key={technology} className="rounded-md border border-border bg-surface px-2.5 py-1 text-xs font-medium text-muted-foreground">
                        {technology}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </li>
          );
        })}
      </ol>
    </section>
  );
}
