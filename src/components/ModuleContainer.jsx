import React, { useEffect, useState } from "react";
import "../ModuleContainer.css";
import { HiMiniTrophy } from "react-icons/hi2";
import { BsFire } from "react-icons/bs";
import Footer from "./Footer";
import { Link } from "react-router-dom";
import axios from "axios";
import { getAuth } from "firebase/auth";

const ModuleContainer = () => {
  const [modulesData, setModulesData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchModulesWithProgress = async () => {
    try {
      setLoading(true);
      setError(null);

      // Check if user is authenticated
      const auth = getAuth();
      if (!auth.currentUser) {
        throw new Error("User not authenticated");
      }

      // Get Firebase ID token for current logged in user
      const token = await auth.currentUser.getIdToken();

      // Test backend connectivity first
      console.log("Attempting to fetch modules from backend...");
      
      // Call backend with Authorization header
      const res = await axios.get("http://localhost:8080/vaani/modules", {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        timeout: 10000, // 10 second timeout
      });

      console.log("Modules fetched successfully:", res.data);

      // Fetch progress for each module
      const modulesWithProgress = await Promise.all(
        res.data.map(async (module) => {
          try {
            const lessonsRes = await axios.get(
              `http://localhost:8080/vaani/lessons/module/${module.id}`,
              {
                headers: {
                  Authorization: `Bearer ${token}`,
                  'Content-Type': 'application/json',
                },
                timeout: 10000,
              }
            );

            const lessons = lessonsRes.data;
            const completedLessons = lessons.filter(
              (lesson) => lesson.completed || lesson.isCompleted
            ).length;
            const totalLessons = lessons.length;
            const progress =
              totalLessons > 0
                ? (completedLessons / totalLessons) * 100
                : 0;

            return {
              ...module,
              completed: completedLessons,
              total: totalLessons,
              progress: Math.round(progress),
            };
          } catch (error) {
            console.error(
              `Error fetching progress for module ${module.id}:`,
              error
            );
            return {
              ...module,
              completed: 0,
              total: 0,
              progress: 0,
            };
          }
        })
      );

      setModulesData(modulesWithProgress);
    } catch (err) {
      console.error("Error fetching modules:", err);
      
      // Set user-friendly error messages
      if (err.code === 'ECONNREFUSED' || err.message.includes('ERR_FAILED')) {
        setError("Backend server is not running. Please start your Spring Boot application on port 8080.");
      } else if (err.message.includes('CORS')) {
        setError("CORS error. Please check your backend CORS configuration.");
      } else if (err.message.includes('User not authenticated')) {
        setError("Please log in to access modules.");
      } else {
        setError(`Error: ${err.message}`);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchModulesWithProgress();
  }, []);

  // Refresh data when window regains focus
  useEffect(() => {
    const handleFocus = () => {
      fetchModulesWithProgress();
    };

    window.addEventListener("focus", handleFocus);
    return () => window.removeEventListener("focus", handleFocus);
  }, []);

  const getBackgroundImage = (id) => {
    const map = {
      1: "url('/images/handshake.png')",
      2: "url('/images/chat.png')",
      3: "url('/images/flex.png')",
      4: "url('/images/phrases.png')",
      5: "url('/images/gesture.png')",
      6: "url('/images/final.png')",
    };
    return map[id] || "none";
  };

  if (loading) {
    return (
      <div className="modules-page">
        <div className="modules-header">
          <div className="module-logo">
            
            <div className="icon-item">
              <BsFire className="streak-logo" />
              <span className="icon-count">0</span>
            </div>
          </div>
        </div>
        <div style={{ padding: "20px", textAlign: "center" }}>
          <p>Loading modules...</p>
        </div>
        <Footer />
      </div>
    );
  }

  if (error) {
    return (
      <div className="modules-page">
        <div className="modules-header">
          <div className="module-logo">
            <div className="icon-item">
              <HiMiniTrophy className="trophy-logo" />
              <span className="icon-count">0</span>
            </div>
            <div className="icon-item">
              <BsFire className="streak-logo" />
              <span className="icon-count">0</span>
            </div>
          </div>
        </div>
        <div style={{ padding: "20px", textAlign: "center", color: "red" }}>
          <p>{error}</p>
          <button onClick={() => fetchModulesWithProgress()}>Retry</button>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="modules-page">
      <div className="modules-header">
        <div className="module-logo">
          <div className="icon-item">
            <HiMiniTrophy className="trophy-logo" />
            <span className="icon-count">0</span>
          </div>
          <div className="icon-item">
            <BsFire className="streak-logo" />
            <span className="icon-count">0</span>
          </div>
        </div>
      </div>

      {modulesData.map((mod) => (
        <div
          className="module-container"
          key={mod.id}
          style={{ "--bg-image": getBackgroundImage(mod.id) }}
        >
          <div className="chapter-label">Chapter {mod.id}</div>
          <div className="module-title">{mod.title}</div>
          <div className="lesson-info">
            {mod.completed} of {mod.total} lessons completed
          </div>
          <div className="progress-bar">
            <div
              className="progress-fill"
              style={{ width: `${mod.progress}%` }}
            ></div>
          </div>
          <Link to={`/lessons/${mod.id}`}>
            <button className="action-button">▶</button>
          </Link>
        </div>
      ))}

      <Footer />
    </div>
  );
};

export default ModuleContainer;