import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { Menu, X, Gift } from "lucide-react";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  const navLink =
    "text-gray-700 hover:text-blue-600 font-medium transition";

  const active =
    "text-blue-600 font-semibold";

  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur border-b border-gray-200 shadow-sm">

      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">

        <Link
          to="/"
          className="flex items-center gap-2"
        >
          <div className="bg-blue-600 text-white p-2 rounded-lg">
            <Gift size={22} />
          </div>

          <span className="text-2xl font-bold text-blue-700">
            Giveaway Hub
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-8">

          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive ? active : navLink
            }
          >
            Home
          </NavLink>

          <NavLink
            to="/giveaways"
            className={({ isActive }) =>
              isActive ? active : navLink
            }
          >
            Giveaways
          </NavLink>

          <NavLink
            to="/winners"
            className={({ isActive }) =>
              isActive ? active : navLink
            }
          >
            Winners
          </NavLink>

          <NavLink
            to="/about"
            className={({ isActive }) =>
              isActive ? active : navLink
            }
          >
            About
          </NavLink>

          <NavLink
            to="/contact"
            className={({ isActive }) =>
              isActive ? active : navLink
            }
          >
            Contact
          </NavLink>

        </nav>

        <div className="hidden md:flex items-center gap-3">

          <Link
            to="/login"
            className="px-5 py-2 rounded-lg border border-blue-600 text-blue-600 hover:bg-blue-50 transition"
          >
            Login
          </Link>

          <Link
            to="/register"
            className="px-5 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition"
          >
            Register
          </Link>

        </div>

        <button
          onClick={() => setOpen(!open)}
          className="md:hidden"
        >
          {open ? <X size={28} /> : <Menu size={28} />}
        </button>

      </div>

      {open && (

        <div className="md:hidden border-t bg-white">

          <div className="flex flex-col p-5 gap-4">

            <NavLink to="/" onClick={() => setOpen(false)}>Home</NavLink>
            <NavLink to="/giveaways" onClick={() => setOpen(false)}>Giveaways</NavLink>
            <NavLink to="/winners" onClick={() => setOpen(false)}>Winners</NavLink>
            <NavLink to="/about" onClick={() => setOpen(false)}>About</NavLink>
            <NavLink to="/contact" onClick={() => setOpen(false)}>Contact</NavLink>

            <Link
              to="/login"
              onClick={() => setOpen(false)}
              className="border border-blue-600 text-blue-600 text-center py-2 rounded-lg"
            >
              Login
            </Link>

            <Link
              to="/register"
              onClick={() => setOpen(false)}
              className="bg-blue-600 text-white text-center py-2 rounded-lg"
            >
              Register
            </Link>

          </div>

        </div>

      )}

    </header>
  );
}