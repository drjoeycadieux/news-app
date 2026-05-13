import { createYoga } from 'graphql-yoga';
import { createSchema } from 'graphql-yoga';

// Sample news data
const newsData = [
  {
    id: '1',
    title: 'Breaking: Tech Industry Sees Major Growth',
    content: 'The technology sector continues to expand with new innovations in AI and cloud computing driving unprecedented growth across multiple markets.',
    category: 'Technology',
    author: 'John Smith',
    publishedAt: '2024-01-15T10:30:00Z',
    imageUrl: 'https://picsum.photos/seed/tech1/800/400'
  },
  {
    id: '2',
    title: 'Global Climate Summit Reaches Historic Agreement',
    content: 'World leaders have come together to sign a groundbreaking agreement aimed at reducing carbon emissions by 50% over the next decade.',
    category: 'Environment',
    author: 'Sarah Johnson',
    publishedAt: '2024-01-14T14:20:00Z',
    imageUrl: 'https://picsum.photos/seed/climate1/800/400'
  },
  {
    id: '3',
    title: 'New Medical Breakthrough in Cancer Treatment',
    content: 'Researchers announce a promising new treatment method that shows significant results in early-stage clinical trials.',
    category: 'Health',
    author: 'Dr. Michael Chen',
    publishedAt: '2024-01-13T09:15:00Z',
    imageUrl: 'https://picsum.photos/seed/health1/800/400'
  },
  {
    id: '4',
    title: 'Stock Markets Reach All-Time Highs',
    content: 'Major stock indices continue their upward trend as investor confidence grows amid positive economic indicators.',
    category: 'Finance',
    author: 'Emily Davis',
    publishedAt: '2024-01-12T16:45:00Z',
    imageUrl: 'https://picsum.photos/seed/finance1/800/400'
  },
  {
    id: '5',
    title: 'Revolutionary Electric Vehicle Unveiled',
    content: 'A major automaker reveals its latest electric vehicle with extended range and advanced autonomous driving capabilities.',
    category: 'Automotive',
    author: 'Robert Wilson',
    publishedAt: '2024-01-11T11:00:00Z',
    imageUrl: 'https://picsum.photos/seed/auto1/800/400'
  }
];

const typeDefs = `#graphql
  type News {
    id: ID!
    title: String!
    content: String!
    category: String!
    author: String!
    publishedAt: String!
    imageUrl: String!
  }

  type Query {
    news: [News!]!
    newsById(id: ID!): News
    newsByCategory(category: String!): [News!]!
  }

  type Mutation {
    addNews(title: String!, content: String!, category: String!, author: String!, imageUrl: String): News!
  }
`;

const resolvers = {
  Query: {
    news: () => newsData,
    newsById: (_, { id }) => newsData.find(news => news.id === id),
    newsByCategory: (_, { category }) => 
      newsData.filter(news => news.category.toLowerCase() === category.toLowerCase())
  },
  Mutation: {
    addNews: (_, { title, content, category, author, imageUrl }) => {
      const newNews = {
        id: String(newsData.length + 1),
        title,
        content,
        category,
        author,
        publishedAt: new Date().toISOString(),
        imageUrl: imageUrl || 'https://picsum.photos/seed/default/800/400'
      };
      newsData.push(newNews);
      return newNews;
    }
  }
};

export const yoga = createYoga({
  schema: createSchema({
    typeDefs,
    resolvers
  })
});
