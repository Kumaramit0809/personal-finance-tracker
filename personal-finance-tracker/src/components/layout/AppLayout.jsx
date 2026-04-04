// import { useState } from "react";
// import Navbar from "./Navbar";
// import Sidebar from "./Sidebar";

// const AppLayout = ({ children }) => {
//   const [sidebarOpen, setSidebarOpen] = useState(false);

//   return (
//     <div className="min-h-screen bg-slate-50">
//       <Navbar onToggleSidebar={() => setSidebarOpen(true)} />

//       <div className="mx-auto flex max-w-7xl">
//         <Sidebar
//           isOpen={sidebarOpen}
//           onClose={() => setSidebarOpen(false)}
//         />

//         <main className="min-h-[calc(100vh-73px)] flex-1 px-4 py-6 sm:px-6 lg:px-8">
//           {children}
//         </main>
//       </div>
//     </div>
//   );
// };

// export default AppLayout;
import { useState } from "react";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

const AppLayout = ({ children, title = "Dashboard" }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-slate-50">
      {/* Sidebar */}
      <Sidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      {/* Main Content */}
      <div className="flex flex-1 flex-col lg:ml-72">
        <Navbar
          title={title}
          onMenuClick={() => setSidebarOpen(true)}
        />

        <main className="flex-1 p-4 sm:p-6 lg:p-8">
          {children}
        </main>
      </div>
    </div>
  );
};

export default AppLayout;