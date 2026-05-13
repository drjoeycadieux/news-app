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

const categoryEmojis: { [key: string]: string } = {
  Technology: '💻',
  Environment: '🌍',
  Health: '🏥',
  Finance: '💰',
  Automotive: '🚗',
  Sports: '⚽',
  Entertainment: '🎬',
};

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
      <div className="flex justify-center items-center min-h-screen bg-gradient-to-b from-slate-900 via-purple-900 to-slate-900">
        <div className="text-center">
          <div className="inline-flex items-center justify-center mb-6">
            <div className="w-16 h-16 border-4 border-orange-500/30 border-t-orange-500 rounded-full animate-spin"></div>
          </div>
          <p className="text-orange-400 text-xl font-semibold animate-pulse">Loading latest news...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-purple-900/20 to-slate-900">
      {/* Header */}
      <header className="sticky top-0 z-50 backdrop-blur-md bg-slate-900/80 border-b border-orange-500/20">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">
            <h1 className="text-5xl md:text-6xl font-black mb-3">
              <span className="gradient-text">📰 News Hub</span>
            </h1>
            <p className="text-orange-300/80 text-lg font-light tracking-wide">
              Stay informed with the latest stories from around the world
            </p>
          </div>
        </div>
      </header>

      {/* Category Filter */}
      <div className="container mx-auto px-4 py-10">
        <div className="flex flex-wrap gap-3 justify-center mb-2">
          {categories.map(category => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-6 py-3 rounded-full font-semibold transition-smooth text-sm md:text-base ${
                selectedCategory === category
                  ? 'bg-gradient-to-r from-orange-500 to-pink-500 text-white shadow-lg shadow-orange-500/50 scale-105'
                  : 'glass-effect text-orange-300 hover:text-orange-100 hover:bg-slate-800/50 hover:border-orange-500/30'
              }`}
            >
              {category !== 'All' && <span className="mr-2">{categoryEmojis[category] || '📰'}</span>}
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* News Grid */}
      <main className="container mx-auto px-4 pb-20">
        {filteredNews.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredNews.map((item, index) => (
              <article
                key={item.id}
                className="card-hover group glass-effect rounded-xl overflow-hidden border border-orange-500/20 hover:border-pink-500/50"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                {/* Image Container */}
                <div className="relative h-56 overflow-hidden bg-slate-800">
                  <img
                    src={item.imageUrl}
                    alt={item.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>

                {/* Content Container */}
                <div className="p-6">
                  {/* Category Badge */}
                  <div className="flex items-center gap-2 mb-4">
                    <span className="inline-flex items-center gap-2 px-3 py-1 bg-gradient-to-r from-orange-500/20 to-pink-500/20 text-orange-300 text-xs font-bold rounded-full border border-orange-500/30">
                      <span>{categoryEmojis[item.category] || '📰'}</span>
                      {item.category}
                    </span>
                  </div>

                  {/* Title */}
                  <h2 className="text-xl font-bold text-white mb-3 line-clamp-2 group-hover:text-orange-300 transition-colors">
                    {item.title}
                  </h2>

                  {/* Content Preview */}
                  <p className="text-slate-300 text-sm mb-5 line-clamp-3 leading-relaxed">
                    {item.content}
                  </p>

                  {/* Divider */}
                  <div className="h-px bg-gradient-to-r from-orange-500/0 via-orange-500/30 to-orange-500/0 mb-4"></div>

                  {/* Footer Meta */}
                  <div className="flex justify-between items-center text-xs text-slate-400">
                    <span className="flex items-center gap-1 hover:text-orange-300 transition-colors">
                      <span>✍️</span> {item.author}
                    </span>
                    <span className="flex items-center gap-1 hover:text-orange-300 transition-colors">
                      <span>📅</span> {new Date(item.publishedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                    </span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <div className="text-6xl mb-4">🔍</div>
            <p className="text-orange-400 text-2xl font-semibold mb-2">No news found</p>
            <p className="text-orange-300/60">Try selecting a different category</p>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-orange-500/20 backdrop-blur-md bg-slate-900/80 py-8">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            <div>
              <h3 className="text-orange-400 font-bold mb-2">About News Hub</h3>
              <p className="text-slate-400 text-sm">Your trusted source for breaking news and in-depth stories from around the globe.</p>
            </div>
            <div>
              <h3 className="text-orange-400 font-bold mb-2">Categories</h3>
              <p className="text-slate-400 text-sm">Technology • Health • Finance • Environment • Automotive</p>
            </div>
            <div>
              <h3 className="text-orange-400 font-bold mb-2">Technology</h3>
              <p className="text-slate-400 text-sm">Built with Next.js, GraphQL, and Tailwind CSS for a seamless experience.</p>
            </div>
          </div>
          <div className="h-px bg-gradient-to-r from-orange-500/0 via-orange-500/20 to-orange-500/0 mb-6"></div>
          <p className="text-orange-400/60 text-center text-sm">
            © 2024 News Hub. All rights reserved. | Powered by Next.js & GraphQL Yoga
          </p>
        </div>
      </footer>
    </div>
  );
}
