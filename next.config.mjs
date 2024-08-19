/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "www.kadencewp.com"
            },
            {
                protocol: "https",
                hostname: "www.github.com"
            },

            {
                protocol: "https",
                hostname: "images.unsplash.com"
            },


            {
                protocol: "https",
                hostname: "kinsta.com"
            }

        ]
    }
};

export default nextConfig;
