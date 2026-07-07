/* ── Project ──────────────────────────────────────────────── */
export interface Challenge {
  title: string
  description: string
  solution: string
}

export interface Project {
  slug: string
  number: string
  title: string
  category: string
  status: string       // e.g. 'Completed' | 'Production' | 'Internal'
  description: string
  tagline: string
  context: string
  problem: string
  myRole: string
  technicalApproach: string
  keyFeatures?: unknown[]
  whereItBreaksDown?: string
  challenges: Challenge[]
  takeaways: string
  stack: string[]
  images: string[]
  githubUrl?: string
  liveUrl?: string
}

/* ── Experience ───────────────────────────────────────────── */
export type BulletTag = 'Production' | 'REST API' | 'Database' | 'CMS' | 'Architecture'

export interface Bullet {
  text: string
  tag?: BulletTag
}

export interface ExperienceItem {
  company: string
  role: string
  period: string
  location: string
  description: string
  stack: string
  bullets: Bullet[]
}

/* ── Stack ────────────────────────────────────────────────── */
export interface StackGroup {
  label: string
  color: string
  skills: string[]
}

/* ── Meta ─────────────────────────────────────────────────── */
export interface SiteMeta {
  name: string
  shortName: string
  role: string
  specialization: string
  headline: string
  subheadline: string
  availableFor: string
  location: string
  email: string
  github: string
  linkedin: string
  resumeUrl: string
  contactNote: string
}

/* ── Nav ──────────────────────────────────────────────────── */
export interface NavItem {
  label: string
  href: string
  sectionId: string
}
