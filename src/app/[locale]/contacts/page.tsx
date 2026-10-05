import { copy } from "@/content/copy";
import { organization } from "@/content/organization";
import { reveal } from "@/lib/content-guards";
import { metadataFor, type LocaleProps } from "@/lib/page";

export const generateMetadata = metadataFor("contacts", "contacts/");

export default async function Contacts({ params }: LocaleProps) {
  const { locale } = await params;
  const c = copy.contacts;
  const o = organization;
  const legal = reveal(o.legal);
  const hours = reveal(o.hours);

  return (
    <div className="wrap pb-24 pt-14 lg:pt-20">
      <h1 className="text-h1">{c.title[locale]}</h1>
      <p className="measure mt-6 text-lead text-muted">{c.lead[locale]}</p>

      <dl className="mt-14 grid gap-px overflow-hidden rounded-[1.75rem] border border-line bg-line md:grid-cols-2">
        <div className="bg-paper p-8">
          <dt className="text-sm text-muted">{c.phone[locale]}</dt>
          {o.phones.map((p) => (
            <dd key={p.tel} className="mt-2">
              <a href={`tel:${p.tel}`} className="font-serif text-[2rem] leading-tight hover:text-spring">
                {p.display}
              </a>
              {p.messengers.length > 0 && <span className="block text-sm text-muted">{p.messengers.join(", ")}</span>}
            </dd>
          ))}
        </div>
        <div className="bg-paper p-8">
          <dt className="text-sm text-muted">{c.email[locale]}</dt>
          <dd className="mt-2">
            <a href={`mailto:${o.email}`} className="font-serif text-[2rem] leading-tight hover:text-spring">
              {o.email}
            </a>
          </dd>
        </div>
        {hours && (
          <div className="bg-paper p-8">
            <dt className="text-sm text-muted">{c.hours[locale]}</dt>
            <dd className="mt-2 text-lead">{hours[locale]}</dd>
          </div>
        )}
        <div className="bg-paper p-8">
          <dt className="text-sm text-muted">{c.social[locale]}</dt>
          <dd className="mt-2">
            <a href={o.instagram} target="_blank" rel="noopener" className="link text-lead">
              @izumitea_ua
            </a>
          </dd>
        </div>
      </dl>

      {legal && (
        <section className="mt-12 text-sm text-muted">
          <h2 className="font-sans text-sm font-medium text-roast">{c.legal[locale]}</h2>
          <p className="mt-2">
            {legal.name}, {legal.registry}
            <br />
            {legal.address[locale]}
          </p>
        </section>
      )}
    </div>
  );
}
