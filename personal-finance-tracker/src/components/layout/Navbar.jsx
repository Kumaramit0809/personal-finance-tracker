
import { Menu, LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const Navbar = ({ onMenuClick, title = "Dashboard" }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <header className="sticky top-0 z-40 flex h-16 w-full items-center justify-between border-b border-emerald-100 bg-gradient-to-r from-slate-100 via-slate-50 to-indigo-100 backdrop-blur-md">
      {/* Left Side */}
      <div className="flex items-center gap-3">
        {/* Mobile menu button */}
        <button
          onClick={onMenuClick}
          className="rounded-lg p-2 text-slate-700 transition hover:bg-slate-100 lg:hidden"
          aria-label="Open sidebar"
        >
          <Menu size={22} />
        </button>
      </div>

      {/* Right Side */}
      <div className="flex items-center gap-3">
        <div className="rounded-xl bg-slate-100 px-3 py-2 text-sm text-slate-700">
          {user?.name || user?.email || "User"}
        </div>

        <button
          onClick={handleLogout}
          className="hidden items-center gap-2 rounded-xl bg-red-500 px-4 py-2 text-sm font-medium text-white shadow-sm transition hover:bg-red-600 sm:inline-flex"
        >
          <LogOut size={16} />
          Logout
        </button>
      </div>
    </header>
  );
};

export default Navbar;