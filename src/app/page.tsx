import { PortfolioHero } from "@/components/portfolio/portfolio-hero";
import { PortfolioAbout } from "@/components/portfolio/portfolio-about";
import { SiteHeader } from "@/components/portfolio/site-header";
import { PortfolioTechStack } from "@/components/portfolio/portfolio-tech-stack";
import { PortfolioProjects } from "@/components/portfolio/portfolio-projects";
import { PortfolioExperience } from "@/components/portfolio/portfolio-experience";
import { PortfolioContact } from "@/components/portfolio/portfolio-contact";

export default function Home() {
  return (
    <div className="relative isolate flex min-h-[100dvh] w-full flex-col overflow-x-hidden bg-background font-sans text-foreground">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -start-56 top-[15%] z-content size-[30rem] rounded-full bg-[radial-gradient(circle,var(--hero-aura)_0%,transparent_70%)] blur-3xl sm:-start-48"
      />
      <SiteHeader />
      <main id="main-content" className="relative z-content flex flex-1 pt-[var(--navigation-height)]">
        <div className="flex w-full flex-col">
          <PortfolioHero />
          <PortfolioAbout />
          <PortfolioProjects />
          <div className="mx-auto grid w-full max-w-7xl scroll-mt-24 gap-12 px-5 py-section sm:px-8 lg:grid-cols-12 lg:gap-14 lg:px-12">
            <PortfolioExperience />
            <PortfolioContact />
          </div>
          <PortfolioTechStack />
        </div>
      </main>
    </div>
  );
}
