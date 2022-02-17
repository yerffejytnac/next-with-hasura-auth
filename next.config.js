// https://nextjs.org/docs/api-reference/next.config.js/introduction
module.exports = {
  compiler: {
    // https://nextjs.org/docs/advanced-features/compiler#styled-components:
    // `ssr` and `displayName` are configured by default:
    styledComponents: true,
    removeConsole: {
      exclude: ["error"],
    },
  },
  experimental: {
    // https://nextjs.org/blog/next-12#server-side-streaming
    concurrentFeatures: true,
    // https://nextjs.org/blog/next-12#react-server-components
    serverComponents: false,
  },
  swcMinify: true,
};
