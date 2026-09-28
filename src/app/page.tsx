import { PortfolioHero } from "@/components/portfolio/portfolio-hero";
import { SiteHeader } from "@/components/portfolio/site-header";

export default function Home() {
  return (
    <div className="relative isolate flex min-h-[100dvh] w-full flex-col overflow-x-hidden bg-background font-sans text-foreground">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -start-56 top-[15%] z-content size-[30rem] rounded-full bg-[radial-gradient(circle,var(--hero-aura)_0%,transparent_70%)] blur-3xl sm:-start-48"
      />
      <SiteHeader />
      <main id="main-content" className="relative z-content flex flex-1">
        <PortfolioHero />
      </main>
    </div>
  );
}
