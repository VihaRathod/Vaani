import React, { useEffect, useState } from "react";
import { HiMiniTrophy } from "react-icons/hi2";
import { BsFire } from "react-icons/bs";
import { AiFillFire } from "react-icons/ai";
import "../Profile.css";
import Footer from "./Footer";
import { FaUser, FaLock, FaCreditCard } from "react-icons/fa";
import { FaFlagUsa } from "react-icons/fa";
import { IoArrowForwardCircle } from "react-icons/io5";
import { PiCertificateFill } from "react-icons/pi";
import { useAuth } from "../AuthContext";
import { useNavigate } from "react-router-dom";
import { auth } from "../Firebase";
import { updateProfile } from "firebase/auth";

const days = ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"];

const Profile = () => {
  const { user } = useAuth();
  const [streakData, setStreakData] = useState({
    currentStreak: 0,
    lastLoginDate: null,
    weeklyLogins: [false, false, false, false, false, false, false] // Mo-Su
  });
  
  // Debug: Log user data to console
  console.log("User data in Profile:", user);
  console.log("Display Name:", user?.displayName);
  console.log("Email:", user?.email);

  // Get current day of week (0 = Monday, 6 = Sunday)
  const getCurrentDayIndex = () => {
    const today = new Date();
    const dayOfWeek = today.getDay();
    // Convert Sunday (0) to 6, and Monday (1) to 0, etc.
    return dayOfWeek === 0 ? 6 : dayOfWeek - 1;
  };

  // Get date string in YYYY-MM-DD format
  const getDateString = (date = new Date()) => {
    return date.toISOString().split('T')[0];
  };

  // Get start of current week (Monday)
  const getWeekStart = (date = new Date()) => {
    const d = new Date(date);
    const day = d.getDay();
    const diff = d.getDate() - day + (day === 0 ? -6 : 1); // Adjust when day is Sunday
    return new Date(d.setDate(diff));
  };

  // Load streak data from localStorage
  const loadStreakData = () => {
    if (!user?.uid) return;
    
    const saved = localStorage.getItem(`streakData_${user.uid}`);
    if (saved) {
      const parsed = JSON.parse(saved);
      setStreakData(parsed);
    }
  };

  // Save streak data to localStorage
  const saveStreakData = (data) => {
    if (!user?.uid) return;
    
    localStorage.setItem(`streakData_${user.uid}`, JSON.stringify(data));
    setStreakData(data);
  };

  // Update streak on login
  const updateStreak = () => {
    if (!user?.uid) return;

    const today = getDateString();
    const currentDayIndex = getCurrentDayIndex();
    const weekStart = getWeekStart();
    const currentWeekStart = getDateString(weekStart);

    // Load existing data
    const saved = localStorage.getItem(`streakData_${user.uid}`);
    let data = saved ? JSON.parse(saved) : {
      currentStreak: 0,
      lastLoginDate: null,
      weeklyLogins: [false, false, false, false, false, false, false],
      weekStart: currentWeekStart
    };

    // Check if it's a new week
    if (data.weekStart !== currentWeekStart) {
      // Reset weekly logins for new week
      data.weeklyLogins = [false, false, false, false, false, false, false];
      data.weekStart = currentWeekStart;
    }

    // Check if user already logged in today
    if (data.lastLoginDate === today) {
      setStreakData(data);
      return; // Already counted today
    }

    // Mark today as logged in
    data.weeklyLogins[currentDayIndex] = true;
    data.lastLoginDate = today;

    // Calculate streak
    if (data.lastLoginDate) {
      const lastDate = new Date(data.lastLoginDate);
      const todayDate = new Date(today);
      const diffTime = todayDate - lastDate;
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

      if (diffDays === 1) {
        // Consecutive day
        data.currentStreak += 1;
      } else if (diffDays > 1) {
        // Streak broken, start new
        data.currentStreak = 1;
      }
      // If diffDays === 0, same day (already handled above)
    } else {
      // First time login
      data.currentStreak = 1;
    }

    saveStreakData(data);
  };

  // Fix existing users who don't have displayName set
  useEffect(() => {
    const fixDisplayName = async () => {
      if (user && !user.displayName && auth.currentUser) {
        const actualName = prompt("Hi! It looks like your name isn't set. Please enter your name to update your profile:");
        if (actualName && actualName.trim()) {
          try {
            await updateProfile(auth.currentUser, { 
              displayName: actualName.trim() 
            });
            await auth.currentUser.reload();
            console.log("Display name updated to:", actualName);
            // Force a page refresh to see the updated name
            window.location.reload();
          } catch (error) {
            console.error("Error updating display name:", error);
            alert("Failed to update name. Please try again later.");
          }
        }
      }
    };
    
    // Only run this fix once when component mounts and user exists
    if (user && user.displayName === null) {
      fixDisplayName();
    }
  }, [user?.uid]); // Only trigger when user ID changes (login/logout)

  // Load and update streak data when user logs in
  useEffect(() => {
    if (user?.uid) {
      loadStreakData();
      updateStreak();
    }
  }, [user?.uid]);
  
  // Get user data with smart fallbacks
  const displayName = user?.displayName || 
    (user?.email ? user.email.split('@')[0] : "Loading...");
  const userEmail = user?.email || "No email provided";

  return (
    <div className="streak-container">
      <div className="streak-footer">
        {/* Dynamic Streak Count */}
        <div className="streak-icon-group">
          <BsFire size={25} color="#d7d1c4" />
          <span>{streakData.currentStreak}</span>
        </div>
      </div>

      {/* User Profile Section - No Profile Photo */}
      <div className="user-profile-section">
        {/* Dynamic Username and Email */}
        <div className="streak-username">{displayName}</div>
        <div className="streak-email">{userEmail}</div>
      </div>

      {/* Streak Flame */}
      <div className="streak-flame-wrapper">
        <div className="streak-flame">
          <AiFillFire className="custom-flame" />
        </div>
      </div>

      {/* Daily Streak Tracker */}
      <div className="streak-box">
        <div className="streak-top">
          <p className="streak-title">
            {streakData.currentStreak > 0 
              ? `${streakData.currentStreak} day streak! Keep it up!` 
              : "Start daily streak!"}
          </p>
        </div>
        <div className="streak-days">
          {days.map((day, index) => (
            <div key={index} className="day-wrapper">
              <div 
                className={`day-circle ${
                  streakData.weeklyLogins[index] ? "active-day" : ""
                }`} 
              />
              <div className="day-label">{day}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Settings Section */}
      <SettingsSection />
    </div>
  );
};

export default Profile;

const SettingsSection = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/"); // Redirect to home page after logout
      console.log("User logged out successfully ✅");
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  return (
    <>
      <div className="settings-wrapper">
        {/* Account Section */}
        <h3 className="account-heading">Account</h3>
        <div className="settings-box">
          <div className="settings-row">
            <FaUser className="settings-icon" />
            <span className="settings-info">Edit personal data</span>
            <div className="settings-arrow">
              <IoArrowForwardCircle />
            </div>
          </div>
          {/*<div className="settings-row">
            <FaLock className="settings-icon" />
            <span className="settings-info">Change password</span>
            <div className="settings-arrow">
              <IoArrowForwardCircle />
            </div>
          </div>*/}
          <div className="settings-row">
            <FaFlagUsa className="settings-icon" />
            <span className="settings-info">Switch language</span>
            <div className="settings-arrow">
              <IoArrowForwardCircle />
            </div>
          </div>
        </div>

        {/* Subscription Section */}
        <h3 className="subscription-heading">Subscription</h3>
        <div className="settings-box">
          <div className="settings-row">
            <FaCreditCard className="settings-icon" />
            <span className="settings-payment-info">Payment plans</span>
            <div className="settings-upgrade-badge">UPGRADE</div>
            <div className="settings-arrow">
              <IoArrowForwardCircle />
            </div>
          </div>
        </div>

        <div className="learningProgress-heading">Learning Progress</div>
        <div className="settings-box">
          <div className="settings-row">
            <PiCertificateFill className="certi-icon" />
            <span className="settings-download-info">Certificate</span>
            <div className="settings-arrow">
              <IoArrowForwardCircle />
            </div>
          </div>
        </div>

        {/* Dynamic Logout Button */}
        <button 
          className="logout-btn" 
          onClick={handleLogout}
          style={{ cursor: "pointer" }}
        >
          Log Out
        </button>
      </div>
      <Footer />
    </>
  );
};