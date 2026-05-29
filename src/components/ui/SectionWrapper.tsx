'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

interface SectionWrapperProps {
  children: React.ReactNode
  className?: string
  id?: string
  reducedFallback?: boolean
}

export function SectionWrapper({ children, className = '', id, reducedFallback }: SectionWrapperProps) {
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, margin: '-10% 0px' })

  return (
    <section
      ref={ref}
      id={id}
      className={`relative w-full overflow-hidden ${className}`}
    >
      <motion.div
        initial={reducedFallback ? false : { opacity: 0, y: 30 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      >
        {children}
      </motion.div>
    </section>
  )
}
