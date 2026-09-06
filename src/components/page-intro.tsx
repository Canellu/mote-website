interface PageIntroProps {
  children: React.ReactNode;
  title: string;
}

/**
 * The opening of a subpage: its title and the paragraph that frames it. Both
 * are centred on phones, where the copy is the whole width of the page and a
 * left-ragged block would read as a stray margin, and left-aligned from the
 * small breakpoint up, where the measure sits inside a wider page.
 */
export function PageIntro({ children, title }: PageIntroProps) {
  return (
    <header className="pb-12 text-center sm:pb-16 sm:text-left">
      <h1 className="mx-auto max-w-4xl text-[clamp(2.35rem,7vw,5.5rem)] leading-[1] font-semibold tracking-[-0.04em] text-balance sm:mx-0 sm:leading-[0.96]">
        {title}
      </h1>
      <div className="mx-auto mt-7 max-w-2xl text-lg leading-8 text-mote-muted sm:mx-0 sm:text-xl">
        {children}
      </div>
    </header>
  );
}
