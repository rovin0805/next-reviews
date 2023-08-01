/** @type {import('next').NextConfig} */

module.exports = {
  // output: "export",
  images: {
    remotePatterns: [
      {
        hostname: "localhost",
        protocol: "http",
        port: "1337",
        pathname: "/uploads/**",
      },
    ],
  },
};
