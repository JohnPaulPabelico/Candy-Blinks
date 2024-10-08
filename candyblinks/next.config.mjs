/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  webpack: (config) => {
    config.externals.push("pino-pretty", "lokijs", "encoding");
    return config;
  },
  images: {
    domains: ["i.imgur.com", "imgur.com"], // Allow images from i.imgur.com
  },
};

export default nextConfig;
