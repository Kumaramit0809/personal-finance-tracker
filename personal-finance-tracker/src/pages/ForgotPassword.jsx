import { useState } from "react";
import { forgotPassword } from "../utils/api";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [sent, setSent] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const data = await forgotPassword(email);
      if (data.success) {
        setSent(true);
      } else {
        setError(data.message || "Failed to send reset email");
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

        {sent ? (
          <div style={styles.sentBox}>
            <div style={styles.sentIcon}>✉️</div>
            <h2 style={styles.heading}>Check your email</h2>
            <p style={styles.subheading}>
              We sent a password reset link to <strong>{email}</strong>. Check your inbox and follow the instructions.
            </p>
            <Link to="/login" style={styles.backBtn}>
              <ArrowLeft size={16} /> Back to Login
            </Link>
          </div>
        ) : (
          <>
            <h2 style={styles.heading}>Forgot password?</h2>
            <p style={styles.subheading}>
              Enter your email and we'll send you a link to reset your password.
            </p>

            {error && <div style={styles.errorBox}>{error}</div>}

            <form onSubmit={handleSubmit} style={styles.form}>
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

              <button
                type="submit"
                disabled={loading}
                style={{ ...styles.button, opacity: loading ? 0.7 : 1, cursor: loading ? "not-allowed" : "pointer" }}
              >
                {loading ? "Sending..." : "Send Reset Link"}
              </button>
            </form>

            <Link to="/login" style={styles.backLink}>
              <ArrowLeft size={14} style={{ marginRight: "4px" }} />
              Back to Login
            </Link>
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
  subheading: { fontSize: "14px", color: "#64748b", margin: "0 0 24px 0", lineHeight: "1.6" },
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
  backLink: {
    display: "flex", alignItems: "center", justifyContent: "center",
    marginTop: "20px", fontSize: "14px", color: "#2563eb",
    textDecoration: "none", fontWeight: "500",
  },
  sentBox: { textAlign: "center" },
  sentIcon: { fontSize: "48px", marginBottom: "16px" },
  backBtn: {
    display: "inline-flex", alignItems: "center", gap: "6px",
    marginTop: "24px", padding: "10px 20px", borderRadius: "8px",
    background: "linear-gradient(135deg, #10b981, #2563eb)",
    color: "#fff", textDecoration: "none", fontSize: "14px", fontWeight: "600",
  },
};

export default ForgotPassword;