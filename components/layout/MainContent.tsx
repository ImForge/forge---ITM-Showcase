'use client'
import { useState, useEffect } from 'react'

export default function MainContent({ children }: { children: React.ReactNode }) {
  const [isMobile, setIsMobile] = useState<boolean | null>(null)

  useEffect(() => {
    function check() { setIsMobile(window.innerWidth < 768) }
    check()
    window.addEventListener('resize', check)
    return () => window.removeEventListener('resize', check)
  }, [])

  return (
    <main style={{
      // Push content right of the sidebar on desktop
      marginLeft: isMobile === false ? 'var(--sidebar-width)' : 0,
      // Push content below the fixed topbar on mobile
      paddingTop: isMobile ? 52 : 0,
      minHeight: '100vh',
      // Fill ALL remaining horizontal space — this is the fix for content
      // only showing on left half
      width: isMobile === false
        ? 'calc(100vw - var(--sidebar-width))'
        : '100vw',
      background: 'var(--bg-base)',
    }}>
      {children}
    </main>
  )
}
