import React, { useEffect, useState } from "react";
import "../Lessons.css";
import { IoArrowBack } from "react-icons/io5";
import { Link, useParams } from "react-router-dom";
import axios from "axios";

const Lessons = () => {
  const { moduleId } = useParams();
  const [module, setModule] = useState(null);
  const [lessons, setLessons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchModuleAndLessons = async () => {
    try {
      setLoading(true);
      
      // Fetch module information
      const moduleRes = await axios.get(`http://localhost:8080/vaani/modules/${moduleId}`);
      console.log("Fetched module:", moduleRes.data);
      setModule(moduleRes.data);
      
      // Fetch lessons for this module
      const lessonsRes = await axios.get(`http://localhost:8080/vaani/lessons/module/${moduleId}`);
      console.log("Fetched lessons:", lessonsRes.data);
      setLessons(lessonsRes.data);
      
      setError(null);
    } catch (err) {
      console.error("Error fetching data:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (moduleId) {
      fetchModuleAndLessons();
    }
  }, [moduleId]);

  // Refresh data when component comes back into focus
  useEffect(() => {
    const handleFocus = () => {
      if (moduleId) {
        fetchModuleAndLessons();
      }
    };

    window.addEventListener('focus', handleFocus);
    return () => window.removeEventListener('focus', handleFocus);
  }, [moduleId]);

  // Get the next available lesson (first incomplete lesson)
  const getNextLesson = () => {
    const incompleteLesson = lessons.find(lesson => !lesson.completed && !lesson.isCompleted);
    return incompleteLesson || lessons[0]; // Return first lesson if all are complete or if none found
  };

  if (loading) {
    return (
      <div className="lessons-container">
        <div className="header">
          <div className="header-nav">
            <Link to="/modules">
              <div className="back-arrow">
                <IoArrowBack />
              </div>
            </Link>
            <div className="chapter-badge">
              <span>CHAPTER {moduleId}</span>
            </div>
            <div className="spacer"></div>
          </div>
          <div className="header-content">
            <h1>Loading...</h1>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="lessons-container">
        <div className="header">
          <div className="header-nav">
            <Link to="/modules">
              <div className="back-arrow">
                <IoArrowBack />
              </div>
            </Link>
            <div className="chapter-badge">
              <span>CHAPTER {moduleId}</span>
            </div>
            <div className="spacer"></div>
          </div>
          <div className="header-content">
            <h1>Error Loading Data</h1>
            <p>Error: {error}</p>
          </div>
        </div>
      </div>
    );
  }

  const nextLesson = getNextLesson();

  return (
    <div className="lessons-container">
      {/* Header */}
      <div className="header">
        <div className="header-nav">
          <Link to="/modules">
            <div className="back-arrow">
              <IoArrowBack />
            </div>
          </Link>
          <div className="chapter-badge">
            <span>CHAPTER {moduleId}</span>
          </div>
          <div className="spacer"></div>
        </div>

        <div className="header-content">
          <h1>{module?.title || 'Module Title'}</h1>
          <p>{module?.description || 'Module description'}</p>
        </div>
      </div>

      {/* Lessons List */}
      <div className="lessons-list">
        {lessons.length === 0 ? (
          <div style={{ padding: '20px', textAlign: 'center' }}>
            <p>No lessons available for this module</p>
          </div>
        ) : (
          lessons.map((lesson) => {
            const isCompleted = lesson.completed || lesson.isCompleted;
            return (
              <div key={lesson.id} className="lesson-item">
                <div className="lesson-row">
                  <Link to={`/lesson/${lesson.id}`} className="lesson-card-link">
                    <div className={`lesson-card ${isCompleted ? 'completed' : ''}`}>
                      <div className="lesson-content1">
                        <div className="lesson-info">
                          <h3>{lesson.title}</h3>
                          <p>{lesson.description}</p>
                          {isCompleted && <span className="completed-badge">✓ Completed</span>}
                        </div>
                        <div className={`play-button1 ${isCompleted ? 'completed' : 'upcoming'}`}>
                          {isCompleted ? '✓' : '▶'}
                        </div>
                      </div>
                    </div>
                  </Link>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Continue Button */}
      <div className="continue-section">
        {nextLesson ? (
          <Link to={`/lesson/${nextLesson.id}`}>
            <button className="continue-button">Continue learning</button>
          </Link>
        ) : (
          <button className="continue-button" disabled>
            All lessons completed!
          </button>
        )}
      </div>
    </div>
  );
};

export default Lessons;