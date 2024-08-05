import React from "react";
import { Link, useLocation } from "react-router-dom";
import { HomeIcon, Settings } from "lucide-react";

const Sidebar = () => {
  // Check if link is active
  const location = useLocation();
  const isActive = (path) => location.pathname === path;

  return (
    <nav className="grid h-screen p-5 shadow-lg">
      <div>
        <div className="flex justify-center p-5">
          <h2 className="text-xl font-bold">PERFIN.</h2>
        </div>
        <hr className="my-6 border" />
        <div className="mt-3">
          <Link
            to="/dashboard"
            className={`flex gap-2 mb-2 p-3 hover:bg-primary hover:text-white rounded-lg cursor-pointer ${
              isActive("/dashboard") ? "bg-primary text-white" : ""
            }`}
          >
            <HomeIcon />
            <h2 className="text-lg">Home</h2>
          </Link>
          <Link
            to="/setting"
            className={`flex gap-2 mb-2 p-3 hover:bg-primary hover:text-white rounded-lg cursor-pointer ${
              isActive("/setting") ? "bg-primary text-white" : ""
            }`}
          >
            <Settings />
            <h2 className="text-lg">Setting</h2>
          </Link>
        </div>
      </div>
      <div className="text-sm flex items-end justify-center">
        PERFIN. by Duyen Pham
        <br />@ 2024 all right reserved
      </div>
    </nav>
  );
};

export default Sidebar;
