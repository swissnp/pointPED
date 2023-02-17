// /** @type {import('next').NextConfig} */
// const nextConfig = {
  
// }

// module.exports = nextConfig

const withWorkbox = require("next-with-workbox");
module.exports = withWorkbox({
  workbox: {
    // dest: "public",
    // swDest: "sw.js",
    // swSrc: "worker.js",
    force: true,
  },
  reactStrictMode: true,
});