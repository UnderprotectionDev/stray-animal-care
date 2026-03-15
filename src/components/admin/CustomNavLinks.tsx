'use client'
import React from 'react'
import { usePathname } from 'next/navigation'

const NAV_ITEMS = [
  { label: 'Hayvan Takip', href: '/admin/hayvan-takip', icon: '\u{1F43E}' },
  { label: 'Vaka Takip', href: '/admin/vaka-takip', icon: '\u{1F6A8}' },
  { label: 'Gönüllü Yönetim', href: '/admin/gonullu-yonetim', icon: '\u{1F91D}' },
]

export const CustomNavLinks: React.FC = () => {
  const pathname = usePathname()

  return (
    <div className="paws-nav-group">
      <span className="paws-nav-group__label">Özel Paneller</span>
      <nav className="paws-nav-group__links">
        {NAV_ITEMS.map((item) => (
          <a
            key={item.href}
            href={item.href}
            className={`paws-nav-group__link ${pathname === item.href ? 'paws-nav-group__link--active' : ''}`}
          >
            <span className="paws-nav-group__icon">{item.icon}</span>
            {item.label}
          </a>
        ))}
      </nav>
      <style>{`
        .paws-nav-group {
          padding: 12px 16px 8px;
          border-top: 1px solid var(--theme-elevation-150);
          margin-top: 8px;
        }
        .paws-nav-group__label {
          display: block;
          font-size: 0.7rem;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          color: var(--theme-elevation-500);
          margin-bottom: 6px;
          padding-left: 4px;
        }
        .paws-nav-group__links {
          display: flex;
          flex-direction: column;
          gap: 2px;
        }
        .paws-nav-group__link {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 6px 8px;
          border-radius: 4px;
          font-size: 0.875rem;
          text-decoration: none;
          color: var(--theme-text);
          transition: background 0.15s;
        }
        .paws-nav-group__link:hover {
          background: var(--theme-elevation-100);
        }
        .paws-nav-group__link--active {
          background: var(--theme-elevation-150);
          font-weight: 500;
        }
        .paws-nav-group__icon {
          font-size: 1rem;
          line-height: 1;
        }
      `}</style>
    </div>
  )
}
