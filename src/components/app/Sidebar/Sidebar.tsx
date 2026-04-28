import { forwardRef } from 'react'
import { cn } from '@/utils/cn'

export interface SidebarItem {
  id: string
  label: string
  icon: string
  badge?: string
  section?: string
}

export interface SidebarProps extends React.HTMLAttributes<HTMLElement> {
  items: SidebarItem[]
  activeId: string
  onNavigate: (id: string) => void
  brandName?: string
  collapsed?: boolean
}

export const Sidebar = forwardRef<HTMLElement, SidebarProps>(
  (
    { className, items, activeId, onNavigate, brandName = 'banoffee.ai', collapsed = false, ...props },
    ref
  ) => {
    // Group items by section
    const sections: { section: string | null; items: SidebarItem[] }[] = []
    let currentSection: string | null = null

    for (const item of items) {
      if (item.section !== currentSection) {
        currentSection = item.section ?? null
        sections.push({ section: currentSection, items: [] })
      }
      sections[sections.length - 1].items.push(item)
    }

    return (
      <nav
        ref={ref}
        className={cn(
          'flex flex-col h-full bg-[var(--color-espresso)]',
          'transition-[width] duration-200 ease-in-out',
          collapsed ? 'w-16' : 'w-60',
          className
        )}
        {...props}
      >
        {/* Brand */}
        <div
          className={cn(
            'flex items-center h-14 px-4 border-b border-[var(--color-border-dark)]',
            collapsed && 'justify-center px-0'
          )}
        >
          <span className="text-[var(--color-caramel)] font-bold text-[length:1rem] truncate">
            {collapsed ? brandName.charAt(0).toUpperCase() : brandName}
          </span>
        </div>

        {/* Nav items */}
        <div className="flex-1 overflow-y-auto py-2">
          {sections.map((group, gi) => (
            <div key={gi}>
              {group.section && !collapsed && (
                <div className="px-4 pt-4 pb-1 text-[length:0.65rem] font-bold uppercase tracking-widest text-[var(--color-muted)]">
                  {group.section}
                </div>
              )}
              {group.items.map((item) => {
                const isActive = item.id === activeId
                return (
                  <button
                    key={item.id}
                    onClick={() => onNavigate(item.id)}
                    title={collapsed ? item.label : undefined}
                    className={cn(
                      'flex items-center w-full gap-2.5 px-4 py-2',
                      'text-[length:0.88rem] font-medium text-[var(--color-cream-dim)]',
                      'transition-colors duration-150',
                      'hover:bg-[var(--color-dark-2)]',
                      isActive && [
                        'bg-[var(--color-caramel)]/12 text-[var(--color-caramel)]',
                        'border-l-[3px] border-[var(--color-caramel)]',
                      ],
                      !isActive && 'border-l-[3px] border-transparent',
                      collapsed && 'justify-center px-0'
                    )}
                  >
                    <span className="text-base shrink-0">{item.icon}</span>
                    {!collapsed && (
                      <>
                        <span className="truncate">{item.label}</span>
                        {item.badge && (
                          <span className="ml-auto text-[length:0.65rem] font-bold bg-[var(--color-caramel)]/20 text-[var(--color-caramel)] px-1.5 py-0.5 rounded-full">
                            {item.badge}
                          </span>
                        )}
                      </>
                    )}
                  </button>
                )
              })}
            </div>
          ))}
        </div>
      </nav>
    )
  }
)

Sidebar.displayName = 'Sidebar'
