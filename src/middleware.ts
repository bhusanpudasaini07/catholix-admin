import { NextResponse, NextRequest } from "next/server";

const authRoutes = [
  "/login",
  "/forgot-password",
  "/reset-password",
  "/email-sent",
];

export async function middleware(req: NextRequest) {
  const verify = req.cookies.get("isLoggedIn")?.value;
  const url = req.nextUrl.pathname;

  const isAuthRoute = authRoutes.includes(url);

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
export const config = { matcher: "/((?!.*\\.).*)" };
