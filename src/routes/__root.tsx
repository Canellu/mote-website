import { useEffect } from "react";
import { createRootRoute, HeadContent, Link, Outlet, Scripts } from "@tanstack/react-router";
import { MICROSOFT_STORE_URL } from "../lib/links";
import styles from "../styles.css?url";

const navigation = [
  { label: "Features", to: "/features", hash: "" },
  { label: "Support", to: "/support", hash: "" },
] as const;

function RootLayout() {
  // The header scrim only appears once the page has scrolled, so the bar reads
  // as an edge over content rather than as chrome at the top of every page.
  useEffect(() => {
    const syncScrolled = () => {
      document.body.dataset.scrolled = String(window.scrollY > 8);
    };

    syncScrolled();
    window.addEventListener("scroll", syncScrolled, { passive: true });
    return () => {
      window.removeEventListener("scroll", syncScrolled);
      delete document.body.dataset.scrolled;
    };
  }, []);

  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        <a
          className="fixed top-4 left-4 z-[60] -translate-y-24 rounded-lg bg-white px-4 py-3 font-semibold text-neutral-950 shadow-lg focus:translate-y-0"
          href="#main"
        >
          Skip to content
        </a>

        <header className="site-header">
          <div className="site-header__inner">
            <Link className="site-brand" to="/" aria-label="Mote Desktop home">
              <img
                className="site-brand__logo"
                src="/brand/mote-app-icon.png"
                width="128"
                height="128"
                alt=""
              />
              <span className="site-brand__name">
                Mote <span>Desktop</span>
              </span>
            </Link>

            <nav className="site-navigation" aria-label="Primary navigation">
              <ul className="site-nav">
                {navigation.map((item) => (
                  <li key={item.label}>
                    <Link
                      className="site-nav__link"
                      to={item.to}
                      hash={item.hash}
                      activeOptions={{ includeHash: true, exact: true }}
                    >
                      <span>{item.label}</span>
                    </Link>
                  </li>
                ))}
                <li>
                  <a
                    className="site-nav__primary"
                    href={MICROSOFT_STORE_URL}
                    target="_blank"
                    rel="noreferrer"
                  >
                    Get Mote Free
                  </a>
                </li>
              </ul>
            </nav>
          </div>
        </header>

        <Outlet />

        <footer className="site-footer">
          <p>© {new Date().getFullYear()} Anton Vo</p>
          <nav aria-label="Legal navigation">
            <ul className="flex flex-wrap gap-x-5 gap-y-2">
              <li>
                <Link className="footer-link" to="/privacy">
                  Privacy policy
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

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { name: "theme-color", content: "#f2f2ed" },
    ],
    links: [
      { rel: "stylesheet", href: styles },
      { rel: "icon", href: "/brand/mote-app-icon.png", type: "image/png" },
    ],
  }),
  component: RootLayout,
  notFoundComponent: NotFound,
});
