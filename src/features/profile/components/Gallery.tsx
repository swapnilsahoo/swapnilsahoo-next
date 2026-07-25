import { Reveal } from "@/components/ui/Reveal";
import { galleryImages } from "@/features/profile/data/gallery";
import { GalleryCarousel } from "./GalleryCarousel";

export function Gallery() {
  return (
    <Reveal>
      <section id="gallery" className="mx-auto max-w-6xl px-6 py-24">
        <div className="mb-10 grid gap-10 md:grid-cols-12">
          <div className="md:col-span-4">
            <span className="accent-rule" />
            <p className="eyebrow mb-3">08 / Gallery</p>
            <h2 className="display text-4xl font-semibold md:text-5xl">In the field.</h2>
          </div>
          <p className="text-ink-600 dark:text-ink-300 self-end text-sm leading-relaxed md:col-span-8">
            Conferences, classrooms, and the occasional award.
          </p>
        </div>

        <GalleryCarousel images={galleryImages} />
      </section>
      <div className="hr-fade mx-auto max-w-6xl" />
    </Reveal>
  );
}
