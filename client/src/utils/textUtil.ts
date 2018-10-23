export function getExcerptText(text: string, word_count: number) {
  const words = text.split(/\s+/);
  const excerpt = words.slice(0, word_count).join(" ");
  return `${excerpt}${words.length > word_count ? "..." : ""}`;
}

export function getSlug(text: string | undefined) {
  text = text ||  ''
  return text.trim().replace(/[\s]+/g, '-').toLowerCase()
}