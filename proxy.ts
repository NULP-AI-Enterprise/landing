import createMiddleware from 'next-intl/middleware';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const intlMiddleware = createMiddleware({
    locales: ['uk', 'en'],
    defaultLocale: 'uk'
});

export default function proxy(req: NextRequest) {

    if (req.nextUrl.pathname.startsWith('/department-web-api')) {
        return NextResponse.next();
    }

    return intlMiddleware(req);
}

export const config = {
    matcher: ['/((?!api|_next|_vercel|.*\\..*).*)']
};