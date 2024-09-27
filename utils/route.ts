export const routesWithFloatingButton = [
  "/bookmark",
  "/dashboard",
  "/explore",
  "/note",
  "/search",
];
export function shouldShowFloatingButton(pathname: string): boolean {
  return routesWithFloatingButton.some((route) => pathname.startsWith(route));
}
