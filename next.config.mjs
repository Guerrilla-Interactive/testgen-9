/** @type {import('next').NextConfig} */

const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
      },
    ],
  },
  typescript: {
    // WARNING: This allows production builds to succeed even if there are type errors.
    ignoreBuildErrors: true,
  },
};

export default nextConfig;