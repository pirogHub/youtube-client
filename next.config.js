/** @type {import('next').NextConfig} */
const nextConfig = {
  // reactStrictMode: true,
  optimizeFonts: false,
  poweredByHeader: false,
  sassOptions: {
    fiber: false
  },
  env: {
    APP_URL: process.env.REACT_APP_URL,
    APP_SERVER_URL: process.env.REACT_APP_SERVER_URL,
    APP_SERVER_DOMAIN: process.env.REACT_APP_SERVER_DOMAIN,
  },
  images: {
    domains: [process.env.REACT_APP_SERVER_DOMAIN]
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
