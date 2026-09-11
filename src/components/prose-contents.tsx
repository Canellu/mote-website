interface ProseContentsProps {
  sections: readonly { id: string; label: string }[];
}

/**
 * The section index at the top of a legal page. These are pages people arrive
 * at with one question — what is stored, who reads my email, can I get a refund
 * — rather than pages they read through, so the headings are worth exposing
 * before the prose starts instead of leaving a dozen of them to be scrolled for.
 */
export function ProseContents({ sections }: ProseContentsProps) {
  return (
    <nav className="prose-contents" aria-label="Sections on this page">
      <ol>
        {sections.map((section) => (
          <li key={section.id}>
            <a className="footer-link" href={`#${section.id}`}>
              {section.label}
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}
