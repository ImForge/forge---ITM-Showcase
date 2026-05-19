'use client'
import { useState, useEffect } from 'react'

export default function Greeting({ hasUser }: { hasUser: boolean }) {
  const [text, setText] = useState('')

  useEffect(() => {
    const hour = new Date().getHours()
    const g = hour < 5  ? 'Up late'
            : hour < 12 ? 'Good morning'
            : hour < 17 ? 'Good afternoon'
            : hour < 21 ? 'Good evening'
            : 'Good night'
    setText(g + (hasUser ? ', welcome back' : ' — sign in to get started'))
  }, [hasUser])

  if (!text) return null

  return (
    <p style={{
      fontSize: 12, color: 'var(--text-muted)',
      letterSpacing: '0.08em', textTransform: 'uppercase',
      marginBottom: 20,
    }}>
      {text}
    </p>
  )
}
