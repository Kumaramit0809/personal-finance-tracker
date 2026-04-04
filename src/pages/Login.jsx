import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Card from "../components/common/Card";
import Input from "../components/common/Input";
import Button from "../components/common/Button";
import { useAuth } from "../context/AuthContext";
import { getUsers } from "../utils/storage";

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // Check if this email belongs to an existing user
  const isExistingUser = form.email
    ? getUsers().some((u) => u.email.toLowerCase() === form.email.toLowerCase())
    : false;

  const handleChange = (e) => {
    setError("");
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      login(form);
      navigate("/");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50 px-4">
      <Card className="w-full max-w-md">
        <h1 className="mb-2 text-2xl font-bold text-slate-800">
          {isExistingUser ? "Welcome Back 👋" : "Welcome 👋"}
        </h1>
        <p className="mb-6 text-sm text-slate-500">
          {isExistingUser ? "Good to see you again. Login to continue." : "Login to manage your finances."}
        </p>
        {error && <div className="mb-4 rounded-xl bg-red-50 p-3 text-sm text-red-600">{error}</div>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input label="Email" type="email" name="email" value={form.email} onChange={handleChange} required />
          <Input label="Password" type="password" name="password" value={form.password} onChange={handleChange} required />
          <Button type="submit" disabled={loading}>
            {loading ? "Logging In..." : "Login"}
          </Button>
        </form>
        <p className="mt-4 text-sm text-slate-600">
          Don't have an account?{" "}
          <Link to="/register" className="font-medium text-blue-600 hover:underline">Register</Link>
        </p>
      </Card>
    </div>
  );
};

export default Login;