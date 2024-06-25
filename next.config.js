/** @type {import('next').NextConfig} */
const { i18n } = require("./next-i18next.config");

const nextConfig = {
  images: {
    domains: ["dev-api-mdmexpansion.ekbana.net"],
  },
  reactStrictMode: true,
  i18n: {
    locales: ["en", "jp"],
    defaultLocale: "en",
  },
  transpilePackages: ["react-leaflet-cluster"],
  webpack: (config, { isServer, webpack }) => {
    if (isServer) {
      config.plugins = [
        ...config.plugins,
        new webpack.DefinePlugin({
          __REACT_DEVTOOLS_GLOBAL_HOOK__: "({ isDisabled: true })",
        }),
      ];
    }
    // Important: return the modified config
    return config;
  },
};

module.exports = nextConfig;
