/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  images: {
    domains: ["system.dev-orion.ekbana.info", "system.ek-orion.ekbana.info"],
  },
};

module.exports = nextConfig;
