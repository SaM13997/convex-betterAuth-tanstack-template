import type { LucideIcon } from 'lucide-react'
import { Home, Network, SquareFunction } from 'lucide-react'

import { StickyNoteIcon } from '@/components/icons'

export type BottomNavItem = {
  href: '/' | '/demo/start/server-funcs' | '/demo/start/api-request' | '/demo/start/ssr'
  icon: LucideIcon
  label: string
  color: string
  darkColor: string
}

export const bottomNavItems: BottomNavItem[] = [
  {
    href: '/',
    label: 'Home',
    icon: Home,
    color: 'bg-cyan-500/10',
    darkColor: 'text-cyan-400',
  },
  {
    href: '/demo/start/server-funcs',
    label: 'Server Functions',
    icon: SquareFunction,
    color: 'bg-purple-500/10',
    darkColor: 'text-purple-400',
  },
  {
    href: '/demo/start/api-request',
    label: 'API Request',
    icon: Network,
    color: 'bg-emerald-500/10',
    darkColor: 'text-emerald-400',
  },
  {
    href: '/demo/start/ssr',
    label: 'SSR Demos',
    icon: StickyNoteIcon,
    color: 'bg-amber-500/10',
    darkColor: 'text-amber-400',
  },
] as const

