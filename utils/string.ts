export const sanitizeSearchInput = (input: string): string => {
  // Remove any characters that aren't alphanumeric, spaces, or common punctuation
  return input
    .replace(/[^a-zA-Z0-9 .,?!-]/g, "")
    .trim()
    .split(" ")
    .join("_")
    .slice(0, 100);
};

export const constructSearchQuery = (query: string, searchOption: string) => {
  return query.trim().split(/\s+/).join(` ${searchOption} `);
};

export const isContentArray = (content: any): content is Array<any> => {
  return Array.isArray(content);
};

export function getCorrectOrigin(origin: string): string {
  if (origin.includes("localhost")) {
    return origin.replace(/^https?:\/\//, "http://");
  } else if (origin.startsWith("http://") && !origin.includes("localhost")) {
    return origin.replace("http://", "https://");
  }
  return origin;
}
