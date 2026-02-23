import type { NextConfig } from "next";

// Matches Sp26, Su26, Fa26, Sp27, Su27, Fa27, … automatically.
// No code change needed when a new semester starts.
// Uses a non-capturing group (?:...) — Next.js forbids capturing groups in route params.
const SEMESTER = "(?:Sp|Su|Fa)\\d{2}";

const GCS = "https://storage.googleapis.com/www.bradbannon.com";

const nextConfig: NextConfig = {
  output: "standalone",
  basePath: "/gita",

  // ── Redirects: audio files go directly to GCS ─────────────────────────────
  // Audio recordings can be large (100 MB+). Redirecting instead of proxying
  // prevents buffering the file through Cloud Run's memory limit.
  async redirects() {
    return [
      {
        source: `/courses/:semester(${SEMESTER})/:coursepath*/audio/:filename`,
        destination: `${GCS}/courses/:semester/:coursepath*/audio/:filename`,
        permanent: false,
        basePath: false, // match raw path, not /gita + path
      },
    ];
  },

  // ── Rewrites: everything else proxied from GCS (URL stays on bradbannon.com)
  async rewrites() {
    return [
      {
        // Root landing page — simple placeholder stored in GCS bucket root
        source: "/",
        destination: `${GCS}/index.html`,
        basePath: false,
      },
      {
        // All course pages for all semesters: Sp26, Su26, Fa26, Sp27, …
        source: `/courses/:semester(${SEMESTER})/:path*`,
        destination: `${GCS}/courses/:semester/:path*`,
        basePath: false,
      },
    ];
  },
};

export default nextConfig;
