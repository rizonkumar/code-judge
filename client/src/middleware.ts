import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const token = request.cookies.get("accessToken")?.value;
  const { pathname } = request.nextUrl;

  const authPages = ["/login", "/register"];
  const protectedPages = ["/problems"];

  const isAuthPage = authPages.some((page) => pathname.startsWith(page));
  const isProtectedPage = protectedPages.some((page) =>
    pathname.startsWith(page)
  );

  // Redirect authenticated users away from auth pages
  if (isAuthPage && token) {
    return NextResponse.redirect(new URL("/problems", request.url));
  }

  // Note: We don't block protected pages here because the token in localStorage
  // is the primary auth mechanism. The cookie is set by the server but may not
  // always be present (e.g., if using Bearer token from localStorage).
  // The client-side AuthProvider handles the redirect for unauthenticated users.

  // If no token cookie and trying to access protected page, let client handle it
  // This allows localStorage-based auth to work
  if (isProtectedPage && !token) {
    // Let the request through - client-side auth will handle redirect if needed
    return NextResponse.next();
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/login", "/register", "/problems/:path*"],
};
