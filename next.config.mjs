/** @type {import('next').NextConfig} */

const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: '**',
            },
        ],
    },
    output: 'standalone',
    async redirects() {
        return [          
          {
            source: '/',
            destination: '/dashboard',
            permanent: false,
          },
          {
            source: '/settings',
            destination: '/settings/user',
            permanent: false,
          },
        ]
      },
};

export default nextConfig;
