import { useState, useEffect } from "react";
import Login from "./components/Login";
import AddAsset from "./components/AddAsset";
import PortfolioTable from "./components/PortfolioTable";
import PortfolioSummary from "./components/PortfolioSummary";
import Profile from "./components/Profile";
import PortfolioChart from "./components/PortfolioChart";

function App() {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [theme, setTheme] = useState("dark");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Load auth state
    const savedLogin = localStorage.getItem('isLoggedIn');
    const savedUser = localStorage.getItem('user');
    if (savedLogin === 'true' && savedUser) {
      setIsLoggedIn(true);
      setUser(JSON.parse(savedUser));
    }
  }, []);

  useEffect(() => {
    // Save auth state
    if (isLoggedIn && user) {
      localStorage.setItem('isLoggedIn', 'true');
      localStorage.setItem('user', JSON.stringify(user));
    } else {
      localStorage.removeItem('isLoggedIn');
      localStorage.removeItem('user');
    }
  }, [isLoggedIn, user]);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUser(null);
    localStorage.removeItem("portfolio");
  };

  if (!isLoggedIn) {
    return <Login setIsLoggedIn={setIsLoggedIn} setUser={setUser} />;
  }

  return (
    <div className="app-wrapper authenticated">
      {/* Sidebar Navigation */}
      <nav className="sidebar">
        <div>
          <div className="brand">CryptoDash</div>
          <div className="nav-links">
            <button
              className={`nav-link ${activeTab === "dashboard" ? "active" : ""}`}
              onClick={() => setActiveTab("dashboard")}
            >
              📊 Dashboard
            </button>
            <button
              className={`nav-link ${activeTab === "profile" ? "active" : ""}`}
              onClick={() => setActiveTab("profile")}
            >
              👤 Profile
            </button>
            <button className="nav-link" onClick={handleLogout} style={{ color: "var(--danger)" }}>
              🚪 Logout
            </button>
          </div>
        </div>
        
        {/* Theme Toggler */}
        <div style={{ marginTop: "auto", borderTop: "1px solid var(--panel-border)", paddingTop: "20px" }}>
          <button 
            className="nav-link" 
            onClick={toggleTheme}
            style={{ width: "100%", justifyContent: "center" }}
          >
            {theme === "dark" ? "☀️ Light Mode" : "🌙 Dark Mode"}
          </button>
        </div>
      </nav>

      {/* Main Content */}
      <main className="main-content">
        {activeTab === "dashboard" && (
          <>
            <h1 className="page-title">Portfolio Overview</h1>
            <div className="dashboard-grid">
              <div className="glass-panel" style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
                <PortfolioSummary />
                <div style={{ flex: 1 }}>
                  <PortfolioChart />
                </div>
              </div>
              <div className="glass-panel">
                <AddAsset />
              </div>
            </div>
            <div className="glass-panel table-container">
              <PortfolioTable />
            </div>
          </>
        )}

        {activeTab === "profile" && <Profile user={user} />}
      </main>
    </div>
  );
}

export default App;
