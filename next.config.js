/** @type {import('next').NextConfig} */
const { i18n } = require("./next-i18next.config");
const { version } = require("./package.json");

const CSP_API_ORIGIN = process.env.NEXT_PUBLIC_API_URL;
const CSP_IMAGE_ORIGIN = process.env.NEXT_PUBLIC_IMAGE_BASE_URL;
const CSP_MAP_TILE_ORIGIN = "https://*.tile.openstreetmap.org";

const ContentSecurityPolicy = `
  default-src 'self';
  script-src 'self' 'unsafe-eval';
  style-src 'self' example.com 'unsafe-inline';
  connect-src 'self' ${CSP_API_ORIGIN} ${CSP_IMAGE_ORIGIN} ${CSP_MAP_TILE_ORIGIN} blob: ws: wss:;
  font-src 'self';
  child-src 'self'; 
  worker-src 'self' blob:;
  img-src 'self' ${CSP_IMAGE_ORIGIN} ${CSP_MAP_TILE_ORIGIN} data: blob:;
`;

const nextConfig = {
  images: {
    domains: [CSP_IMAGE_ORIGIN, "tile.openstreetmap.org", "localhost"],
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
  async headers() {
    return [
      {
        source: "/(.*)?", // Matches all pages
        headers: [
          {
            key: "X-Frame-Options",
            value: "DENY",
          },
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "Referrer-Policy",
            value: "strict-origin",
          },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=(), fullscreen=self",
          },
          {
            key: "Content-Security-Policy",
            value: ContentSecurityPolicy.replace(/\s{2,}/g, " ").trim(),
          },
          {
            key: "Strict-Transport-Security",
            value: "max-age=63072000; includeSubDomains; preload",
          },
        ],
      },
    ];
  },
};

module.exports = nextConfig;
