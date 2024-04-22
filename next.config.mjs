/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {

        domains: [
            'https://images.rawpixel.com',
            'https://picsum.photos',
        ],
        path: '/**',
        loader: 'default',
    },
};

export default nextConfig;
