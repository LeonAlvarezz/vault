/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "www.kadencewp.com"
            }
        ]
    }
};

export default nextConfig;
