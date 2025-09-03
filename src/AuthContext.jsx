// src/AuthContext.jsx
import { createContext, useContext, useState, useEffect } from "react";
import { auth } from "./Firebase"; // adjust path to your Firebase config
import { onAuthStateChanged, signOut } from "firebase/auth";

// Create Context
const AuthContext = createContext();

// Provider component
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // Add loading state

  // Listen to Firebase auth state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      console.log("Auth state changed:", firebaseUser); // Debug log
      
      if (firebaseUser) {
        // User is signed in
        const userData = {
          uid: firebaseUser.uid,
          email: firebaseUser.email,
          displayName: firebaseUser.displayName,
          photoURL: firebaseUser.photoURL,
          providerId: firebaseUser.providerData[0]?.providerId // e.g., 'google.com'
        };
        console.log("Setting user data:", userData); // Debug log
        setUser(userData);
      } else {
        // User is signed out
        console.log("User signed out"); // Debug log
        setUser(null);
      }
      setLoading(false); // Auth state has been determined
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, []);

  const logout = async () => {
    try {
      await signOut(auth);
      // Firebase will automatically trigger onAuthStateChanged and set user to null
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  const value = {
    user,
    logout,
    loading
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

// ✅ Custom hook
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};