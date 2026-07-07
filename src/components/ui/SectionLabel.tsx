interface SectionLabelProps {
  children: React.ReactNode
  id?: string
}

export function SectionLabel({ children, id }: SectionLabelProps) {
  return (
    <p
      id={id}
      style={{
        fontSize: 'var(--text-xs)',
        fontWeight: 500,
        letterSpacing: '0.1em',
        textTransform: 'uppercase',
        color: 'var(--color-accent)',
        marginBottom: '1rem',
      }}
    >
      {children}
    </p>
  )
}
