import { NextResponse, type NextRequest } from "next/server";
import { getSessionCookie } from "better-auth/cookies";

const SIGN_IN_PATH = "/auth/sign-in";

export default function proxy(request: NextRequest) {
    const { nextUrl } = request;
    const hasSessionCookie = getSessionCookie(request) !== null;
    const isAuthRoute = nextUrl.pathname.startsWith("/auth");

    if (!hasSessionCookie && !isAuthRoute) {
        const signInUrl = new URL(SIGN_IN_PATH, nextUrl);
        signInUrl.searchParams.set("redirect", nextUrl.pathname + nextUrl.search);
        return NextResponse.redirect(signInUrl);
    }

    return NextResponse.next();
}

export const config = {
    matcher: ["/((?!api|_next/static|_next/image|favicon.ico|assets|.*\\.svg$).*)"]
};
