// next.config.js
const { i18n } = require('./next-i18next.config');

/** @type {import('next').NextConfig} */
const nextConfig = {
  i18n,
  react: { useSuspense: false }, // i18n loading
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ["i.imgur.com"],
  },
  async redirects() {
    return [
      {
        source: '/',
        destination: '/drinks/all',
        permanent: true,
      },
    ]
  },
}

module.exports = nextConfig
