"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef, type ReactNode } from "react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

type AboutRevealProps = {
  "aria-labelledby"?: string;
  children: ReactNode;
  className: string;
  id: string;
};

export function AboutReveal({ children, className, id, ...sectionProps }: AboutRevealProps) {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const section = sectionRef.current;

      if (!section) {
        return;
      }

      const motionItems = gsap.utils.toArray<HTMLElement>(".about-reveal", section);
      const orbs = gsap.utils.toArray<HTMLElement>(".about-orb", section);
      const media = gsap.matchMedia();

      media.add("(prefers-reduced-motion: reduce)", () => {
        gsap.set(motionItems, { autoAlpha: 1, clearProps: "transform" });
        gsap.set(orbs, { clearProps: "all" });
      });

      media.add("(prefers-reduced-motion: no-preference)", () => {
        const kicker = gsap.utils.toArray<HTMLElement>(".about-reveal-kicker", section);
        const heading = gsap.utils.toArray<HTMLElement>(".about-reveal-heading", section);
        const copy = gsap.utils.toArray<HTMLElement>(".about-reveal-copy", section);
        const rows = gsap.utils.toArray<HTMLElement>(".about-detail-row", section);
        const cta = gsap.utils.toArray<HTMLElement>(".about-reveal-cta", section);

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
            copy,
            {
              autoAlpha: 1,
              y: 0,
              duration: 0.62,
              ease: "power3.out",
              stagger: 0.06,
            },
            "-=0.36",
          )
          .to(
            rows,
            {
              autoAlpha: 1,
              y: 0,
              duration: 0.5,
              ease: "power3.out",
              stagger: 0.06,
            },
            "-=0.34",
          )
          .to(
            cta,
            {
              autoAlpha: 1,
              y: 0,
              duration: 0.48,
              ease: "power3.out",
            },
            "-=0.28",
          );

        ScrollTrigger.create({
          animation: timeline,
          trigger: section,
          start: "top 78%",
          end: "bottom 20%",
          toggleActions: "restart reset restart reset",
        });

        const orbTween = gsap
          .to(orbs, {
            y: (index) => (index === 0 ? -16 : 12),
            scale: (index) => (index === 0 ? 1.04 : 0.96),
            duration: (index) => (index === 0 ? 12 : 14),
            ease: "sine.inOut",
            repeat: -1,
            yoyo: true,
            stagger: 0.8,
          })
          .pause(0);

        ScrollTrigger.create({
          trigger: section,
          start: "top 100%",
          end: "bottom 0%",
          onToggle: ({ isActive }) => {
            if (isActive) {
              orbTween.play();
            } else {
              orbTween.pause();
            }
          },
        });
      });

      return () => media.revert();
    },
    { scope: sectionRef },
  );

  return (
    <section
      ref={sectionRef}
      {...sectionProps}
      id={id}
      className={className}
    >
      {children}
    </section>
  );
}
