/**
 * useTyping — cycling typewriter effect for the hero subtitle.
 *
 * Cycles through an array of phrases, typing each character then deleting,
 * with a cursor blink. Returns the current text and cursor visibility.
 */

import { useEffect, useState } from 'react'

export function useTyping(
  phrases: string[],
  typeSpeed = 80,
  deleteSpeed = 40,
  pauseMs = 1800,
): { text: string; cursor: boolean } {
  const [text, setText] = useState('')
  const [cursor, setCursor] = useState(true)
  const [phraseIdx, setPhraseIdx] = useState(0)
  const [deleting, setDeleting] = useState(false)

  useEffect(() => {
    const current = phrases[phraseIdx % phrases.length]
    let timeout: ReturnType<typeof setTimeout>

    if (!deleting && text === current) {
      timeout = setTimeout(() => setDeleting(true), pauseMs)
    } else if (deleting && text === '') {
      setDeleting(false)
      setPhraseIdx((i) => (i + 1) % phrases.length)
    } else {
      timeout = setTimeout(() => {
        setText((prev) =>
          deleting
            ? current.slice(0, prev.length - 1)
            : current.slice(0, prev.length + 1),
        )
      }, deleting ? deleteSpeed : typeSpeed)
    }
    return () => clearTimeout(timeout)
  }, [text, deleting, phraseIdx, phrases, typeSpeed, deleteSpeed, pauseMs])

  useEffect(() => {
    const interval = setInterval(() => setCursor((c) => !c), 530)
    return () => clearInterval(interval)
  }, [])

  return { text, cursor }
}
