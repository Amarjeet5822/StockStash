import React from "react";
import { Link } from "react-router-dom";
import { LineChart } from "lucide-react";

const FooterPage = () => {
  return (
    <footer className="bg-gray-50 text-gray-900 py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          {/* Logo and Description */}
          <div className="mb-4 md:mb-0">
          <div className="flex items-center gap-2">
          <Link to="/" className="flex items-center gap-2">
            <div className="bg-stockstash-green rounded-md p-1.5">
              <LineChart className="h-5 w-5 text-white" />
            </div>
            <span className="text-xl font-bold sm:inline-block">
              StockStash
            </span>
          </Link>
        </div>
            <p className="text-gray-400">Your trusted partner in stock management.</p>
          </div>

          {/* Navigation Links */}
          <div className="mb-4 md:mb-0">
            <ul className="flex space-x-4">
              <li>
                <Link className="textHoverGray" href="/">
                  Dashboard
                </Link>
              </li>
              <li>
                <Link className="textHoverGray" href="/search">
                  Search
                </Link>
              </li>
              <li>
                <Link className="textHoverGray" href="/portfolio">
                  Portfolio
                </Link>
              </li>
              <li>
                <Link className="textHoverGray" href="/trade">
                  Trade
                </Link>
              </li>
            </ul>
          </div>

          {/* Social Media Icons */}
          <div className="flex space-x-4">
            <Link className="textHoverGray" href="#">
              <i className="fab fa-facebook-f"></i>
            </Link>
            <Link className="textHoverGray" href="#">
              <i className="fab fa-twitter"></i>
            </Link>
            <Link className="textHoverGray" href="#">
              <i className="fab fa-linkedin-in"></i>
            </Link>
            <Link className="textHoverGray" href="#">
              <i className="fab fa-instagram"></i>
            </Link>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-8 text-center text-gray-400">
          &copy; 2023 StockStash. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default FooterPage;
