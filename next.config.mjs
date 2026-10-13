const staticExport = process.env.NEXT_STATIC_EXPORT === "1";

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: staticExport ? "export" : "standalone",
  reactStrictMode: true,
  poweredByHeader: false,
  ...(staticExport ? {
    trailingSlash: true,
    images: { unoptimized: true },
  } : {
    async headers() {
      return [{
        source: "/:path*",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "DENY" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
        ],
      }];
    },
    async redirects() {
      return [
        { source: "/igarix", destination: "/projects/igarix", permanent: true },
        { source: "/infrastructure", destination: "/projects/lab02-observability", permanent: true },
        { source: "/projects/igarix-os", destination: "/projects/igarix", permanent: true },
        { source: "/projects/campuswatch-snmp", destination: "/projects/lab02-observability", permanent: true },
      ];
    },
  }),
};
export default nextConfig;
