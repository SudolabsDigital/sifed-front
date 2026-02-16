import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'placehold.co',
      },
      {
        protocol: 'https',
        hostname: 'picsum.photos',
      },
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '8000',
      },
      {
        protocol: 'http',
        hostname: '127.0.0.1',
        port: '8000',
      },
      {
        protocol: 'https',
        hostname: '**.amazonaws.com', // Futura configuracion para S3 de aws
      }
    ],
  },
  async redirects() {
    return [
      {
        source: '/maestria',
        destination: '/posgrado/maestrias',
        permanent: true,
      },
      {
        source: '/programas',
        destination: '/posgrado',
        permanent: true,
      },
      {
        source: '/normativa',
        destination: '/documentos-normativos/normativa',
        permanent: true,
      },
      {
        source: '/formatos',
        destination: '/documentos-normativos/formatos',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;