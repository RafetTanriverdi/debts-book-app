import {
  NextRequest,
  NextResponse,
} from "next/server";
import { createServerClient } from "@supabase/ssr";

export async function updateSession(
  request: NextRequest
) {
  const response = NextResponse.next();

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll: () => request.cookies.getAll(),
        setAll: (cookiesToSet) =>
          cookiesToSet.forEach(
            ({ name, value, options }) =>
              response.cookies.set(
                name,
                value,
                options
              )
          ),
      },
    }
  );

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const role = user
    ? user.user_metadata?.role
    : null;
  const pathname = request.nextUrl.pathname;

  const isAuthRoute =
    pathname.includes("/login") ||
    pathname.includes("/sign-up");

  if (!user && !isAuthRoute) {
    return NextResponse.redirect(
      new URL("/login", request.url)
    );
  } else {
    if (
      (pathname.startsWith("/business") &&
        role === "customer") ||
      isAuthRoute
    ) {
      return NextResponse.redirect(
        new URL("/customer/debts", request.url)
      );
    }

    if (
      (pathname.startsWith("/customer") &&
        role === "business") ||
      isAuthRoute
    ) {
      return NextResponse.redirect(
        new URL(
          "/business/dashboard",
          request.url
        )
      );
    }
  }

  return response;
}

export const config = {
  matcher: [
    "/business/:path*",
    "/customer/:path*",
  ],
};
