/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    appDir: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com',
        port: '',
        pathname: '**',
      },
    ],
  },
  async headers() {
    return [
      {
        source: '/api/test',
        headers: [
          {
            key: 'x-custom-header',
            value: 'my custom header value',
          },
          {
            key: 'Access-Control-Allow-Origin',
            value: 'https://www.google.com',
          },
        ],
      },
      {
        source: '/api/auth/session',
        headers: [
          {
            key: 'x-custom-header',
            value: 'my custom header value',
          },
          {
            key: 'Access-Control-Allow-Origin',
            value: 'https://www.google.com',
          },
        ],
      },
    ];
  },
}

export default nextConfig
