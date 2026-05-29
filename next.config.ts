import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    optimizePackageImports: [
      'three',
      '@react-three/fiber',
      '@react-three/drei',
      'gsap',
      'framer-motion',
      'recharts',
    ],
  },
  turbopack: {
    root: __dirname,
  },
};

export default nextConfig;
