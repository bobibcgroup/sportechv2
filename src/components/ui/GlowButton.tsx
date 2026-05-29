'use client'

import { motion } from 'framer-motion'

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

  const content = (
    <motion.div
      className={styles[variant]}
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
      initial={{ scale: 0.9, opacity: 0 }}
      whileInView={{ scale: 1, opacity: 1 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      viewport={{ once: true }}
      onClick={onClick}
    >
      {children}
    </motion.div>
  )

  if (href) return <a href={href}>{content}</a>
  return content
}
