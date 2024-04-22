import NextBundleAnalyzer from "@next/bundle-analyzer";

/** @type {import('next').NextConfig} */
const nextConfig = {};

export default process.env.ANALYZE === "true"
  ? NextBundleAnalyzer()(nextConfig)
  : nextConfig;
