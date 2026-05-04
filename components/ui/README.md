# Design System - Phase 2

A premium B2B design language built for healthcare research applications.

## Overview

This design system provides a comprehensive set of reusable UI components following enterprise-grade standards with:

- Neutral colors (white, gray, dark blue)
- High readability typography
- Minimal animations
- Enterprise-grade spacing & grid
- Full responsive behavior
- Subtle hover & micro-interactions

## Components

### Button

Multi-variant button component with loading states and size options.

```tsx
import { Button } from '@/components/ui';

// Variants
<Button variant="primary">Primary</Button>
<Button variant="secondary">Secondary</Button>
<Button variant="outline">Outline</Button>
<Button variant="ghost">Ghost</Button>
<Button variant="danger">Danger</Button>

// Sizes
<Button size="sm">Small</Button>
<Button size="md">Medium</Button>
<Button size="lg">Large</Button>

// States
<Button isLoading>Loading...</Button>
<Button disabled>Disabled</Button>
<Button fullWidth>Full Width</Button>
```

**Props:**
- `variant`: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger'
- `size`: 'sm' | 'md' | 'lg'
- `isLoading`: boolean
- `fullWidth`: boolean
- All standard button HTML attributes

### Card

Flexible card component with composable sub-components.

```tsx
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui';

<Card hover>
  <CardHeader>
    <CardTitle>Card Title</CardTitle>
    <CardDescription>Card description</CardDescription>
  </CardHeader>
  <CardContent>
    <p>Card content goes here</p>
  </CardContent>
  <CardFooter>
    <Button>Action</Button>
  </CardFooter>
</Card>
```

**Card Props:**
- `hover`: boolean - Enable hover animation
- `padding`: 'none' | 'sm' | 'md' | 'lg'
- `border`: boolean - Show border (default: true)

**Sub-components:**
- `CardHeader` - Header section
- `CardTitle` - Title with proper typography
- `CardDescription` - Muted description text
- `CardContent` - Main content area
- `CardFooter` - Footer section for actions

### Badge

Color-coded badges for status and categories.

```tsx
import { Badge } from '@/components/ui';

// Variants
<Badge variant="default">Default</Badge>
<Badge variant="primary">Primary</Badge>
<Badge variant="success">Success</Badge>
<Badge variant="warning">Warning</Badge>
<Badge variant="danger">Danger</Badge>
<Badge variant="outline">Outline</Badge>

// Sizes
<Badge size="sm">Small</Badge>
<Badge size="md">Medium</Badge>
<Badge size="lg">Large</Badge>
```

**Props:**
- `variant`: 'default' | 'primary' | 'success' | 'warning' | 'danger' | 'outline'
- `size`: 'sm' | 'md' | 'lg'

### Section & Layout Components

Responsive layout wrappers with container and grid utilities.

```tsx
import { Section, Container, Grid } from '@/components/ui';

// Section with automatic container
<Section padding="lg" background="muted">
  <h1>Section Content</h1>
</Section>

// Section without container
<Section container={false} padding="xl">
  <Container size="md">
    <h1>Custom Container</h1>
  </Container>
</Section>

// Responsive Grid
<Grid cols={3} gap="lg">
  <div>Item 1</div>
  <div>Item 2</div>
  <div>Item 3</div>
</Grid>
```

**Section Props:**
- `container`: boolean - Wrap content in container (default: true)
- `padding`: 'none' | 'sm' | 'md' | 'lg' | 'xl'
- `background`: 'default' | 'muted' | 'card'

**Container Props:**
- `size`: 'sm' | 'md' | 'lg' | 'xl' | 'full'

**Grid Props:**
- `cols`: 1 | 2 | 3 | 4 | 6 | 12
- `gap`: 'sm' | 'md' | 'lg' | 'xl'
- `responsive`: boolean (default: true)

### Skeleton Loaders

Loading state components for better UX.

```tsx
import { Skeleton, SkeletonText, SkeletonCard } from '@/components/ui';

// Basic skeleton
<Skeleton className="w-full h-32" />

// Text lines
<SkeletonText lines={3} lastLineWidth="70%" />

// Circular avatar
<Skeleton variant="circular" width={64} height={64} />

// Pre-built card skeleton
<SkeletonCard hasImage hasAvatar />
```

**Skeleton Props:**
- `variant`: 'text' | 'circular' | 'rectangular'
- `width`: string | number
- `height`: string | number
- `animation`: 'pulse' | 'wave' | 'none'

**SkeletonText Props:**
- `lines`: number
- `lastLineWidth`: string

**SkeletonCard Props:**
- `hasImage`: boolean
- `hasAvatar`: boolean

## Design Tokens

All components use CSS custom properties for theming:

### Colors
- `--background` - Main background
- `--foreground` - Main text color
- `--primary` - Primary brand color
- `--primary-hover` - Primary hover state
- `--secondary` - Secondary background
- `--border` - Border color
- `--card` - Card background
- `--card-foreground` - Card text color
- `--muted` - Muted background
- `--muted-foreground` - Muted text color

### Usage in Components
```tsx
// Use design tokens via Tailwind
<div className="bg-[var(--primary)] text-[var(--foreground)]">
  Content
</div>
```

## Responsive Behavior

All components are fully responsive:

- Grid automatically adjusts columns based on screen size
- Buttons maintain consistent sizing across devices
- Cards stack appropriately on mobile
- Section padding adapts to viewport

## Animations

Minimal, subtle animations for premium feel:

- **Hover states**: Smooth transitions (200ms)
- **Card hover**: Slight lift with shadow
- **Button hover**: Background color shift
- **Skeleton**: Gentle pulse animation
- **Custom animations**: fadeIn, slideIn, shimmer

## Best Practices

1. **Consistency**: Use the design system components across all pages
2. **Spacing**: Leverage the Section component for consistent vertical rhythm
3. **Typography**: Use CardTitle and CardDescription for proper hierarchy
4. **Colors**: Stick to the neutral palette (white, gray, dark blue)
5. **Hover states**: Enable hover on interactive cards
6. **Loading states**: Use skeleton loaders for async content
7. **Accessibility**: All components include proper ARIA attributes and keyboard support

## Examples

Visit `/design-system` to see all components in action with interactive examples.

## Importing Components

```tsx
// Individual imports
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';

// Bulk import from index
import { Button, Card, Badge, Section, Grid } from '@/components/ui';
```

## TypeScript Support

All components are fully typed with TypeScript:

```tsx
import type { ButtonProps, CardProps, BadgeProps } from '@/components/ui';
```

## Dark Mode

All components automatically adapt to dark mode using CSS custom properties.
