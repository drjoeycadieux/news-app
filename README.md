# News App with Next.js and GraphQL Yoga

A news article application built with Next.js, GraphQL Yoga, featuring a dark theme with orange text.

## Features

- GraphQL API using Yoga
- Dark theme with orange accents
- Responsive design with Tailwind CSS
- Ready for deployment on Netlify

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Install dependencies:
```bash
npm install
```

2. Run the development server:
```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser.

4. GraphQL Playground is available at [http://localhost:3000/api/graphql](http://localhost:3000/api/graphql)

## Deployment on Netlify

This app is configured for easy deployment to Netlify.

### Option 1: Deploy via Netlify UI

1. Push your code to GitHub/GitLab/Bitbucket
2. Go to [Netlify](https://netlify.com)
3. Click "Add new site" → "Import an existing project"
4. Connect your repository
5. Netlify will auto-detect the Next.js framework
6. Click "Deploy site"

### Option 2: Deploy via Netlify CLI

1. Install Netlify CLI:
```bash
npm install -g netlify-cli
```

2. Login to Netlify:
```bash
netlify login
```

3. Initialize and deploy:
```bash
netlify init
netlify deploy --prod
```

### Configuration

The app includes:
- `netlify.toml` - Netlify configuration with Next.js plugin
- `next.config.js` - Next.js configuration optimized for Netlify

## GraphQL Schema

The app provides the following GraphQL queries:

```graphql
query GetNews {
  news {
    id
    title
    summary
    content
    author
    publishedAt
    imageUrl
  }
}
```

## Tech Stack

- **Next.js** - React framework
- **GraphQL Yoga** - GraphQL server
- **Tailwind CSS** - Styling
- **TypeScript** - Type safety

## License

MIT
