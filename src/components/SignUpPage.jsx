import React, { useState } from "react";
import { Link } from "react-router-dom";
import { auth } from "../Firebase";
import { 
  createUserWithEmailAndPassword, 
  updateProfile,
  signInWithPopup,
  GoogleAuthProvider 
} from "firebase/auth";
import { FaGoogle } from "react-icons/fa6";
import "../SignUp.css";   // 👈 import css here

const SignUpPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSignUp = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      // Create user account
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      
      // Update user profile with display name
      await updateProfile(userCredential.user, {
        displayName: name
      });

      // Force refresh the user token to update displayName in auth state
      await userCredential.user.reload();

      console.log("User registered successfully ✅");
      console.log("User display name:", userCredential.user.displayName);
      console.log("Full user data:", userCredential.user);
      
    } catch (err) {
      console.error("Signup error:", err.message);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignUp = async () => {
    setError("");
    setLoading(true);

    try {
      const provider = new GoogleAuthProvider();
      // Optional: Add additional scopes if needed
      provider.addScope('profile');
      provider.addScope('email');
      
      const result = await signInWithPopup(auth, provider);
      
      console.log("Google sign up successful ✅");
      console.log("Google user display name:", result.user.displayName);
      console.log("Google user data:", result.user);
      
    } catch (err) {
      console.error("Google sign up error:", err.message);
      if (err.code === 'auth/popup-closed-by-user') {
        setError("Sign-up cancelled");
      } else if (err.code === 'auth/popup-blocked') {
        setError("Popup blocked. Please allow popups and try again.");
      } else {
        setError("Failed to sign up with Google. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="signup-container">
      <div className="signup-card">
        <h1>Join Us</h1>
        <h2>Start your journey toward connection, understanding, and empowerment.</h2>

        <form onSubmit={handleSignUp}>
          <input
            type="text"
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            disabled={loading}
          />

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            disabled={loading}
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            disabled={loading}
            minLength={6}
          />

          {error && <p className="error-text">{error}</p>}

          <button type="submit" disabled={loading} className="signup-btn">
            {loading ? "Signing Up..." : "Sign Up"}
          </button>

          <div className="or-divider">or</div>

          {/* Google Sign Up Button */}
          <button
            type="button"
            onClick={handleGoogleSignUp}
            disabled={loading}
            className="google-btn"
          >
            <FaGoogle />
            {loading ? "Signing up..." : "Continue with Google"}
          </button>
        </form>

        {/* Added top margin */}
        <p className="login-link">
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </div>
    </div>
  );
};

export default SignUpPage;