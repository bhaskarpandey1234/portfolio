import {
  ArrowRight,
  Briefcase,
  GraduationCap,
  MapPin,
} from "@phosphor-icons/react/ssr";
import Link from "next/link";
import { AboutReveal } from "@/components/portfolio/about-reveal";

const profileDetails = [
  {
    label: "Based in",
    value: "Haldwani, Uttarakhand, India",
    icon: MapPin,
  },
  {
    label: "Experience",
    value: "Around 1 year of professional experience",
    icon: Briefcase,
  },
  {
    label: "Education",
    value: "B.Tech in Computer Science & Engineering · CGPA 8.0",
    icon: GraduationCap,
  },
] as const;

export function PortfolioAbout() {
  return (
    <AboutReveal
      id="about"
      aria-labelledby="about-title"
      className="relative isolate mx-auto grid w-full max-w-7xl scroll-mt-24 gap-12 px-5 py-section sm:px-8 lg:grid-cols-12 lg:gap-16 lg:px-12"
    >
      <div
        aria-hidden="true"
        className="about-orb pointer-events-none absolute end-[12%] -top-20 z-content size-56 rounded-full bg-[radial-gradient(circle,var(--hero-aura)_0%,transparent_70%)] blur-3xl"
      />
      <div
        aria-hidden="true"
        className="about-orb about-orb-reverse pointer-events-none absolute start-[4%] bottom-8 z-content size-48 rounded-full bg-[radial-gradient(circle,var(--hero-aura)_0%,transparent_70%)] blur-3xl"
      />

      <div className="relative z-content min-w-0 lg:col-span-5">
        <p
          className="about-reveal about-reveal-kicker mb-3 text-xs font-bold tracking-widest text-accent uppercase"
        >
          About Me
        </p>
        <h2
          id="about-title"
          className="about-reveal about-reveal-heading max-w-lg text-4xl leading-tight font-extrabold -tracking-wide text-balance sm:text-5xl"
        >
          Who I am
        </h2>
      </div>

      <div className="relative z-content min-w-0 lg:col-span-7">
        <div className="flex max-w-2xl flex-col items-start gap-8">
          <div className="flex flex-col gap-4 text-base leading-7 text-muted-foreground sm:text-lg sm:leading-8">
            <p className="about-reveal about-reveal-copy">
              I&apos;m a Full Stack Developer with around 1 year of professional
              experience, currently working at Telic Info Services Pvt. Ltd.
            </p>
            <p className="about-reveal about-reveal-copy">
              I build web applications with SvelteKit, React, TypeScript,
              FastAPI, and PostgreSQL. I enjoy solving real-world problems,
              learning new technologies, and creating products that make a
              difference.
            </p>
          </div>

          <dl className="w-full border-y border-border">
            {profileDetails.map(({ label, value, icon: Icon }) => (
              <div
                key={label}
                className="about-reveal about-detail-row group grid grid-cols-[auto_minmax(0,1fr)] items-start gap-4 border-b border-border px-3 py-4 transition-[background-color,border-color,box-shadow,transform] duration-200 ease-out last:border-b-0 sm:grid-cols-[10rem_minmax(0,1fr)] sm:items-center"
              >
                <dt className="flex items-center gap-2 text-sm font-semibold text-foreground transition-colors duration-200 ease-out group-hover:text-accent">
                  <Icon
                    aria-hidden="true"
                    className="about-detail-icon shrink-0 text-accent transition-transform duration-200 ease-out group-hover:scale-105 group-hover:rotate-3"
                    size={19}
                    weight="duotone"
                  />
                  <span>{label}</span>
                </dt>
                <dd className="about-detail-value min-w-0 text-sm leading-6 break-words text-muted-foreground transition-colors duration-200 ease-out group-hover:text-foreground sm:text-base">
                  {value}
                </dd>
              </div>
            ))}
          </dl>

          <Link
            href="#projects"
            className="about-reveal about-reveal-cta group inline-flex min-h-11 items-center gap-2 rounded-md text-sm font-semibold text-accent transition-[color,transform] duration-150 ease-out hover:text-accent-hover focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-focus-ring"
          >
            View my work
            <ArrowRight
              aria-hidden="true"
              className="shrink-0 transition-transform duration-150 ease-out group-hover:translate-x-1"
              size={17}
              weight="bold"
            />
          </Link>

        </div>
      </div>
    </AboutReveal>
  );
}
