/**
 * Helper to extract media URL from ElmapiCMS media fields.
 * Media fields in ElmapiCMS can be returned as:
 * - A string URL
 * - An object: { url?: string; original_url?: string }
 * - An array: [{ url?: string; original_url?: string }, ...]
 */
export function getMediaUrl(media: unknown): string | undefined {
  if (!media) return undefined;
  if (typeof media === "string") return media;

  if (Array.isArray(media) && media.length > 0) {
    const first = media[0];
    if (typeof first === "string") return first;
    if (typeof first === "object" && first !== null) {
      return (
        (first as { url?: string; original_url?: string }).url ||
        (first as { url?: string; original_url?: string }).original_url
      );
    }
  }

  if (typeof media === "object" && media !== null) {
    return (
      (media as { url?: string; original_url?: string }).url ||
      (media as { url?: string; original_url?: string }).original_url
    );
  }

  return undefined;
}
