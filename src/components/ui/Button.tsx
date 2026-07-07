import { motion } from 'framer-motion'
import type { ComponentPropsWithoutRef } from 'react'

type Variant = 'primary' | 'secondary' | 'ghost'
type Size    = 'sm' | 'md'

interface ButtonProps {
  variant?: Variant
  size?: Size
  href?: string
  external?: boolean
  download?: boolean
  children: React.ReactNode
  onClick?: () => void
  className?: string
  disabled?: boolean
  'aria-label'?: string
}

const BASE = {
  display: 'inline-flex',
  alignItems: 'center',
  gap: '0.4rem',
  fontFamily: 'inherit',
  fontWeight: 500,
  letterSpacing: '-0.01em',
  borderRadius: 'var(--radius-md)',
  border: '1px solid transparent',
  cursor: 'pointer',
  transition: 'background 150ms ease, border-color 150ms ease, color 150ms ease, filter 150ms ease',
  textDecoration: 'none',
  whiteSpace: 'nowrap' as const,
  flexShrink: 0,
}

const SIZE: Record<Size, React.CSSProperties> = {
  sm: { padding: '0.45rem 1rem',    fontSize: 'var(--text-sm)' },
  md: { padding: '0.625rem 1.375rem', fontSize: 'var(--text-sm)' },
}

const VARIANT_DEFAULT: Record<Variant, React.CSSProperties> = {
  primary: {
    background: 'var(--color-accent)',
    color: '#fff',
    borderColor: 'transparent',
  },
  secondary: {
    background: 'rgba(255,255,255,0.05)',
    color: 'var(--color-muted)',
    borderColor: 'rgba(255,255,255,0.09)',
  },
  ghost: {
    background: 'transparent',
    color: 'var(--color-muted)',
    borderColor: 'transparent',
  },
}

const VARIANT_HOVER: Record<Variant, Partial<React.CSSProperties>> = {
  primary:   { filter: 'brightness(1.1)' },
  secondary: { background: 'rgba(255,255,255,0.09)', color: 'var(--color-text)', borderColor: 'rgba(255,255,255,0.15)' },
  ghost:     { background: 'rgba(255,255,255,0.06)', color: 'var(--color-text)' },
}

const VARIANT_LEAVE: Record<Variant, Partial<React.CSSProperties>> = {
  primary:   { filter: '' },
  secondary: { background: 'rgba(255,255,255,0.05)', color: 'var(--color-muted)', borderColor: 'rgba(255,255,255,0.09)' },
  ghost:     { background: 'transparent', color: 'var(--color-muted)' },
}

export function Button({
  variant = 'secondary',
  size = 'md',
  href,
  external,
  download,
  children,
  onClick,
  className,
  disabled,
  'aria-label': ariaLabel,
}: ButtonProps) {
  const style: React.CSSProperties = {
    ...BASE,
    ...SIZE[size],
    ...VARIANT_DEFAULT[variant],
    ...(disabled ? { opacity: 0.4, pointerEvents: 'none' } : {}),
  }

  const motionProps = {
    whileHover: { y: -1 },
    whileTap:   { scale: 0.97 },
    transition: { duration: 0.15, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] },
    style,
    className,
    'aria-label': ariaLabel,
    onMouseEnter: (e: React.MouseEvent<HTMLElement>) => {
      Object.assign(e.currentTarget.style, VARIANT_HOVER[variant])
    },
    onMouseLeave: (e: React.MouseEvent<HTMLElement>) => {
      Object.assign(e.currentTarget.style, VARIANT_LEAVE[variant])
    },
  }

  if (href) {
    return (
      <motion.a
        {...(motionProps as unknown as ComponentPropsWithoutRef<typeof motion.a>)}
        href={href}
        target={external ? '_blank' : undefined}
        rel={external ? 'noopener noreferrer' : undefined}
        download={download || undefined}
      >
        {children}
      </motion.a>
    )
  }

  return (
    <motion.button
      {...(motionProps as unknown as ComponentPropsWithoutRef<typeof motion.button>)}
      onClick={onClick}
      disabled={disabled}
      type="button"
    >
      {children}
    </motion.button>
  )
}
