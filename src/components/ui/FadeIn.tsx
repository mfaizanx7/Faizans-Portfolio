import { motion, useReducedMotion as useFramerReducedMotion } from 'framer-motion'
import type { HTMLMotionProps } from 'framer-motion'

interface FadeInProps extends HTMLMotionProps<'div'> {
  delay?: number
  direction?: 'up' | 'down' | 'left' | 'right' | 'none'
  distance?: number
  duration?: number
  once?: boolean
}

export function FadeIn({
  delay = 0,
  direction = 'up',
  distance = 20,
  duration = 0.5,
  once = true,
  children,
  ...props
}: FadeInProps) {
  const reduced = useFramerReducedMotion()
  const axis    = direction === 'left' || direction === 'right' ? 'x' : 'y'
  const sign    = direction === 'down' || direction === 'right' ? -1 : 1
  const offset  = (reduced || direction === 'none') ? {} : { [axis]: sign * distance }

  return (
    <motion.div
      initial={{ opacity: reduced ? 1 : 0, ...offset }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once, margin: '-60px' }}
      transition={{
        duration: reduced ? 0.01 : duration,
        delay:    reduced ? 0    : delay,
        ease: [0.16, 1, 0.3, 1],
      }}
      {...props}
    >
      {children}
    </motion.div>
  )
}
