/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  env: {
    BASE_API_URL: "http://localhost:4000",
  }
}

module.exports = nextConfig
