import { Link } from "@tanstack/react-router";

export function NotFound() {
  return (
    <main
      id="main"
      className="mx-auto grid min-h-[70vh] w-[min(70rem,calc(100%-2rem))] content-center py-20"
    >
      <h1 className="max-w-3xl text-5xl font-semibold tracking-tight text-balance sm:text-7xl">
        Page not found
      </h1>
      <p className="mt-6 max-w-xl text-lg leading-8 text-mote-muted">
        Check the address or return to the Mote Desktop home page.
      </p>
      <Link
        className="mt-8 w-fit rounded-xl bg-mote-mint px-4 py-3 font-semibold text-mote-ink outline-offset-4 transition-transform duration-150 active:scale-[0.97]"
        to="/"
      >
        Return home
      </Link>
    </main>
  );
}
