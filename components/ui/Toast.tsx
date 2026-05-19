'use client'
// Toast notification — import and call showToast() anywhere in client components
import { useState, useEffect, useCallback } from 'react'

type ToastType = 'success' | 'error' | 'info'

type ToastItem = {
  id: number
  message: string
  type: ToastType
}

// Global event bus for toasts
const listeners: Array<(t: ToastItem) => void> = []

export function showToast(message: string, type: ToastType = 'info') {
  const item: ToastItem = { id: Date.now(), message, type }
  listeners.forEach(fn => fn(item))
}

export default function Toast() {
  const [toasts, setToasts] = useState<ToastItem[]>([])

  const addToast = useCallback((t: ToastItem) => {
    setToasts(prev => [...prev, t])
    setTimeout(() => {
      setToasts(prev => prev.filter(x => x.id !== t.id))
    }, 3500)
  }, [])

  useEffect(() => {
    listeners.push(addToast)
    return () => {
      const idx = listeners.indexOf(addToast)
      if (idx > -1) listeners.splice(idx, 1)
    }
  }, [addToast])

  const colors: Record<ToastType, string> = {
    success: 'var(--success)',
    error:   'var(--danger)',
    info:    'var(--accent)',
  }

  if (!toasts.length) return null

  return (
    <div style={{
      position: 'fixed', bottom: 24, right: 24,
      display: 'flex', flexDirection: 'column', gap: 10,
      zIndex: 9999,
    }}>
      {toasts.map(t => (
        <div key={t.id} className="animate-fade-up" style={{
          background: 'var(--bg-elevated)',
          border: `1px solid ${colors[t.type]}`,
          borderLeft: `4px solid ${colors[t.type]}`,
          borderRadius: 10,
          padding: '12px 18px',
          fontSize: 14,
          color: 'var(--text-primary)',
          boxShadow: '0 8px 32px rgba(0,0,0,0.12)',
          maxWidth: 340,
          display: 'flex',
          alignItems: 'center',
          gap: 10,
        }}>
          <span style={{ color: colors[t.type], fontSize: 16 }}>
            {t.type === 'success' ? '✓' : t.type === 'error' ? '✕' : 'ℹ'}
          </span>
          {t.message}
        </div>
      ))}
    </div>
  )
}
