export function Divider({ style }: { style?: React.CSSProperties }) {
  return (
    <hr
      aria-hidden="true"
      style={{
        border: 'none',
        borderTop: '1px solid var(--color-border)',
        ...style,
      }}
    />
  )
}
