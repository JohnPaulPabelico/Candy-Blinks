/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: {
    domains: ["i.imgur.com", "imgur.com"], // Allow images from i.imgur.com
  },
  webpack: (config, { dev }) => {
    if (dev) {
      Object.defineProperty(config, "devtool", {
        get() {
          return "cheap-source-map";
        },
        set() {},
      });
    }
    return config;
  },
};

export default nextConfig;
