/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  env: {
    NEXT_PUBLIC_ZEGO_APP_ID: 248561625,
    NEXT_PUBLIC_ZEGO_SERVER_ID: "34d2806698aa212c1e4031f64e5fa319",
    NEXT_PUBLIC_SERVER_HOST: 'https://temp-server-2v0s.onrender.com'
  },
  images: {
    domains: ['localhost','temp-server-2v0s.onrender.com']
  }
};

module.exports = nextConfig;
