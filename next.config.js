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
    domains: ['api-dev.takafulbazaar.com.pk', 'api-qa.takafulbazaar.com.pk', 'rcns_tkfbazaarpk.s3.rapidcompute.com', '.com.pk', 's3.ap-southeast-1.amazonaws.com', 'd2nn92qg3uc4l0.cloudfront.net', 'd3ku45cg6frd60.cloudfront.net'],
  },
}

module.exports = nextConfig
