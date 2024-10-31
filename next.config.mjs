/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true,
  },
  typescript: {
    // !! WARN !!
    // Dangerously allow production builds to successfully complete even if
    // your project has type errors.
    // !! WARN !!
    ignoreBuildErrors: true,
  },
  // rewrites: async () => {
  //   return [
  //     {
  //       source: "/:integracao",
  //       destination: "/:integracao/integracao.html",
  //     },
  //   ];
  // },

  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
      },
    ],
  },

  async redirects() {
    return [
      // {
      //   source: "/driver-panel",
      //   destination: "https://spx-legacy.netlify.app",
      //   permanent: false,
      // },
      {
        source: "/integracao",
        destination: "https://spx-legacy.netlify.app/integracao",
        permanent: false,
      },
    ];
  },
};

export default nextConfig;
