import { useEffect } from "react";
import { createRootRoute, HeadContent, Link, Outlet, Scripts } from "@tanstack/react-router";
import { MICROSOFT_STORE_URL } from "../lib/links";
import styles from "../styles.css?url";

const navigation = [
  { label: "Features", to: "/features", hash: "" },
  { label: "Support", to: "/support", hash: "" },
] as const;

const legal = [
  { label: "Privacy policy", to: "/privacy" },
  { label: "Terms", to: "/terms" },
  { label: "Support", to: "/support" },
] as const;

/**
 * The ambient light behind every page: a few large, slow-drifting Hue colors
 * fixed to the viewport, so the site reads as a lit room rather than a flat
 * sheet. Decorative only — it carries no contrast of its own, and the pages
 * paint their own surfaces over it.
 */
function Aurora() {
  return (
    <div className="site-aurora" aria-hidden="true">
      <i className="site-aurora__amber" />
      <i className="site-aurora__magenta" />
      <i className="site-aurora__aqua" />
      <i className="site-aurora__blue" />
    </div>
  );
}

/**
 * The filter that makes the footer's bulbs behave like light rather than like
 * five stacked circles. It reads the whole lit field at once — the bulbs have
 * already screened onto each other by the time it runs — and cuts the combined
 * alpha at a level only a bulb's middle reaches, which turns each one into a
 * body with a rim. Where two of them come close their skirts clear that level
 * over the ground between them, so the pair stops reading as two circles and
 * pools into one longer shape; the cut is then softened and screened back over
 * the untouched wash, which keeps the halos. Held in the document once and
 * referenced from CSS, so the band pays for one filter, not five.
 */
function LampFilter() {
  return (
    <svg className="site-filter-defs" aria-hidden="true" focusable="false">
      <defs>
        <filter
          id="hue-lamp"
          x="-25%"
          y="-30%"
          width="150%"
          height="160%"
          colorInterpolationFilters="sRGB"
        >
          <feComponentTransfer in="SourceGraphic" result="core">
            {/* Alpha in, alpha out, sampled at eighths. Nothing until a quarter
                of the way up, a steep shoulder, then a plateau: every bulb comes
                back as a body of roughly one strength with a defined rim, and
                two bulbs that reach each other join into a single longer body
                instead of merely stacking into a brighter spot. */}
            <feFuncA type="table" tableValues="0 0 0.03 0.26 0.36 0.39 0.41 0.42 0.42" />
          </feComponentTransfer>
          <feGaussianBlur in="core" stdDeviation="18" result="bloom" />
          <feBlend in="bloom" in2="SourceGraphic" mode="screen" />
        </filter>
      </defs>
    </svg>
  );
}

/**
 * The page's close and the site footer are one band: the call to action, the
 * legal links and the copyright all sit on a single dark surface lit from
 * inside, so the page ends once rather than twice.
 */
function SiteClose() {
  return (
    <footer className="site-close">
      <div className="site-close__glow" aria-hidden="true">
        <span className="site-orb site-orb--amber">
          <i />
        </span>
        <span className="site-orb site-orb--ember">
          <i />
        </span>
        <span className="site-orb site-orb--magenta">
          <i />
        </span>
        <span className="site-orb site-orb--aqua">
          <i />
        </span>
        <span className="site-orb site-orb--blue">
          <i />
        </span>
      </div>

      <div className="site-close__inner">
        <section className="site-close__cta" aria-labelledby="site-close-title">
          <h2 id="site-close-title">Mote Desktop for Windows.</h2>
          <p>Free on the Microsoft Store.</p>
          <div className="site-close__actions">
            <a className="site-cta" href={MICROSOFT_STORE_URL} target="_blank" rel="noreferrer">
              Get Mote Free
            </a>
            {/* The features page, from its top. Aimed at the comparison it used to
                land the reader deep in a page they had not seen yet, with the
                scrollbar already near its end and no sense of having arrived
                anywhere. The page opens with its own jump to the comparison. */}
            <Link className="site-cta site-cta--quiet" to="/features">
              Compare Free and Pro
            </Link>
          </div>
        </section>

        <div className="site-close__meta">
          <Link className="site-close__brand" to="/" aria-label="Mote Desktop home">
            <img src="/brand/mote-app-icon.png" width="128" height="128" alt="" />
            <span>
              Mote <span>Desktop</span>
            </span>
          </Link>

          <nav aria-label="Legal navigation">
            <ul>
              {legal.map((item) => (
                <li key={item.label}>
                  <Link className="footer-link" to={item.to}>
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <p>© {new Date().getFullYear()} Anton Vo</p>
        </div>
      </div>
    </footer>
  );
}

function RootLayout() {
  // The header is frosted throughout; this only tells it whether anything has
  // scrolled under it yet, which is when the tint deepens and the hairline
  // appears, so the bar reads as an edge rather than as chrome over the top of
  // every page.
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

        <Aurora />
        <LampFilter />

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

        <SiteClose />
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
