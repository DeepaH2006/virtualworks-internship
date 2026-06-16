# TravelEase Design Guidelines

## Aesthetic Stance
**Minimalist Premium Travel** — photography-led, generous whitespace, restrained color usage. Every visual decision defers to the destination photography rather than competing with it.

## Color System
| Token | Value | Usage |
|-------|-------|-------|
| Primary | `#2563EB` | CTAs, active states, links |
| Secondary | `#0EA5E9` | Gradients, accents |
| Accent | `#F59E0B` | Ratings, badges, highlights |
| Success | `#22C55E` | Confirmations, included items |
| Background | `#FFFFFF` | Page ground |
| Alt Surface | `#F8FAFC` | Section alternates |
| Text Primary | `#1E293B` | Headings, body |
| Text Secondary | `#64748B` | Labels, captions |

## Typography
- **Headings:** Poppins Bold/ExtraBold — `var(--font-heading)`
- **Body:** Inter Regular/Medium — `var(--font-body)`
- Hero: 64px desktop / 48px tablet / 36px mobile
- Section heads: 40px desktop / 32px tablet

## Spacing
- Section vertical padding: `py-20`
- Card internal: `p-5` to `p-6`
- Max content width: `max-w-7xl`

## Components

### Cards
- `rounded-2xl` corners, `shadow-sm shadow-black/5`, `border border-slate-100`
- Hover: `shadow-lg hover:-translate-y-1 transition-all duration-300`
- Image aspect: `aspect-[4/3]` for destination cards, `aspect-video` for package cards

### Buttons
- Primary: `bg-blue-600 hover:bg-blue-700 text-white rounded-xl px-5 py-2.5`
- Secondary: `border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white`
- Ghost: `bg-white/15 border border-white/30 text-white` (on dark backgrounds)

### Glassmorphism
Used on: hero search bar, sign-in/sign-up cards, testimonial section
Pattern: `bg-white/10 backdrop-blur-xl border border-white/20`

## Pages
1. Home — hero + stats + destinations + why us + packages + testimonials + CTA
2. Destinations — filter by region, destination grid
3. Destination Detail — banner, overview, attractions, hotels, tips, gallery, sidebar booking
4. Packages — sort controls, package grid
5. Package Detail — overview, inclusions, accommodation, reviews, sidebar booking
6. About — hero, story, mission/vision/values, team, timeline
7. Contact — info + map + form with validation
8. Sign In — glassmorphism card, validation, loading state
9. Sign Up — glassmorphism card, full validation
10. Booking — 4-step form (traveler info, package, travel details, payment)
11. Booking Success — animated confirmation, reference number
12. Search Results — match display or no-results state
13. 404 — friendly error with navigation
