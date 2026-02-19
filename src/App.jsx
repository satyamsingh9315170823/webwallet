import { Routes, Route, Link } from "react-router-dom";
import { FaGithub, FaTwitter } from "react-icons/fa";
import Home from "./pages/Home";
import About from "./pages/About";

function App() {
  return (
    <div className="min-h-screen bg-black text-zinc-200">
      
      {/* NAVBAR */}
      <nav className="sticky top-0 z-50 backdrop-blur bg-black/60 border-b border-zinc-800">
        <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
          
          <Link
            to="/"
            className="text-xl font-bold text-white tracking-wide"
          >
            WebWallets
          </Link>

          <div className="flex items-center gap-6 text-sm text-zinc-400">
            
            <a
              href="https://github.com/yourrepo"
              target="_blank"
              className="flex items-center gap-2 hover:text-white transition"
            >
              <FaGithub size={18} />
              Github
            </a>

            <a
              href="https://twitter.com/yourhandle"
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
        </div>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </div>
  );
}

export default App;
