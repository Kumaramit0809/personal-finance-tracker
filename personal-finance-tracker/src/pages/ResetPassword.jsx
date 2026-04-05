import { useState } from "react";
import { resetPassword } from "../utils/api";
import { useNavigate, useSearchParams, Link } from "react-router-dom";

const ResetPassword = () => {
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const token = searchParams.get("token");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (password !== confirm) {
      setError("Passwords do not match");
      return;
    }
    if (!token) {
      setError("Invalid or missing reset token");
      return;
    }
    setLoading(true);
    try {
      const data = await resetPassword(token, password);
      if (data.success) {
        setSuccess(true);
        setTimeout(() => navigate("/login"), 2500);
      } else {
        setError(data.message || "Failed to reset password");
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

        {success ? (
          <div style={{ textAlign: "center" }}>
            <div style={{ fontSize: "48px", marginBottom: "16px" }}>✅</div>
            <h2 style={styles.heading}>Password reset!</h2>
            <p style={styles.subheading}>Your password has been updated. Redirecting to login...</p>
          </div>
        ) : (
          <>
            <h2 style={styles.heading}>Set new password</h2>
            <p style={styles.subheading}>Enter your new password below.</p>

            {error && <div style={styles.errorBox}>{error}</div>}

            <form onSubmit={handleSubmit} style={styles.form}>
              <div style={styles.fieldGroup}>
                <label style={styles.label}>New Password</label>
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
              <div style={styles.fieldGroup}>
                <label style={styles.label}>Confirm Password</label>
                <input
                  type="password"
                  placeholder="Repeat password"
                  value={confirm}
                  onChange={(e) => setConfirm(e.target.value)}
                  required
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
                {loading ? "Resetting..." : "Reset Password"}
              </button>
            </form>

            <p style={styles.footerText}>
              <Link to="/login" style={styles.link}>Back to Login</Link>
            </p>
          </>
        )}
      </div>
    </div>
  );
};

const styles = {
  page: {
    minHeight: "100vh",
    background: "linear-gradient(135deg, #f0f4ff 0%, #f8fafc 100%)",
    display: "flex", alignItems: "center", justifyContent: "center",
    padding: "20px", fontFamily: "'Inter', 'Segoe UI', sans-serif",
  },
  card: {
    background: "#fff", borderRadius: "16px", padding: "40px",
    width: "100%", maxWidth: "420px", boxShadow: "0 4px 24px rgba(0,0,0,0.08)",
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
  heading: { fontSize: "22px", fontWeight: "700", color: "#1e293b", margin: "0 0 8px 0" },
  subheading: { fontSize: "14px", color: "#64748b", margin: "0 0 24px 0" },
  errorBox: {
    background: "#fef2f2", border: "1px solid #fecaca", color: "#dc2626",
    borderRadius: "8px", padding: "10px 14px", fontSize: "14px", marginBottom: "16px",
  },
  form: { display: "flex", flexDirection: "column", gap: "16px" },
  fieldGroup: { display: "flex", flexDirection: "column", gap: "6px" },
  label: { fontSize: "14px", fontWeight: "500", color: "#374151" },
  input: {
    padding: "10px 14px", borderRadius: "8px", border: "1.5px solid #e2e8f0",
    fontSize: "14px", color: "#1e293b", outline: "none", background: "#f8fafc",
    width: "100%", boxSizing: "border-box",
  },
  button: {
    marginTop: "4px", padding: "12px", borderRadius: "8px", border: "none",
    background: "linear-gradient(135deg, #10b981, #2563eb)",
    color: "#fff", fontSize: "15px", fontWeight: "600", width: "100%",
  },
  footerText: { textAlign: "center", fontSize: "14px", color: "#64748b", marginTop: "20px" },
  link: { color: "#2563eb", fontWeight: "600", textDecoration: "none" },
};

export default ResetPassword;