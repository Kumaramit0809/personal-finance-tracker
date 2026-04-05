import { Menu, LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const Navbar = ({ onMenuClick }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex h-16 items-center justify-between px-6 border-b border-emerald-100 bg-linear-to-r from-slate-100 via-slate-50 to-indigo-100">

      {/* Far Left — Logo */}
      <div className="flex items-center gap-3">
        <button
          onClick={onMenuClick}
          className="rounded-lg p-2 text-slate-700 hover:bg-slate-200 transition lg:hidden"
        >
          <Menu size={22} />
        </button>

        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-2xl bg-linear-to-r from-emerald-500 to-blue-600 text-white shadow-md">
            <span className="text-base font-bold">₹</span>
          </div>
          <div>
            <h1 className="text-base font-bold leading-tight text-slate-900">FinTrack</h1>
            <p className="text-xs text-slate-500 leading-tight">Personal Finance Tracker</p>
          </div>
        </div>
      </div>

      {/* Far Right — User + Logout */}
      <div className="flex items-center gap-3">
        <span className="rounded-xl bg-slate-100 px-3 py-2 text-sm text-slate-700">
          {user?.name || user?.email || "User"}
        </span>
        <button
          onClick={handleLogout}
          className="flex items-center gap-2 rounded-xl bg-red-500 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-red-600 transition cursor-pointer"
        >
          <LogOut size={16} />
          Logout
        </button>
      </div>

    </header>
  );
};

export default Navbar;