"use client";

import useEmblaCarousel from "embla-carousel-react";
import Image from "next/image";
import { useCallback, useEffect, useState } from "react";

import type { GalleryImage } from "@/features/profile/types";

export function GalleryCarousel({ images }: { images: GalleryImage[] }) {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });
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
    <div
      className="glass-card p-2"
      role="region"
      aria-roledescription="carousel"
      aria-label="Fieldwork and teaching gallery"
    >
      <div className="relative overflow-hidden rounded-2xl">
        <div className="overflow-hidden" ref={emblaRef}>
          <div className="flex">
            {images.map((image, index) => (
              <div
                key={image.src}
                role="group"
                aria-roledescription="slide"
                aria-label={`${index + 1} of ${images.length}`}
                className="relative h-[min(64vh,32rem)] min-w-0 flex-[0_0_100%] overflow-hidden bg-slate-950 sm:h-[420px]"
              >
                {image.objectFit === "contain" ? (
                  <>
                    <Image
                      src={image.src}
                      alt=""
                      fill
                      aria-hidden="true"
                      className="scale-110 object-cover opacity-45 blur-2xl"
                      style={{ objectPosition: image.objectPosition }}
                      sizes="(min-width: 1024px) 1000px, 100vw"
                      quality={45}
                    />
                    <div className="absolute inset-0 bg-black/35" aria-hidden="true" />
                  </>
                ) : null}
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  className={image.objectFit === "contain" ? "object-contain" : "object-cover"}
                  style={{ objectPosition: image.objectPosition }}
                  sizes="(min-width: 1024px) 1000px, 100vw"
                  quality={85}
                />
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/85 via-black/55 to-transparent px-4 pt-20 pb-12 sm:px-6">
                  <p className="font-serif text-lg font-semibold text-white">{image.caption}</p>
                  {image.description ? (
                    <p className="mt-1.5 max-w-3xl text-xs leading-relaxed text-white/85 sm:text-sm">
                      {image.description}
                    </p>
                  ) : null}
                </div>
              </div>
            ))}
          </div>
        </div>

        <button
          type="button"
          aria-label="Previous slide"
          onClick={scrollPrev}
          className="nav-glass absolute top-1/2 left-3 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full"
        >
          <svg
            className="h-4 w-4"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
          >
            <polyline points="15 18 9 12 15 6" />
          </svg>
        </button>
        <button
          type="button"
          aria-label="Next slide"
          onClick={scrollNext}
          className="nav-glass absolute top-1/2 right-3 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full"
        >
          <svg
            className="h-4 w-4"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
          >
            <polyline points="9 18 15 12 9 6" />
          </svg>
        </button>

        <div className="absolute bottom-2 left-1/2 flex -translate-x-1/2">
          {images.map((image, index) => (
            <button
              key={image.src}
              type="button"
              aria-label={`Go to slide ${index + 1}`}
              aria-current={index === selectedIndex ? "true" : undefined}
              onClick={() => scrollTo(index)}
              className="grid h-8 w-6 place-items-center rounded-full sm:w-8"
            >
              <span
                className="block h-2.5 w-2.5 rounded-full bg-white shadow-sm transition-opacity"
                style={{ opacity: index === selectedIndex ? 1 : 0.45 }}
                aria-hidden="true"
              />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
