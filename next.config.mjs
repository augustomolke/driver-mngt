/** @type {import('next').NextConfig} */
const nextConfig = {
  rewrites: async () => {
    return [
      {
        source: "/:integracao",
        destination: "/:integracao/integracao.html",
      },
    ];
  },
};

export default nextConfig;
