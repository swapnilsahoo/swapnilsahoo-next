"use client";

import Autoplay from "embla-carousel-autoplay";
import useEmblaCarousel from "embla-carousel-react";
import Image from "next/image";
import { useCallback, useEffect, useState } from "react";

import type { GalleryImage } from "@/features/profile/types";

export function GalleryCarousel({ images }: { images: GalleryImage[] }) {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [
    Autoplay({ delay: 4000, stopOnInteraction: false }),
  ]);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const scrollTo = useCallback((index: number) => emblaApi?.scrollTo(index), [emblaApi]);
  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    const onSelect = () => setSelectedIndex(emblaApi.selectedScrollSnap());
    emblaApi.on("select", onSelect);
    onSelect();
    return () => {
      emblaApi.off("select", onSelect);
    };
  }, [emblaApi]);

  return (
    <div className="glass-card p-2">
      <div className="relative overflow-hidden rounded-2xl">
        <div className="overflow-hidden" ref={emblaRef}>
          <div className="flex">
            {images.map((image) => (
              <div key={image.src} className="relative h-[420px] min-w-0 flex-[0_0_100%]">
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  className="object-cover"
                  sizes="(min-width: 1024px) 1000px, 100vw"
                />
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                  <p className="font-serif text-lg text-white">{image.caption}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <button
          type="button"
          aria-label="Previous slide"
          onClick={scrollPrev}
          className="nav-glass absolute top-1/2 left-3 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full"
        >
          <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <polyline points="15 18 9 12 15 6" />
          </svg>
        </button>
        <button
          type="button"
          aria-label="Next slide"
          onClick={scrollNext}
          className="nav-glass absolute top-1/2 right-3 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full"
        >
          <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <polyline points="9 18 15 12 9 6" />
          </svg>
        </button>

        <div className="absolute bottom-3 left-1/2 flex -translate-x-1/2 gap-2">
          {images.map((image, index) => (
            <button
              key={image.src}
              type="button"
              aria-label={`Go to slide ${index + 1}`}
              onClick={() => scrollTo(index)}
              className="h-2 w-2 rounded-full transition-opacity"
              style={{
                background: "#fff",
                opacity: index === selectedIndex ? 1 : 0.4,
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
