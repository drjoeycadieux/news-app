'use client';

import { useEffect, useState } from 'react';

interface NewsItem {
  id: string;
  title: string;
  content: string;
  category: string;
  author: string;
  publishedAt: string;
  imageUrl: string;
}

const GET_NEWS_QUERY = `
  query GetNews {
    news {
      id
      title
      content
      category
      author
      publishedAt
      imageUrl
    }
  }
`;

export default function NewsList() {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  useEffect(() => {
    fetchNews();
  }, []);

  const fetchNews = async () => {
    try {
      const response = await fetch('/api/graphql', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          query: GET_NEWS_QUERY,
        }),
      });
      const { data } = await response.json();
      setNews(data.news);
    } catch (error) {
      console.error('Error fetching news:', error);
    } finally {
      setLoading(false);
    }
  };

  const categories = ['All', ...Array.from(new Set(news.map(n => n.category)))];
  
  const filteredNews = selectedCategory === 'All' 
    ? news 
    : news.filter(n => n.category === selectedCategory);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-orange-500 text-2xl">Loading news...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-950">
      {/* Header */}
      <header className="bg-gray-900 border-b border-orange-500/30 sticky top-0 z-10">
        <div className="container mx-auto px-4 py-6">
          <h1 className="text-4xl font-bold text-orange-500 text-center">
            📰 News Hub
          </h1>
          <p className="text-orange-300 text-center mt-2">
            Your source for the latest updates
          </p>
        </div>
      </header>

      {/* Category Filter */}
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-wrap gap-2 justify-center">
          {categories.map(category => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-full transition-all ${
                selectedCategory === category
                  ? 'bg-orange-500 text-gray-950 font-semibold'
                  : 'bg-gray-800 text-orange-300 hover:bg-orange-500/20'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* News Grid */}
      <main className="container mx-auto px-4 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredNews.map((item) => (
            <article
              key={item.id}
              className="bg-gray-900 rounded-lg overflow-hidden shadow-lg border border-orange-500/20 hover:border-orange-500/50 transition-all hover:shadow-orange-500/10"
            >
              <img
                src={item.imageUrl}
                alt={item.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <span className="inline-block px-3 py-1 bg-orange-500/20 text-orange-400 text-sm rounded-full mb-3">
                  {item.category}
                </span>
                <h2 className="text-xl font-bold text-orange-500 mb-3 line-clamp-2">
                  {item.title}
                </h2>
                <p className="text-orange-200/80 text-sm mb-4 line-clamp-3">
                  {item.content}
                </p>
                <div className="flex justify-between items-center text-xs text-orange-400/60">
                  <span>By {item.author}</span>
                  <span>{new Date(item.publishedAt).toLocaleDateString()}</span>
                </div>
              </div>
            </article>
          ))}
        </div>

        {filteredNews.length === 0 && (
          <div className="text-center py-12">
            <p className="text-orange-400 text-xl">No news found in this category</p>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 border-t border-orange-500/30 py-6">
        <div className="container mx-auto px-4 text-center">
          <p className="text-orange-400/60">
            © 2024 News Hub. Powered by Next.js & GraphQL Yoga
          </p>
        </div>
      </footer>
    </div>
  );
}
