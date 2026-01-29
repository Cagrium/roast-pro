/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    // Hataları görmezden gel, yapıştır geç
    ignoreDuringBuilds: true,
  },
  typescript: {
    // Tip hatalarına takılma
    ignoreBuildErrors: true,
  },
};

export default nextConfig;