/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: false,
    images: {
        domains: ['localhost', "fakestoreapi.com"],
    },
}

module.exports = nextConfig