"use client";

import Image from "next/image";
import { useState } from "react";

/**
 * Lightweight YouTube embed: a thumbnail button until clicked, then the
 * privacy-enhanced player. No YouTube scripts load before the click.
 */
export function VideoTile({ youtubeId, title, playLabel }: { youtubeId: string; title: string; playLabel: string }) {
  const [playing, setPlaying] = useState(false);

  if (playing) {
    return (
      <iframe
        className="absolute inset-0 h-full w-full"
        src={`https://www.youtube-nocookie.com/embed/${youtubeId}?autoplay=1&rel=0`}
        title={title}
        allow="autoplay; encrypted-media; picture-in-picture"
        allowFullScreen
      />
    );
  }

  return (
    <button type="button" onClick={() => setPlaying(true)} className="group absolute inset-0 h-full w-full" aria-label={`${playLabel}: ${title}`}>
      <Image
        src={`https://i.ytimg.com/vi/${youtubeId}/hqdefault.jpg`}
        alt=""
        fill
        sizes="(min-width:1024px) 24vw, 46vw"
        className="object-cover grayscale-[35%] transition duration-500 group-hover:grayscale-0"
      />
      <span className="absolute bottom-3 left-3 grid h-11 w-11 place-items-center rounded-full bg-paper/90 text-roast shadow transition group-hover:bg-paper">
        <svg aria-hidden="true" width="14" height="16" viewBox="0 0 14 16">
          <path d="M1 1.5v13L13 8z" fill="currentColor" />
        </svg>
      </span>
    </button>
  );
}
