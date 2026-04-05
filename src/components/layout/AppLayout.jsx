import { useState } from "react";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

const AppLayout = ({ children, title = "Dashboard" }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-slate-50">

      {/* Navbar: fixed full width */}
      <Navbar onMenuClick={() => setSidebarOpen(true)} title={title} />

      {/* pt-16 on the outer div pushes everything below the fixed navbar */}
      <div className="flex min-h-screen pt-16">
        <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
        <main className="flex-1 p-4 sm:p-6 lg:p-8">
          {children}
        </main>
      </div>

    </div>
  );
};

export default AppLayout;