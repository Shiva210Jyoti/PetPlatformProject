import React, { useState, useEffect } from "react";
import AdminPanel from "./AdminPanel";
import { baseUrl } from '../../db.js';


const AdminLogin = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [admin, setAdmin] = useState(null);
  const [loginSuccess, setLoginSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [isSignupMode, setIsSignupMode] = useState(false);

  useEffect(() => {
    const verifySession = async () => {
      try {
        const response = await fetch(`${baseUrl}/admin/me`, {
          credentials: 'include'
        });

        if (response.ok) {
          const data = await response.json();
          setAdmin(data);
          setLoginSuccess(true);
        }
      } catch (error) {
        console.error('Failed to verify admin session', error);
      } finally {
        setIsLoading(false);
      }
    };

    verifySession();
  }, []);

  const handleLogin = async () => {
    if (!username || !password) {
      setErrorMessage('Please enter both username and password');
      return;
    }

    setErrorMessage('');
    setSuccessMessage('');

    try {
      const response = await fetch(`${baseUrl}/admin/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify({ username, password })
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || 'Invalid credentials');
      }

      const data = await response.json();
      setAdmin({ username: data.username });
      setLoginSuccess(true);
      setUsername('');
      setPassword('');
      setConfirmPassword('');
    } catch (error) {
      setErrorMessage(error.message || 'Login failed');
    }
  };

  const handleSignup = async () => {
    if (!username || !password || !confirmPassword) {
      setErrorMessage('Please fill out all fields');
      setSuccessMessage('');
      return;
    }

    if (password !== confirmPassword) {
      setErrorMessage('Passwords do not match');
      setSuccessMessage('');
      return;
    }

    setErrorMessage('');
    setSuccessMessage('');

    try {
      const response = await fetch(`${baseUrl}/admin/signup`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify({ username, password })
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || 'Failed to sign up');
      }

      const data = await response.json();
      setAdmin({ username: data.username });
      setLoginSuccess(true);
      setSuccessMessage('Account created successfully.');
      setUsername('');
      setPassword('');
      setConfirmPassword('');
    } catch (error) {
      setErrorMessage(error.message || 'Signup failed');
      setSuccessMessage('');
    }
  };

  const toggleMode = () => {
    setIsSignupMode((prev) => !prev);
    setUsername('');
    setPassword('');
    setConfirmPassword('');
    setErrorMessage('');
    setSuccessMessage('');
  };

  const handleLogout = async () => {
    try {
      await fetch(`${baseUrl}/admin/logout`, {
        method: 'POST',
        credentials: 'include'
      });
    } catch (error) {
      console.error('Failed to log out', error);
    } finally {
      setAdmin(null);
      setLoginSuccess(false);
    }
  };

  if (isLoading) {
    return (
      <div className="login-body">
        <div className="login-container">
          <h2>Admin Login</h2>
          <p>Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div>
      {loginSuccess ? (
        <AdminPanel admin={admin} onLogout={handleLogout} />
      ) : (
        <div className="login-body">
          <div className="login-container">
            <h2>{isSignupMode ? 'Admin Sign Up' : 'Admin Login'}</h2>
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              />
            {isSignupMode && (
              <input
                type="password"
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            )}
              {errorMessage && (
                <p className="error-message">{errorMessage}</p>
              )}
              {successMessage && (
                <p className="success-message">{successMessage}</p>
              )}
            <button className="float-right" onClick={isSignupMode ? handleSignup : handleLogin}>
              {isSignupMode ? 'Sign Up' : 'Login'}
            </button>
            <p className="auth-toggle" onClick={toggleMode}>
              {isSignupMode ? 'Already have an account? Log in' : "Don't have an account? Sign up"}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminLogin;
