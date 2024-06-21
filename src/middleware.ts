import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import appConfig from "../config";
import { match } from "path-to-regexp";

const { LOGGED_IN_KEY } = appConfig;

const authRoutes = ["/login", "/forgot-password", "/reset"];

export async function middleware(req: NextRequest) {
  const verify = req.cookies.get(LOGGED_IN_KEY)?.value;
  const url = req.nextUrl.pathname;
  const isAuthRoute = authRoutes.includes(url);

  // Check if the route is specifically the orders route and bypass further checks
  if (!verify && match("/reset/:path*")(url)) {
    return NextResponse.next();
  }
  if (verify && match("/reset/:path*")(url)) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  if (!verify && !isAuthRoute) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  if (verify && isAuthRoute) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  return NextResponse.next();
}

/**
 * Add all the protected routes here in the matcher.
 */
// export const config = { matcher: ["/((?!.*\\.).*)", "/"] };
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    {
      source: "/((?!api|_next/static|_next/image|favicon.ico).*)",
    },
  ],
};
