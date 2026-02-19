import { useState } from "react";
import { Routes, Route, Link } from "react-router-dom";
import { FaGithub, FaTwitter, FaBars, FaTimes } from "react-icons/fa";
import Home from "./pages/Home";
import About from "./pages/About";

function App() {
  const [open, setOpen] = useState(false);

  return (
    <div className="min-h-screen bg-black text-zinc-200">

      {/* NAVBAR */}
      <nav className="sticky top-0 z-50 backdrop-blur bg-black/60 border-b border-zinc-800">
        <div className="max-w-6xl mx-auto px-5 sm:px-6 py-4 flex justify-between items-center">
          
          {/* Logo */}
          <Link
            to="/"
            className="text-lg sm:text-xl font-bold text-white tracking-wide"
          >
            WebWallets
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-6 text-sm text-zinc-400">
            <a
              href="https://github.com/satyamsingh9315170823/webwallet"
              target="_blank"
              className="flex items-center gap-2 hover:text-white transition"
            >
              <FaGithub size={18} />
              Github
            </a>

            <a
              href="https://x.com/satyamsingh823"
              target="_blank"
              className="flex items-center gap-2 hover:text-white transition"
            >
              <FaTwitter size={18} />
              Twitter
            </a>

            <Link to="/about" className="hover:text-white transition">
              About
            </Link>
          </div>

          {/* Mobile Hamburger */}
          <button
            className="md:hidden text-white text-xl"
            onClick={() => setOpen(!open)}
          >
            {open ? <FaTimes /> : <FaBars />}
          </button>
        </div>

        {/* Mobile Menu */}
        {open && (
          <div className="md:hidden border-t border-zinc-800 px-6 pb-4">
            <div className="flex flex-col gap-4 mt-4 text-zinc-400">

              <a
                href="https://github.com/satyamsingh9315170823/webwallet"
                target="_blank"
                className="flex items-center gap-2 hover:text-white transition"
                onClick={() => setOpen(false)}
              >
                <FaGithub /> Github
              </a>

              <a
                href="https://x.com/satyamsingh823"
                target="_blank"
                className="flex items-center gap-2 hover:text-white transition"
                onClick={() => setOpen(false)}
              >
                <FaTwitter /> Twitter
              </a>

              <Link
                to="/about"
                className="hover:text-white transition"
                onClick={() => setOpen(false)}
              >
                About
              </Link>
            </div>
          </div>
        )}
      </nav>

      {/* ROUTES */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </div>
  );
}

export default App;
