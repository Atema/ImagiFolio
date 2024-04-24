import { getSession } from "@/actions/session";
import { NextRequest, NextResponse } from "next/server";

export default async function middleware(req: NextRequest) {
  const path = req.nextUrl.pathname;

  const session = await getSession();

  const publicPaths = ["/login", "/signup"];

  if (!publicPaths.includes(path) && !session?.userId)
    return NextResponse.redirect(new URL("/login", req.nextUrl));

  if (publicPaths.includes(path) && session?.userId)
    return NextResponse.redirect(new URL("/", req.nextUrl));
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image).*)"],
};
