import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import appConfig from "./config";
import { match } from "path-to-regexp";

const { LOGGED_IN_KEY } = appConfig;

// Auth pages that should only be accessible by guests.
const authRoutes = ["/login", "/forgot-password", "/reset"];

// Support for "/reset" and all "/reset/anything" routes as auth routes
const isResetRoute = (url: string) => {
  return match("/reset/:path*")(url) || url === "/reset";
};

export async function middleware(req: NextRequest) {
  const verify = req.cookies.get(LOGGED_IN_KEY)?.value;
  const url = req.nextUrl.pathname;

  // Guest (not logged in) wanted to access "/reset" or subroutes
  if (!verify && isResetRoute(url)) {
    return NextResponse.next();
  }

  // Logged-in user wanted to access "/reset" or subroutes
  if (verify && isResetRoute(url)) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  // Simple check whether this is an auth route ("/login", "/forgot-password", "/reset")
  const isAuthRoute =
    authRoutes.includes(url) || isResetRoute(url);

  // Guest trying to access protected pages
  if (!verify && !isAuthRoute) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  // Authenticated user trying to access an auth page (should redirect home)
  if (verify && isAuthRoute) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  // Otherwise, allow request through
  return NextResponse.next();
}

/**
 * Add all the protected routes here in the matcher.
 */
export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)", "/"],
};
