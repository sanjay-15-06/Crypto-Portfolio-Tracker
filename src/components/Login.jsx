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
    // Focus email on mount
    document.getElementById('email').focus();
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
      // Load users from localStorage
      const users = JSON.parse(localStorage.getItem('users') || '[]');

      if (isSignup) {
        // Signup: check if user exists
        if (users.find(u => u.email === email)) {
          setError('User already exists');
          setLoading(false);
          return;
        }
        const hashedPassword = btoa(email + ':' + password); // Simple hash for demo
        const newUser = { id: uuidv4(), email, password: hashedPassword, name: email.split('@')[0] };
        users.push(newUser);
        localStorage.setItem('users', JSON.stringify(users));
        setUser(newUser);
        setIsLoggedIn(true);
      } else {
        // Login: find user with hashed password
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
    <div className="login-wrapper">
      <div className="login-container">
        <div className="login-glass">
          <h1 className="login-title">
            {isSignup ? 'Create Account' : 'Welcome Back'}
          </h1>
          <p className="login-subtitle">
            {isSignup ? 'Join CryptoDash today' : 'Enter your credentials'}
          </p>
          
          <form onSubmit={handleSubmit} className="login-form">
            <div className="login-input-wrapper">
              <input
                id="email"
                type="email"
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="login-input"
                required
              />
              <span className="login-input-icon"></span>
            </div>
            <div className="login-input-wrapper">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="login-input"
                id="password"
                required
          
              />
              <span className="login-input-icon">{showPassword ? "👁️" : "🙈        "}</span>
              
              <br></br>
              <br />

              <button
                type="button"
                className="pwd-toggle"
                onClick={() => setShowPassword(!showPassword)}
              >


                👁️


              </button>
            </div>
            
            {error && (
              <div className="error-message">{error}</div>
            )}
            
            <button 
              type="submit" 
              disabled={loading}
              className="login-button primary"
            >
              {loading ? 'Loading...' : (isSignup ? 'Create Account' : 'Sign In')}
            </button>
          </form>
          
          <div className="toggle-auth">
            <span>
              {isSignup ? 'Already have account?' : "Don't have an account?"}
            </span>
            <button 
              type="button"
              onClick={() => setIsSignup(!isSignup)}
              className="toggle-button"
            >
              {isSignup ? 'Sign In' : 'Create Account'}
            </button>
          </div>
          
          {isSignup && (
            <div className="demo-note">
              <small>Demo: Use test@example.com / password123</small>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Login;

