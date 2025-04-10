import React, { useState } from 'react';
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
  const dispatch = useDispatch();
  
  // Access authentication state from Redux store
  const { isAuthenticated, userDetail, loading } = useSelector((state) => state.authUser);

  const navItems = [
    { icon: <Home className="h-5 w-5" />, label: "Dashboard", href: "/" },
    { icon: <Search className="h-5 w-5" />, label: "Search", href: "/search" },
    { icon: <LineChart className="h-5 w-5" />, label: "Portfolio", href: "/portfolio" },
    { icon: <DollarSign className="h-5 w-5" />, label: "Trade", href: "/trade" },
  ];

  const handleLogout = () => {
    dispatch(logoutUser());
  };
  
  if( loading) {
    return (
      <div className='min-h-96 flex justify-center items-center'>
      <div className='text-3xl text-center text-primary font-semibold '>
         Loading.....
      </div>
    </div>
    )
  }
  return (
    <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        {/* Logo and Brand */}
        <div className="flex items-center gap-2">
          <Link to="/" className="flex items-center gap-2">
            <div className="bg-stockstash-green rounded-md p-1.5">
              <LineChart className="h-5 w-5 text-white" />
            </div>
            <span className="hidden text-xl font-bold sm:inline-block">
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
              className="flex items-center gap-1 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              {item.icon}
              <span>{item.label}</span>
            </Link>
          ))}
        </nav>

        {/* User Menu and Authentication */}
        <div className="flex items-center gap-2">
          {isAuthenticated ? (
            <div className="flex items-center gap-4">
              {/* Notification Bell */}
              <button className="relative p-2">
                <Bell className="h-5 w-5" />
                <span className="absolute top-1 right-1 h-2 w-2 bg-red-500 rounded-full"></span>
              </button>
              {/* User Info and Logout */}
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium">{userDetail?.name}</span>
                <span className="text-xs text-muted-foreground">{userDetail?.email}</span>
                <button
                  onClick={handleLogout}
                  className="text-sm font-medium text-muted-foreground hover:text-foreground"
                >
                  Log out
                </button>
              </div>
            </div>
          ) : (
            <div className="hidden md:block">
              <Link to="/login" className="text-sm font-medium text-muted-foreground hover:text-foreground mr-4">
                Log in
              </Link>
              <Link to="/signup" className="text-sm font-medium text-foreground bg-primary px-4 py-2 rounded-md hover:bg-primary/90">
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
                  to="/signup"
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