const path = require('path')

const nextConfig = {
  reactStrictMode: true,
  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true,
  },
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')],
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    domains: ['api.tb-dev.ideabox.pk', 'api.tb-qa.ideabox.pk', 'api.tb-uat.ideabox.pk'],
  },
}

module.exports = nextConfig
