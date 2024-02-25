import { authMiddleware } from "@clerk/nextjs";

export default authMiddleware({
  // Make all api routes public
  publicRoutes: ["/sign-in", "/sign-up", "/sign-out", "/api"], 
});

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
