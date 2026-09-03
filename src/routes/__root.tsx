import { createRootRoute, HeadContent, Link, Outlet, Scripts } from "@tanstack/react-router";
import styles from "../styles.css?url";

const navigation = [
  { label: "Features", to: "/features" },
  { label: "Support", to: "/support" },
] as const;

function RootLayout() {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        <a
          className="fixed top-4 left-4 z-50 -translate-y-24 rounded-lg bg-white px-4 py-3 font-semibold text-neutral-950 shadow-lg focus:translate-y-0"
          href="#main"
        >
          Skip to content
        </a>

        <header className="mx-auto flex min-h-20 w-[min(70rem,calc(100%-2rem))] flex-wrap items-center justify-between gap-x-8 gap-y-3 py-4">
          <Link
            className="inline-flex min-h-11 items-center gap-3 font-semibold no-underline"
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

          <nav aria-label="Primary navigation">
            <ul className="site-nav flex items-center gap-1">
              {navigation.map((item) => (
                <li key={item.to}>
                  <Link
                    className="inline-flex min-h-11 items-center rounded-lg px-3 text-sm font-medium text-mote-muted no-underline"
                    to={item.to}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </header>

        <Outlet />

        <footer className="mx-auto flex w-[min(70rem,calc(100%-2rem))] flex-wrap items-center justify-between gap-5 border-t border-mote-line py-8 text-sm text-mote-muted">
          <p>© {new Date().getFullYear()} Anton Vo</p>
          <nav aria-label="Legal navigation">
            <ul className="flex flex-wrap gap-x-5 gap-y-2">
              <li>
                <Link className="footer-link" to="/privacy">
                  Privacy
                </Link>
              </li>
              <li>
                <Link className="footer-link" to="/terms">
                  Terms
                </Link>
              </li>
              <li>
                <Link className="footer-link" to="/support">
                  Support
                </Link>
              </li>
            </ul>
          </nav>
        </footer>
        <Scripts />
      </body>
    </html>
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
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { name: "theme-color", content: "#0b0d10" },
    ],
    links: [
      { rel: "stylesheet", href: styles },
      { rel: "icon", href: "/favicon.svg", type: "image/svg+xml" },
    ],
  }),
  component: RootLayout,
  notFoundComponent: NotFound,
});
