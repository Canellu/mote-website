interface PageIntroProps {
  children: React.ReactNode;
  title: string;
}

export function PageIntro({ children, title }: PageIntroProps) {
  return (
    <header className="border-b border-mote-line pb-12 sm:pb-16">
      <h1 className="max-w-4xl text-[clamp(2.75rem,8vw,5.5rem)] leading-[0.96] font-semibold tracking-[-0.04em] text-balance">
        {title}
      </h1>
      <div className="mt-7 max-w-2xl text-lg leading-8 text-mote-muted sm:text-xl">{children}</div>
    </header>
  );
}
