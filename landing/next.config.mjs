/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  webpack: (config) => {
    config.externals.push("pino-pretty", "lokijs", "encoding");
    config.experiments = {
      topLevelAwait: true,
    };
    return config;
  },
  images: {
    domains: ["i.imgur.com", "imgur.com"],
  },
  experimental: {
    esmExternals: "loose", // <-- add this
    serverComponentsExternalPackages: ["mongoose"], // <-- and this
  },
};

export default nextConfig;
