'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useSession, signOut } from 'next-auth/react';
import { useSelector } from 'react-redux';
import { RootState } from '@/lib/store';
import {
  Home,
  ShoppingCart,
  CreditCard,
  User,
  Menu,
  X,
  LogOut,
  LogIn
} from 'lucide-react';

const navigationItems = [
  { href: '/', label: 'Home', icon: Home },
  { href: '/cart', label: 'Cart', icon: ShoppingCart },
  { href: '/checkout', label: 'Checkout', icon: CreditCard, protected: true },
];

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const { data: session } = useSession();
  const totalItems = useSelector((state: RootState) => state.cart.totalItems);

  const toggleSidebar = () => setIsOpen(!isOpen);

  const isActive = (href: string) => {
    if (href === '/') {
      return pathname === '/';
    }
    return pathname.startsWith(href);
  };

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        onClick={toggleSidebar}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-white rounded-lg shadow-lg border"
      >
        {isOpen ? <X size={20} /> : <Menu size={20} />}
      </button>

      {/* Overlay */}
      {isOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-30"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div
        className={`fixed left-0 top-0 h-screen  bg-[#283841] text-white border-r border-gray-200 shadow-lg z-40 transform transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } lg:translate-x-0 lg:static lg:shadow-none w-64`}
      >
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-xl font-bold">E-com-Store</h2>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4 space-y-2">
            {navigationItems.map((item) => {
              const Icon = item.icon;
              const canAccess = !item.protected || session;

              return (
                <Link
                  key={item.href}
                  href={canAccess ? item.href : '/auth/login'}
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                    isActive(item.href)
                      ? 'bg-white text-[#283841] border border-[#283841]/30'
                      : 'text-white hover:bg-gray-50 hover:text-gray-800'
                  } ${!canAccess ? 'opacity-50 cursor-not-allowed' : ''}`}
                  onClick={() => setIsOpen(false)}
                >
                  <Icon size={20} />
                  <span className="font-medium">{item.label}</span>
                  {item.href === '/cart' && totalItems > 0 && (
                    <span className="ml-auto bg-red-400 text-white text-xs rounded-full p-1 size-6  text-center">
                      {totalItems}
                    </span>
                  )}
                </Link>
              );
            })}
          </nav>

          {/* User Section */}
          <div className="p-4 border-t border-gray-200">
            {session ? (
              <div className="space-y-2">
                <div className="flex items-center gap-3 px-4 py-2">
                  <div className="w-8 h-8 bg-[#283841] rounded-full flex items-center justify-center">
                    {session.user?.image ? (
                      <img
                        src={session.user.image}
                        alt="Profile"
                        className="w-8 h-8 rounded-full"
                      />
                    ) : (
                      <User size={16} className="text-white" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">
                      {session.user?.name}
                    </p>
                    <p className="text-xs  truncate">
                      {session.user?.email}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => signOut()}
                  className="flex items-center gap-3 w-full px-4 py-2  hover:bg-gray-50 hover:text-gray-800 rounded-lg transition-colors duration-200"
                >
                  <LogOut size={16} />
                  <span className="text-sm">Sign Out</span>
                </button>
              </div>
            ) : (
              <Link
                href="/auth/login"
                className="flex items-center gap-3 px-4 py-2 text-gray-600 hover:bg-gray-50 hover:text-gray-800 rounded-lg transition-colors duration-200"
                onClick={() => setIsOpen(false)}
              >
                <LogIn size={16} />
                <span className="text-sm">Sign In</span>
              </Link>
            )}
          </div>
        </div>
      </div>
    </>
  );
}