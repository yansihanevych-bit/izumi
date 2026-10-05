import Image from "next/image";
import type { Image as ImageT } from "@/content/types";
import type { Locale } from "@/lib/i18n";

/** Product photo. Packshots on white backgrounds blend into tinted panels. */
export function Packshot({
  image,
  locale,
  sizes,
  priority,
  className = "",
}: {
  image: ImageT;
  locale: Locale;
  sizes: string;
  priority?: boolean;
  className?: string;
}) {
  const onWhite = image.src.endsWith(".jpg") || image.src.includes("0005-min");
  return (
    <Image
      src={image.src}
      alt={image.alt[locale]}
      width={image.width}
      height={image.height}
      sizes={sizes}
      priority={priority}
      className={`h-full w-full object-contain ${onWhite ? "blend" : ""} ${className}`}
    />
  );
}
