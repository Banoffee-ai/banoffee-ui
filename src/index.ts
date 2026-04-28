// ── Styles ──
// Note: consumers import styles separately via '@banoffee/ui/styles'
// Do NOT import styles here (causes SSR issues)

// ── Utilities ──
export { cn } from './utils/cn'
export { useMediaQuery } from './utils/useMediaQuery'
export { useIntersectionObserver } from './utils/useIntersectionObserver'
export { useLocalStorage } from './utils/useLocalStorage'

// ── Primitives ──
export { Button } from './components/primitives/Button'
export type { ButtonProps } from './components/primitives/Button'

export { Badge } from './components/primitives/Badge'
export type { BadgeProps } from './components/primitives/Badge'

export { Input } from './components/primitives/Input'
export type { InputProps } from './components/primitives/Input'

export { Select } from './components/primitives/Select'
export type { SelectProps, SelectOption } from './components/primitives/Select'

export { Slider } from './components/primitives/Slider'
export type { SliderProps } from './components/primitives/Slider'

export { Eyebrow } from './components/primitives/Eyebrow'
export type { EyebrowProps } from './components/primitives/Eyebrow'

export { Divider } from './components/primitives/Divider'
export type { DividerProps } from './components/primitives/Divider'

// ── Layout ──
export { Container } from './components/layout/Container'
export type { ContainerProps } from './components/layout/Container'

export { Section } from './components/layout/Section'
export type { SectionProps } from './components/layout/Section'

export { Card } from './components/layout/Card'
export type { CardProps } from './components/layout/Card'

export { Grid } from './components/layout/Grid'
export type { GridProps } from './components/layout/Grid'

// ── Marketing ──
export { HeroPill } from './components/marketing/HeroPill'
export type { HeroPillProps } from './components/marketing/HeroPill'

export { StatBlock } from './components/marketing/StatBlock'
export type { StatBlockProps } from './components/marketing/StatBlock'

export { Marquee } from './components/marketing/Marquee'
export type { MarqueeProps } from './components/marketing/Marquee'

export { ServiceCard } from './components/marketing/ServiceCard'
export type { ServiceCardProps } from './components/marketing/ServiceCard'

export { ProcessStep } from './components/marketing/ProcessStep'
export type { ProcessStepProps } from './components/marketing/ProcessStep'

export { TechPill } from './components/marketing/TechPill'
export type { TechPillProps } from './components/marketing/TechPill'

export { FaqItem } from './components/marketing/FaqItem'
export type { FaqItemProps } from './components/marketing/FaqItem'

// ── App UI ──
export { StatusBadge } from './components/app/StatusBadge'
export type { StatusBadgeProps } from './components/app/StatusBadge'

export { DataTable } from './components/app/DataTable'
export type { DataTableProps, Column } from './components/app/DataTable'

export { FormGroup } from './components/app/FormGroup'
export type { FormGroupProps } from './components/app/FormGroup'

export { Sidebar } from './components/app/Sidebar'
export type { SidebarProps, SidebarItem } from './components/app/Sidebar'

export { PageHeader } from './components/app/PageHeader'
export type { PageHeaderProps, BreadcrumbItem } from './components/app/PageHeader'

export { EmptyState } from './components/app/EmptyState'
export type { EmptyStateProps } from './components/app/EmptyState'

export { ProgressBar } from './components/app/ProgressBar'
export type { ProgressBarProps } from './components/app/ProgressBar'

export { Toast, ToastProvider, useToast } from './components/app/Toast'
export type { ToastProps, ToastMessage, ToastVariant } from './components/app/Toast'