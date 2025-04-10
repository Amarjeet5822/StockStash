import { Outlet, useLocation } from "react-router-dom";
import { FooterPage, Navbar } from "./components/layout/index";
import { useEffect } from "react";

function App() {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* Sticky Navbar inside responsive container */}
      <div className="sticky top-0 z-50 bg-white w-full shadow-sm">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 md:px-8">
          <Navbar />
        </div>
      </div>

      {/* Main Content inside responsive container */}
      <main className="flex-1 w-full">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 md:px-8 py-6">
          <Outlet />
        </div>
      </main>

      {/* Footer inside responsive container */}
      <footer className="w-full py-6">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 md:px-8">
          <FooterPage />
        </div>
      </footer>
    </div>
  );
}

export default App;
