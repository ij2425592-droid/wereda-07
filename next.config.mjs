/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // ፎቶዎችን ወደ ዘመናዊና ፈጣን ፎርማቶች በራስ-ሰር ይቀይራል
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        pathname: '/**',
      },
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '1337',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;