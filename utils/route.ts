export const routesWithFloatingButton = [
  "/bookmark",
  "/dashboard",
  "/explore",
  "/note",
  "/search",
];
type SimplePathConfig = string;

type ComplexPathConfig = {
  base: string;
  protected: boolean;
  exceptions?: RegExp[];
  additionalProtected?: string[];
};

type PathConfig = SimplePathConfig | ComplexPathConfig;

interface ProtectedPaths {
  [key: string]: PathConfig;
}
export function shouldShowFloatingButton(pathname: string): boolean {
  return routesWithFloatingButton.some((route) => pathname.startsWith(route));
}

export function isProtectedRoute(
  pathname: string,
  protectedPaths: ProtectedPaths
) {
  // Check each path configuration
  for (const [_, config] of Object.entries(protectedPaths)) {
    if (typeof config === "string") {
      // Simple protected path
      if (pathname.startsWith(config)) {
        return true;
      }
    } else if (typeof config === "object") {
      // Complex path with exceptions
      if (pathname.startsWith(config.base)) {
        // Check if path matches any exceptions
        const isException = config.exceptions?.some((pattern) =>
          pattern.test(pathname)
        );

        // Check if path is in additional protected routes
        const isAdditionalProtected =
          config.additionalProtected?.includes(pathname);

        // Route is protected if:
        // 1. Base path is protected AND
        // 2. Path is not an exception OR is specifically listed as protected
        if (config.protected && (!isException || isAdditionalProtected)) {
          return true;
        }
      }
    }
  }
  return false;
}

export function shouldCreateAnonymousUser(
  pathname: string,
  routes: string[]
): boolean {
  return (
    routes.some((route) => pathname.startsWith(route)) ||
    pathname.match(/^\/profile\/[0-9a-fA-F\-]{36}$/) !== null
  );
}
