import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Home, 
  Search, 
  LineChart, 
  DollarSign, 
  Bell,
  Menu,
  X,
  User
} from 'lucide-react';
import { useSelector, useDispatch } from 'react-redux';
import { logoutUser } from '../../RTK/features/authSlice';

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showUserDropdown, setShowUserDropdown] = useState(false);
  const userMenuRef = useRef(null);
  const dispatch = useDispatch();

  const { isAuthenticated, userDetail, loading } = useSelector((state) => state.authUser);

  const navItems = [
    { icon: <Home className="h-5 w-5" />, label: "Dashboard", href: "/" },
    { icon: <Search className="h-5 w-5" />, label: "Search", href: "/search" },
    { icon: <LineChart className="h-5 w-5" />, label: "Portfolio", href: "/portfolio" },
    { icon: <DollarSign className="h-5 w-5" />, label: "Trade", href: "/trade" },
  ];

  const handleLogout = () => {
    dispatch(logoutUser());
    setShowUserDropdown(false);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
        setShowUserDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <header className="border-b-2 border-gray-200 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        {/* Logo and Brand */}
        <div className="flex items-center gap-2">
          <Link to="/" className="flex items-center gap-2 textHoverGray">
            <div className="bg-stockstash-green rounded-md p-1.5">
              <LineChart className="h-5 w-5 text-white" />
            </div>
            <span className="text-xl font-bold sm:inline-block">
              StockStash
            </span>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          {navItems.map((item) => (
            <Link
              key={item.href}
              to={item.href}
              className="flex items-center gap-1 text-sm font-medium text-muted-foreground transition-colors hover:textHoverGray"
            >
              {item.icon}
              <span>{item.label}</span>
            </Link>
          ))}
        </nav>

        {/* User Menu and Authentication */}
        <div className="flex items-center gap-2">
          {isAuthenticated ? (
            <div className="relative" ref={userMenuRef}>
              <button
                className="relative p-2"
                onClick={() => setShowUserDropdown((prev) => !prev)}
              >
                <User className="h-5 w-5" />
              </button>

              <button className="relative p-2 hidden md:inline-block">
                <Bell className="h-5 w-5" />
                <span className="absolute top-1 right-1 h-2 w-2 bg-red-500 rounded-full"></span>
              </button>

              {showUserDropdown && (
                <div className="absolute right-0 mt-2 w-56 bg-white border rounded-lg shadow-lg z-50 px-4 py-3 text-sm">
                  <div className="font-semibold">{userDetail?.name}</div>
                  <div className="text-xs text-gray-500 mb-2">{userDetail?.email}</div>
                  <button
                    onClick={handleLogout}
                    className="text-sm font-medium text-red-600 hover:underline"
                  >
                    Log out
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="hidden md:block">
              <Link to="/login" className="text-sm font-medium text-foreground bg-stockstash-green px-4 py-2 rounded-md hover:bg-stockstash-green/90">
                Log in
              </Link>
              <Link to="/register" className="text-sm font-medium text-foreground bg-stockstash-green px-4 py-2 rounded-md hover:bg-stockstash-green/90 ml-2">
                Sign up
              </Link>
            </div>
          )}

          {/* Mobile Menu Toggle */}
          <button
            className="md:hidden p-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t">
          <div className="container py-4 flex flex-col gap-4">
            {navItems.map((item) => (
              <Link
                key={item.href}
                to={item.href}
                className="flex items-center gap-2 py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                {item.icon}
                <span>{item.label}</span>
              </Link>
            ))}
            {isAuthenticated ? (
              <div className="flex flex-col gap-2">
                <span className="text-sm font-medium">{userDetail?.name}</span>
                <span className="text-xs text-muted-foreground">{userDetail?.email}</span>
                <button
                  onClick={handleLogout}
                  className="text-sm font-medium text-muted-foreground hover:text-foreground"
                >
                  Log out
                </button>
              </div>
            ) : (
              <div className="flex gap-4 mt-2">
                <Link
                  to="/login"
                  className="flex-1 text-center py-2 border border-gray-300 rounded-md"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Log in
                </Link>
                <Link
                  to="/register"
                  className="flex-1 text-center py-2 bg-primary text-white rounded-md"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Sign up
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
