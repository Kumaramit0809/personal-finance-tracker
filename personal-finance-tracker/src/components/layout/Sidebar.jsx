import { NavLink } from "react-router-dom";
import { LayoutDashboard, ArrowLeftRight, Wallet } from "lucide-react";

const Sidebar = ({ isOpen, onClose }) => {
  const navClass = ({ isActive }) =>
    `flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition ${
      isActive
        ? "bg-emerald-100 text-emerald-700"
        : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
    }`;

  return (
    <>
      {/* Overlay for mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/30 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed left-0 top-0 z-50 h-[calc(100vh-4rem)] w-72 transform border-r border-slate-200 bg-white p-5 shadow-xl transition-transform duration-300 lg:sticky lg:top-0 lg:z-30 lg:h-[calc(100vh-4rem)] lg:translate-x-0 lg:shadow-none ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* FinTrack Logo */}
        <div className="mb-6 border-b border-slate-200 pb-5">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-500 to-blue-600 text-white shadow-md">
              <span className="text-lg font-bold">₹</span>
            </div>
            <div>
              <h1 className="text-lg font-bold text-slate-900">FinTrack</h1>
              <p className="text-xs text-slate-500">Personal Finance Tracker</p>
            </div>
          </div>
        </div>

        {/* Nav Links */}
        <div className="space-y-2">
          <NavLink to="/" className={navClass} onClick={onClose}>
            <LayoutDashboard size={18} />
            Dashboard
          </NavLink>

          <NavLink to="/transactions" className={navClass} onClick={onClose}>
            <ArrowLeftRight size={18} />
            Transactions
          </NavLink>

          <NavLink to="/budgets" className={navClass} onClick={onClose}>
            <Wallet size={18} />
            Budgets
          </NavLink>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;