export function SkipLink() {
  return (
    <a
      href="#main-content"
      className="
        sr-only focus:not-sr-only
        focus:fixed focus:top-4 focus:left-4 focus:z-[100]
        focus:px-5 focus:py-3
        focus:bg-[var(--color-accent)] focus:text-white
        focus:text-sm focus:font-medium
        focus:rounded-[var(--radius-md)]
        focus:shadow-[var(--shadow-focus)]
      "
    >
      Skip to main content
    </a>
  )
}
