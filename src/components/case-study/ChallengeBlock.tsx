import type { Challenge } from '@/types'

interface ChallengeBlockProps {
  challenge: Challenge
  index: number
}

export function ChallengeBlock({ challenge, index }: ChallengeBlockProps) {
  return (
    <div style={{ marginBottom: '2.5rem' }} className="challenge-last-none">
      {/* Index + Title */}
      <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.75rem', marginBottom: '0.875rem' }}>
        <span style={{
          fontSize: 'var(--text-xs)',
          fontFamily: 'var(--font-mono)',
          color: 'var(--color-subtle)',
          flexShrink: 0,
          letterSpacing: '0.04em',
        }}>
          {String(index + 1).padStart(2, '0')}
        </span>
        <h3 style={{
          fontSize: 'var(--text-base)',
          fontWeight: 600,
          color: 'var(--color-text)',
          lineHeight: 1.4,
          letterSpacing: '-0.02em',
        }}>
          {challenge.title}
        </h3>
      </div>

      {/* Problem */}
      <p style={{
        fontSize: 'var(--text-sm)',
        color: 'var(--color-muted)',
        lineHeight: 1.75,
        marginBottom: '1.25rem',
        paddingLeft: '1.75rem',
        letterSpacing: '-0.01em',
      }}>
        {challenge.description}
      </p>

      {/* Solution */}
      <div style={{
        borderLeft: '2px solid rgba(59,130,246,0.25)',
        paddingLeft: '1rem',
        marginLeft: '1.75rem',
      }}>
        <p style={{
          fontSize: 'var(--text-xs)',
          fontWeight: 500,
          letterSpacing: '0.1em',
          textTransform: 'uppercase',
          color: 'var(--color-subtle)',
          marginBottom: '0.5rem',
        }}>
          Solution
        </p>
        <p style={{
          fontSize: 'var(--text-sm)',
          color: 'var(--color-muted)',
          lineHeight: 1.75,
          letterSpacing: '-0.01em',
        }}>
          {challenge.solution}
        </p>
      </div>
    </div>
  )
}
