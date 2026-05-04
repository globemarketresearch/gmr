import { HTMLAttributes, forwardRef } from 'react';
import { cn } from '@/lib/utils';

export interface SectionProps extends HTMLAttributes<HTMLElement> {
  container?: boolean;
  padding?: 'none' | 'sm' | 'md' | 'lg' | 'xl';
  background?: 'default' | 'muted' | 'card';
}

const Section = forwardRef<HTMLElement, SectionProps>(
  (
    {
      className,
      container = true,
      padding = 'lg',
      background = 'default',
      children,
      ...props
    },
    ref
  ) => {
    const backgrounds = {
      default: 'bg-[var(--background)]',
      muted: 'bg-[var(--muted)]',
      card: 'bg-[var(--card)]',
    };

    const paddings = {
      none: '',
      sm: 'py-8',
      md: 'py-12',
      lg: 'py-16',
      xl: 'py-24',
    };

    return (
      <section
        ref={ref}
        className={cn(backgrounds[background], paddings[padding], className)}
        {...props}
      >
        {container ? (
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
            {children}
          </div>
        ) : (
          children
        )}
      </section>
    );
  }
);

Section.displayName = 'Section';

export interface ContainerProps extends HTMLAttributes<HTMLDivElement> {
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
}

const Container = forwardRef<HTMLDivElement, ContainerProps>(
  ({ className, size = 'lg', children, ...props }, ref) => {
    const sizes = {
      sm: 'max-w-3xl',
      md: 'max-w-5xl',
      lg: 'max-w-7xl',
      xl: 'max-w-[1440px]',
      full: 'max-w-full',
    };

    return (
      <div
        ref={ref}
        className={cn('mx-auto px-4 sm:px-6 lg:px-8', sizes[size], className)}
        {...props}
      >
        {children}
      </div>
    );
  }
);

Container.displayName = 'Container';

export interface GridProps extends HTMLAttributes<HTMLDivElement> {
  cols?: 1 | 2 | 3 | 4 | 6 | 12;
  gap?: 'sm' | 'md' | 'lg' | 'xl';
  responsive?: boolean;
}

const Grid = forwardRef<HTMLDivElement, GridProps>(
  (
    {
      className,
      cols = 3,
      gap = 'md',
      responsive = true,
      children,
      ...props
    },
    ref
  ) => {
    const columns = {
      1: 'grid-cols-1',
      2: responsive ? 'grid-cols-1 md:grid-cols-2' : 'grid-cols-2',
      3: responsive ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' : 'grid-cols-3',
      4: responsive ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4' : 'grid-cols-4',
      6: responsive ? 'grid-cols-2 md:grid-cols-3 lg:grid-cols-6' : 'grid-cols-6',
      12: responsive ? 'grid-cols-4 md:grid-cols-6 lg:grid-cols-12' : 'grid-cols-12',
    };

    const gaps = {
      sm: 'gap-4',
      md: 'gap-6',
      lg: 'gap-8',
      xl: 'gap-12',
    };

    return (
      <div
        ref={ref}
        className={cn('grid', columns[cols], gaps[gap], className)}
        {...props}
      >
        {children}
      </div>
    );
  }
);

Grid.displayName = 'Grid';

export { Section, Container, Grid };
