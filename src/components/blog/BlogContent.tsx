"use client";

import { useEffect, useState } from "react";

type BlogContentProps = {
  html: string | null;
};

export function BlogContent({ html }: BlogContentProps) {
  const [sanitizedHtml, setSanitizedHtml] = useState("");

  useEffect(() => {
    let ignore = false;

    import("isomorphic-dompurify").then(({ default: DOMPurify }) => {
      if (!ignore) {
        setSanitizedHtml(DOMPurify.sanitize(html ?? ""));
      }
    });

    return () => {
      ignore = true;
    };
  }, [html]);

  return (
    <div
      className="prose prose-stone prose-headings:font-serif
        prose-headings:text-brand-brown
        prose-h2:text-xl prose-h2:mt-8 prose-h2:mb-3
        prose-h3:text-lg prose-h3:mt-7 prose-h3:mb-3
        prose-p:text-muted-foreground prose-p:leading-relaxed
        prose-li:text-muted-foreground prose-li:leading-relaxed
        prose-a:text-brand-maroon prose-a:no-underline
        hover:prose-a:underline max-w-none"
      style={{ fontSize: "clamp(0.9rem, 1.5vw, 1rem)" }}
      dangerouslySetInnerHTML={{ __html: sanitizedHtml }}
    />
  );
}