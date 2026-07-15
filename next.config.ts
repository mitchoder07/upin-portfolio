import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  typescript: {
    ignoreBuildErrors: true,
  },
  reactStrictMode: false,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "sfile.chatglm.cn",
      },
    ],
  },
  allowedDevOrigins: [
    "preview-chat-0814fb59-6907-4cd9-af51-2649d9f458b4.space-z.ai",
    "*.space-z.ai",
  ],
};

export default nextConfig;
