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
      {/* Mobile overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/30 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed top-16 left-0 z-50 h-[calc(100vh-4rem)] w-64
          bg-white border-r border-slate-200 p-5 shadow-xl
          transform transition-transform duration-300
          lg:sticky lg:top-16 lg:z-30 lg:translate-x-0 lg:shadow-none lg:shrink-0
          ${isOpen ? "translate-x-0" : "-translate-x-full"}
        `}
      >
        <nav className="space-y-1">
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
        </nav>
      </aside>
    </>
  );
};

export default Sidebar;