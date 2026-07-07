import { FiArrowUpRight } from 'react-icons/fi'

interface ExternalLinkProps {
  href: string
  children: React.ReactNode
  className?: string
  showIcon?: boolean
  label?: string
}

export function ExternalLink({
  href,
  children,
  className = '',
  showIcon = true,
  label,
}: ExternalLinkProps) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className={`inline-flex items-center gap-1 text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] transition-colors duration-[150ms] ${className}`}
    >
      {children}
      {showIcon && (
        <FiArrowUpRight size={12} aria-hidden="true" className="opacity-60" />
      )}
    </a>
  )
}
