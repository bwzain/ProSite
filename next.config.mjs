/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
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
