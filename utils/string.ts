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

const PROTOCOL_REGEX = /^[a-zA-Z][a-zA-Z\d+\-.]*:\/\//;

const trimTrailingSlash = (value: string): string => value.replace(/\/+$/, "");

const getSingleHeaderValue = (value?: string | null): string | null => {
  const normalizedValue = value?.split(",")[0]?.trim();
  return normalizedValue ? normalizedValue : null;
};

export function normalizeSiteUrl(siteUrl: string): string {
  const normalizedSiteUrl = trimTrailingSlash(siteUrl.trim());

  if (!normalizedSiteUrl) {
    return normalizedSiteUrl;
  }

  if (PROTOCOL_REGEX.test(normalizedSiteUrl)) {
    return normalizedSiteUrl;
  }

  return `https://${normalizedSiteUrl}`;
}

type ResolveAppOriginOptions = {
  origin?: string | null;
  forwardedHost?: string | null;
  forwardedProto?: string | null;
  siteUrl?: string | null;
};

export function resolveAppOrigin({
  origin,
  forwardedHost,
  forwardedProto,
  siteUrl,
}: ResolveAppOriginOptions): string {
  const normalizedOrigin = origin ? trimTrailingSlash(getCorrectOrigin(origin)) : null;
  const normalizedForwardedHost = getSingleHeaderValue(forwardedHost);
  const normalizedForwardedProto = getSingleHeaderValue(forwardedProto);
  const normalizedSiteUrl = siteUrl ? normalizeSiteUrl(siteUrl) : null;

  if (process.env.NODE_ENV === "development" && normalizedOrigin) {
    return normalizedOrigin;
  }

  if (normalizedForwardedHost) {
    const protocol =
      normalizedForwardedProto ??
      (process.env.NODE_ENV === "development" ? "http" : "https");

    return `${protocol}://${trimTrailingSlash(normalizedForwardedHost)}`;
  }

  if (normalizedSiteUrl) {
    return normalizedSiteUrl;
  }

  if (normalizedOrigin) {
    return normalizedOrigin;
  }

  throw new Error("Unable to resolve the app origin.");
}
