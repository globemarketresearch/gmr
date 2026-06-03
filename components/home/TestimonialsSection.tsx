'use client';

import { useState } from 'react';
import { Section, Container } from '@/components/ui';
import testimonialsData from '@/data/testimonials.json';

interface Testimonial {
  id: number;
  quote: string;
  name: string;
  role: string;
  company: string;
  location: string;
  rating: number;
}

const testimonials: Testimonial[] = testimonialsData;
const ITEMS_PER_SLIDE = 3;

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg
          key={i}
          className={`w-4 h-4 ${i < rating ? 'text-amber-400' : 'text-[var(--border-color)]'}`}
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

function getInitials(name: string): string {
  return name
    .split(' ')
    .map(n => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);
}

const avatarGradients = [
  'from-sky-500 to-blue-600',
  'from-violet-500 to-purple-600',
  'from-emerald-500 to-teal-600',
  'from-amber-500 to-orange-500',
  'from-rose-500 to-pink-600',
  'from-cyan-500 to-blue-500',
];

export default function TestimonialsSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const totalSlides = Math.ceil(testimonials.length / ITEMS_PER_SLIDE);

  const nextSlide = () => setCurrentIndex((prev) => (prev + 1) % totalSlides);
  const prevSlide = () => setCurrentIndex((prev) => (prev - 1 + totalSlides) % totalSlides);

  const currentTestimonials = testimonials.slice(
    currentIndex * ITEMS_PER_SLIDE,
    (currentIndex + 1) * ITEMS_PER_SLIDE
  );

  return (
    <Section padding="sm">
      <Container size="xl">
        <div className="space-y-10">
          <div className="text-center space-y-3">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-[var(--text-primary)]" style={{ letterSpacing: '-0.03em' }}>
              Trusted by Industry Leaders
            </h2>
            <p className="font-body text-lg text-[var(--text-secondary)] max-w-2xl mx-auto">
              What our clients say about our research
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {currentTestimonials.map((testimonial, i) => (
              <div
                key={testimonial.id}
                className="relative group bg-[var(--surface-raised)] border border-[var(--border-color)] rounded-2xl p-7 shadow-[var(--shadow-card)] hover:shadow-[var(--shadow-card-hover)] hover:-translate-y-0.5 transition-all duration-200 flex flex-col overflow-hidden"
              >
                {/* Decorative quote mark */}
                <svg
                  className="absolute -top-2 -left-1 w-16 h-16 text-[var(--accent)] opacity-[0.06] select-none pointer-events-none"
                  fill="currentColor"
                  viewBox="0 0 32 32"
                  aria-hidden="true"
                >
                  <path d="M9.352 4C4.456 7.456 1 13.12 1 19.36c0 5.088 3.072 8.064 6.624 8.064 3.36 0 5.856-2.688 5.856-5.856 0-3.168-2.208-5.472-5.088-5.472-.576 0-1.344.096-1.536.192.48-3.264 3.552-7.104 6.624-9.024L9.352 4zm16.512 0c-4.8 3.456-8.256 9.12-8.256 15.36 0 5.088 3.072 8.064 6.624 8.064 3.264 0 5.856-2.688 5.856-5.856 0-3.168-2.304-5.472-5.184-5.472-.576 0-1.248.096-1.44.192.48-3.264 3.456-7.104 6.528-9.024L25.864 4z" />
                </svg>

                {/* Stars */}
                <StarRating rating={testimonial.rating} />

                {/* Quote */}
                <p className="font-body text-[var(--text-secondary)] text-sm leading-relaxed mt-4 flex-grow relative z-10">
                  &ldquo;{testimonial.quote}&rdquo;
                </p>

                {/* Divider */}
                <div className="my-5 h-px bg-gradient-to-r from-transparent via-[var(--border-color)] to-transparent" />

                {/* Author */}
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${avatarGradients[i % avatarGradients.length]} flex items-center justify-center text-white text-xs font-bold flex-shrink-0 shadow-sm font-display`}>
                    {getInitials(testimonial.name || testimonial.company)}
                  </div>
                  <div className="min-w-0">
                    <div className="font-body text-sm font-semibold text-[var(--text-primary)] truncate">
                      {testimonial.name}
                    </div>
                    <div className="font-body text-xs text-[var(--text-secondary)] truncate">
                      {testimonial.role} &middot; {testimonial.company}
                    </div>
                  </div>
                  <span className="ml-auto text-xs text-[var(--text-tertiary)] font-body whitespace-nowrap hidden sm:block">
                    {testimonial.location}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-center gap-4">
            <button
              onClick={prevSlide}
              className="w-11 h-11 rounded-full border border-[var(--border-color)] bg-[var(--surface-raised)] hover:bg-[var(--accent-muted)] hover:border-[var(--accent)] text-[var(--text-secondary)] hover:text-[var(--accent)] flex items-center justify-center transition-all duration-200"
              aria-label="Previous testimonials"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>

            <div className="flex gap-2 items-center">
              {Array.from({ length: totalSlides }).map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    index === currentIndex
                      ? 'w-8 bg-[var(--accent)]'
                      : 'w-2 bg-[var(--border-color)] hover:bg-[var(--text-tertiary)]'
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                  style={{ minWidth: index === currentIndex ? '2rem' : '0.5rem' }}
                />
              ))}
            </div>

            <button
              onClick={nextSlide}
              className="w-11 h-11 rounded-full border border-[var(--border-color)] bg-[var(--surface-raised)] hover:bg-[var(--accent-muted)] hover:border-[var(--accent)] text-[var(--text-secondary)] hover:text-[var(--accent)] flex items-center justify-center transition-all duration-200"
              aria-label="Next testimonials"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>
      </Container>
    </Section>
  );
}
