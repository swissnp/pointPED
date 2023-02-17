/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
}

const withPWA = require('next-pwa')({
  dest: 'public',
  fallbacks: {
      // document: '/',
      // image: '/public/female.svg',
      // font: '/font.woff2',
      // image: '/public/male.svg',
      // document: '/public/manifest.webmanifest',
      // image: '/public/favicon.ico'
      // document: '/other-offline',  // if you want to fallback to a custom    page other than /_offline
    },
})
module.exports = withPWA({
  nextConfig
})