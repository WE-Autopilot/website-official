import { useEffect } from "react";
import { site } from "../content/site";
import { plainText } from "../lib/text";

/** Sets the tab title and meta description for the current page. */
export function usePageMeta(title: string | undefined, description?: string) {
  useEffect(() => {
    document.title = title ? `${plainText(title)} · ${site.name}` : `${site.name} · ${site.tagline}`;
    const meta = document.querySelector<HTMLMetaElement>('meta[name="description"]');
    if (meta) meta.content = description ?? site.description;
  }, [title, description]);
}
