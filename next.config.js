/** @type {import('next').NextConfig} */
const nextConfig = {
  // Use Node.js runtime for API routes (required for GraphQL Yoga)
  // Netlify will handle this with serverless functions
  
  // Configure images for Netlify
  images: {
    unoptimized: false,
  },
};

module.exports = nextConfig;
