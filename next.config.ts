import createNextIntlPlugin from 'next-intl/plugin';
import { NextConfig } from 'next';

const withNextIntl = createNextIntlPlugin();

const API_URL = "http://department-web-back-end.department-web.svc.cluster.local:8080";

const BASE_PATH = '';

const nextConfig: NextConfig = {
    basePath: BASE_PATH,
    env: {
        NEXT_PUBLIC_BASE_PATH: BASE_PATH,
        NEXT_PUBLIC_API_URL: API_URL,
    },
    async rewrites() {
            // Якщо ми локально - йдемо на 8080. Якщо на сервері - у Kubernetes.
            const backendUrl = process.env.NODE_ENV === 'development'
                ? 'http://127.0.0.1:8080'
                : 'http://department-web-back-end.department-web.svc.cluster.local:8080';

            return [
                {
                    source: '/department-web-api/:path*',
                    destination: `${backendUrl}/department-web-api/:path*`,
                    basePath: false
                },
            ];
        },
    output: 'standalone',
    images: {
        unoptimized: true, // Вмикаємо глобально
        dangerouslyAllowSVG: true,
        contentDispositionType: 'attachment',
        contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'via.placeholder.com',
                port: '',
                pathname: '/**',
            },
            {
                protocol: 'https',
                hostname: 'api.placeholder.com',
                port: '',
                pathname: '/**',
            },
            {
                protocol: 'https',
                hostname: 'placehold.co',
                port: '',
                pathname: '/**',
            },
            {
                protocol: 'http',
                hostname: 'googleusercontent.com',
                port: '',
                pathname: '/**',
            }
        ],
    },
};

export default withNextIntl(nextConfig);