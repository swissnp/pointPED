/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
}

const withPWA = require('next-pwa')({
  dest: 'public',
  fallbacks: {
      document: '/index.js',
      // document: '/other-offline',  // if you want to fallback to a custom    page other than /_offline
    },
})
module.exports = withPWA({
  nextConfig
})