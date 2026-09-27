import Image from "next/image";

export default function Home() {
  return (
    <main className="relative isolate flex min-h-screen w-full flex-1 flex-col items-center justify-between overflow-x-hidden bg-background px-6 py-section font-sans sm:px-10 lg:px-16">
      <div className="flex w-full max-w-5xl flex-1 flex-col items-center justify-between gap-16 bg-background sm:items-start">
        <Image
          className="h-5 w-25 shrink-0 dark:invert"
          src="/next.svg"
          alt="Next.js logo"
          width={100}
          height={20}
          priority
        />
        <div className="flex max-w-prose flex-col items-center gap-6 text-center break-words sm:items-start sm:text-left">
          <h1 className="max-w-prose text-fluid-h1 leading-tight font-semibold tracking-tight text-foreground">
            To get started, edit the{" "}
            <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-[0.9em]">
              page.tsx
            </code>{" "}
            file.
          </h1>
          <p className="max-w-prose text-lg leading-8 text-muted-foreground">
            Looking for a starting point or more instructions? Head over to{" "}
            <a
              href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
              className="font-medium text-foreground underline-offset-4 hover:underline"
            >
              Templates
            </a>{" "}
            or the{" "}
            <a
              href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
              className="font-medium text-foreground underline-offset-4 hover:underline"
            >
              Learning
            </a>{" "}
            center.
          </p>
        </div>
        <div className="flex w-full flex-wrap gap-4 text-base font-medium sm:w-auto">
          <a
            className="flex min-h-12 flex-1 items-center justify-center gap-2 rounded-full bg-foreground px-5 text-background transition-colors hover:bg-foreground/80 sm:min-w-40 sm:flex-none"
            href="https://vercel.com/new?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              className="h-3.5 w-4 shrink-0 dark:invert"
              src="/vercel.svg"
              alt="Vercel logomark"
              width={16}
              height={14}
            />
            Deploy Now
          </a>
          <a
            className="flex min-h-12 flex-1 items-center justify-center rounded-full border border-border px-5 text-foreground transition-colors hover:border-transparent hover:bg-muted sm:min-w-40 sm:flex-none"
            href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            Documentation
          </a>
        </div>
      </div>
    </main>
  );
}
