import { useMemo } from "react";
import avatarImg from "../assets/images (2).jpg";

export default function Profile({ user }) {
  const stats = useMemo(() => [
    { label: "Total Asset Types", value: "3" },
    { label: "Total Transactions", value: "14" },
    { label: "Best Performing", value: "Ethereum" },
    { label: "Member Since", value: "2023" },
  ], []);

  const displayName = user ? user.name || user.email.split('@')[0] : 'User';

  return (
    <div className="profile-container">
      <h1 className="page-title">User Profile</h1>
      
      <div className="glass-panel profile-header">
        <div className="avatar-container">
          <img src={avatarImg} alt="User Avatar" className="avatar" />
        </div>
        <div className="profile-info">
          <h1>{displayName}</h1>
          <p>Crypto Enthusiast & Investor</p>
          <div style={{ marginTop: "16px" }}>
            <span style={{ 
              background: "rgba(99, 102, 241, 0.2)", 
              color: "#a78bfa",
              padding: "6px 12px", 
              borderRadius: "20px", 
              fontSize: "14px", 
              fontWeight: "600" 
            }}>
              Pro Member
            </span>
          </div>
        </div>
      </div>

      <h2 className="page-title" style={{ fontSize: "24px", marginTop: "40px" }}>Account Statistics</h2>
      <div className="stats-grid">
        {stats.map((stat, index) => (
          <div key={index} className="glass-panel stat-card">
            <div className="stat-value">{stat.value}</div>
            <div className="stat-label">{stat.label}</div>
          </div>
        ))}
      </div>
      
      <div className="glass-panel" style={{ marginTop: "40px" }}>
        <h2 style={{ marginBottom: "20px", fontSize: "20px" }}>Recent Activity</h2>
        <div style={{ color: "var(--text-muted)", fontSize: "15px" }}>
          <p style={{ padding: "12px 0", borderBottom: "1px solid var(--panel-border)" }}>🟢 Bought 0.5 ETH - 2 hours ago</p>
          <p style={{ padding: "12px 0", borderBottom: "1px solid var(--panel-border)" }}>🟢 Bought 0.02 BTC - 1 day ago</p>
          <p style={{ padding: "12px 0" }}>🔴 Sold 100 SOL - 3 days ago</p>
        </div>
      </div>
    </div>
  );
}
