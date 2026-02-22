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
      },
    ];
  },
};

export default nextConfig;
