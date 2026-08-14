import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '1337',
        pathname: '/uploads/**',
      },
      {
        protocol: 'http',
        hostname: '127.0.0.1',
        port: '1337',
        pathname: '/uploads/**',
      },
      {
        protocol: 'http',
        hostname: '172.26.208.1',
        port: '1337',
        pathname: '/uploads/**',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: "http",
        hostname: "localhost",
        port: "9000",
        pathname: "/static/**",
      },
      {
        protocol: 'https',
        hostname: 'strapi.navloka.in',
        pathname: '/uploads/**',
      },
      {
        protocol: 'https',
        hostname: 'medusa.navloka.in',
        pathname: '/static/**',
      },
    ],
  },
};

export default nextConfig;
