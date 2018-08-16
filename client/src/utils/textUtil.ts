export function getExcerptText(text: string, word_count: number) {
  const words = text.split(/\s+/);
  const excerpt = words.slice(0, word_count).join(" ");
  return `${excerpt}${words.length > word_count ? "..." : ""}`;
}
