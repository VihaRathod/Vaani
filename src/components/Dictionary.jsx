import React, { useState, useEffect } from 'react';
import '../Dictionary.css';
import Footer from "./Footer";
import axios from 'axios';

const Dictionary = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [selectedWord, setSelectedWord] = useState(null);
  const [wordOfTheDay, setWordOfTheDay] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch word of the day on component mount
  useEffect(() => {
    fetchWordOfTheDay();
  }, []);

  const fetchWordOfTheDay = async () => {
    try {
      const response = await axios.get('http://localhost:8080/vaani/dictionary/random');
      if (response.data) {
        setWordOfTheDay(response.data);
      }
    } catch (error) {
      console.error('Error fetching word of the day:', error);
      // Fallback: fetch all and pick random
      try {
        const allResponse = await axios.get('http://localhost:8080/vaani/dictionary');
        if (allResponse.data && allResponse.data.length > 0) {
          const randomIndex = Math.floor(Math.random() * allResponse.data.length);
          setWordOfTheDay(allResponse.data[randomIndex]);
        }
      } catch (fallbackError) {
        console.error('Error fetching all dictionary entries:', fallbackError);
      }
    }
  };

  const handleSearch = async () => {
    if (!searchQuery.trim()) {
      setError('Please enter a word to search');
      return;
    }

    try {
      setLoading(true);
      setError(null);
      
      const response = await axios.get(`http://localhost:8080/vaani/dictionary/search?query=${encodeURIComponent(searchQuery)}`);
      
      if (response.data && response.data.length > 0) {
        setSearchResults(response.data);
        // Automatically select the first result
        setSelectedWord(response.data[0]);
      } else {
        setSearchResults([]);
        setSelectedWord(null);
        setError('No words found matching your search');
      }
    } catch (error) {
      console.error('Error searching dictionary:', error);
      setError('Error searching for the word. Please try again.');
      setSearchResults([]);
      setSelectedWord(null);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const convertYouTubeUrl = (url) => {
    if (!url) return '';
    
    // Convert various YouTube URL formats to embed format
    if (url.includes('youtu.be/')) {
      const videoId = url.split('youtu.be/')[1].split('?')[0];
      return `https://www.youtube.com/embed/${videoId}`;
    } else if (url.includes('watch?v=')) {
      return url.replace('watch?v=', 'embed/');
    } else if (url.includes('/embed/')) {
      return url; // Already in embed format
    }
    
    return url;
  };

  const displayWord = selectedWord || wordOfTheDay;

  return (
    <>
      <div className='dict-container'>
        <div className="dict-card">
          <h2>Dictionary</h2>

          <div className="search-wrapper">
            <input 
              type="text" 
              placeholder="Search for a word" 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyPress={handleKeyPress}
              disabled={loading}
            />
            <button 
              className='dict-button' 
              onClick={handleSearch}
              disabled={loading || !searchQuery.trim()}
            >
              {loading ? 'Searching...' : 'Search'}
            </button>
          </div>

          {error && (
            <div className="error-message" style={{ color: 'red', margin: '10px 0' }}>
              {error}
            </div>
          )}

          <h3 className="word-heading">
            {selectedWord ? `Search Result: ${selectedWord.title}` : displayWord ? `Word of the Day: ${displayWord.title}` : 'Word of the Day'}
          </h3>

          <div className="video-placeholder1">
            {displayWord && displayWord.videoUrl ? (
              <div className="video-container">
                <iframe
                  width="100%"
                  height="300"
                  src={convertYouTubeUrl(displayWord.videoUrl)}
                  title={displayWord.title}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  style={{ borderRadius: '10px' }}
                ></iframe>
              </div>
            ) : (
              <p>[ Video Placeholder ]</p>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Dictionary;