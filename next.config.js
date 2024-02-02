/** @type {import('next').NextConfig} */
const { i18n } = require("./next-i18next.config");

const nextConfig = {
  images: {
    domains: ["system.dev-orion.ekbana.info", "system.ek-orion.ekbana.info"],
  },
  reactStrictMode: true,
  i18n,
};

module.exports = nextConfig;
