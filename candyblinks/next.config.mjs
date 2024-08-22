/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: {
    domains: ["i.imgur.com", "imgur.com"], // Allow images from i.imgur.com
  },
};

export default nextConfig;
