/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  env: {
    APP_URL: process.env.REACT_APP_URL,
    APP_SERVER_URL: process.env.REACT_APP_SERVER_URL,
  },
  images: {
    domains: ['localhost', process.env.REACT_APP_SERVER_DOMAIN]
  },
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: `${process.env.REACT_APP_SERVER_URL}/api/:path*`
      },
      {
        source: "/uploads/:path*",
        destination: `${process.env.REACT_APP_SERVER_URL}/uploads/:path*`
      },
    ]
  }
}

module.exports = nextConfig
