import { motion, AnimatePresence } from 'framer-motion'
import { FiArrowUp } from 'react-icons/fi'
import { useScrolled } from '@/hooks'

export function ScrollToTop() {
  const visible = useScrolled(400)

  function scrollTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          key="scroll-top"
          initial={{ opacity: 0, scale: 0.8, y: 8 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 8 }}
          transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
          whileHover={{ y: -2 }}
          whileTap={{ scale: 0.93 }}
          onClick={scrollTop}
          aria-label="Scroll to top"
          style={{
            position: 'fixed',
            bottom: '1.75rem',
            right: '1.75rem',
            zIndex: 40,
            width: 40,
            height: 40,
            borderRadius: 'var(--radius-md)',
            background: 'rgba(255,255,255,0.07)',
            border: '1px solid rgba(255,255,255,0.12)',
            color: 'var(--color-muted)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            backdropFilter: 'blur(12px)',
            transition: 'color 150ms ease, background 150ms ease, border-color 150ms ease',
          }}
          onMouseEnter={e => {
            e.currentTarget.style.color = 'var(--color-text)'
            e.currentTarget.style.background = 'rgba(255,255,255,0.12)'
            e.currentTarget.style.borderColor = 'rgba(255,255,255,0.2)'
          }}
          onMouseLeave={e => {
            e.currentTarget.style.color = 'var(--color-muted)'
            e.currentTarget.style.background = 'rgba(255,255,255,0.07)'
            e.currentTarget.style.borderColor = 'rgba(255,255,255,0.12)'
          }}
        >
          <FiArrowUp size={16} strokeWidth={2}/>
        </motion.button>
      )}
    </AnimatePresence>
  )
}
