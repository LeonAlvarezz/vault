export const sanitizeSearchInput = (input: string): string => {
  // Remove any characters that aren't alphanumeric, spaces, or common punctuation
  return input
    .replace(/[^a-zA-Z0-9 .,?!-]/g, "")
    .trim()
    .split(" ")
    .join("_")
    .slice(0, 100);
};
