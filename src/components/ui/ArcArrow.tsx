/** Arrow that leaves along an arc and re-enters on hover. */
export function ArcArrow() {
  const path = <path d="M3 13 13 3M5.5 3H13v7.5" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />;
  return (
    <span className="arc-arrow" aria-hidden="true">
      <svg viewBox="0 0 16 16" width="16" height="16">
        {path}
      </svg>
      <svg viewBox="0 0 16 16" width="16" height="16">
        {path}
      </svg>
    </span>
  );
}
