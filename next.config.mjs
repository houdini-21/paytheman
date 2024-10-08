import withPWA from "next-pwa";

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  swcMinify: true,
  compiler: {
    removeConsole: process.env.NEXT_PUBLIC_NODE_ENV === "development",
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "static2.finnhub.io",
      },
      {
        protocol: "https",
        hostname: "upload.wikimedia.org",
      },
    ],
  },
};
// export default withPWA({
//   dest: "public",
//   disable: process.env.NEXT_PUBLIC_NODE_ENV === "development",
//   register: true,
//   skipWaiting: true,
// })(nextConfig);

export default nextConfig;
