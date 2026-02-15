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
        protocol: 'http',
        hostname: 'localhost',
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