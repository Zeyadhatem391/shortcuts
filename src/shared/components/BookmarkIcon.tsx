"use client";

import Image from "next/image";
import { Link as LinkIcon } from "lucide-react";
import { useState } from "react";

interface BookmarkIconProps {
  url: string;
}

export default function BookmarkIcon({ url }: BookmarkIconProps) {
  const [hasError, setHasError] = useState(false);

  let domain = "";

  try {
    domain = new URL(url).hostname;
  } catch {
    domain = "";
  }

  if (!domain || hasError) {
    return (
      <div className="shrink-0 rounded-full p-2">
        <LinkIcon className="h-7 w-7 text-green-600" />
      </div>
    );
  }

  const faviconUrl = `https://www.google.com/s2/favicons?domain=${domain}&sz=128`;

  return (
    <div className="flex size-11 shrink-0 items-center justify-center rounded-full p-2">
      <Image
        src={faviconUrl}
        alt={`${domain} icon`}
        width={32}
        height={32}
        onError={() => setHasError(true)}
        className="rounded-full object-contain"
      />
    </div>
  );
}
