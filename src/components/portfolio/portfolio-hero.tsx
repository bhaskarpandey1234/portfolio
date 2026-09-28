import {
  ArrowBendDownLeft,
  ArrowRight,
  EnvelopeSimple,
  GithubLogo,
  LinkedinLogo,
  Sparkle,
} from "@phosphor-icons/react/ssr";
import Image from "next/image";
import Link from "next/link";

const portraitUrl =
  "https://lh3.googleusercontent.com/aida-public/AB6AXuAvHaE4CApdP2v-k_XH-7wBsKtxNoCZJjgenlHoTtfIgEqsIacSi6c6nqt_twvwqfzHuK6trBq8By-A_rhJvJvYrmKnKH55sOuRLVZ08VCQxhA6EocrPC4f4_kSiJvRFoJE9uaRPF72HP4TclxnFkXB3Zx7NLxedPmz4D-NxOTyaUYPHp-2-0CdPPay7p_cW_J2PfwLL2B6stCBSxMDlPLjmZxuZaJhcer5RbrlbD-5zT-Np1qpuy4ZDvzqzpfsFNkF";

const socialLinks = [
  {
    label: "GitHub profile",
    href: "https://github.com/bhaskarpandey1234",
    icon: GithubLogo,
  },
  {
    label: "LinkedIn profile",
    href: "https://linkedin.com/in/bhaskar-pandey",
    icon: LinkedinLogo,
  },
  {
    label: "Send an email",
    href: "mailto:bhaskarpandey1234@gmail.com",
    icon: EnvelopeSimple,
  },
] as const;

export function PortfolioHero() {
  return (
    <section
      id="home"
      aria-labelledby="hero-title"
      className="mx-auto grid min-h-[calc(100dvh-5rem)] w-full max-w-7xl scroll-mt-24 grid-cols-1 items-center gap-10 px-5 pt-7 pb-14 sm:px-8 sm:pt-10 lg:grid-cols-12 lg:gap-8 lg:px-12 lg:pt-8 lg:pb-20"
    >
      <div className="flex min-w-0 flex-col items-start gap-5 lg:col-span-7">
        <div className="flex items-center gap-2 text-lg font-medium text-muted-foreground sm:text-xl">
          <span>Hi, I&apos;m</span>
          <span aria-hidden="true" className="text-2xl">
            👋
          </span>
        </div>

        <div className="flex max-w-2xl flex-col gap-1">
          <h1
            id="hero-title"
            className="leading-1.05 text-fluid-h1 font-extrabold -tracking-wide text-balance"
          >
            <span className="text-foreground">Bhaskar</span>{" "}
            <span className="text-accent">Pandey</span>
          </h1>
          <p className="text-xl font-bold -tracking-wide text-foreground sm:text-2xl">
            Full Stack Developer
          </p>
        </div>

        <p className="max-w-xl text-base leading-7 text-muted-foreground sm:text-lg sm:leading-8">
          I build modern web applications with a focus on great user experiences,
          clean code and scalable architecture. I enjoy working across the stack,
          from intuitive frontends to robust backends and efficient databases.
        </p>

        <div className="flex w-full flex-wrap items-center gap-3 pt-1 sm:w-auto sm:gap-4">
          <Link
            href="#projects"
            className="active:scale-0.97 inline-flex min-h-12 flex-1 items-center justify-center gap-2 rounded-xl bg-accent px-6 py-3 text-sm font-semibold whitespace-nowrap text-accent-foreground shadow-[0_14px_30px_rgb(var(--shadow-color)/20%)] transition-[background-color,box-shadow,transform] duration-150 ease-out hover:bg-accent-hover hover:shadow-[0_16px_34px_rgb(var(--shadow-color)/24%)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus-ring sm:flex-none"
          >
            View My Projects
            <ArrowRight aria-hidden="true" className="shrink-0" size={17} weight="bold" />
          </Link>
          <Link
            href="#contact"
            className="active:scale-0.97 inline-flex min-h-12 flex-1 items-center justify-center gap-2 rounded-xl border border-border bg-surface px-6 py-3 text-sm font-semibold whitespace-nowrap text-foreground shadow-[0_8px_24px_rgb(var(--shadow-color)/8%)] transition-[color,background-color,border-color,transform] duration-150 ease-out hover:border-accent hover:bg-surface-subtle hover:text-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus-ring sm:flex-none"
          >
            <EnvelopeSimple aria-hidden="true" className="shrink-0" size={17} weight="bold" />
            Get in Touch
          </Link>
        </div>

        <div aria-label="Social links" className="flex items-center gap-1 pt-1">
          {socialLinks.map(({ label, href, icon: Icon }) => {
            const isExternal = href.startsWith("https://");

            return (
              <a
                key={label}
                href={href}
                aria-label={label}
                target={isExternal ? "_blank" : undefined}
                rel={isExternal ? "noopener noreferrer" : undefined}
                className="active:scale-0.97 inline-flex size-11 shrink-0 items-center justify-center rounded-full text-foreground transition-[color,background-color,transform] duration-150 ease-out hover:bg-accent-soft hover:text-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus-ring"
              >
                <Icon aria-hidden="true" size={22} weight="fill" />
              </a>
            );
          })}
        </div>
      </div>

      <div
        aria-label="Portrait and highlights"
        className="relative isolate flex min-h-100 items-end justify-center pt-12 sm:min-h-124 lg:col-span-5 lg:min-h-136 lg:pt-4"
      >
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-[8%] top-[8%] bottom-[5%] z-content rotate-[-4deg] rounded-[40%_60%_58%_42%/40%_45%_55%_60%] bg-hero-blob"
        />

        <Sparkle
          aria-hidden="true"
          className="pointer-events-none absolute start-1 top-[48%] z-navigation text-accent sm:start-8 lg:start-0"
          size={30}
          weight="bold"
        />

        <div
          aria-hidden="true"
          className="pointer-events-none absolute end-0 top-0 z-navigation rotate-[4deg] text-end text-accent select-none sm:end-3"
        >
          <p className="leading-0.92 font-handwritten text-3xl font-bold sm:text-4xl">
            Code
            <br />
            <span className="me-2">Build</span>
            <br />
            <span className="me-4">Improve</span>
          </p>
          <ArrowBendDownLeft
            className="ms-auto me-6 mt-1 rotate-[-8deg]"
            size={44}
            weight="bold"
          />
          <Sparkle
            className="absolute -end-3 -top-2"
            size={20}
            weight="bold"
          />
        </div>

        <div className="relative z-content aspect-4/5 w-full max-w-95">
          <Image
            src={portraitUrl}
            alt="Bhaskar Pandey smiling in a black hoodie"
            fill
            priority
            sizes="(max-width: 640px) 78vw, (max-width: 1024px) 360px, 380px"
            className="object-contain object-bottom contrast-[1.02]"
            style={{
              clipPath:
                "polygon(0 0, 100% 0, 100% 95%, 85% 100%, 15% 100%, 0 95%)",
            }}
          />
        </div>
      </div>
    </section>
  );
}
