import { useState } from "react";
import { register } from "../utils/api";
import { useNavigate, Link } from "react-router-dom";

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const data = await register(username, email, password);
      if (data.success) {
        setSuccess("Registration successful! Redirecting to login...");
        setTimeout(() => navigate("/login"), 1500);
      } else {
        setError(data.message || "Registration failed");
      }
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <div style={styles.logoRow}>
          <div style={styles.logoIcon}>₹</div>
          <div>
            <div style={styles.logoTitle}>FinTrack</div>
            <div style={styles.logoSub}>Personal Finance Tracker</div>
          </div>
        </div>

        <h2 style={styles.heading}>Create an account</h2>
        <p style={styles.subheading}>Start tracking your finances today</p>

        {error && <div style={styles.errorBox}>{error}</div>}
        {success && <div style={styles.successBox}>{success}</div>}

        <form onSubmit={handleSubmit} style={styles.form}>
          <div style={styles.fieldGroup}>
            <label style={styles.label}>Username</label>
            <input
              type="text"
              placeholder="Your name"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              style={styles.input}
              onFocus={(e) => (e.target.style.borderColor = "#2563eb")}
              onBlur={(e) => (e.target.style.borderColor = "#e2e8f0")}
            />
          </div>
          <div style={styles.fieldGroup}>
            <label style={styles.label}>Email</label>
            <input
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              style={styles.input}
              onFocus={(e) => (e.target.style.borderColor = "#2563eb")}
              onBlur={(e) => (e.target.style.borderColor = "#e2e8f0")}
            />
          </div>
          <div style={styles.fieldGroup}>
            <label style={styles.label}>Password</label>
            <input
              type="password"
              placeholder="Min. 6 characters"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={6}
              style={styles.input}
              onFocus={(e) => (e.target.style.borderColor = "#2563eb")}
              onBlur={(e) => (e.target.style.borderColor = "#e2e8f0")}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            style={{ ...styles.button, opacity: loading ? 0.7 : 1, cursor: loading ? "not-allowed" : "pointer" }}
          >
            {loading ? "Creating account..." : "Create Account"}
          </button>
        </form>

        <p style={styles.footerText}>
          Already have an account?{" "}
          <Link to="/login" style={styles.link}>Sign in</Link>
        </p>
      </div>
    </div>
  );
};

const styles = {
  page: {
    minHeight: "100vh",
    background: "linear-gradient(135deg, #f0f4ff 0%, #f8fafc 100%)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "20px",
    fontFamily: "'Inter', 'Segoe UI', sans-serif",
  },
  card: {
    background: "#ffffff",
    borderRadius: "16px",
    padding: "40px",
    width: "100%",
    maxWidth: "420px",
    boxShadow: "0 4px 24px rgba(0,0,0,0.08)",
  },
  logoRow: { display: "flex", alignItems: "center", gap: "12px", marginBottom: "28px" },
  logoIcon: {
    width: "42px", height: "42px", borderRadius: "10px",
    background: "linear-gradient(135deg, #10b981, #2563eb)",
    color: "#fff", display: "flex", alignItems: "center",
    justifyContent: "center", fontSize: "20px", fontWeight: "700",
  },
  logoTitle: { fontSize: "18px", fontWeight: "700", color: "#1e293b", lineHeight: "1.2" },
  logoSub: { fontSize: "12px", color: "#64748b" },
  heading: { fontSize: "24px", fontWeight: "700", color: "#1e293b", margin: "0 0 6px 0" },
  subheading: { fontSize: "14px", color: "#64748b", margin: "0 0 24px 0" },
  errorBox: {
    background: "#fef2f2", border: "1px solid #fecaca", color: "#dc2626",
    borderRadius: "8px", padding: "10px 14px", fontSize: "14px", marginBottom: "16px",
  },
  successBox: {
    background: "#f0fdf4", border: "1px solid #bbf7d0", color: "#16a34a",
    borderRadius: "8px", padding: "10px 14px", fontSize: "14px", marginBottom: "16px",
  },
  form: { display: "flex", flexDirection: "column", gap: "16px" },
  fieldGroup: { display: "flex", flexDirection: "column", gap: "6px" },
  label: { fontSize: "14px", fontWeight: "500", color: "#374151" },
  input: {
    padding: "10px 14px", borderRadius: "8px", border: "1.5px solid #e2e8f0",
    fontSize: "14px", color: "#1e293b", outline: "none", background: "#f8fafc",
    width: "100%", boxSizing: "border-box", transition: "border-color 0.2s",
  },
  button: {
    marginTop: "8px", padding: "12px", borderRadius: "8px", border: "none",
    background: "linear-gradient(135deg, #10b981, #2563eb)",
    color: "#fff", fontSize: "15px", fontWeight: "600", width: "100%",
  },
  footerText: { textAlign: "center", fontSize: "14px", color: "#64748b", marginTop: "20px" },
  link: { color: "#2563eb", fontWeight: "600", textDecoration: "none" },
};

export default Register;