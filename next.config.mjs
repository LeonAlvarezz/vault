/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: {
      allowedForwardedHosts: ["localhost"],
      allowedOrigins: ["http://localhost"],
    },
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "www.kadencewp.com",
      },
      {
        protocol: "https",
        hostname: "www.github.com",
      },

      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },

      {
        protocol: "https",
        hostname: "kinsta.com",
      },
      {
        protocol: "https",
        hostname: "miro.medium.com",
      },
      {
        protocol: "https",
        hostname: "wymuicbyisnovfjqtfjc.supabase.co",
      },
    ],
  },
};

export default nextConfig;
