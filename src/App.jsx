import axios from 'axios';
import React, { useEffect, useState } from 'react';

const App = () => {
  const [newsData, setNewsData] = useState([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get(
          'https://newsapi.org/v2/everything?q=latest&apiKey=5b81eecdaf314e9e899c404fefbb8cf9'
        );
        setNewsData(response.data.articles);
      } catch (error) {
        console.error('Error fetching news:', error);
      }
    }
    fetchData();
  }, []);

  const filteredData = newsData.filter((news) =>
    news.author && news.author.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="bg-gray-900 min-h-screen text-white font-sans">
      {/* Navbar */}
      <nav className="flex items-center justify-between p-4 bg-gray-800 sticky top-0 z-50">
        <div className="flex items-center">
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT8OCU7jYIh66RXzrT87uNnA70vg4KQ-WZBNw&s"
            alt="Logo"
            className="h-12 w-12 mr-2"
          />
          <h1 className="text-2xl font-bold text-red-500">Today's News</h1>
        </div>
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by author"
          className="px-3 py-2 rounded-md bg-gray-700 text-white placeholder-gray-400 focus:ring-2 focus:ring-red-600 outline-none"
        />
        <button className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded-md">
          Subscribe
        </button>
      </nav>

      {/* Header */}
      <header className="py-6 text-center">
        <h2 className="text-4xl font-semibold text-gray-100">Latest News</h2>
        <p className="text-gray-400 mt-2">Stay updated with the latest headlines</p>
      </header>

      {/* News Cards */}
      <div className="container mx-auto px-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredData.map((news, index) => (
          <div
            key={index}
            className="bg-gray-800 rounded-lg shadow-lg overflow-hidden transform hover:scale-105 transition-transform duration-300"
          >
            <img
              src={news.urlToImage || 'https://via.placeholder.com/500x300'}
              alt={news.author}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h3 className="text-lg font-semibold text-red-500 mb-2">{news.author || 'Unknown Author'}</h3>
              <p className="text-gray-300 mb-3">{news.title}</p>
              <p className="text-sm text-gray-400">{news.description || 'Description not available'}</p>
              <p className="text-xs text-gray-500 mt-2">Published on: {news.publishedAt || 'N/A'}</p>
            </div>
            <div className="p-4 bg-gray-700 flex justify-between items-center">
              <a
                href={news.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-400 hover:underline text-sm"
              >
                Read more
              </a>
              <p className="text-sm text-gray-400">👍 {news.votes || '51.2k votes'}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;
