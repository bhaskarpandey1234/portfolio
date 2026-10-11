"use client";

import {
  ArrowRight,
  Check,
  Copy,
  EnvelopeSimple,
  GithubLogo,
  LinkedinLogo,
  X,
} from "@phosphor-icons/react";
import { useCallback, useEffect, useRef, useState, type FormEvent } from "react";

const emailAddress = "bhaskarpandey1234@gmail.com";

type ContactForm = {
  name: string;
  email: string;
  message: string;
};

function ContactModal({ onClose }: { onClose: () => void }) {
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const restoreFocusRef = useRef<HTMLElement | null>(null);
  const [form, setForm] = useState<ContactForm>({ name: "", email: "", message: "" });

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

      if (event.key !== "Tab" || !dialogRef.current) return;
      const focusable = Array.from(
        dialogRef.current.querySelectorAll<HTMLElement>(
          'button:not([disabled]), input:not([disabled]), textarea:not([disabled]), a[href], [tabindex]:not([tabindex="-1"])',
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

  function updateField(field: keyof ContactForm, value: string) {
    setForm((current) => ({ ...current, [field]: value }));
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const subject = `Portfolio inquiry from ${form.name.trim()}`;
    const body = `Name: ${form.name.trim()}\nEmail: ${form.email.trim()}\n\n${form.message.trim()}`;
    window.location.href = `mailto:${emailAddress}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    onClose();
  }

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
        aria-labelledby="contact-dialog-title"
        aria-modal="true"
        className="animate-modal-pop relative flex max-h-[min(92dvh,44rem)] w-full max-w-xl flex-col overflow-hidden rounded-2xl border border-border bg-surface shadow-elevated"
        role="dialog"
      >
        <header className="flex items-start justify-between gap-4 border-b border-border bg-surface-subtle p-5 sm:p-6">
          <div>
            <p className="text-xs font-bold tracking-widest text-accent uppercase">Start a conversation</p>
            <h2 id="contact-dialog-title" className="mt-2 text-2xl font-extrabold tracking-tight text-foreground">
              Send a message
            </h2>
          </div>
          <button
            ref={closeButtonRef}
            type="button"
            aria-label="Close contact form"
            onClick={onClose}
            className="inline-flex size-11 shrink-0 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-muted hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus-ring"
          >
            <X aria-hidden="true" size={20} />
          </button>
        </header>

        <form onSubmit={handleSubmit} className="flex min-h-0 flex-col gap-4 overflow-y-auto p-5 sm:p-6">
          <label className="flex flex-col gap-1.5 text-sm font-semibold text-foreground">
            Name
            <input
              required
              name="name"
              value={form.name}
              onChange={(event) => updateField("name", event.target.value)}
              className="min-h-11 rounded-lg border border-border bg-surface px-3.5 font-normal text-foreground outline-none placeholder:text-muted-foreground focus:border-accent focus:ring-2 focus:ring-accent/20"
              placeholder="Your name"
            />
          </label>
          <label className="flex flex-col gap-1.5 text-sm font-semibold text-foreground">
            Email
            <input
              required
              type="email"
              name="email"
              value={form.email}
              onChange={(event) => updateField("email", event.target.value)}
              className="min-h-11 rounded-lg border border-border bg-surface px-3.5 font-normal text-foreground outline-none placeholder:text-muted-foreground focus:border-accent focus:ring-2 focus:ring-accent/20"
              placeholder="you@example.com"
            />
          </label>
          <label className="flex flex-col gap-1.5 text-sm font-semibold text-foreground">
            Message
            <textarea
              required
              name="message"
              maxLength={500}
              rows={5}
              value={form.message}
              onChange={(event) => updateField("message", event.target.value)}
              className="resize-y rounded-lg border border-border bg-surface px-3.5 py-3 leading-6 font-normal text-foreground outline-none placeholder:text-muted-foreground focus:border-accent focus:ring-2 focus:ring-accent/20"
              placeholder="Tell me about your goals, timeline, or role details..."
            />
            <span className="text-end text-xs font-normal text-muted-foreground">{form.message.length}/500</span>
          </label>
          <div className="mt-1 flex flex-col-reverse gap-2 border-t border-border pt-4 sm:flex-row sm:justify-end">
            <button
              type="button"
              onClick={onClose}
              className="min-h-11 rounded-lg px-4 text-sm font-semibold text-muted-foreground transition-colors hover:bg-muted hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus-ring"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="inline-flex min-h-11 items-center justify-center gap-2 rounded-lg bg-accent px-5 text-sm font-semibold text-accent-foreground shadow-[0_8px_18px_rgb(var(--shadow-color)/16%)] transition-[background-color,box-shadow,transform] duration-150 hover:-translate-y-0.5 hover:bg-accent-hover hover:shadow-[0_10px_22px_rgb(var(--shadow-color)/22%)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus-ring"
            >
              Open email client
              <ArrowRight aria-hidden="true" size={17} weight="bold" />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export function PortfolioContact() {
  const [copied, setCopied] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const closeModal = useCallback(() => setIsModalOpen(false), []);

  async function copyEmail() {
    try {
      if (navigator.clipboard) {
        await navigator.clipboard.writeText(emailAddress);
      } else {
        const textArea = document.createElement("textarea");
        textArea.value = emailAddress;
        textArea.style.position = "fixed";
        textArea.style.opacity = "0";
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand("copy");
        textArea.remove();
      }
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      setCopied(false);
    }
  }

  return (
    <section id="contact" aria-labelledby="contact-title" className="animate-fade-in-up-2 min-w-0 lg:col-span-6">
      <div className="relative isolate overflow-hidden rounded-2xl border border-accent/20 bg-accent-soft/55 p-6 shadow-[0_10px_30px_rgb(var(--shadow-color)/8%)] sm:rounded-3xl sm:p-8 lg:p-9">
        <div aria-hidden="true" className="pointer-events-none absolute -end-24 -top-24 -z-10 size-64 rounded-full bg-accent/15 blur-3xl" />
        <p className="text-xs font-bold tracking-widest text-accent uppercase">Let&apos;s connect</p>
        <h2 id="contact-title" className="mt-2 text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">
          Get in touch
        </h2>
        <p className="mt-3 max-w-prose text-sm leading-6 text-muted-foreground sm:text-base">
          I&apos;m always open to discussing new opportunities, collaborations, or a thoughtful tech chat. Feel free to reach out.
        </p>

        <div className="mt-7 flex flex-col gap-3" aria-label="Contact details">
          <div className="group flex flex-wrap items-center justify-between gap-3 rounded-xl border border-transparent p-2.5 transition-[background-color,border-color,box-shadow,transform] duration-200 hover:-translate-y-0.5 hover:border-accent/20 hover:bg-surface/80 hover:shadow-sm">
            <div className="flex min-w-0 items-center gap-3">
              <span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-accent/15 text-accent transition-transform duration-200 group-hover:rotate-6">
                <EnvelopeSimple aria-hidden="true" size={18} weight="bold" />
              </span>
              <span className="min-w-0 text-sm">
                <span className="block text-xs font-semibold text-muted-foreground">Email</span>
                <a href={`mailto:${emailAddress}`} className="font-medium break-all text-foreground transition-colors hover:text-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus-ring">
                  {emailAddress}
                </a>
              </span>
            </div>
            <button
              type="button"
              onClick={copyEmail}
              className="inline-flex min-h-9 shrink-0 items-center gap-1.5 rounded-md border border-border bg-surface px-2.5 text-xs font-medium text-muted-foreground transition-colors hover:border-accent hover:bg-accent-soft hover:text-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus-ring"
              aria-label={copied ? "Email address copied" : "Copy email address"}
            >
              {copied ? <Check aria-hidden="true" size={14} weight="bold" /> : <Copy aria-hidden="true" size={14} />}
              {copied ? "Copied" : "Copy"}
            </button>
          </div>

          <a href="https://linkedin.com/in/bhaskar-pandey" target="_blank" rel="noopener noreferrer" className="group flex min-h-11 items-center justify-between gap-3 rounded-xl border border-transparent p-2.5 transition-[background-color,border-color,box-shadow,transform] duration-200 hover:-translate-y-0.5 hover:border-accent/20 hover:bg-surface/80 hover:shadow-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus-ring">
            <span className="flex min-w-0 items-center gap-3">
              <span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-accent/15 text-accent transition-transform duration-200 group-hover:scale-105">
                <LinkedinLogo aria-hidden="true" size={18} weight="fill" />
              </span>
              <span className="min-w-0 text-sm"><span className="block text-xs font-semibold text-muted-foreground">LinkedIn</span><span className="font-medium break-all text-foreground">linkedin.com/in/bhaskar-pandey</span></span>
            </span>
            <span className="shrink-0 text-xs font-semibold text-muted-foreground transition-colors group-hover:text-accent">Visit ↗</span>
          </a>

          <a href="https://github.com/bhaskarpandey1234" target="_blank" rel="noopener noreferrer" className="group flex min-h-11 items-center justify-between gap-3 rounded-xl border border-transparent p-2.5 transition-[background-color,border-color,box-shadow,transform] duration-200 hover:-translate-y-0.5 hover:border-accent/20 hover:bg-surface/80 hover:shadow-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus-ring">
            <span className="flex min-w-0 items-center gap-3">
              <span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-accent/15 text-accent transition-transform duration-200 group-hover:scale-105">
                <GithubLogo aria-hidden="true" size={18} weight="fill" />
              </span>
              <span className="min-w-0 text-sm"><span className="block text-xs font-semibold text-muted-foreground">GitHub</span><span className="font-medium break-all text-foreground">github.com/bhaskarpandey1234</span></span>
            </span>
            <span className="shrink-0 text-xs font-semibold text-muted-foreground transition-colors group-hover:text-accent">Visit ↗</span>
          </a>
        </div>

        <div className="mt-7 flex flex-wrap items-center justify-between gap-4 border-t border-accent/15 pt-5">
          <button
            type="button"
            onClick={() => setIsModalOpen(true)}
            className="btn-shimmer group inline-flex min-h-11 items-center justify-center gap-2 rounded-lg bg-accent px-5 text-sm font-semibold text-accent-foreground shadow-[0_8px_18px_rgb(var(--shadow-color)/16%)] transition-[background-color,box-shadow,transform] duration-150 hover:-translate-y-0.5 hover:bg-accent-hover hover:shadow-[0_10px_22px_rgb(var(--shadow-color)/22%)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus-ring"
          >
            Send message
            <ArrowRight aria-hidden="true" className="transition-transform duration-150 group-hover:translate-x-1" size={17} weight="bold" />
          </button>
          <span className="animate-float-doodle hidden text-right font-handwritten text-2xl leading-none font-bold tracking-wide text-accent sm:block">
            Let&apos;s build
            <br />
            something great!
          </span>
        </div>
      </div>

      {isModalOpen && <ContactModal onClose={closeModal} />}
    </section>
  );
}
