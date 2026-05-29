'use client'

import { motion } from 'framer-motion'

const SAFE_HREF_RE = /^(https?:|\/|#)/

interface GlowButtonProps {
  children: React.ReactNode
  variant?: 'primary' | 'ghost'
  onClick?: () => void
  href?: string
}

export function GlowButton({ children, variant = 'primary', onClick, href }: GlowButtonProps) {
  const base = 'inline-flex items-center justify-center gap-2 px-8 py-4 rounded-lg font-semibold text-sm tracking-wide transition-all duration-200 cursor-pointer'
  const styles = {
    primary: `${base} bg-yellow text-base glow-yellow hover:bg-yellow-dark`,
    ghost: `${base} border border-white/20 text-white hover:border-yellow hover:text-yellow`,
  }

  const motionProps = {
    className: styles[variant],
    whileHover: { scale: 1.03 },
    whileTap: { scale: 0.97 },
    initial: { scale: 0.9, opacity: 0 },
    whileInView: { scale: 1, opacity: 1 },
    transition: { type: 'spring' as const, stiffness: 300, damping: 20 },
    viewport: { once: true },
  }

  if (href) {
    const safeHref = SAFE_HREF_RE.test(href) ? href : '#'
    return (
      <motion.a href={safeHref} {...motionProps}>
        {children}
      </motion.a>
    )
  }

  return (
    <motion.button type="button" {...motionProps} onClick={onClick}>
      {children}
    </motion.button>
  )
}
