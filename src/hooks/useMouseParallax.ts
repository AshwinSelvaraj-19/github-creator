/**
 * useMouseParallax — returns normalized mouse position (-1 to 1) for
 * parallax effects. Uses a spring-smoothed value so movement feels organic.
 *
 * Attach the returned `handleMouseMove` to a container, then use `x` and `y`
 * to offset child layers by different multipliers for depth.
 */

import { useEffect, useRef, useState } from 'react'

export interface ParallaxValue {
  x: number
  y: number
}

export function useMouseParallax(): ParallaxValue & {
  ref: React.RefObject<HTMLDivElement | null>
} {
  const [pos, setPos] = useState<ParallaxValue>({ x: 0, y: 0 })
  const targetRef = useRef<ParallaxValue>({ x: 0, y: 0 })
  const frameRef = useRef<number>(0)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 2
      const y = (e.clientY / window.innerHeight - 0.5) * 2
      targetRef.current = { x, y }
    }
    window.addEventListener('mousemove', onMove)
    return () => window.removeEventListener('mousemove', onMove)
  }, [])

  useEffect(() => {
    const tick = () => {
      setPos((prev) => ({
        x: prev.x + (targetRef.current.x - prev.x) * 0.06,
        y: prev.y + (targetRef.current.y - prev.y) * 0.06,
      }))
      frameRef.current = requestAnimationFrame(tick)
    }
    frameRef.current = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frameRef.current)
  }, [])

  return { ...pos, ref: containerRef }
}
