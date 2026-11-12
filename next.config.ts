import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      // Basic redirect
      {
        source: "/about",
        destination: "/",
        permanent: true,
      },
      // Wildcard path matching
      {
        source: "/blog/:slug",
        destination: "/news/:slug",
        permanent: true,
      },
    ];
  },
  /* config options here */
  cacheComponents: true,
  partialPrefetching: true,
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },

  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.dummyjson.com",
        port: "",
        // pathname: '/account123/**',
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        port: "",
        // pathname: '/account123/**',
      },
    ],
  },
};

export default nextConfig;

// import type { NextConfig } from 'next'

// const nextConfig: NextConfig = {
//   async redirects() {
//     return [
//       // Basic redirect
//       {
//         source: '/about',
//         destination: '/',
//         permanent: true,
//       },
//       // Wildcard path matching
//       {
//         source: '/blog/:slug',
//         destination: '/news/:slug',
//         permanent: true,
//       },
//     ]
//   },
// }

// export default nextConfig
