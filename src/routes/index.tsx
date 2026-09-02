import { createFileRoute } from "@tanstack/react-router";

const highlights = [
  "Control rooms, zones, lights, and scenes",
  "Build a dashboard around the controls you use",
  "Keep lighting control close with desktop widgets",
];

function HomePage() {
  return (
    <main id="main" className="mx-auto w-[min(70rem,calc(100%-2rem))]">
      <section
        className="grid min-h-[67vh] content-center py-20 max-sm:min-h-0 max-sm:py-20"
        aria-labelledby="hero-title"
      >
        <h1
          id="hero-title"
          className="max-w-5xl text-[clamp(3.25rem,9vw,6rem)] leading-[0.94] font-semibold tracking-[-0.04em] text-balance"
        >
          Your lights, exactly where you work.
        </h1>
        <p className="mt-8 max-w-2xl text-[clamp(1.125rem,2vw,1.35rem)] leading-relaxed text-mote-muted">
          Mote Desktop puts everyday Philips Hue controls, scenes, and focused
          widgets within easy reach on Windows.
        </p>
        <p className="mt-8 w-fit rounded-xl border border-mote-line bg-mote-panel px-4 py-3 font-semibold text-neutral-300">
          Microsoft Store release coming soon
        </p>
      </section>

      <section
        className="border-t border-mote-line py-24"
        aria-labelledby="highlights-title"
      >
        <h2
          id="highlights-title"
          className="max-w-3xl text-[clamp(2rem,5vw,4rem)] leading-[1.05] font-semibold tracking-[-0.04em] text-balance"
        >
          Made for the way you use Hue
        </h2>
        <ul className="mt-10 grid gap-4 md:grid-cols-3">
          {highlights.map((highlight) => (
            <li
              className="min-h-40 rounded-2xl bg-mote-panel p-6 text-lg leading-relaxed text-neutral-200"
              key={highlight}
            >
              {highlight}
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}

export const Route = createFileRoute("/")({ component: HomePage });

