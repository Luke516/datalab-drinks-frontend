// next.config.js
const { i18n } = require('./next-i18next.config');

/** @type {import('next').NextConfig} */
const nextConfig = {
  i18n,
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
  webpack: function (config) {
    config.module.rules.push({
      test: /\.yaml$/,
      use: 'js-yaml-loader',
    })
    return config
  }
}

module.exports = nextConfig
