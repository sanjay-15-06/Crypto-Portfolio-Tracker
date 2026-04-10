import { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';

const Login = ({ setIsLoggedIn, setUser }) => {
  const [isSignup, setIsSignup] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    document.getElementById('email')?.focus();
  }, []);

  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const validatePassword = (pwd) => pwd.length >= 6;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    if (!validateEmail(email)) {
      setError('Please enter a valid email');
      setLoading(false);
      return;
    }
    if (!validatePassword(password)) {
      setError('Password must be at least 6 characters');
      setLoading(false);
      return;
    }

    try {
      const users = JSON.parse(localStorage.getItem('users') || '[]');

      if (isSignup) {
        if (users.find(u => u.email === email)) {
          setError('User already exists');
          setLoading(false);
          return;
        }
        const hashedPassword = btoa(email + ':' + password);
        const newUser = { id: uuidv4(), email, password: hashedPassword, name: email.split('@')[0] };
        users.push(newUser);
        localStorage.setItem('users', JSON.stringify(users));
        setUser(newUser);
        setIsLoggedIn(true);
      } else {
        const hashedPassword = btoa(email + ':' + password);
        const user = users.find(u => u.email === email && u.password === hashedPassword);
        if (!user) {
          setError('Invalid email or password');
          setLoading(false);
          return;
        }
        setUser(user);
        setIsLoggedIn(true);
      }
    } catch (err) {
      setError('Something went wrong');
    }
    setLoading(false);
  };

  return (
    <div
      style={{
        margin: 0,
        height: "100vh",
        fontFamily: "Segoe UI, sans-serif",
        background: "linear-gradient(to top, #dfe9f3 0%, #ffffff 100%)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
      }}
    >
      <div
        style={{
          width: "320px",
          padding: "30px 25px",
          borderRadius: "20px",
          backdropFilter: "blur(15px)",
          background: "rgba(101, 93, 93, 0.2)",
          boxShadow: "0 8px 32px rgba(0, 0, 0, 0.15)",
          textAlign: "center"
        }}
      >
        <h1 style={{ marginBottom: "10px", fontSize: "20px" }}>
          {isSignup ? "Create Account" : "Sign in with email"}
        </h1>

        <p style={{ fontSize: "12px", color: "#555", marginBottom: "20px" }}>
          {isSignup ? "Join today" : "Enter your credentials"}
        </p>

        <form onSubmit={handleSubmit}>
          {/* Email */}
          <div style={{ marginBottom: "15px" }}>
            <input
              id="email"
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              style={{
                width: "100%",
                padding: "10px",
                borderRadius: "10px",
                border: "none",
                outline: "none",
                background: "rgba(87, 81, 81, 0.6)"
              }}
            />
          </div>

          {/* Password */}
          <div style={{ marginBottom: "15px" }}>
            <input
              id="password"
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              style={{
                width: "100%",
                padding: "10px",
                borderRadius: "10px",
                border: "none",
                outline: "none",
                background: "rgba(103, 94, 94, 0.6)"
              }}
            />

            <div
              style={{
                fontSize: "11px",
                color: "#666",
                marginTop: "5px",
                cursor: "pointer"
              }}
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? "Hide Password" : "Show Password"}
            </div>
          </div>

          {/* Error */}
          {error && (
            <div style={{ color: "red", fontSize: "12px", marginBottom: "10px" }}>
              {error}
            </div>
          )}

          {/* Button */}
          <button
            type="submit"
            disabled={loading}
            style={{
              width: "100%",
              padding: "10px",
              borderRadius: "10px",
              border: "none",
              background: "black",
              color: "white",
              cursor: "pointer"
            }}
          >
            {loading
              ? "Loading..."
              : isSignup
              ? "Create Account"
              : "Get Started"}
          </button>
        </form>

        {/* Toggle */}
        <div style={{ marginTop: "15px", fontSize: "12px" }}>
          <span>
            {isSignup ? "Already have account?" : "Don't have an account?"}
          </span>
          <button
            onClick={() => setIsSignup(!isSignup)}
            style={{
              marginLeft: "5px",
              border: "none",
              background: "transparent",
              color: "blue",
              cursor: "pointer"
            }}
          >
            {isSignup ? "Sign In" : "Create Account"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;

