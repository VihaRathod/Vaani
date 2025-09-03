import React, { useState } from "react";
import "../LoggedInPage.css"; 
import { Link } from "react-router-dom";
import { auth } from "../Firebase";
import { 
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider 
} from "firebase/auth";
import { FaGoogle } from "react-icons/fa6";

const LoggedInPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await signInWithEmailAndPassword(auth, email, password);
      console.log("User logged in successfully ✅");
    } catch (err) {
      console.error(err.message);
      setError("Invalid email or password ❌");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setError("");
    setLoading(true);

    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      
      console.log("Google login successful ✅");
      console.log("User:", result.user);
    } catch (err) {
      console.error("Google login error:", err.message);
      if (err.code === "auth/popup-closed-by-user") {
        setError("Sign-in cancelled");
      } else {
        setError("Failed to sign in with Google");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h1>Welcome back</h1>
        <h2>Login to continue your journey.</h2>

        {/* Google Login Button */}
        

        <form onSubmit={handleLogin}>
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
          />

        <div className="or-divider">or</div>

          {error && <p className="error-text">{error}</p>}
<button
          type="button"
          onClick={handleGoogleLogin}
          disabled={loading}
          className="google-btn"
        >
          <FaGoogle />
          {loading ? "Signing in..." : "Continue with Google"}
        </button>

        

          <button type="submit" disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <p className="signup-link">
          Don't have an account? <Link to="/signup">Sign Up</Link>
        </p>
      </div>
    </div>
  );
};

export default LoggedInPage;
