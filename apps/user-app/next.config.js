/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "standalone",           // <--- (Makes Docker images tiny)
  transpilePackages: ["@repo/db"] // <--- (Connects to your DB package)
};

export default nextConfig;