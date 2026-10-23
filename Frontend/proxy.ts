import createMiddleware from "next-intl/middleware";
import { routing } from "./src/i18n/routing";

const handleRouting = createMiddleware(routing);

export default handleRouting;
export { handleRouting as proxy, handleRouting as middleware };

export const config = {
  matcher: [
    // Match all pathnames except:
    // - API routes (/api/*)
    // - Next.js internals (/_next/*)
    // - Static files with extensions (e.g. /favicon.ico, /images/*, *.svg, *.png)
    "/((?!api|_next|_vercel|.*\\..*).*)",
  ],
};
