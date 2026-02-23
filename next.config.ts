import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  basePath: "/gita",
  async redirects() {
    return [
      // Redirect root domain to /gita
      {
        source: "/",
        destination: "/gita",
        permanent: false,
        basePath: false, // prevent Next.js from prepending /gita to destination
      },
    ];
  },
};

export default nextConfig;
