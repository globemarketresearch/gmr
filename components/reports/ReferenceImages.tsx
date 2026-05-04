import Image from 'next/image';
import { Card, CardContent, CardDescription } from '@/components/ui';

interface ReferenceImage {
  url: string;
  caption: string;
  alt: string;
}

interface ReferenceImagesProps {
  images: ReferenceImage[];
}

export default function ReferenceImages({ images }: ReferenceImagesProps) {
  if (!images || images.length === 0) {
    return null;
  }

  return (
    <section id="reference-images" className="mb-12 scroll-mt-24">
      <h2 className="text-3xl font-bold text-[var(--foreground)] mb-6">
        Reference Images
      </h2>
      <p className="text-[var(--muted-foreground)] mb-8">
        Visual representations of key market technologies and platforms discussed in this report.
      </p>

      {/* 2x2 Grid Layout */}
      <div className="grid grid-cols-1 md:grid-cols-1 gap-6">
        {images.map((image, index) => (
          <Card key={index} className="overflow-hidden hover:shadow-lg transition-shadow duration-200">
            <CardContent className="p-0">
              {/* Image Container with Aspect Ratio */}
              <div className="relative aspect-[3/2] w-full bg-[var(--muted)]">
                <Image
                  src={image.url}
                  alt={image.alt}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>

              {/* Caption */}
              <div className="p-4">
                <CardDescription className="text-sm leading-relaxed">
                  {image.caption}
                </CardDescription>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}
