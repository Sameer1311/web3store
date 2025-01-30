export { default } from "next-auth/middleware";

export const config = { 
  matcher: [
    "/components_Web/shopping/:path*", 
    "/components_Web/userDetails"
  ] 
};

