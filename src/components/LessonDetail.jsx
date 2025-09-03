import React, { useEffect, useState } from 'react';
import '../LessonDetail.css';
import { RxHamburgerMenu } from "react-icons/rx";
import { Link, useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const LessonDetail = () => {
  const { lessonId } = useParams();
  const { moduleId } = useParams();
  const navigate = useNavigate();
  const [lesson, setLesson] = useState(null);
  const [allLessons, setAllLessons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isCompletingLesson, setIsCompletingLesson] = useState(false);

  useEffect(() => {
    const fetchLesson = async () => {
      try {
        setLoading(true);
        const res = await axios.get(`http://localhost:8080/vaani/lessons/${lessonId}`);
        console.log("Fetched lesson:", res.data);
        setLesson(res.data);
        
        // Fetch all lessons in this module to determine next lesson
        if (res.data.moduleId) {
          const lessonsRes = await axios.get(`http://localhost:8080/vaani/lessons/module/${res.data.moduleId}`);
          setAllLessons(lessonsRes.data);
        }
        
        setError(null);
      } catch (error) {
        console.error("Failed to fetch lesson", error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    if (lessonId) {
      fetchLesson();
    }
  }, [lessonId]);

  // Function to handle back navigation
  const handleBackClick = () => {
    if (lesson && lesson.moduleId) {
      navigate(`/lessons/${lesson.moduleId}`);
    } else {
      navigate('/modules'); // Fallback to modules instead of -1
    }
  };

  // Function to handle next lesson
  const handleNextLesson = async () => {
    if (!lesson || isCompletingLesson) return;

    try {
      setIsCompletingLesson(true);

      // Mark current lesson as completed
      await axios.put(`http://localhost:8080/vaani/lessons/${lessonId}/complete`);
      
      // Refresh lessons data to get current status
      const lessonsRes = await axios.get(`http://localhost:8080/vaani/lessons/module/${lesson.moduleId}`);
      const updatedLessons = lessonsRes.data;
      
      // Find current lesson index
      const currentLessonIndex = updatedLessons.findIndex(
        l => Number(l.id) === Number(lessonId)
      );
      
      // Check if there's a next lesson
      if (currentLessonIndex !== -1 && currentLessonIndex < updatedLessons.length - 1) {
        const nextLesson = updatedLessons[currentLessonIndex + 1];
        navigate(`/lessons/${nextLesson.id}`);
      } else {
        navigate(`/lessons/${lesson.moduleId}`);
      }

    } catch (error) {
      console.error("Error completing lesson:", error);
      
      // Fallback using existing allLessons
      const currentLessonIndex = allLessons.findIndex(
        l => Number(l.id) === Number(lessonId)
      );
      
      if (currentLessonIndex !== -1 && currentLessonIndex < allLessons.length - 1) {
        const nextLesson = allLessons[currentLessonIndex + 1];
        navigate(`/lesson/${nextLesson.id}`);
      } else {
        navigate(lesson.moduleId ? `/lessons/${lesson.moduleId}` : '/modules');
      }
    } finally {
      setIsCompletingLesson(false);
    }
  };




  if (loading) {
    return (
      <div className="lesson-detail-container">
        <div className="lesson-header">
          <button className="menu-button" onClick={() => navigate(-1)}>
            <RxHamburgerMenu />
          </button>
        </div>
        <div className="lesson-content">
          <h1 className="lesson-title">Loading...</h1>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="lesson-detail-container">
        <div className="lesson-header">
          <button className="menu-button" onClick={() => navigate(-1)}>
            <RxHamburgerMenu />
          </button>
        </div>
        <div className="lesson-content">
          <h1 className="lesson-title">Error Loading Lesson</h1>
          <p>Error: {error}</p>
        </div>
      </div>
    );
  }

  if (!lesson) {
    return (
      <div className="lesson-detail-container">
        <div className="lesson-content">
          <h1 className="lesson-title">Lesson not found</h1>
        </div>
      </div>
    );
  }

  return (
    <div className="lesson-detail-container">
      {/* Header with hamburger menu */}
      <div className="lesson-header">
        {lesson.moduleId ? (
          <Link to={`/lessons/${lesson.moduleId}`}>
            <button className="menu-button">
              <RxHamburgerMenu />
            </button>
          </Link>
        ) : (
          <button className="menu-button" onClick={handleBackClick}>
            <RxHamburgerMenu />
          </button>
        )}
      </div>

      {/* Main content */}
      <div className="lesson-content">
        {/* Lesson title */}
        <h1 className="lesson-title">Lesson {lesson.id}</h1>
        <h2 className="lesson-subtitle">{lesson.title}</h2>

        {/* Video Player - Direct Display */}
        <div className="video-container">
          <div className="video-player">
            {lesson.videoUrl ? (
              <iframe
                width="750"
                height="400"
                src={lesson.videoUrl.replace("watch?v=", "embed/")}
                title={lesson.title}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                style={{ borderRadius: '20px' }}
              ></iframe>
            ) : (
              <div className="video-error">
                <p>Video not available</p>
              </div>
            )}
          </div>
        </div>

        {/* Description */}
        <div className="lesson-description">
          <p>{lesson.description}</p>
        </div>

        {/* Next button */}
        <button 
          className="next-button" 
          onClick={handleNextLesson}
          disabled={isCompletingLesson}
        >
          {isCompletingLesson ? 'Completing...' : 'Next'}
        </button>
      </div>
    </div>
  );
};

export default LessonDetail;