/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  env: {
    NEXT_PUBLIC_ZEGO_APP_ID: 248561625,
    NEXT_PUBLIC_ZEGO_SERVER_ID: "34d2806698aa212c1e4031f64e5fa319",
    NEXT_PUBLIC_SERVER_HOST: 'http://localhost:3005'
  },
  images: {
    domains: ['localhost']
  }
};

module.exports = nextConfig;
