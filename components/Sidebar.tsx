"use client";

import React, { useState } from "react";
import useSignOut from "react-auth-kit/hooks/useSignOut";
import useAuthUser from "react-auth-kit/hooks/useAuthUser";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  FileText,
  Package,
  Plane,
  BookOpen,
  MessageSquare,
  Layers,
  ChevronDown,
  ChevronRight,
  Code,
  LogOut,
} from "lucide-react";

// import Logo from "../../../assets/images/neat-logo.svg";

interface NavItem {
  id: string;
  title: string;
  icon: React.ComponentType<{ size?: number; className?: string }>;
  link?: string;
}

const navigation: NavItem[] = [
  {
    id: "products",
    title: "Products",
    icon: LayoutDashboard,
    link: "/products",
  },
  {
    id: "cart",
    title: "Cart",
    icon: Layers,
    link: "/cart",
  },
];

// User type
export type UserParams = {
  address: string;
  email: string;
  id: string;
  imageUrl: string;
  isActive: boolean;
  name: string;
  originalImageName: string;
  phoneNumber: string;
  registeredDate: Date;
  role: { id: string; name: string };
};

function Sidebar() {
  const pathname = usePathname();

  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [collapsed, setCollapsed] = useState(false);

  //   function logout() {
  //     signout();
  //     navigate("/login");
  //   }

  const toggleDropdown = (id: string) => {
    setOpenDropdown(openDropdown === id ? null : id);
  };

  // Check if current path matches a nav item or its children
  const isItemActive = (item: NavItem) => {
    if (item.link && pathname === item.link) return true;
    return false;
  };

  return (
    <div
      className={`${
        collapsed ? "w-20" : "w-72"
      } h-screen bg-white flex flex-col transition-all duration-300 border-r border-gray-300`}
    >
      {/* Profile Section */}
      <div className="p-1 flex-align-center gap-3 border-b  border-gray-300 relative h-[8vh]">
        <div className="flex-align-center space-x-2">
          {/* <img src={Logo} alt="Logo" className="w-20 h-fit object-cover" /> */}
          {!collapsed && (
            <div>
              <h2 className="font-base-bold text-primary">hello</h2>
            </div>
          )}
        </div>

        <button
          onClick={() => setCollapsed(!collapsed)}
          className=" absolute -bottom-3 -right-3 p-1 bg-white size-fit rounded-md text-gray-400 hover:text-gray-500 border border-gray-300 hover:bg-gray-100 transition-colors"
        >
          <Code size={16} />
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-2  ">
        {navigation.map((item) => {
          const isOpen = openDropdown === item.id;
          const isActive = isItemActive(item);

          return (
            <div key={item.id} className="relative group">
              <Link
                href={item.link!}
                className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${
                  isActive
                    ? "bg-primary text-white "
                    : "text-primary hover:bg-primary/5"
                }`}
              >
                <item.icon size={20} />
                {!collapsed && <span>{item.title}</span>}
              </Link>
            </div>
          );
        })}
      </nav>
      <div className="p-4">
        <div
          className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-colors text-primary hover:bg-primary/5`}
        >
          <LogOut size={20} />
          <span>Logout</span>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
