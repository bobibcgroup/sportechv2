'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'

interface CounterNumberProps {
  value: number
  prefix?: string
  suffix?: string
  duration?: number
  className?: string
}

export function CounterNumber({ value, prefix = '', suffix = '', duration = 2, className = '' }: CounterNumberProps) {
  const ref = useRef<HTMLSpanElement>(null)
  const prev = useRef(0)

  useEffect(() => {
    if (!ref.current) return
    const obj = { val: prev.current }
    gsap.to(obj, {
      val: value,
      duration,
      ease: 'power2.out',
      onUpdate: () => {
        if (ref.current) {
          ref.current.textContent = prefix + Math.round(obj.val).toLocaleString() + suffix
        }
      },
    })
    prev.current = value
  }, [value, duration, prefix, suffix])

  return (
    <span ref={ref} className={className}>
      {prefix}{value.toLocaleString()}{suffix}
    </span>
  )
}
