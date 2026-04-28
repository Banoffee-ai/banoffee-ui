// ── Styles ──
// Note: consumers import styles separately via '@banoffee/ui/styles'
// Do NOT import styles here (causes SSR issues)

// ── Utilities ──
export { cn } from './utils/cn'

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