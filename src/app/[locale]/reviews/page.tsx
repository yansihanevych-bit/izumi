import { VideoTile } from "@/components/media/VideoTile";
import { copy } from "@/content/copy";
import { reviewFields, videoReviews } from "@/content/reviews";
import { metadataFor, type LocaleProps } from "@/lib/page";

export const generateMetadata = metadataFor("reviews", "reviews/");

export default async function Reviews({ params }: LocaleProps) {
  const { locale } = await params;
  const c = copy.reviews;

  return (
    <div className="wrap pb-24 pt-14 lg:pt-20">
      <h1 className="max-w-4xl text-h1">{c.title[locale]}</h1>
      <p className="measure mt-6 text-lead text-muted">{c.lead[locale]}</p>

      {reviewFields.map((field) => {
        const people = videoReviews.filter((r) => r.field === field.id);
        if (!people.length) return null;
        return (
          <section key={field.id} className="mt-20 grid gap-8 border-t border-roast pt-8 lg:grid-cols-[14rem_1fr]" aria-labelledby={`f-${field.id}`}>
            <h2 id={`f-${field.id}`} className="text-h3 lg:sticky lg:top-28 lg:self-start">
              {field.label[locale]}
              <span className="ml-2 font-sans text-base text-muted tabular-nums">{people.length}</span>
            </h2>
            <ul className="grid grid-cols-2 gap-x-5 gap-y-10 md:grid-cols-3 xl:grid-cols-4">
              {people.map((r, i) => (
                <li key={r.id} id={r.id} className={`scroll-mt-28 ${i === 0 ? "col-span-2 row-span-2" : ""}`}>
                  <div className={`relative overflow-hidden rounded-[1.25rem] bg-husk ${i === 0 ? "aspect-[4/3]" : "aspect-[4/5]"}`}>
                    <VideoTile youtubeId={r.youtubeId} title={r.name[locale]} playLabel={c.play[locale]} />
                  </div>
                  <p className={`mt-3 font-medium ${i === 0 ? "font-serif text-[1.9rem] font-medium leading-tight" : ""}`}>{r.name[locale]}</p>
                  <p className="text-sm text-muted">{r.role[locale]}</p>
                </li>
              ))}
            </ul>
          </section>
        );
      })}
    </div>
  );
}
