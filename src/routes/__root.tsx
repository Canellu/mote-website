import { createRootRoute, Link, Outlet } from "@tanstack/react-router";

function RootLayout() {
  return (
    <>
      <a
        className="fixed top-4 left-4 z-50 -translate-y-24 rounded-lg bg-white px-4 py-3 font-semibold text-neutral-950 focus:translate-y-0"
        href="#main"
      >
        Skip to content
      </a>

      <header className="mx-auto flex min-h-20 w-[min(70rem,calc(100%-2rem))] items-center justify-between">
        <Link
          className="inline-flex items-center gap-3 font-semibold no-underline"
          to="/"
          aria-label="Mote Desktop home"
        >
          <span
            className="grid size-8 place-items-center rounded-[0.65rem] bg-mote-mint text-mote-ink"
            aria-hidden="true"
          >
            M
          </span>
          Mote Desktop
        </Link>
        <span className="text-sm text-mote-muted max-sm:hidden">For Windows</span>
      </header>

      <Outlet />

      <footer className="mx-auto w-[min(70rem,calc(100%-2rem))] border-t border-mote-line py-8 text-sm text-mote-muted">
        <p>© {new Date().getFullYear()} Mote Desktop</p>
      </footer>
    </>
  );
}

function NotFound() {
  return (
    <main
      id="main"
      className="mx-auto grid min-h-[70vh] w-[min(70rem,calc(100%-2rem))] content-center py-20"
    >
      <h1 className="max-w-3xl text-5xl font-semibold tracking-tight text-balance sm:text-7xl">
        This page is not here.
      </h1>
      <p className="mt-6 max-w-xl text-lg leading-8 text-mote-muted">
        The address may have changed, or the page may not exist yet.
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

export const Route = createRootRoute({
  component: RootLayout,
  notFoundComponent: NotFound,
});
