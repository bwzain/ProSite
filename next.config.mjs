/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Allow phone / LAN testing against the machine's local IP in `next dev`
  allowedDevOrigins: ["192.168.12.140", "localhost", "127.0.0.1"],
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "m.media-amazon.com",
      },
      {
        protocol: "https",
        hostname: "img.youtube.com",
      },
      {
        protocol: "https",
        hostname: "i.ytimg.com",
      },
      {
        protocol: "https",
        hostname: "i-wish-you-were-here.com",
      },
      {
        protocol: "http",
        hostname: "i-wish-you-were-here.com",
      },
      {
        protocol: "https",
        hostname: "*.i-wish-you-were-here.com",
      },
    ],
  },
};

export default nextConfig;
