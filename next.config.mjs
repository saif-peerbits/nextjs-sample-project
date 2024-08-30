import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin();

/** @type {import('next').NextConfig} */
const nextConfig = { distDir: "dist", reactStrictMode: false };;

export default withNextIntl(nextConfig);
