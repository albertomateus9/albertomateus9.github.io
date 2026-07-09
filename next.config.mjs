/** @type {import('next').NextConfig} */
const nextConfig = {
  // Self-contained server bundle for the production container (VPS/Dokploy).
  output: "standalone",
  reactStrictMode: true,
};

export default nextConfig;
