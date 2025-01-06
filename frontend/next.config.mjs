// /** @type {import('next').NextConfig} */
// const nextConfig = {
//   reactStrictMode: true,
// };

// export default nextConfig;





/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async redirects() {
    return [
      {
        source: '/',
        destination: '/signup',
        permanent: true, // This indicates that the redirect is permanent (HTTP 301)
      },
    ];
  },
};

export default nextConfig;
